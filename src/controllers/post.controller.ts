import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Post } from "../helper/validations/post.validation";
import { publishNotification } from "../services/notifications/notification";
import { redis } from "../utils/redis";

const prisma = new PrismaClient();

export const createPost = async (req: Request, res: Response) => {
  try {
    const post: Post = await prisma.post.create({
      data: {
        authorById: req.user.id,
        ...req.body,
      },
    });
    res.status(201).send(post);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send(error.message);
    }
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({});

    if (!posts) {
      throw new Error("Posts not found");
    }

    res.status(200).send(posts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findFirst({
      where: {
        id,
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

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["content", "images"];

    const isMatch = updates.every((value) => allowedUpdates.includes(value));

    if (!isMatch) {
      throw new Error("Invalid field");
    }

    const post = await prisma.post.update({
      where: {
        id,
        authorById: req.user.id,
      },
      data: {
        ...req.body,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    res.status(200).send(post);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send(error.message);
    }
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.delete({
      where: {
        id,
        authorById: req.user.id,
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

export const likePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const message = `${req.user.username} like your post`;

  try {
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const likePost = await prisma.like.create({
      data: {
        postById: id,
        userById: req.user.id,
      },
    });

    await prisma.notification.create({
      data: {
        fromUserId: req.user.id,
        toUserId: post.authorById,
        postById: id,
        message,
        type: "LIKE",
      },
    });

    redis.incr(`post:likes:${post.id}`);

    await publishNotification({
      reciverId: post.authorById,
      message,
      type: "LIKE",
    });

    const postLikes = await redis.get(`post:likes:${post.id}`);

    res.status(200).send({ likePost, postLikes });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export const unlikePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const likePost = await prisma.like.delete({
      where: {
        userById_postById: {
          postById: id,
          userById: req.user.id,
        },
      },
    });
    redis.decr(`post:likes:${post.id}`);
    res.status(200).send(likePost);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export const followingUserPost = async (req: Request, res: Response) => {
  try {
    const following = await prisma.follow.findMany({
      where: {
        followersById: req.user.id,
      },
      select: {
        followingById: true,
      },
    });

    if (!following) {
      throw new Error("Following users not found");
    }

    const userIds: string[] = following
      .map((item) => item.followingById)
      .filter((id): id is string => id !== null);

    const post = await prisma.post.findMany({
      where: {
        authorById: {
          in: userIds,
        },
      },
    });

    if (!post) {
      throw new Error("Post not found!!!");
    }

    res.status(200).send(post);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};
