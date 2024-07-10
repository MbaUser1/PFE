import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, TypeDeclaration } from "@prisma/client";
import db from "@/lib/db";
const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        message: "ID or type are required and must be a string",
      },
      { status: 400 },
    );
  }
  try {
    const piece = await prisma.piece.findMany({
      where: { id: id },
    });

    return NextResponse.json(
      {
        success: true,
        data: piece,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur lors de la récupération de la piece:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération de la piece essayez encore",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const {
      id,
      num_piece,
      nom,
      prenom,
      nom_pere,
      nom_mere,
      nee_le,
      lieu,
      categorie,
    } = await request.json();

    const updatedPiece = await prisma.piece.update({
      where: { id: String(id) },
      data: {
        num_piece,
        nom,
        prenom,
        nom_pere,
        nom_mere,
        nee_le,
        lieu,
        categorie: { connect: { id: categorie } },
      },
    });

    // const newDeclaration = await prisma.Declaration.findMany({
    //   where: { PieceID: num_piece },
    // });

    // const updatedDeclaration = await prisma.Declaration.update({
    //   where: { id: newDeclaration.id },
    //   data: {
    //     categorie,
    //   },
    // });

    return NextResponse.json(
      {
        success: true,
        data: updatedPiece,
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
