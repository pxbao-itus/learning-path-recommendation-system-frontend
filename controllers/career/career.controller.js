const { axiosPython } = require("../../configs/axios.conf");
const BASE_URL = "/career";

module.exports.getCareer = async (req, res, next) => {
  try {
    const user = (await axiosPython.get(`user/info?id=${req.cookies.user_id}`))?.data
    res.cookie("user", user)
    const careers = (await axiosPython.get(`${BASE_URL}`))?.data;
    return res.render("career", {
      title: "Course Search | Career",
      script: "career",
      style: "career",
      user: req.cookies.user,
      careers,
    });
  } catch (error) {
    return res.redirect("/identification")
  }
};

module.exports.getDetailCareer = async (req, res, next) => {
  try {
    const learningObjects = (
      await axiosPython.get(`${BASE_URL}/lo?id=${req.query.id}`)
    )?.data;
    return res.send(learningObjects);
  } catch (error) {
    return res.send([]);
  }
};

module.exports.updateCareer = async (req, res, next) => {
  try {
    const body = {
      user: req.cookies.user.id,
      career: req.query.career
    }
    const result = (await axiosPython.post(`/user/career/update`, body))
      ?.data;
    return res.send({ msg: "success" });
  } catch (error) {
    return res.send({ msg: "fail" });
  }
};
