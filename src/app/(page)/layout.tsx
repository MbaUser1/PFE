"use client";

import Footer from "@/components/Footer";
import Header1 from "@/components/Header1";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
// import "node_modules/react-modal-video/css/modal-video.css";
import "../../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className} h-full `}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header1 />
            <main className="w-full">{children}</main>
            <Footer />
            <ScrollToTop />
          </div>
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
