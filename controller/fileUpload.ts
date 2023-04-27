import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { cloudinary } from "../services/cloudinary";
import { Form } from "../model/form";

import bcrypt from "bcrypt";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const prisma = new PrismaClient();

export const getAllForms: RequestHandler = async (req, res, next) => {
  try {
    const { data, currentPage, totalPages, found } = res.locals;

    res.json({ data, currentPage, totalPages, found });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    res.status(400).json({ success: false, message });
  }
};

export const uploadFile: RequestHandler = async (req, res, next) => {
  try {
    let dir = path.join(__dirname + "/../../UploadedFiles");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const { fullName, email, phone, password }: Form = req.body;
    if (!email || !password) {
      throw new Error("can't be blank");
    }

    const checkUser = await prisma.form.findUnique({
      where: {
        email,
      },
    });

    if (checkUser) {
      throw new Error("User exists");
    }

    const uploadedFile: any = await cloudinary.uploader.upload(
      req.file?.path as string,
      {
        folder: "UploadedFiles",
        resource_type: "auto",
      }
    );

    const filename: any = req.file?.originalname;

    const { secure_url, bytes, format } = uploadedFile;

    const file = await prisma.file.create({
      data: {
        filename,
        bytes,
        secure_url,
        format,
      },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.form.create({
      data: {
        fullName,
        email,
        phone,
        password: hashedPassword,
        profile: secure_url,
      },
    });

    return res.status(201).json({ user, file });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "email already exists" });
  }
};
