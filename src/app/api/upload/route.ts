import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import db from "@/lib/db";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  const userID = searchParams.get("userid");
  const categ = searchParams.get("categ");
  const date = searchParams.get("date");
  const arrond = searchParams.get("arrond");
  const npiece = searchParams.get("npiece");
  const cni = searchParams.get("cni");
  const lieu = searchParams.get("lieu");
  const nom = searchParams.get("nom");
  const prenom = searchParams.get("prenom");
  const nomP = searchParams.get("nomP");
  const nomM = searchParams.get("nomM");
  const dateP = searchParams.get("dateP");
  const lieuP = searchParams.get("lieuP");

  if (
    userID &&
    filename &&
    npiece &&
    nom &&
    dateP &&
    lieuP &&
    categ &&
    prenom &&
    prenom &&
    arrond &&
    date
  ) {
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

        // Création de la pièce avec Prisma
        const newPiece = await db.piece.create({
          data: {
            num_piece: npiece,
            nom: nom,
            prenom: prenom,
            nom_pere: nomP,
            nom_mere: nomM,
            nee_le: dateP,
            lieu: lieuP,
            status: statut,
            CategorieID: categ,
          },
        });

        // Création de la déclaration (à décommenter si nécessaire)

        const type = "trouve";
        const newDeclaration = await prisma.declaration.create({
          data: {
            type: type,
            categorie: categ,
            date: new Date(date),
            arrondissement: arrond,
            lieu_de_depot: lieu,
            num_piece: npiece,
            photo: blob.url,
            cni: cni,
            user: { connect: { id: userID } },
            Piece: { connect: { id: newPiece.id } },
          },
        });

        return NextResponse.json(
          {
            data: newPiece,
            message: "Déclaration ajoutée avec succès",
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
