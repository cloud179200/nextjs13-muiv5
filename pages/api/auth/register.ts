import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getHashString } from "@/utils/auth";
import { resErrorJson } from "@/utils";
import { ObjectId } from "mongodb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    res.status(400).send("User already exists");
  } else {
    const newUserData = {
      id: new ObjectId().toString(),
      name: email,
      email: email,
      emailVerified: null,
      password: await getHashString(password),
      image: "https://picsum.photos/seed/picsum/200/300"
    }
    try {
      const user = await prisma.user.create({
        data: newUserData,
      });
      res.status(200).json(user);
    } catch (error) {
      console.log({ error });
      res.status(500).send(resErrorJson());
    }
  }
}
