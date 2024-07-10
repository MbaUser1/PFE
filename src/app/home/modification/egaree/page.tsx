"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Circonstances = [
  { value: "", label: "Veuillez selectionner" },
  { value: "Agression", label: "Agression" },
  { value: "Accidents", label: "Accidents" },
  { value: "Vol", label: "Vol" },
  { value: "Neglicence", label: "Neglicence" },
  { value: "Perte", label: "Perte" },
  { value: "RAS", label: "RAS" },
  { value: "autres", label: "Autres" },
];

interface Categorie {
  id: string;
  nom: string;
}

interface Donnees {
  idP: "";
  idD: "";
  type: "";
  categorie: "";
  date: "";
  arrondissement: "";
  circonstance: "";
  num_piece: "";
  cni: "";
  nom: "";
  prenom_p: "";
  pnom_p: "";
  mnom_p: "";
  nee_le: "";
  lieu_p: "";
}
interface Piece {
  id: string;
  num_piece: string;
  cni: string;
}

const FormLayout = () => {
  const router = useRouter();
  const [piece, setPiece] = useState<string | null>(null);
  const [Decla, setDeclara] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<Donnees>();
  const [loading, setLoading] = useState(false);
  const [categorie, setcategorie] = useState<Categorie[]>([]);

  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();

  //infobule
  // const [showTooltip, setShowTooltip] = useState(false);
  // const { data: session, status } = useSession();

  //recuperation des categories

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
              setPiece(data.data[0]);
              setDeclara(data1.data[0]);
              setValue("idP", data.data[0].id);
              setValue("num_piece", data.data[0].num_piece);
              setValue("nom", data.data[0].nom);
              setValue("prenom_p", data.data[0].prenom);
              setValue("pnom_p", data.data[0].nom_pere);
              setValue("mnom_p", data.data[0].nom_mere);
              setValue("nee_le", data.data[0].nee_le);
              setValue("lieu_p", data.data[0].lieu);
              setValue("categorie", data.data[0].CategorieID);

              setValue("idD", data1.data.id);
              setValue("arrondissement", data1.data.arrondissement);
              setValue("date", data1.data.date);
              setValue("circonstance", data.data.circonstance);
            } else {
              toast.error(
                "Erreur lors de la récupération des données de la pièce.",
              );
            }
          } catch (error) {
            toast.error("Oups, quelque chose s'est mal passé....");
          }
        }
      }
    }
    fetchPiece();
  }, [mounted, setValue]);
  //recuperation de l'id de l'utilisateur
  // const userID = session?.user?.id;

  async function onSubmit(data: Donnees) {
    try {
      setLoading(true);
      const response = await fetch("/api/declarations", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setLoading(false);
        toast.success("Déclaration modifiée avec succès");
        reset();

        router.push("/home/pieces/egarees");
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

  if (status === "authenticated") {
    const nom = session.user?.id;

    return (
      <div className="mt-auto">
        <Breadcrumb pageName="Modifier(Egaré)" />
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="flex items-center justify-between font-medium text-black dark:text-white">
                Modifier la déclarations
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
                      {...register("categorie", {})}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      {categorie.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.nom}
                        </option>
                      ))}
                    </select>
                    {errors.categorie && (
                      <small className="text-sm text-rose-600">
                        {errors.categorie.message}
                      </small>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Numéro de pièce
                    </label>
                    <input
                      {...register("idP", {})}
                      type="hidden" // Treat as string4
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <input
                      {...register("idD", {})}
                      type="hidden" // Treat as string4
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <input
                      {...register("num_piece", {})}
                      type="text" // Treat as string4
                      placeholder="Entrez le numéro du document"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.num_piece && (
                      <small className="text-sm text-rose-600">
                        {errors.num_piece.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Où l avez-vous egaré ??{" "}
                      <span className="text-meta-1">*</span>
                    </label>

                    <input
                      {...register("arrondissement", {})}
                      type="text" // Treat as string
                      placeholder="Quartier ou endroit spécifique"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.arrondissement && (
                      <small className="text-sm text-rose-600">
                        {errors.arrondissement.message}
                      </small>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Quand ?? <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register("date", {})}
                      type="date"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.date && (
                      <small className="text-sm text-rose-600">
                        {errors.date.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                  <div className="xl:w-2/2 w-full">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Circonstances <span className="text-meta-1">*</span>
                    </label>
                    <select
                      {...register("circonstance", {})}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      {Circonstances.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.circonstance && (
                      <small className="text-sm text-rose-600">
                        {errors.circonstance.message}
                      </small>
                    )}

                    {/* <div className="mb-6"></div> */}
                  </div>
                </div>

                <div className=" mb-5 border-b border-stroke px-1.5 py-4 dark:border-strokedark">
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
                      {...register("nom", {
                        required: "Ce champ est obligatoire",
                      })}
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5  text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.nom && (
                      <small className="text-sm text-rose-600 ">
                        {errors.nom.message}
                      </small>
                    )}
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Prenom <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register("prenom_p", {
                        required: "Ce champ est obligatoire",
                      })}
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.prenom_p && (
                      <small className="text-sm text-rose-600 ">
                        {errors.prenom_p.message}
                      </small>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Nom du pere (facultatif)
                    </label>
                    <input
                      {...register("pnom_p", {})}
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Nom de la mere (facultatif)
                    </label>
                    <input
                      {...register("mnom_p", {})}
                      type="text"
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
                      {...register("nee_le", {
                        required: "Ce champ est obligatoire",
                      })}
                      type="date"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.nee_le && (
                      <small className="text-sm text-rose-600 ">
                        {errors.nee_le.message}
                      </small>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Lieu de naissance <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {...register("lieu_p", {
                        required: "Ce champ est obligatoire",
                      })}
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.lieu_p && (
                      <small className="text-sm text-rose-600 ">
                        {errors.lieu_p.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="w-full xl:w-1/2">
                  <input
                    {...register("type", {
                      required: "Ce champ est obligatoire",
                    })}
                    value="egare"
                    type="hidden"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {loading ? (
                  <div className="mb-5">
                    <input
                      type="submit"
                      value="...Patientez un instant"
                      className="mt-8 w-full cursor-pointer rounded-lg bg-orange-400 p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>
                ) : (
                  <input
                    className="mt-8 flex w-full justify-center rounded bg-orange-400 p-3 font-medium text-white hover:bg-opacity-90"
                    type="submit"
                    value="Modifier"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    router.push("/");
  }
};

export default FormLayout;
