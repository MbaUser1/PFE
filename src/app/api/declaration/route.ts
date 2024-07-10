// pages/api/declarations/[id].ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        message: "ID is required and must be a string",
      },
      { status: 400 },
    );
  }

  try {
    const declaration = await prisma.declaration.findUnique({
      where: { id },
      include: { user: true }, // Inclure les détails de l'utilisateur si nécessaire
    });

    if (!declaration) {
      return NextResponse.json(
        {
          message: "Declaration not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        data: declaration,
        message: "Declaration fetched successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        message: "ID is required and must be a string",
      },
      { status: 400 },
    );
  }

  try {
    const declaration = await prisma.declaration.delete({
      where: { id: String(id) },
    });

    return NextResponse.json(
      {
        message: "Declaration delete successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
