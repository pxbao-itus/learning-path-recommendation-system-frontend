exports.homePage = (req, res, next) => {
  res.cookie("id", '123 ',{ signed: true})
  return res.render('index');
}




