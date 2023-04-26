import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { Form } from "../model/form";

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
    const { fullName, email, phone, password }: Form = req.body;
    const profile: any = `http://localhost:3333/${req.file?.filename}`;

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.form.create({
      data: { fullName, email, phone, password: hashedPassword, profile },
    });

    res
      .status(201)
      .json({ user: user, files: req.file, path: `${req.file?.path}` });

    console.log(req.file);
  } catch (error) {
    next(error);
  }
};
