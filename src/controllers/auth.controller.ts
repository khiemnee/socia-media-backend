import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Auth } from "../helper/validations/auth.validation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helper/jwt/jwt.helper";
import { SOCIALREFESHKEY } from "../secret";

const prisma = new PrismaClient();

export const authRegister = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const imageUrl = req.file?.path;

  const hashPassword = await bcrypt.hash(password, 8);

  try {
    const auth: Auth = await prisma.user.create({
      data: {
        avatar: imageUrl,
        password: hashPassword,
        username,
        email,
      },
    });

    res.status(201).send(auth);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send(error.message);
    }
  }
};

export const authLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const auth = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!auth) {
      throw new Error("Auth not found");
    }

    const isMatched = bcrypt.compareSync(password, auth.password);

    if (!isMatched) {
      throw new Error("Something went wrong");
    }

    const token = generateAccessToken(auth.id);
    const refreshToken = generateRefreshToken(auth.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

    res.status(200).send({ auth, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send(error.message);
    }
  }
};

export const refreshToken = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    throw new Error("Missing refresh token");
  }

  try {
    const payload = jwt.verify(token, SOCIALREFESHKEY!.toString()) as { id: string };
    const newAccessToken = generateAccessToken(payload.id);
    const newRefreshToken = generateRefreshToken(payload.id);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure : true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).send({ accessToken: newAccessToken });
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send(err.message);
    }
  }
};

export const authLogOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure : true,
      sameSite: "strict",
    });
    res.status(200).send("Logout successfull");
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};
