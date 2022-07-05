const { axiosPython } = require("../../configs/axios.conf");
const BASE_URL = "/user";

module.exports.getQualify = (req, res, next) => {
  if (req.cookies.user_id) {
    res.clearCookie("user_id");
  }
  if (req.cookies.msg) {
    res.clearCookie("msg");
  }
  return res.render("qualify/identify", {
    title: "Course Search | Qualify",
    style: "identification",
    folder: "qualify",
    script: "qualify",
    msg: req.cookies.msg ? req.cookies.msg : null,
  });
};

module.exports.postQualify = async (req, res, next) => {
  const { email } = req.body;
  const user = (await axiosPython.get(`${BASE_URL}/login?email=${email}`))
    ?.data;
  if (user.id != 0) {
    if (req.cookies.msg) {
      res.clearCookie("msg");
    }
    res.cookie("user_id", user.id);
    return res.redirect("/user");
  } else {
    res.cookie("msg", "User is not existed! Let's register");
    return res.redirect("/identification");
  }
};

module.exports.getRegister = (req, res, next) => {
  if (req.cookies.user_id) {
    res.clearCookie("user_id");
    res.clearCookie("user")
  }
  return res.render("qualify/register", {
    title: "Course Search | Register",
    folder: "qualify",
    script: "register",
    style: "identification",
    msg: req.cookies.msg ? req.cookies.msg : null
  });
};

module.exports.postRegister = async (req, res, next) => {
  if (req.cookies.msg) {
    res.clearCookie("msg");
  }
  try {
    const isUser = (await axiosPython.post(`${BASE_URL}/register`, req.body))?.data
    if(isUser.id) {
      res.cookie("user_id", isUser.id)
      return res.redirect("/user")
    } else {
      res.cookie("msg", "User is existed!")
      return res.redirect("/identification/register")
    }
    
  } catch (error) {
    console.log(error)
    res.cookie("msg", "User is existed!")
    return res.redirect("/identification/register")
  }

}
