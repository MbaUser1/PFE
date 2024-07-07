import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, TypeDeclaration } from "@prisma/client";
import db from "@/lib/db";
const prisma = new PrismaClient();

//ajout d'une declaration et de le piece correspondante
export async function POST(request: Request) {
  try {
    const {
      type,
      categorie,
      date,
      arrondissement,
      lieu_de_depot,
      circonstance,
      num_piece,
      cni,
      userID,
      nom,
      prenom_p,
      pnom_p,
      mnom_p,
      date_p,
      lieu_p,
    } = await request.json();
    const status = "p";
    const newPiece = await db.piece.create({
      data: {
        num_piece,
        nom,
        prenom: prenom_p,
        nom_pere: pnom_p,
        nom_mere: mnom_p,
        nee_le: date_p,
        lieu: lieu_p,
        status,
        CategorieID: categorie,
      },
    });

    try {
      // Assurez-vous de gérer les IDs utilisateur correctement
      const newDeclaration = await prisma.declaration.create({
        data: {
          type: type as TypeDeclaration,
          categorie,
          date: new Date(date),
          arrondissement,
          circonstance,
          lieu_de_depot,
          num_piece,
          cni,
          //userID,
          user: { connect: { id: userID } },
          //PieceID: newPiece.id,
          Piece: { connect: { id: newPiece.id } },
        },
      });

      return NextResponse.json(
        {
          data: newDeclaration,
          message: "Déclaration ajoutée avec succès",
        },
        { status: 201 },
      );
    } catch (error) {
      console.error("Erreur lors de l'ajout de déclaration:", error);
      return NextResponse.json(
        {
          data: null,
          message: "Erreur lors de l'ajout de déclaration essayer encore",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Erreur lors de la création de la pièce:", error);
    return NextResponse.json(
      {
        data: null,
        message: "Erreur lors de la création de la pièce essayer encore",
      },
      { status: 500 },
    );
  }
}

//Récuperation des declarations en fonction de l'utilisateur et du type
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const Uid = searchParams.get("Uid");
  const type = searchParams.get("type");
  if (!Uid || !type) {
    return NextResponse.json(
      {
        message: "UID or type are required and must be a string",
      },
      { status: 400 },
    );
  }
  try {
    const declarations = await prisma.declaration.findMany({
      where: { type: type as TypeDeclaration, userID: Uid },
    });

    return NextResponse.json(
      {
        success: true,
        data: declarations,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des déclarations:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Erreur lors de la récupération des déclarations essayez encore",
      },
      { status: 500 },
    );
  }
}

// modification d'une declaration
export async function PUT(request: NextRequest) {
  try {
    const {
      id,
      categorie,
      date,
      arrondissement,
      lieu_de_depot,
      photo,
      num_piece,
      cni,
      userID,
    } = await request.json();

    const updatedDeclaration = await prisma.declaration.update({
      where: { id: String(id) },
      data: {
        categorie,
        date: new Date(date),
        arrondissement,
        lieu_de_depot,
        photo,
        num_piece,
        cni,
        userID,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: updatedDeclaration,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la déclaration:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la mise à jour de la déclaration",
      },
      { status: 500 },
    );
  }
}

// suppression prealable de la piece avant la suppression de la déclaration

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const idP = searchParams.get("idP");

  if (!id || !idP) {
    return NextResponse.json(
      {
        success: false,
        message: "ID is required",
      },
      { status: 400 },
    );
  }
  try {
    await prisma.declaration.delete({
      where: { id: id },
    });

    try {
      await prisma.piece.delete({
        where: { id: idP },
      });
      return NextResponse.json(
        {
          success: true,
        },
        { status: 200 },
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de la piece:", error);
      return NextResponse.json(
        {
          success: false,
          message:
            "Erreur lors de la suppression de la piece 22222222222222222",
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la déclaration:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Erreur lors de la suppression de la déclaration22222222222222222",
      },
      { status: 500 },
    );
  }
}
