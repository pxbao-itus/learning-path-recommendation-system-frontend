const router = require('express').Router();
const controller = require('../controllers/lo/lo.controller')

router.get("/", controller.getLearningObject)

router.get("/delete", controller.deleteLOHas)

router.get("/create", controller.createLOHas)

router.get("/has", controller.getLOHas)


module.exports = router