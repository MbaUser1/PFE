import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import db from "@/lib/db";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  const userID = searchParams.get("idU");

  if (userID && filename) {
    try {
      // Mettre le fichier dans le stockage (blob)
      if (!request.body) {
        throw new Error("Le corps de la requête est nul.");
      }
      const blob = await put(filename, request.body, {
        access: "public",
      });

      if (blob) {
        // Statut pour la pièce
        const statut = "t";

        // Modification de la photos de l'utilisateur (à décommenter si nécessaire)

        const type = "trouve";
        const updateUser = await prisma.utilisateur.update({
          where: { id: userID },
          data: {
            image: blob.url,
          },
        });

        return NextResponse.json(
          {
            data: updateUser,
            message: "Photos modifiée avec succès",
          },
          { status: 201 },
        );
      } else {
        console.error("Erreur lors de l'upload du fichier");
        return NextResponse.json(
          {
            data: null,
            message: "Erreur lors de l'upload du fichier",
          },
          { status: 500 },
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la pièce:", error);
      return NextResponse.json(
        {
          data: null,
          message: "Erreur lors de l'ajout de la pièce, veuillez réessayer",
        },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json(
      {
        data: null,
        message: "Veuillez remplir tous les champs obligatoires",
      },
      { status: 400 },
    );
  }
}
