"use client";
import type { PutBlobResult } from "@vercel/blob";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Declaration {
  id: string;
  filename: string;
  userId: string;
  categorie: string;
  date: string;
  arrond: string;
  npiece: string;
  cni: string;
  lieu: string;
  nom: string;
  prenom: string;
  nomP: string;
  nomM: string;
  dateP: string;
  lieuP: string;
}

export default function AvatarUploadPage() {
  const { data: session } = useSession();
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

  interface Categorie {
    id: string;
    nom: string;
  }

  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [categorie, setcategorie] = useState<Categorie[]>([]);

  const [declaration, setDeclaration] = useState<Declaration | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/categ");
        const data = await response.json();
        if (data.success) {
          setcategorie(data.data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Oups, quelque chose s'est mal passé....");
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setMounted(true); // Set mounted to true once the component is mounted
  }, []);

  useEffect(() => {
    async function fetchPiece() {
      if (mounted) {
        const query = new URLSearchParams(window.location.search);
        const pieceId = query.get("pieceid");
        const Did = query.get("Did");
        if (pieceId && Did) {
          try {
            const response = await fetch(`/api/piece?id=${pieceId}`);
            const response1 = await fetch(`/api/declaration?id=${Did}`);
            const data = await response.json();
            const data1 = await response1.json();
            if (
              (response.ok && data.success) ||
              (response1.ok && data1.success)
            ) {
              const declaration: Declaration = {
                id: data1.data.id,
                filename: data1.data.filename,
                userId: data1.data.userId,
                categorie: data1.data.categorie,
                date: data1.data.date,
                arrond: data1.data.arrond,
                npiece: data1.data.npiece,
                cni: data1.data.cni,
                lieu: data1.data.lieu,
                nom: data1.data.nom,
                prenom: data1.data.prenom,
                nomP: data1.data.nomP,
                nomM: data1.data.nomM,
                dateP: data1.data.dateP,
                lieuP: data1.data.lieuP,
              };
              setDeclaration(declaration);
            } else {
              toast.error("Aucune pièce trouvée ou déclaration non trouvée");
              router.push("/pieces/trouvees");
              return;
            }
          } catch (err) {
            toast.error("Aucune pièce trouvée ou déclaration non trouvée");
          }
        }
      }
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: Declaration) => {
    try {
      setLoading(true);
      const file = inputFileRef.current?.files?.[0];
      const userID = session?.user?.id;
      if (file) {
        const response = await fetch(
          `/api/upload/${data.id}?filename=${file.name}&userid=${userID}&categ=${data.categorie}&date=${data.date}&arrond=${data.arrond}&npiece=${data.npiece}&cni=${data.cni}&lieu=${data.lieu}&nom=${data.nom}&prenom=${data.prenom}&nomP=${data.nomP}&nomM=${data.nomM}&dateP=${data.dateP}&lieuP=${data.lieuP}`,
          {
            method: "PUT",
            body: file,
          },
        );
        if (!response.ok) {
          throw new Error("Failed to update declaration");
        }

        toast.success("Déclaration mise à jour avec succès");
        setLoading(false);
        reset();
        router.push("/pieces/trouvees");
        const newBlob = await response.json();
        setBlob(newBlob);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating declaration:", error);
      // Handle error state or feedback to the user
    }
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

          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Catégorie <span className="text-meta-1">*</span>
                  </label>

                  <select
                    ref={inputCategorieRef}
                    defaultValue={declaration?.categorie} // Préremplir la catégorie si disponible
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    {categories.map((option) => (
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
                    name="npiece"
                    ref={inputNpieceRef}
                    defaultValue={declaration?.npiece} // Préremplir le numéro de pièce si disponible
                    type="text"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Où avez-vous trouvé ? <span className="text-meta-1">*</span>
                  </label>
                  <select
                    required
                    name="arrond"
                    ref={inputArrondRef}
                    defaultValue={declaration?.arrond} // Préremplir l'arrondissement si disponible
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
                    defaultValue={declaration?.date} // Préremplir la date si disponible
                    type="date"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Lieu de dépôt <span className="text-meta-1">*</span>
                  </label>

                  {/* <select
                    ref={inputLieuRef}
                    defaultValue={declaration?.lieu} // Préremplir le lieu de dépôt si disponible
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    {lieus.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.nom}
                      </option>
                    ))}
                  </select> 
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Nom de la personne trouvée{" "}
                    <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="nom"
                    ref={inputNomRef}
                    defaultValue={declaration?.nom} // Préremplir le nom si disponible
                    type="text"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Prénom de la personne trouvée{" "}
                    <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="prenom"
                    ref={inputPrenomRef}
                    defaultValue={declaration?.prenom} // Préremplir le prénom si disponible
                    type="text"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    CNIB <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="cni"
                    ref={inputCniRef}
                    defaultValue={declaration?.cni} // Préremplir le CNIB si disponible
                    type="text"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Nom du père <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="nomP"
                    ref={inputnomPRef}
                    defaultValue={declaration?.nomP} // Préremplir le nom du père si disponible
                    type="text"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Nom de la mère <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="nomM"
                    ref={inputnomMRef}
                    defaultValue={declaration?.nomM} // Préremplir le nom de la mère si disponible
                    type="text"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Date de naissance <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="dateP"
                    ref={inputdatePRef}
                    defaultValue={declaration?.dateP} // Préremplir la date de naissance si disponible
                    type="date"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Lieu de naissance <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="lieuP"
                    ref={inputlieuPRef}
                    defaultValue={declaration?.lieuP} // Préremplir le lieu de naissance si disponible
                    type="text"
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Photo <span className="text-meta-1">*</span>
                  </label>
                  <input
                    ref={inputFileRef}
                    type="file"
                    accept="image/*, .pdf"
                    required
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => inputFileRef.current?.click()}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    {blob ? "Mettre à jour le fichier" : "Ajouter un fichier"}
                  </button>
                </div>

                <div className="w-full xl:w-1/2">
                  {/* {blob && (
                    <div className="flex items-center gap-4">
                      <span className="h-16 w-16 flex-shrink-0">
                        <img
                          src={blob.url}
                          alt="Uploaded File"
                          className="h-full w-full rounded object-cover"
                        />
                      </span>
                      <span className="flex-1 text-sm">
                        {blob?.name} ({(blob.size / 1024).toFixed(2)} KB)
                      </span>
                    </div>
                  )} *
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="disabled:bg-gray-300 btn btn-primary rounded px-12 py-3 font-semibold uppercase tracking-wider text-white disabled:cursor-not-allowed"
                >
                  {loading ? "En cours..." : "Mettre à jour"}
                </button>
              </div>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
}
