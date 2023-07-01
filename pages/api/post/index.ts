import { prisma } from "@/prisma/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const posts = await prisma.post.findMany({
          orderBy: { createdAt: "desc" },
        });
        res.status(200).json(posts);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case "POST":
      try {
        const { title, content }: { title: string; content: string } = req.body;
        if (title.trim().length < 1) {
          throw Error("title cannot be empty!");
        }
        if (content.trim().length < 1) {
          throw Error("content cannot be empty!");
        }
        const post = await prisma.post.create({
          data: { title, content },
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