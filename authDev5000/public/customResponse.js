function customResponse(res, status, msg, data) {
  return res.status(status).json({ msg: msg, data: data });
}
module.exports = customResponse;
