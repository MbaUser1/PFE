import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let otp = "";
  const length = 4; // Longueur de l'OTP
  const characters = "0123456789";
  for (let i = 0; i < length; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return NextResponse.json(
    {
      success: true,
      data: otp,
    },
    { status: 200 },
  );
}
