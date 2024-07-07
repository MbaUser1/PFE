// pages/api/register.ts
import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

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

    // Construire l'URL complète pour l'API OTP
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const host = request.headers.get("host");
    const otpUrl = new URL(`${protocol}://${host}/api/otp`);

    // Récupérer l'OTP
    const response = await fetch(otpUrl.toString(), {
      method: "GET",
    });

    const data = await response.json();
    const otp = data.data;

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
    const otpUrl1 = new URL(`${protocol}://${host}/api/infobip`);
    // Envoie du SMS
    const response1 = await fetch(otpUrl1.toString(), {
      method: "POST",
      body: JSON.stringify({
        otp: otp,
        phoneNumber: newUser.telephone,
      }),
    });

    const data1 = await response1.json();

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

export async function PUT(request: Request) {
  try {
    const { id, nom, prenom, email, telephone, password, sexe } =
      await request.json();

    // Vérifiez si l'utilisateur avec cet email existe déjà
    if (email) {
      const existingEmail = await db.utilisateur.findUnique({
        where: { email: email },
      });
      if (existingEmail && existingEmail.id !== id) {
        return NextResponse.json(
          {
            data: null,
            message: `User with this email (${email}) already exists in the Database`,
          },
          { status: 409 },
        );
      }
    }

    // Vérifiez si l'utilisateur avec ce téléphone existe déjà
    if (telephone) {
      const existingPhone = await db.utilisateur.findUnique({
        where: { telephone: telephone },
      });
      if (existingPhone && existingPhone.id !== id) {
        return NextResponse.json(
          {
            data: null,
            message: `User with this phone (${telephone}) already exists in the Database`,
          },
          { status: 409 },
        );
      }
    }

    // Construisez dynamiquement l'objet de mise à jour
    const updateData: any = {};
    if (nom) updateData.nom = nom;
    if (prenom) updateData.prenom = prenom;
    if (email) updateData.email = email;
    if (telephone) updateData.telephone = telephone;
    if (sexe) updateData.sexe = sexe;
    if (password) {
      updateData.motDePasseHache = await bcrypt.hash(password, 10);
    }

    // Mettez à jour l'utilisateur
    const updatedUser = await db.utilisateur.update({
      where: { id: id },
      data: updateData,
    });

    return NextResponse.json(
      {
        data: updatedUser,
        message: "Utilisateur mis à jour avec succès.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Invalid",
        message: "Server Error: Something went wrong",
      },
      { status: 500 },
    );
  }
}
