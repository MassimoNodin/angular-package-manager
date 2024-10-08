const mongoose = require('mongoose');

function randomStringOfLength(length, uppercase) {
    let rand_string = "";
    alphabet = (uppercase) ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "abcdefghijklmnopqrstuvwxyz";
    for (i = 0; i < length; i++) {
        rand_string += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return rand_string;
}

let driverSchema = mongoose.Schema({
    driver_id: {
        type: String,
        required: false,
        default: "D" + String(Math.round(Math.random() * 99)).padStart(2, "0") + "-" + "33" + "-" + randomStringOfLength(3, true)
    },
    driver_name: {
        type: String,
        required: true,
        validate: {
            validator: function (nameValue) {
                return !/[^a-zA-Z]/.test(nameValue) && nameValue.length >= 3 && nameValue.length <= 20;
            },
            message: 'Name should be a string between 3 and 20 alphabetic characters'
        }
    },
    driver_department: {
        type: String,
        required: true,
        validate: {
            validator: function (departmentValue) {
                return ["food", "furniture", "electronic"].includes(departmentValue);
            },
            message: 'Department should be one of the following: food, furniture, electronic'
        }
    },
    driver_licence: {
        type: String,
        required: true,
        validate: {
            validator: function (licenceValue) {
                return licenceValue.length == 5 && /^[a-z0-9]+$/.test(licenceValue);
            },
            message: 'Licence number should be a string of 5 alphanumeric characters'
        }
    },
    driver_isActive: {
        type: Boolean,
        required: true,
        validate: {
            validator: function (isActiveValue) {
                return typeof isActiveValue === "boolean";
            },
            message: 'isActive should be a boolean value'
        }
    },
    driver_createdAt: {
        type: Date,
        required: false,
        default: Date.now
    },
    driver_assigned_packages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Packages'
        }
    ]
});

module.exports = mongoose.model('Drivers', driverSchema);
