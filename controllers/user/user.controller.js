const {axiosPython} = require('../../configs/axios.conf')
const BASE_URL = "/user"

module.exports.getUserInfo = async (req, res, next) => {
  if(!req.cookies.user_id) {
    return res.redirect("/identification")
  }
  try {
    const user = (await axiosPython.get(`${BASE_URL}/info?id=${req.cookies.user_id}`))?.data
    res.cookie("user", user)
    return res.render("user", {
      title: "Course Search | User",
      style: "user",
      script: "user",
      user
    })
    
  } catch (error) {
    // console.log(error)
    res.cookie("msg", "Service is'n supported")
    return res.redirect("/identification")
  }
}