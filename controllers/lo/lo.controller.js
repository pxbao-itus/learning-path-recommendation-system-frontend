const {axiosPython} = require('../../configs/axios.conf')
const BASE_URL = "/lo"


module.exports.getLearningObject = async (req, res, next) => {

  try {
    let search = ""
    if(req.query) {
      search = req.query.search || ""
    }
    const los = (await axiosPython.get(`${BASE_URL}/all?value=${search}`))?.data
    const loHas = (await axiosPython.get(`/user/has?id=${req.cookies.user.id}`))?.data
    return res.render("lo", {
      title: "Course Search | Learning Object",
      script: "lo",
      style: "lo",
      loHas,
      los,
    })
  } catch (error) {
    return res.redirect("/user")
  }
}

module.exports.getLOHas = async (req, res, next) => {
  try {
    const loHas = (await axiosPython.get(`/user/has?id=${req.cookies.user.id}`))?.data
    return res.send(loHas)
  } catch (error) {
    return res.send([])
  }
}

module.exports.deleteLOHas = async (req, res, next) => {
  try {
    const body = {
      user: req.cookies.user.id,
      lo: req.query.lo
    }
    const result = (await axiosPython.post(`/user/has/delete`, body))?.data
    return res.send({msg: "success"})
  } catch (error) {
    return res.send({msg: "fail"})
  }
}

module.exports.createLOHas = async (req, res, next) => {
  try {
    const body = {
      user: req.cookies.user.id,
      lo: req.query.lo,
      level: req.query.level
    }
    const result = (await axiosPython.post(`/user/has/create`, body))?.data
    return res.send({msg: "success"})
  } catch (error) {
    return res.send({msg: "fail"})
  }
}