// src/app/api/verify-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { telephone, otp } = await req.json();

    // Rechercher l'utilisateur par numéro de téléphone
    const user = await db.utilisateur.findUnique({
      where: { telephone },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }

      );
    }

    // Vérifiez le code OTP
    if (user.otp !== otp) {
      console.log("code invalide")
      return NextResponse.json(
        { valid: false, message: "Code OTP invalide" },
        { status: 400 }
        
      );
    }

    // Mettre à jour le champ isVerifiedNum à true
    await db.utilisateur.update({
      where: { telephone },
      data: { isVerifiedNum: true },
    });

    return NextResponse.json({ valid: true, message: "Numéro vérifié avec succès" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message, message: "Erreur de serveur" },
      { status: 500 }
    );
  }
}
