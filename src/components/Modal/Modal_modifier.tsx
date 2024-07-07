"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Piece {
  id: string;
  num_piece: string;
  nom: string;
  prenom: string;
  nom_pere: string;
  nom_mere: string;
  nee_le: string;
  lieu: string;
  categorie: string;
  date: string;

  // autres propriétés de la pièce
}

type ModalProps = {
  piece: Piece;
};
export default function Modal_modifier({ piece }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Piece>();
  // soumission du formulaire
  async function onSubmit(data: Piece) {
    try {
      setLoading(true);
      const response = await fetch("/api/piece", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setLoading(false);
        toast.success("Modifié avec succès");
        reset();
        setIsModalOpen(false);
        router.push("/pieces/egarees");
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
  const [categorie, setcategorie] = useState([]);

  //recuperation des categories

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/categ");
        const data = await response.json();
        if (data.success) {
          setcategorie(data.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {/* verifions qu'une piece a ete passe en argurment */}
      {piece ? (
        <dialog open={isModalOpen} id="my_modal_m" className="modal">
          <div className="modal-box bg-white">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Modifier la declaration
                </h3>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Numéros de piece
                      </label>
                      <input
                        {...register("id", {
                          required: "Ce champ est obligatoire",
                        })}
                        type="hidden"
                        // value={piece[0].id ?? ""}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <input
                        {...register("num_piece", {
                          required: "Ce champ est obligatoire",
                        })}
                        type="text"
                        // defaultValue={piece[0].num_piece ?? ""}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Nom <span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register("nom", {
                          required: "Ce champ est obligatoire",
                        })}
                        type="text"
                        // defaultValue={piece[0].nom ?? ""}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Prénom <span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register("prenom", {
                          required: "Ce champ est obligatoire",
                        })}
                        type="text"
                        // defaultValue={piece[0].prenom ?? ""}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Categorie <span className="text-meta-1">*</span>
                      </label>

                      <select
                        {...register("categorie", {
                          required: "Ce champ est obligatoire",
                        })}
                        // Value={piece[0].CategorieID ?? ""}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        {/* {categorie.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.nom}
                          </option>
                        ))} */}
                      </select>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Date de naissance <span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register("date", {
                          required: "Ce champ est obligatoire",
                        })}
                        type="date"
                        // defaultValue={piece[0].nee_le ?? ""}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Lieu de naissance <span className="text-meta-1">*</span>
                      </label>
                      <input
                        {...register("lieu", {
                          required: "Ce champ est obligatoire",
                        })}
                        type="text"
                        // value={piece[0].lieu ?? ""}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Nom du père
                      </label>
                      <input
                        {...register("nom_pere", {
                          required: "Ce champ est obligatoire",
                        })}
                        type="text"
                        // defaultValue={piece[0].nom_pere ?? ""}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Nom de la mère
                      </label>
                      <input
                        {...register("nom_mere", {
                          required: "Ce champ est obligatoire",
                        })}
                        type="text"
                        // defaultValue={piece[0].nom_mere ?? ""}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row">
                    {loading ? (
                      <div className="mb-5">
                        <input
                          className="basis-1/4 justify-center rounded bg-warning p-3 font-medium text-gray transition hover:bg-opacity-90"
                          type="submit"
                          value="...Patientez un instant"
                        />
                      </div>
                    ) : (
                      <input
                        className="basis-1/4 justify-center rounded bg-warning p-3 font-medium text-gray transition hover:bg-opacity-90"
                        type="submit"
                        value="Modifier"
                      />
                    )}

                    <form method="dialog" className="modal-backdrop basis-1/4">
                      <button
                        className="ml-2 basis-1/4 justify-center rounded bg-danger px-5 py-3  font-medium text-gray hover:bg-opacity-90"
                        onClick={() => setIsModalOpen(false)}
                      >
                        close
                      </button>
                    </form>
                    <div className="modal-action"></div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      ) : (
        <p></p>
      )}
    </div>
  );
}
