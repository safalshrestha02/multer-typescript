import { RequestHandler } from "express";

export default function (options: any = {}): RequestHandler {
  return function uploadFiles(req, res, next) {
    res.json(req.files);
    console.log(req.files);
  };
}
