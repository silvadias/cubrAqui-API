module.exports = (req, res) => {
  //res.send('debug');
  res.json(req.user);
};
