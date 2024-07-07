"use client";
import React, { useState, useEffect, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Toaster } from "react-hot-toast";
import Loader from "@/components/common/Loader";
import "@/css/style.css";
import { SessionProvider } from "next-auth/react";

interface LayoutProps {
  children: ReactNode;
  //pageName?: string; Optional page name for Breadcrumbs
}

export default function Layout({ children }: LayoutProps) {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <SessionProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? (
              <Loader />
            ) : (
              <DefaultLayout>
                <Toaster />
                <div className="flex flex-col gap-10">
                  {/* {pageName && <Breadcrumb pageName={pageName} />} */}
                  {children}
                </div>
              </DefaultLayout>
            )}
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
