"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCircleCheck,
  faFileCircleXmark,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

const options = [
  { value: "acte de naissance", label: "Acte de naissance" },
  { value: "cni", label: "CNI" },
  { value: "recepisé", label: "Recepisé" },
  { value: "permis de conduire a", label: "Permis A" },
  { value: "permis de conduire B", label: "Permis B" },
  { value: "autres", label: "Autres" },
];

interface Donnees {
  numeros: string;
}

interface Donnees2 {
  categorie: string;
  nom: string;
  prenom: string;
  pnom_p?: string;
  mnom_p?: string;
  date_p: string;
  lieu_p: string;
}

interface DocumentData {
  photo: string;
  nom: string;
  prenom: string;
  nom_pere?: string;
  nom_mere?: string;
  nee_le: string;
  lieu: string;
}

const FormElements = () => {
  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    reset: resetForm1,
    formState: { errors: errorsForm1 },
  } = useForm<Donnees>();

  const {
    register: registerForm2,
    handleSubmit: handleSubmitForm2,
    reset: resetForm2,
    formState: { errors: errorsForm2 },
  } = useForm<Donnees2>();

  const [loading, setLoading] = useState(false);
  const [categorie, setCategorie] = useState([]);
  const [data, setData] = useState<DocumentData[] | null>(null);
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [point, setPoint] = useState<string | null>(null);
  const [categ, setCateg] = useState<string | null>(null);
  const [documentFound, setDocumentFound] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/categ");
        const data = await response.json();
        if (data.success) {
          setCategorie(data.data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Oups quelque chose c'est mal passée ....");
      }
    }
    fetchData();
  }, []);

  async function onSubmit(data: Donnees) {
    try {
      setLoading(true);
      const response = await fetch("/api/recherche", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData); // Ajoutez cette ligne pour vérifier la structure des données
      setData(responseData.data);
      setDocument(responseData.data2);
      setPoint(responseData.point);
      setCateg(responseData.categ);

      if (responseData.data && responseData.data.length > 0) {
        setDocumentFound(true);
      } else {
        setDocumentFound(false);
      }

      if (response.ok) {
        setLoading(false);
        toast.success("Requête envoyée succès");
        resetForm1();
      } else {
        setLoading(false);
        toast.error(
          responseData.message || "Oups, quelque chose s'est mal passé",
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error("Oups, quelque chose s'est mal passé, essayez encore");
    }
  }

  async function onSubmit2(data: Donnees2) {
    try {
      setLoading(true);
      const response = await fetch("/api/recherche", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setData(responseData.data);
      setDocument(responseData.data2);

      if (responseData.data && responseData.data.length > 0) {
        setDocumentFound(true);
      } else {
        setDocumentFound(false);
      }

      if (response.ok) {
        setLoading(false);
        toast.success("Requête envoyée succès");
        resetForm2();
      } else {
        setLoading(false);
        toast.error(
          responseData.message || "Oups, quelque chose s'est mal passé",
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error("Oups, quelque chose s'est mal passé, essayez encore");
    }
  }

  return (
    <DefaultLayout>
      <div className="max-w-270">
        <Breadcrumb pageName="Recherche" />
        {documentFound !== null &&
          (data ? (
            <div className="rounded-sm border border-stroke bg-white text-black shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex items-center justify-center pt-5.5 ">
                <h1 className="flex items-center text-lg text-green-500">
                  Votre document a été retrouvé
                  <FontAwesomeIcon
                    icon={faFileCircleCheck}
                    className="text-gray-500 bottom-6/3 h-[30px] w-[30px] pl-5 peer-focus:text-green-900"
                  />
                </h1>
              </div>
              <div className="flex flex-col p-6.5 lg:flex-row">
                <div className="w-full flex-none p-6.5 lg:w-1/3">
                  <Image
                    width={320}
                    height={320}
                    src={data[0]?.photo || ""}
                    alt="Logo"
                  />
                </div>
                <div className="flex-grow p-6.5">
                  <div className="flex flex-col gap-4">
                    <div className="mb-0.5 flex flex-col gap-4 xl:flex-row">
                      <div className="relative w-full xl:w-5/6">
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                          Categorie <span className="text-meta-1">*</span>
                        </label>
                        <input
                          value={categ ?? ""}
                          type="text"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                      <div className="relative w-full xl:w-5/6">
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                          Nom <span className="text-meta-1">*</span>
                        </label>
                        <input
                          value={document?.nom ?? ""}
                          type="text"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                      <div className="relative w-full xl:w-5/6">
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                          Prénom <span className="text-meta-1">*</span>
                        </label>
                        <input
                          value={document?.prenom ?? ""}
                          type="text"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="mb-0.5 flex flex-col gap-4 xl:flex-row">
                      <div className="relative w-full xl:w-5/6">
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                          Nom du père <span className="text-meta-1">*</span>
                        </label>
                        <input
                          value={document?.nom_pere ?? ""}
                          type="text"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                      <div className="relative w-full xl:w-5/6">
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                          Nom de la mère <span className="text-meta-1">*</span>
                        </label>
                        <input
                          value={document?.nom_mere ?? ""}
                          type="text"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                      <div className="relative w-full xl:w-5/6">
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                          Né le <span className="text-meta-1">*</span>
                        </label>
                        <input
                          value={document?.nee_le ?? ""}
                          type="text"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                      <div className="relative w-full xl:w-5/6">
                        <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                          Lieu de naissance{" "}
                          <span className="text-meta-1">*</span>
                        </label>
                        <input
                          value={document?.lieu ?? ""}
                          type="text"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Point de récupération{" "}
                        <span className="text-meta-1">*</span>
                      </label>
                      <input
                        value={point ?? ""}
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-sm border border-stroke bg-white text-black shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex items-center justify-center pt-5.5 ">
                <h1 className="text-red-500 flex items-center text-lg">
                  Désolé, ce document est introuvable
                  <FontAwesomeIcon
                    icon={faFileCircleXmark}
                    className="text-gray-500 bottom-6/3 h-[30px] w-[30px] pl-5 peer-focus:text-green-900"
                  />
                </h1>
              </div>
            </div>
          ))}
      </div>
    </DefaultLayout>
  );
};

export default FormElements;
