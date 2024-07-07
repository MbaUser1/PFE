"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Search from "@/components/Datatable/search";

import Table from "@/components/Datatable/table";
import { Create } from "@/components/Datatable/buttons";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// const fields = [
//   { key: "#", label: "#" },
//   { key: "categorie", label: "Categories" },
//   { key: "arrondissement", label: "Arrondissement" },
//   { key: "date", label: "Date", isDate: true },
//   { key: "telephone", label: "Téléphone" },
//   { key: "longitude", label: "Longitude" },
//   { key: "lagitude", label: "Latitude" },
// ];
const fields = [
  { key: "#", label: "#" },
  { key: "photo", label: "photo", isImage: true },
  { key: "categorie", label: "Categories" },
  { key: "arrondissement", label: "Arrondissement" },
  { key: "date", label: "Date", isDate: true },
];

export default function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/declarations?Uid=${session?.user?.id}&type=trouve`,
        );
        const data = await response.json();
        if (data.success) {
          setInvoices(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, currentPage, session?.user?.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Breadcrumb pageName="Documents Trouvées" />
      <div className="w-full">
        <div className="flex w-full items-center justify-between"></div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Rechercher un document..." />
          <Create label="Ajouter" href="/signaler/trouvee" />
        </div>

        <Table items={invoices} fields={fields} />

        <div className="mt-5 flex w-full justify-center">
          {/* <Pagination totalPages={totalPages} /> */}
        </div>
      </div>
    </>
  );
}
