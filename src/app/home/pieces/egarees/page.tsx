"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Search from "@/components/Datatable/search";
// import Table from "@/components/Datatable/table1";
import Table from "@/components/Datatable/table";
import { Create } from "@/components/Datatable/buttons";
import { InvoicesTableSkeleton } from "@/components/Datatable/skeletons";
import { useSession } from "next-auth/react";
import { Suspense } from "react";
import toast from "react-hot-toast";

const fields = [
  { key: "#", label: "#" },
  { key: "categorie", label: "Categories" },
  { key: "arrondissement", label: "Lieux" },
  { key: "date", label: "Date", isDate: true },
  { key: "circonstance", label: "Circonstance" },
  { key: "deposer", label: "Recherche", isStatus: true },
];

export default function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/declarations?Uid=${session?.user?.id}&type=egare`,
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

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Breadcrumb pageName="Documents Egarées" />
      <div className="w-full">
        <div className="flex w-full items-center justify-between"></div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Rechercher un point..." />
          <Create label="Ajouter" href="/home/signaler/egaree" />
        </div>
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          <Table items={invoices} fields={fields} />
          {/* <Table query={query} currentPage={currentPage} /> */}
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          {/* <Pagination totalPages={totalPages} /> */}
        </div>
      </div>
    </>
  );
}
