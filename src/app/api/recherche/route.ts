// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient, TypeDeclaration } from "@prisma/client";
// import db from "@/lib/db";
// const prisma = new PrismaClient();
//
// export async function PUT(request: Request) {
//   const { categorie, nom, prenom, pnom_p, mnom_p, date_p, lieu_p } =
//     await request.json();
//   // recherche du document dans la bd
//   try {
//     const document = await prisma.piece.findMany({
//       where: {
//         nom: nom,
//         prenom: prenom,
//         CategorieID: categorie,
//         nee_le: date_p,
//         lieu: lieu_p,
//         status: "t",
//       },
//     });
//     if (document.length > 0) {
//       // recherche de le declaration correspondante
//       try {
//         const declaration = await prisma.declaration.findMany({
//           where: {
//             PieceID: document[0].id,
//             type: "trouve",
//             deposer: "o",
//           },
//         });
//         if (declaration[0].lieu_de_depot) {
//           const point = await prisma.lieu_depot.findUnique({
//             where: { id: declaration[0].lieu_de_depot },
//           });
//           const categ = await prisma.categorie.findUnique({
//             where: { id: document[0].CategorieID },
//           });
//           if (declaration.length > 0) {
//             return NextResponse.json(
//               {
//                 success: true,
//                 data: declaration,
//                 data2: document,
//                 point: point,
//                 categ: categ,
//               },
//               { status: 200 },
//             );
//           }
//         } else {
//           return NextResponse.json(
//             {
//               success: false,
//               message: "Aucun document trouvé",
//             },
//             { status: 402 },
//           );
//         }
//       } catch (error) {
//         console.error(
//           "Erreur lors de la recuperation de la declaration:",
//           error,
//         );
//         return NextResponse.json(
//           {
//             success: false,
//             message: "Erreur lors de la recuperation de la declaration",
//           },
//           { status: 500 },
//         );
//       }
//     } else {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Aucun document trouvé",
//         },
//         { status: 402 },
//       );
//     }
//   } catch (error) {
//     console.error("Erreur lors de la recherche du document:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Erreur lors de la recherche du document",
//       },
//       { status: 500 },
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, TypeDeclaration } from "@prisma/client";
import db from "@/lib/db";
const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { numeros } = await request.json();
  // recherche du document dans la bd
  try {
    const document = await prisma.piece.findMany({
      where: { num_piece: numeros, status: "t" },
    });
    // recherche de le declaration correspondante
    if (document.length > 0) {
      try {
        //const reglex = new RegExp(name, 'i');
        const declaration = await prisma.declaration.findMany({
          where: {
            PieceID: document[0].id,
            type: "trouve",
            deposer: "o",
            categorie: document[0].CategorieID,
          },
        });
        if (declaration.length > 0 && declaration[0].lieu_de_depot) {
          const point = await prisma.lieu_depot.findUnique({
            where: { id: declaration[0].lieu_de_depot },
          });

          const categ = await prisma.categorie.findUnique({
            where: { id: document[0].CategorieID },
          });

          return NextResponse.json(
            {
              success: true,
              data: declaration,
              data2: document,
              point: point,
              categ: categ,
            },
            { status: 200 },
          );
        } else {
          return NextResponse.json(
            {
              success: false,
              message: "Aucun document trouvé",
            },
            { status: 402 },
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la recuperation de la declaration:",
          error,
        );
        return NextResponse.json(
          {
            success: false,
            message: "Erreur lors de la recuperation de la declaration",
          },
          { status: 500 },
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Aucun document trouvé",
        },
        { status: 402 },
      );
    }
  } catch (error) {
    console.error("Erreur lors de la recherche du document:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la recherche du document",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  const { categorie, nom, prenom, pnom_p, mnom_p, date_p, lieu_p } =
    await request.json();

  // recherche du document dans la bd
  try {
    const document = await prisma.piece.findMany({
      where: {
        nom: {
          contains: nom,
          mode: "insensitive", // Recherche insensible à la casse
        },
        prenom: {
          contains: prenom,
          mode: "insensitive", // Recherche insensible à la casse
        },
        CategorieID: categorie,
        nee_le: date_p,
        lieu: {
          contains: lieu_p,
          mode: "insensitive", // Recherche insensible à la casse
        },
        status: "t",
      },
    });

    if (document.length > 0) {
      // recherche de la declaration correspondante
      try {
        const declaration = await prisma.declaration.findMany({
          where: {
            PieceID: document[0].id,
            type: "trouve",
            deposer: "o",
          },
        });

        if (declaration[0].lieu_de_depot) {
          const point = await prisma.lieu_depot.findUnique({
            where: { id: declaration[0].lieu_de_depot },
          });
          const categ = await prisma.categorie.findUnique({
            where: { id: document[0].CategorieID },
          });

          if (declaration.length > 0) {
            return NextResponse.json(
              {
                success: true,
                data: declaration,
                data2: document,
                point: point,
                categ: categ,
              },
              { status: 200 },
            );
          }
        } else {
          return NextResponse.json(
            {
              success: false,
              message: "Aucun document trouvé",
            },
            { status: 402 },
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la recuperation de la declaration:",
          error,
        );
        return NextResponse.json(
          {
            success: false,
            message: "Erreur lors de la recuperation de la declaration",
          },
          { status: 500 },
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Aucun document trouvé",
        },
        { status: 402 },
      );
    }
  } catch (error) {
    console.error("Erreur lors de la recherche du document:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la recherche du document",
      },
      { status: 500 },
    );
  }
}
