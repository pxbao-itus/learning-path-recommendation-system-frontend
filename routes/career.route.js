const router = require('express').Router();
const controller = require('../controllers/career/career.controller')

router.get("/", controller.getCareer)

router.get("/detail", controller.getDetailCareer)

router.get("/update", controller.updateCareer)


module.exports = router