import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        toUserId: req.user.id,
      },
    });

    res.status(200).send(notifications);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export const readNotifications = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const notifications = await prisma.notification.update({
      where: {
        id,
      },
      data: {
        readed: true,
      },
    });
    res.status(200).send(notifications);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};

export const deleteNotifications = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const notification = await prisma.notification.delete({
      where: {
        id,
      },
    });

    res.status(200).send(notification);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
};
