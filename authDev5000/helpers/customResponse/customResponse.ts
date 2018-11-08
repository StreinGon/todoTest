import { Response } from "express";

export function customResponse(res, status: number, message: String, data: Object): Response {
  const today = new Date();

  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  const min = today.getMinutes();
  const hours = today.getHours();
  if (dd < 10) {
    dd = parseInt('0', 10) + dd;
  }

  if (mm < 10) {
    mm = parseInt('0', 10) + mm;
  }

  const todayString = `${mm}/${dd}/${yyyy} ${hours}:${min}`;
  return res.status(status).json({ message, data, responseTime: todayString });
}

