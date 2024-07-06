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
  const [data, setData] = useState<string | null>(null);
  const [document, setDocument] = useState<string | null>(null);
  const [point, setPoint] = useState<string | null>(null);
  const [categ, setCateg] = useState<string | null>(null);

  const [documentFound, setDocumentFound] = useState<boolean | null>(null);

  // Récupération des catégories
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch("/api/categ");
  //       const data = await response.json();
  //       if (data.success) {
  //         setCategorie(data.data);
  //       } else {
  //         toast.error(data.message);
  //       }
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   }

  //   fetchData();
  // }, [data]);

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
      setData(responseData.data);
      //recuperation des informations du document
      setDocument(responseData.data2);
      //recuperation des informations du lieu de depot
      setPoint(responseData.point);
      //recuperation des informations sur le categorie
      setCateg(responseData.categ);
      if (responseData.length > 0) {
        setDocumentFound(true);
      } else {
        setDocumentFound(false); // Aucun document trouvé
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
  // async function onClose() {
  //   setDocumentFound(false);
  // }

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
      //recuperation des informations du document
      setDocument(responseData.data2);
      if (responseData.length > 0) {
        setDocumentFound(true);
      } else {
        setDocumentFound(false); // Aucun document trouvé
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
    <>
      <DefaultLayout>
        <div className=" max-w-270">
          <Breadcrumb pageName="Recherche" />
          {documentFound !== null ? (
            data ? (
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
                  <div className=" w-full flex-none p-6.5 lg:w-1/3">
                    {/* <Image
                      width={320}
                      height={320}
                      // src={data[0].photo}
                      alt="Logo"
                    /> */}
                  </div>

                  <div className="flex-grow p-6.5">
                    <div className="flex flex-col gap-4">
                      <div className="mb-0.5 flex flex-col gap-4 xl:flex-row">
                        <div className="relative w-full xl:w-5/6">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            Categorie <span className="text-meta-1">*</span>
                          </label>
                          <input
                            // value={categ.nom ?? ""}
                            type="text"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="relative w-full xl:w-5/6">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            Nom <span className="text-meta-1">*</span>
                          </label>
                          <input
                            // value={document[0].nom ?? ""}
                            type="text"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="relative w-full xl:w-5/6">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            Prénom <span className="text-meta-1">*</span>
                          </label>
                          <input
                            // value={document[0].prenom ?? ""}
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
                            // value={document[0].nom_pere ?? ""}
                            type="text"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="relative w-full xl:w-5/6">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            Nom de la mère{" "}
                            <span className="text-meta-1">*</span>
                          </label>
                          <input
                            // value={document[0].nom_mere ?? ""}
                            type="text"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="relative w-full xl:w-5/6">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            Date de naissance{" "}
                            <span className="text-meta-1">*</span>
                          </label>
                          <input
                            // value={document[0].nee_le ?? ""}
                            type="text"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                      <div className="mb-0.5 flex flex-col gap-4 xl:flex-row">
                        <div className="relative w-full xl:w-5/6">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            Lieu de naissance{" "}
                            <span className="text-meta-1">*</span>
                          </label>
                          <input
                            // value={document[0].lieu ?? ""}
                            type="text"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="relative w-full xl:w-5/6">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            Point où il se trouve
                            <span className="text-meta-1">*</span>
                          </label>
                          <input
                            // value={point.nom ?? ""}
                            type="text"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="relative w-full xl:w-5/6">
                          <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                            Télephone du Point{" "}
                            <span className="text-meta-1">*</span>
                          </label>
                          <input
                            // value={point.telephone ?? ""}
                            type="text"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-7.5">
                {/* <!-- Alerts Item --> */}
                <div className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%]  shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
                  <button>
                    <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                          fill="#ffffff"
                          stroke="#ffffff"
                        ></path>
                      </svg>
                    </div>
                  </button>
                  <div className="w-full">
                    <div className="flex items-center justify-center px-5.5  ">
                      <h1 className="flex items-center text-lg text-danger">
                        Votre document ne se trouve pas dans notre base de
                        données
                        <FontAwesomeIcon
                          icon={faFileCircleXmark}
                          className="text-gray-500 bottom-6/3 h-[30px] w-[30px] pl-5 peer-focus:text-danger"
                        />
                      </h1>
                    </div>{" "}
                    <div className="flex justify-center">
                      <Link href={"/signaler/egaree"}>
                        <input
                          type="submit"
                          value="Faites une declaration"
                          className="mt-8 w-full cursor-pointer rounded-lg border bg-danger p-3 text-white transition hover:bg-opacity-90"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div></div>
          )}

          <div className="mt-8 flex flex-col gap-9">
            {/* Formulaire 1 */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <form onSubmit={handleSubmitForm1(onSubmit)}>
                <div className="flex flex-col p-6.5">
                  <div className="mb-0.5 flex flex-col gap-4 xl:flex-row">
                    <div className="relative w-full xl:w-5/6">
                      <input
                        {...registerForm1("numeros", {
                          required: "Ce champ est obligatoire",
                        })}
                        type="text"
                        placeholder="Entrez le N° du document"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-12 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="text-gray-500 peer-focus:text-gray-900 bottom-6/3 absolute left-4 h-[18px] w-[18px] pt-4"
                      />
                      {errorsForm1.numeros && (
                        <small className="text-sm text-rose-600">
                          {errorsForm1.numeros.message}
                        </small>
                      )}
                    </div>
                    <div className="w-full xl:w-1/6">
                      {loading ? (
                        <div className="mb-5">
                          <input
                            type="submit"
                            value="...Patientez un instant"
                            className="flex w-full justify-center rounded bg-orange-500 p-3 font-medium text-gray hover:bg-opacity-90"
                          />
                        </div>
                      ) : (
                        <input
                          className="flex w-full justify-center rounded bg-orange-500 p-3 font-medium text-gray hover:bg-opacity-90"
                          type="submit"
                          value="Rechercher"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Formulaire 2 */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Ou</h3>
              </div>
              <form onSubmit={handleSubmitForm2(onSubmit2)}>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Categorie <span className="text-meta-1">*</span>
                      </label>
                      <select
                        {...registerForm2("categorie", {
                          required: "Ce champ est obligatoire",
                        })}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        {/* {categorie.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.nom}
                          </option>
                        ))} */}
                      </select>
                      {errorsForm2.categorie && (
                        <small className="text-sm text-rose-600">
                          {errorsForm2.categorie.message}
                        </small>
                      )}
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Numéro de pièce
                      </label>
                      <input
                        //{...registerForm2("num_piece", {})}
                        type="text"
                        placeholder="Entrez le numéro du document"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {/* {errorsForm2.num_piece && (
                        <small className="text-sm text-rose-600">
                          {errorsForm2.num_piece.message}
                        </small>
                      )} */}
                    </div>
                  </div>
                  <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Nom <span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...registerForm2("nom", {
                          required: "Ce champ est obligatoire",
                        })}
                        type="text"
                        placeholder=""
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errorsForm2.nom && (
                        <small className="text-sm text-rose-600 ">
                          {errorsForm2.nom.message}
                        </small>
                      )}
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Prenom <span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...registerForm2("prenom", {
                          required: "Ce champ est obligatoire",
                        })}
                        type="text"
                        placeholder=""
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errorsForm2.prenom && (
                        <small className="text-sm text-rose-600 ">
                          {errorsForm2.prenom.message}
                        </small>
                      )}
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Nom du pere (facultatif)
                      </label>
                      <input
                        {...registerForm2("pnom_p", {})}
                        type="text"
                        placeholder=""
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Nom de la mere (facultatif)
                      </label>
                      <input
                        {...registerForm2("mnom_p", {})}
                        type="text"
                        placeholder=""
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Date de naissance <span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...registerForm2("date_p", {
                          required: "Ce champ est obligatoire",
                        })}
                        type="date"
                        placeholder=""
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errorsForm2.date_p && (
                        <small className="text-sm text-rose-600 ">
                          {errorsForm2.date_p.message}
                        </small>
                      )}
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                        Lieu de naissance <span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...registerForm2("lieu_p", {
                          required: "Ce champ est obligatoire",
                        })}
                        type="text"
                        placeholder=""
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errorsForm2.lieu_p && (
                        <small className="text-sm text-rose-600 ">
                          {errorsForm2.lieu_p.message}
                        </small>
                      )}
                    </div>
                  </div>
                  {loading ? (
                    <div className="mb-5">
                      <input
                        type="submit"
                        value="...Patientez un instant"
                        className="mt-8 w-full cursor-pointer rounded-lg border bg-orange-500 p-3 text-white transition hover:bg-opacity-90"
                      />
                    </div>
                  ) : (
                    <input
                      className="mt-8 flex w-full justify-center rounded bg-orange-500 p-3 font-medium text-white hover:bg-opacity-90"
                      type="submit"
                      value="Rechercher"
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default FormElements;
