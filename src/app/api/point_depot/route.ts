import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function GET(request: NextRequest) {
  try {
    const pointsDeDepot = await db.lieu_depot.findMany();
    return NextResponse.json({
      success: true,
      data: pointsDeDepot,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch points de dépôt",
        error: "error.message",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    //recuperation des données
    const {
      nom,
      arrondissement,
      institution,
      telephone,
      longitude,
      lagitude,
      email,
      tel,
      password,
    } = await request.json();
    // verfication si les donnees on bien etes remplies
    if (!email || !password || !tel) {
      return NextResponse.json(
        {
          data: null,
          message: "Erreur lors de l'ajout du gerant",
        },
        { status: 500 },
      );
    }
    // Verification si l'email existe deja
    const existingUser = await db.utilisateur.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: `Gerant with this email ( ${email})  already exists in the Database`,
        },
        { status: 409 },
      );
    }
    // Hachage du password
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = "point_depot";
    // Creation du nouveau gerant
    const newUser = await db.utilisateur.create({
      data: {
        email,
        telephone,
        motDePasseHache: hashedPassword,
        role,
      },
    });
    //creation du point de depot
    try {
      const newPoint = await db.lieu_depot.create({
        data: {
          nom,
          arrondissement,
          institution,
          telephone,
          longitude,
          lagitude,
          gerantId: newUser.id,
        },
      });
      return NextResponse.json(
        {
          data: newPoint,
          message: "Point de dépôt ajouté avec succès",
        },
        { status: 201 }, // 201 Created is more appropriate here
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          data: null,
          message: "Erreur lors de l'ajout du point de dépôt",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        data: null,
        message: "Erreur lors de l'ajout du gerant du point de dépôt",
      },
      { status: 500 },
    );
  }
}
