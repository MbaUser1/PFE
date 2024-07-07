// pages/api/register.ts
import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateOtp, sendOtp } from "../infobip/route";
export async function POST(request: Request) {
  try {
    const { nom, prenom, email, telephone, password, sexe } =
      await request.json();

    // Check if the user already exists
    const existingEmail = await db.utilisateur.findUnique({
      where: {
        email: email,
      },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          data: null,
          message: `User with this email (${email}) already exists in the Database`,
        },
        { status: 409 },
      );
    }

    // Check if the user already exists
    const existingPhone = await db.utilisateur.findUnique({
      where: {
        telephone: telephone,
      },
    });

    if (existingPhone) {
      return NextResponse.json(
        {
          data: null,
          message: `User with this phone (${telephone}) already exists in the Database`,
        },
        { status: 409 },
      );
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    // Create new user with OTP
    const newUser = await db.utilisateur.create({
      data: {
        nom,
        prenom,
        email,
        telephone,
        motDePasseHache: hashedPassword,
        sexe,
        otp,
      },
    });

    // Send OTP to the user

    //await sendOtp(telephone, `Votre code otp est ${otp}`);

    return NextResponse.json(
      {
        data: newUser,
        message:
          "Utilisateur créé avec succès. Veuillez vérifier votre téléphone pour le code OTP.",
        //redirectUrl: `/verify-otp?telephone=${telephone}`, // URL de la page de vérification
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Server Error: Something went wrong",
      },
      { status: 500 },
    );
  }
}
