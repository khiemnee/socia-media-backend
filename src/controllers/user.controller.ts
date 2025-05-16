import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { publishNotification } from "../services/notifications/notification";

const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    res.status(200).send(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const imageUrl = req.file?.path;

    const updates = Object.keys(req.body);
    const allowedUpdates = ["username", "email", "password", "avatar", "bio"];

    const isMatched = updates.every((values) =>
      allowedUpdates.includes(values)
    );

    if (!isMatched) {
      throw new Error("Invalid field to update");
    }

    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        avatar: imageUrl ? imageUrl : req.user.avatar,
        ...req.body,
      },
    });

    res.status(200).send(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send(error.message);
    }
  }
};

export const followUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const message = `${req.user.username} followed you`;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.follow.create({
      data: {
        followingById: user.id,
        followersById: req.user.id,
      },
    });

    await prisma.notification.create({
      data: {
        fromUserId: req.user.id,
        toUserId: user.id,
        message,
        type: "FOLLOW",
      },
    });

    await publishNotification({
      reciverId: user.id,
      message,
      type: "FOLLOW",
    });

    res.status(200).send(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export const followingUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const follow = await prisma.follow.findMany({
      where: {
        followersById: id,
      },
      include: {
        followings: true,
      },
    });

    res.status(200).send(follow);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export const followersUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const follow = await prisma.follow.findMany({
      where: {
        followingById: id,
      },
      include: {
        followers: true,
      },
    });

    res.status(200).send(follow);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export const unfollowUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const follow = await prisma.follow.delete({
      where: {
        followersById_followingById: {
          followingById: user.id,
          followersById: req.user.id,
        },
      },
    });

    res.status(200).send(follow);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};
