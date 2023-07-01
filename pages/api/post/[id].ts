import { prisma } from "@/prisma/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const session = getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ message: "sorry can't process unathorized!" });
  }
  switch (req.method) {
    case "GET":
      try {
        const post = await prisma.post.findFirst({
          where: { id: id as string },
        });
        if (!post) {
          res.status(404).json({ message: "post not found." });
        }
        res.status(200).json(post);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case "DELETE":
      try {
        await prisma.post.delete({
          where: { id: id as string },
        });
        res.status(200).json({ message: "deleted successfully!" });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;

    case "PATCH":
      try {
        const post = await prisma.post.update({
          where: { id: id as string },
          data: {
            ...req.body,
          },
        });
        res.status(200).json({ message: "updated successfully!" });
      } catch (err: any) {}
      break;
    default:
      res.status(405).json({ message: "method not allowed" });
  }
}
