// src/lib/otp-utils.ts
import https from "follow-redirects/https";

export function generateOtp(length: number = 6): string {
  let otp = "";
  const characters = "0123456789";
  for (let i = 0; i < length; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return otp;
}

export async function sendOtp(phoneNumber: string, message: string) {
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
    // Create the request
    const infobipReq = https.request(options, function (infobipRes) {
      let chunks: any[] = [];

      infobipRes.on("data", function (chunk) {
        chunks.push(chunk);
      });

      infobipRes.on("end", function () {
        const body = Buffer.concat(chunks).toString();
        console.log(body);
        resolve(body);
      });

      infobipRes.on("error", function (error) {
        console.error(error);
        reject(new Error(error.message));
      });
    });

    // Define the SMS message details
    const postData = JSON.stringify({
      messages: [
        {
          destinations: [{ to: phoneNumber }],
          from: "ServiceSMS",
          text: message,
        },
      ],
    });

    // Write the data and end the request
    infobipReq.write(postData);
    infobipReq.end();
  });
}
