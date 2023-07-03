import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ message: "sorry can't process unathorized!" });
  }
  switch (req.method) {
    case "GET":
      try {
        const posts = await prisma.post.findMany({
          orderBy: { createdAt: "desc" },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        });
        res.status(200).json(posts);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case "POST":
      try {
        const { content }: { content: string } = req.body;
        if (content.trim().length < 1) {
          throw Error("content cannot be empty!");
        }
        const post = await prisma.post.create({
          data: { content, userId: session.user.id },
        });
        res.status(200).json({ message: "posted successfully" });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(405).json({ message: "method not allowed!" });
  }
}
