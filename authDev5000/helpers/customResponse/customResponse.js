function customResponse(res, status, msg, data) {
  return res.status(status).json({ msg, data });
}
module.exports = customResponse;
