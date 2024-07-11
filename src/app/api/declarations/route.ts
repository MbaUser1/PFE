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
          categorie1: { connect: { id: categorie } },
          date,
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
      include: {
        categorie1: true, // Inclure les informations de la catégorie
      },
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
      idP,
      idD,
      nom,
      prenom_p,
      pnom_p,
      mnom_p,
      nee_le,
      lieu_p,
      categorie,
      num_piece,
      arrondissement,
      date,
      circonstance,
      photo,
      cni,
      lieu_de_depot,
    } = await request.json();

    const updateDataD: any = {};
    if (categorie) {
      updateDataD.categorie1 = {
        connect: { id: categorie },
      };
      if (date) updateDataD.date = date;
      if (arrondissement) updateDataD.arrondissement = arrondissement;
      if (lieu_de_depot) updateDataD.lieu_de_depot = lieu_de_depot;
      if (circonstance) updateDataD.circonstance = circonstance;
      if (photo) updateDataD.photo = photo;
      if (num_piece) updateDataD.num_piece = num_piece;
      if (cni) updateDataD.cni = cni;

      const updatedDeclaration = await prisma.declaration.update({
        where: { id: String(idD) },
        data: updateDataD,
      });

      const updateDataP: any = {};
      updateDataP.categorie = {
        connect: { id: categorie },
      };

      if (nom) updateDataP.nom = nom;
      if (prenom_p) updateDataP.prenom = prenom_p;
      if (num_piece) updateDataP.num_piece = num_piece;
      if (pnom_p) updateDataP.nom_pere = pnom_p;
      if (mnom_p) updateDataP.nom_mere = mnom_p;
      if (nee_le) updateDataP.nee_le = nee_le;
      if (lieu_p) updateDataP.lieu = lieu_p;

      const updatedPiece = await prisma.piece.update({
        where: { id: idP },
        data: updateDataP,
      });

      return NextResponse.json(
        {
          success: true,
          data: updatedDeclaration,
        },
        { status: 200 },
      );
    }
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

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        message: "ID is required",
      },
      { status: 400 },
    );
  }
  try {
    const declarations = await prisma.declaration.findUnique({
      where: { id: id },
    });
    await prisma.declaration.delete({
      where: { id: id },
    });

    try {
      await prisma.piece.delete({
        where: { id: declarations?.PieceID },
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
