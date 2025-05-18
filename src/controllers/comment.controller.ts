import { Request, response, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { publishNotification } from "../subscribes/notification";

const prisma = new PrismaClient();

export const createComments = async (req: Request, res: Response) => {
  const { id } = req.params;
  const message = `${req.user.id} commented on you post `;

  try {
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const comment = await prisma.comment.create({
      data: {
        authorById: req.user.id,
        postById: post.id,
        ...req.body,
      },
    });

    await prisma.notification.create({
      data: {
        fromUserId: req.user.id,
        toUserId: post.authorById,
        postById: id,
        message,
        type: "COMMENT",
      },
    });

    await publishNotification({
      reciverId: post.authorById,
      message,
      type: "COMMENT",
    });

    res.status(201).send(comment);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send(error.message);
    }
  }
};

export const getPostComments = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        comments: true,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    res.status(200).send(post);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export const updateComment = async (req: Request, res: Response) => {
  const { id, postId } = req.params;

  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["content"];

    const isMatch = updates.every((values) => allowedUpdates.includes(values));

    if (!isMatch) {
      throw new Error("Invalid field to update");
    }

    const temptComment = await prisma.comment.findFirst({
      where: {
        id,
      },
    });

    if (!temptComment) {
      throw new Error("Comment not found");
    }

    const comment = await prisma.comment.update({
      where: {
        id,
        postById: postId,
        authorById: req.user.id,
      },
      data: {
        ...req.body,
      },
    });

    res.status(200).send(comment);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id, postId } = req.params;

  try {
    const comment = await prisma.comment.findFirst({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    const deletedComment = await prisma.comment.delete({
      where: {
        id,
        authorById_postById: {
          authorById: req.user.id,
          postById: postId,
        },
      },
    });

    res.status(200).send(deletedComment);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send(error.message);
    }
  }
};
