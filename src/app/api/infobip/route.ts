// src/app/api/infobip/route.ts

import { NextRequest, NextResponse } from "next/server";
import https from "follow-redirects/https";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { otp, phoneNumber } = await req.json();
  const phoneNumber1 = `237${phoneNumber}`;
  // Set the request options for Infobip API
  const options = {
    method: "POST",
    hostname: "dkv3qv.api.infobip.com",
    path: "/sms/2/text/advanced",
    headers: {
      Authorization:
        "App 235705488a7a9a2fd30170289b9bb4c2-89f5d269-5900-4e18-b52d-f6458ce275b0",
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
          destinations: [{ to: phoneNumber1 }],
          from: "ServiceSMS",
          text: `Votre code otp est: ${otp} .`,
        },
      ],
    });

    infobipReq.write(postData);
    infobipReq.end();
  });
}
