const { axiosPython } = require("../../configs/axios.conf");
const BASE_URL = "/user";

module.exports.getLP = (req, res, next) => {
  try {
    return res.render("lp", {
      title: "Course Search | Learning Path",
      style: "lp",
      script: "lp",
    });
  } catch (error) {
    return res.redirect("/user");
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const body = {
      id: req.cookies.user.id,
      cost: req.query.cost,
      time: req.query.time,
    };
    const result = (await axiosPython.post(`${BASE_URL}/update`, body))?.data;
    return res.send({ msg: "success" });
  } catch (error) {
    return res.send({ msg: "fail" });
  }
};

module.exports.executeLP = async (req, res, next) => {
  try {
    const result = (
      await axiosPython.get(
        `${BASE_URL}/learning-path?id=${req.cookies.user.id}`
      )
    )?.data;
    return res.send(result);
  } catch (error) {
    return res.send([]);
  }
};

module.exports.getUrl = (req, res, next) => {
  return res.send(process.env.PYTHON_BASE_URL);
};

module.exports.getLPInfo = async (req, res, next) => {
  try {
    const body = {
      user: req.cookies.user.id,
      courses: req.body.courses.map((item) => parseInt(item)),
    };
    const result = (await axiosPython.post(`${BASE_URL}/lp`, body))?.data;
    return res.send(result);
  } catch (error) {
    return res.send({
      courses: 0,
      lor: 0,
      lod: 0,
      cost: 0,
      time: 0,
    });
  }
};

module.exports.getCourseInfo = async (req, res, next) => {
  try {
    const result = (await axiosPython.get(`/course?id=${req.query.id}`))?.data;
    return res.send(result);
  } catch (error) {
    return res.send({
      course: "",
      cost: 0,
      time: 0,
      rating: 0,
      enroll: 0,
      link: "#",
    });
  }
};

module.exports.getLOCourse = async (req, res, next) => {
  try {
    const provided = (
      await axiosPython.get(`/course/provided/lo?id=${req.query.id}`)
    )?.data;
    const required = (
      await axiosPython.get(`/course/required/lo?id=${req.query.id}`)
    )?.data;
    return res.send({
      provided,
      required,
    });
  } catch (error) {
    return res.send({
      provided: [],
      required: [],
    });
  }
};
