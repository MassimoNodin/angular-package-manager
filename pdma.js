/**
 * Imports express, path, mongodb, defines the router and sets the views path.
 */
const express = require("express");
const path = require("path");
router = express.Router();
const VIEWS_PATH = path.join(__dirname, "/views/");

const Driver = require('./models/driver');
const Package = require('./models/package');

const { incrementCRUD, db } = require('./analytics.js');

router.get('/drivers/add', function (req, res) {
    fileName = VIEWS_PATH + "add_driver.html";
    res.render(fileName);
});

router.post('/drivers/add', async function (req, res) {
    try {
        let driver = new Driver({
            driver_name: req.body.driverName,
            driver_department: req.body.driverDepartment,
            driver_licence: req.body.driverLicense,
            driver_isActive: (req.body.driverIsActive=="on") ? true : false
        });
        await driver.save();
        res.redirect('/33892962/Massimo/drivers');
        await incrementCRUD(0);
    } catch (error) {
        fileName = VIEWS_PATH + "invalid.html";
        res.render(fileName);
    }
});

router.get('/drivers/', async function (req, res) {
    fileName = VIEWS_PATH + "drivers.html";
    res.render(fileName, {"drivers":await Driver.find({})});
    await incrementCRUD(1);
});

router.get('/drivers/delete', function (req, res) {
    fileName = VIEWS_PATH + "delete_driver.html";
    res.render(fileName);
});

router.post('/drivers/delete/:id', async function (req, res) {
    let driverId = req.params.id;
    deleteResponse = await Driver.deleteOne({driver_id: driverId});
    if (deleteResponse["deletedCount"] == 1) {
        deleteCount = (await Package.deleteMany({driver_id: driverId}))["deletedCount"];
        res.redirect('/33892962/Massimo/drivers');
        for (let i = 0; i < deleteCount + 1; i++) {
            await incrementCRUD(3);
        }
        return;
    }
    fileName = VIEWS_PATH + "invalid.html";
    res.render(fileName);
});

router.get('/drivers/list-department', function (req, res) {
    let fileName = VIEWS_PATH + "select_department.html";
    res.render(fileName);
});

router.post('/drivers/list-department', async function (req, res) {
    let fileName = VIEWS_PATH + "drivers.html";
    res.render(fileName, {"drivers": await Driver.find({driver_department: req.body.driver_department})});
    await incrementCRUD(1);
});

router.get('/packages/add', async function (req, res) {
    fileName = VIEWS_PATH + "add_package.html";
    res.render(fileName, {"drivers":await Driver.find({})});
    await incrementCRUD(1);
});

router.post('/packages/add', async function (req, res) {
    try {
        let package = new Package({
            package_title: req.body.packageTitle,
            package_weight: req.body.packageWeight,
            package_destination: req.body.packageDestination,
            package_description: req.body.packageDescription,
            package_isAllocated: (req.body.driverIsAllocated=="on") ? true : false,
            driver_id: req.body.driverID
        });
        await package.save()
        await Driver.find({driver_id: req.body.driverID}).updateOne({$push: {driver_assigned_packages: package._id}});
        res.redirect('/33892962/Massimo/packages');
        await incrementCRUD(0);
    } catch (error){
        fileName = VIEWS_PATH + "invalid.html";
        res.render(fileName);
    }
});

router.get('/packages/', async function (req, res) {
    fileName = VIEWS_PATH + "packages.html";
    res.render(fileName, {"packages":await Package.find({})});
    await incrementCRUD(1);
});

router.get('/packages/delete', function (req, res) {
    fileName = VIEWS_PATH + "delete_package.html";
    res.render(fileName);
});

router.post('/packages/delete/:id', async function (req, res) {
    let packageId = req.params.id;
    packageObj = await Package.findOne({package_id: packageId});
    await Driver.findOne({driver_id: packageObj.driver_id}).updateOne({$pull: {driver_assigned_packages: packageObj.id}});
    deleteResponse = await Package.deleteOne({package_id: packageId});
    if (deleteResponse["deletedCount"] == 1) {
        res.redirect('/33892962/Massimo/packages');
        await incrementCRUD(3);
        return;
    }
    fileName = VIEWS_PATH + "invalid.html";
    res.render(fileName);
});

module.exports = router;