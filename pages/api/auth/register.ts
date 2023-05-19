import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getHashString } from "@/app/utils/auth";
import { resErrorJson } from "@/app/utils";
import { ObjectId } from "mongodb";
import { faker } from "@faker-js/faker";
import moment from "moment";
import { User } from "@prisma/client";
import { sendEmail } from "@/app/utils/email";
import config from "@/app/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    first_Name,
    last_Name,
    email,
    password,
    address,
    date_of_birth,
    country,
    phone_number,
    gender,
  } = req.body;
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    res.status(400).send("User already exists");
  } else {
    const emailVerifyToken = await getHashString(
      email + password + moment().toISOString()
    );
    const newUserData: User = {
      id: new ObjectId().toString(),
      name: [first_Name.trim(), last_Name.trim()].join(" "),
      email: email,
      emailVerified: null,
      password: await getHashString(password),
      image: faker.image.avatar(),
      address,
      date_of_birth: moment(date_of_birth, "DD/MM/YYYY HH:mm").toDate(),
      country,
      phone_number,
      gender: Boolean(gender),
    };
    
    try {
      const user = await prisma.user.create({
        data: newUserData,
      });

      const newVerifitionData = {
        email: user.email,
        token: emailVerifyToken,
      }

      await prisma.verificationToken.create({
        data: newVerifitionData
      })
      
      await sendEmail({
        to: email,
        subject: "VERIFY EMAIL",
        html: `<a href="${config.BASE_URL}auth/verify?emailVerifyToken=${emailVerifyToken}">Verify email</a>`,
      });
      res.status(200).json(user);
    } catch (error: any) {

      await prisma.user.delete({
        where:{
          email
        }
      })

      await prisma.verificationToken.delete({
        where:{
          email_token:{
            email,
            token: emailVerifyToken
          }
        }
      })
      res.status(500).send(resErrorJson(error.toString()));
    }
  }
}
