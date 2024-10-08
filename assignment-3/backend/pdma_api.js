/**
 * Imports express, path, mongodb, defines the router and sets the views path.
 */
const express = require("express");
const path = require("path");
router = express.Router();

const { incrementCRUD, db } = require('./analytics.js');

const Driver = require('./models/driver');
const Package = require('./models/package');
const driver = require("./models/driver");


router.post('/drivers/add', async function (req, res) {
    try {
        let driver = new Driver({
            driver_name: req.body.driver_name,
            driver_department: req.body.driver_department,
            driver_licence: req.body.driver_licence,
            driver_isActive: req.body.driver_isActive
        });
        saveResponse = await driver.save();
        res.json({"id": saveResponse._id,"driver_id": saveResponse.driver_id});
        await incrementCRUD(0);
    } catch (error) {
        res.json({"error": error});
    }
});

router.get('/drivers/', async function (req, res) {
    res.json(await Driver.find({}).populate('driver_assigned_packages'));
    await incrementCRUD(1);
});

router.delete('/drivers/delete', async function (req, res) {
    let driverId = req.body.driver_id;
    deleteResponse = await Driver.deleteOne({driver_id: driverId});
    if (deleteResponse["deletedCount"] == 1) {
        deleteCount = (await Package.deleteMany({driver_id: driverId}))["deletedCount"];
        res.json(deleteResponse);
        for (let i = 0; i < deleteCount + 1; i++) {
            await incrementCRUD(3);
        }
        return;
    }
    res.json({"error": "Driver not found"});
});

router.put("/drivers", async function (req, res) {
    let mongoId = req.body.id;
    let driver_licence = req.body.driver_licence;
    let driver_department = req.body.driver_department;
    try {
        await Driver.findOneAndUpdate({_id: mongoId}, {driver_licence: driver_licence, driver_department: driver_department});
        res.json({"status": "Driver updated Successfully"});
        await incrementCRUD(2);
    } catch (error) {
        res.json({"error": "ID not found"});
    }
});

router.post('/packages/add', async function (req, res) {
    try {
        let driver = await Driver.findById(req.body.driver_id);
        let package = new Package({
            package_title: req.body.package_title,
            package_weight: req.body.package_weight,
            package_destination: req.body.package_destination,
            package_description: req.body.package_description,
            package_isAllocated: req.body.isAllocated,
            driver_id: (driver) ? driver.driver_id : null
        });
        saveResponse = await package.save();
        await Driver.findOneAndUpdate({driver_id: driver.driver_id}, {$push: {driver_assigned_packages: saveResponse._id}});
        res.json({"id": saveResponse._id,"package_id": saveResponse.package_id});
        await incrementCRUD(0);
    } catch (error) {
        console.log(error)
        res.json({"error": error});
    }
});

router.get('/packages', async function (req, res) {
    res.json(await Package.find({}));
    await incrementCRUD(1);
});

router.delete('/packages/delete', async function (req, res) {
    try {
        let packageId = req.body.package_id;
        packageObj = await Package.findOne({package_id: packageId});
        await Driver.findOne({driver_id: packageObj.driver_id}).updateOne({$pull: {driver_assigned_packages: packageObj.id}});
        res.json(await Package.deleteOne({package_id: packageId}));
        await incrementCRUD(3);
    } catch (error) {
        res.json({"error": error});
    }
});

router.put("/packages", async function (req, res) {
    try {
        let package_id = req.body.package_id;
        let package_destination = req.body.package_destination;
        let package = await Package.findOneAndUpdate({_id: package_id}, {package_destination: package_destination});
        if (package) {
            res.json({"status": "Package updated Successfully"});
            await incrementCRUD(2);
        }
        res.json({"error": "ID not found"});
    } catch (error) {
        res.json({"error": error});
    }
});

module.exports = router;