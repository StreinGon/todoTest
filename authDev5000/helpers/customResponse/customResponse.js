function customResponse(res, status, message, data) {
  let today = new Date();

  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  const min = today.getMinutes();
  const hours = today.getHours();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = `${mm}/${dd}/${yyyy} ${hours}:${min}`;
  return res.status(status).json({ message, data, responseTime: today });
}
module.exports = customResponse;
