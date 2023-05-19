import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { resErrorJson, resSuccessJson } from "@/app/utils";
import moment from "moment";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { emailVerifyToken } = req.body;
  if (!emailVerifyToken) {
    res.status(400).send(resErrorJson("Invalid code"));
  }
  try {
    const user = await prisma.user.update({
      where: {
        emailVerifyToken,
      },
      data: {
        emailVerified: moment().toDate(),
        emailVerifyToken: null
      }
    });
    if (user) {
      res.status(200).send(resSuccessJson());
    }
    else {
      throw new Error("Invalid token");
    }
  } catch (error:any) {
    res.status(500).send(resErrorJson(error.toString()));
  }
}
