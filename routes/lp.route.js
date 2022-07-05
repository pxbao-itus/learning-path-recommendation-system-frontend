const router = require("express").Router();
const controller = require("../controllers/lp/lp.controller");

router.get("/", controller.getLP);

router.get("/update", controller.updateUser);

router.get("/execute", controller.executeLP);

router.get("/url", controller.getUrl);

router.post("/info", controller.getLPInfo)

router.get("/course", controller.getCourseInfo)

module.exports = router;
