const router = require('express').Router();
const controller = require('../controllers/qualify/qualify.controller')

router.get("/", controller.getQualify)

router.post("/", controller.postQualify)

router.get("/register", controller.getRegister)

router.post("/register", controller.postRegister)

module.exports = router