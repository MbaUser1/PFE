import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const pointsDeDepot = await db.categorie.findMany();
    return NextResponse.json({
      success: true,
      data: pointsDeDepot,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categorie",
        error: "Oups quelque chose c'est mal passée",
      },
      { status: 500 },
    );
  }
}
