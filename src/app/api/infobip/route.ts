// src/app/api/infobip/route.ts

import { NextRequest, NextResponse } from "next/server";
import https from "follow-redirects/https";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { otp, phoneNumber } = await req.json();
  // Set the request options for Infobip API
  const options = {
    method: "POST",
    hostname: "y3qg99.api.infobip.com",
    path: "/sms/2/text/advanced",
    headers: {
      Authorization:
        "App f406661ebf57b0dc85d0aca8a8b548da-e2bcfae2-d8c7-4c16-ac30-425c3b8d1ecf",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    maxRedirects: 20,
  };

  return new Promise((resolve, reject) => {
    const infobipReq = https.request(options, (infobipRes) => {
      let chunks: any[] = [];

      infobipRes.on("data", (chunk) => {
        chunks.push(chunk);
      });

      infobipRes.on("end", () => {
        const body = Buffer.concat(chunks).toString();
        console.log(body);
        resolve(NextResponse.json({ response: body }));
      });

      infobipRes.on("error", (error) => {
        console.error(error);
        resolve(NextResponse.json({ error: error.message }, { status: 500 }));
      });
    });

    const postData = JSON.stringify({
      messages: [
        {
          destinations: [{ to: phoneNumber }],
          from: "ServiceSMS",
          text: `Votre code otp est: ${otp} .`,
        },
      ],
    });

    infobipReq.write(postData);
    infobipReq.end();
  });
}
