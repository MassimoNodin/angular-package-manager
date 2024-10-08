const mongoose = require('mongoose');

function randomStringOfLength(length, uppercase) {
    let rand_string = "";
    alphabet = (uppercase) ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "abcdefghijklmnopqrstuvwxyz";
    for (i = 0; i < length; i++) {
        rand_string += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return rand_string;
}

let packageSchema = mongoose.Schema({
    package_id: {
        type: String,
        default: "P" + randomStringOfLength(2, true) + "-" + "MA" + "-" + String(Math.round(Math.random() * 999)).padStart(3, "0")

    },
    package_title: {
        type: String,
        required: true,
        validate: {
            validator: function (nameValue) {
                return /^[a-zA-Z0-9]+$/.test(nameValue) && nameValue.length >= 3 && nameValue.length <= 15;
            },
            message: 'Title should be a string between 3 and 15 alphanumeric characters'
        }
    },
    package_weight: {
        type: Number,
        validate: {
            validator: function (weightValue) {
                return weightValue > 0;
            },
            message: 'Age should be a number between 10 and 110'
        }
    },
    package_destination: {
        type: String,
        required: true,
        validate: {
            validator: function (nameValue) {
                return /^[a-z0-9]+$/.test(nameValue) && nameValue.length >= 3 && nameValue.length <= 15;
            },
            message: 'Title should be a string between 3 and 15 alphanumeric characters'
        }
    },
    package_description: {
        type: String,
        required: false,
        validate: {
            validator: function (descriptionValue) {
                return !/^[a-z0-9]+$/.test(descriptionValue) && descriptionValue.length >= 0 && descriptionValue.length <= 30
            },
            message: 'Descrption should be a string between 0 and 15 alphanumeric characters'
        }
    },
    package_createdAt: {
        type: Date,
        required: false,
        default: Date.now
    },
    package_isAllocated: {
        type: Boolean,
        required: true,
        validate: {
            validator: function (isAllocatedValue) {
                return typeof isAllocatedValue === "boolean";
            },
            message: 'isAllocated should be a boolean value'
        }
    },
    driver_id: {
        type: String,
        required: true,
        validate: {
            validator: function (idValue) {
                return idValue.length == 10;
            },
            message: 'ID should be of length 10'
        }
    }
}, );

module.exports = mongoose.model('Packages', packageSchema);