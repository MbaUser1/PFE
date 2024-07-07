"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AvatarUploadPage() {
  const { data: session } = useSession();
  interface Categorie {
    id: string;
    nom: string;
  }
  interface PointD {
    id: string;
    nom: string;
    institution: string;
    telephone: string;
    arrondissement: string;
  }
  const options2 = [
    { value: "Mifi", label: "Mifi" },
    { value: "Menoua", label: "Menoua" },
    { value: "Hauts-Plateaux", label: "Hauts-Plateaux" },
    { value: "Nde", label: "NDE" },
    { value: "Bamboutos", label: "Bamboutos" },
    { value: "Haut-Nkam", label: "Haut-Nkam" },
    { value: "Nkoung-Nki", label: "Nkoung-Nki" },
    { value: "Noun", label: "Noun" },
  ];
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputCategorieRef = useRef<HTMLSelectElement>(null);
  const inputDateRef = useRef<HTMLInputElement>(null);
  const inputArrondRef = useRef<HTMLSelectElement>(null);
  const inputNpieceRef = useRef<HTMLInputElement>(null);
  const inputCniRef = useRef<HTMLInputElement>(null);
  const inputLieuRef = useRef<HTMLSelectElement>(null);
  const inputNomRef = useRef<HTMLInputElement>(null);
  const inputPrenomRef = useRef<HTMLInputElement>(null);
  const inputnomPRef = useRef<HTMLInputElement>(null);
  const inputnomMRef = useRef<HTMLInputElement>(null);
  const inputdatePRef = useRef<HTMLInputElement>(null);
  const inputlieuPRef = useRef<HTMLInputElement>(null);

  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  //remplissage du tableau des categories
  const [categorie, setCategories] = useState<Categorie[]>([]); // Définir le type de categorie
  //remplissage du tableau des points de depot
  const [Pdepot, setpointD] = useState<PointD[]>([]);
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
        // setError(error.message);
      }
    }
    async function fetchPoint() {
      try {
        const response = await fetch("/api/point_depot");
        const data = await response.json();
        if (data.success) {
          setpointD(data.data);
        } else {
          toast.error("Oups, quelque chose s'est mal passé");
        }
      } catch (error) {
        toast.error("Oups, quelque chose s'est mal passé, essayez encore");
      }
    }
    fetchPoint();
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // register("inputFile", { required: "Ce champ est requis" });
  // register("arrondissement", {
  //   required: "Ce champ est requis",
  // });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const file = inputFileRef.current?.files?.[0];
      const userID = session?.user?.id;
      if (file) {
        const response = await fetch(
          `/api/upload?filename=${file.name}&userid=${userID}&categ=${inputCategorieRef.current?.value}&date=${inputDateRef.current?.value}&arrond=${inputArrondRef.current?.value}&npiece=${inputNpieceRef.current?.value}&cni=${inputCniRef.current?.value}&lieu=${inputLieuRef.current?.value}&nom=${inputNomRef.current?.value}&prenom=${inputPrenomRef.current?.value}&nomP=${inputnomPRef.current?.value}&nomM=${inputnomMRef.current?.value}&dateP=${inputdatePRef.current?.value}&lieuP=${inputlieuPRef.current?.value}`,
          {
            method: "POST",
            body: file,
          },
        );
        if (!response.ok) {
          throw new Error("Failed to upload file");
        }

        toast.success("Déclaration créée avec succès");
        setLoading(false);
        reset();
        router.push("/pieces/trouvees");
        const newBlob = await response.json();
        setBlob(newBlob);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading file:", error);
      // Handle error state or feedback to the user
    }
    //console.log(inputCategorieRef);
  };

  return (
    <div className="mt-auto">
      <Breadcrumb pageName="Signaler(Trouvé)" />
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
                    Categorie <span className="text-meta-1">*</span>
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

                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Numéro de pièce <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="num_piece"
                    ref={inputNpieceRef}
                    type="text"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Où avez-vous trouvé ??{" "}
                    <span className="text-meta-1">*</span>
                  </label>
                  <select
                    required
                    name="arrondissement"
                    id=""
                    ref={inputArrondRef}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    {options2.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Date <span className="text-meta-1">*</span>
                  </label>

                  <input
                    name="date"
                    ref={inputDateRef}
                    type="date"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Lieu de depot<span className="text-meta-1">*</span>
                  </label>

                  <select
                    ref={inputLieuRef}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option key="">
                      Selectionnez un lieu où déposer le document{" "}
                    </option>
                    {Pdepot.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.nom}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    IDENTIFIEZ-VOUS <span className="text-meta-1">*</span>
                  </label>

                  <input
                    name="cni"
                    ref={inputCniRef}
                    type="text"
                    placeholder="N CNI , Récipisé ou Passeport"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full ">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Photos <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="file"
                    ref={inputFileRef}
                    type="file"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-5 border-b border-stroke px-1.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  INFORMATIONS DU DOCUMENT
                </h3>
              </div>
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Nom <span className="text-meta-1">*</span>
                  </label>
                  <input
                    ref={inputNomRef}
                    type="text"
                    placeholder=""
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Prenom <span className="text-meta-1">*</span>
                  </label>
                  <input
                    ref={inputPrenomRef}
                    type="text"
                    placeholder=""
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Nom du pere (facultatif)
                  </label>
                  <input
                    ref={inputnomPRef}
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
                    ref={inputnomMRef}
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
                    ref={inputdatePRef}
                    type="date"
                    placeholder=""
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Lieu de naissance <span className="text-meta-1">*</span>
                  </label>
                  <input
                    ref={inputlieuPRef}
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="w-full xl:w-1/2"></div>
              {loading ? (
                <div className="mb-5">
                  <input
                    type="submit"
                    value="...Patientez un instant"
                    className="mt-8 w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
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
          {/* */}
          {/* {blob && (
              <div>
                Blob URL: <a href={blob.url}>{blob.url}</a>
              </div>
            )} */}
          {/* */}
        </div>
      </div>
    </div>
  );
}
