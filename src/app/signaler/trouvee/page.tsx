"use client";
import React, { useState, useRef, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AvatarUploadPage() {
  interface Categorie {
    id: string;
    nom: string;
  }
  const inputCategorieRef = useRef<HTMLSelectElement>(null);
  const [categorie, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/categ");
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        } else {
          toast.error("Oups, quelque chose s'est mal passé");
        }
      } catch (error) {
        toast.error("Oups, quelque chose s'est mal passé");
      }
    }
    fetchData();
  }, []);

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);

    console.log(inputCategorieRef);
  };

  return (
    <DefaultLayout>
      <div className="mt-auto">
        <Breadcrumb pageName="Signaler (Trouvé)" />
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                <Link href="egaree">
                  <button className="btn mr-2 rounded bg-danger px-6 py-2 text-white">
                    Egaré
                  </button>
                </Link>
                <Link href="trouvee">
                  <button className="btn rounded bg-success px-5 py-2 text-white">
                    Trouvé
                  </button>
                </Link>
              </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Catégorie <span className="text-meta-1">*</span>
                    </label>

                    <select
                      ref={inputCategorieRef}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      {categorie.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full xl:w-1/2"></div>
                {loading ? (
                  <div className="mb-5">
                    <input
                      type="submit"
                      value="...Patientez un instant"
                      className="mt-8 w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                      disabled
                    />
                  </div>
                ) : (
                  <input
                    className="mt-8 flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
                    type="submit"
                    value="Enregistrer"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
