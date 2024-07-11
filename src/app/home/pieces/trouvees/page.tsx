"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faPencil,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import InvoiceStatus from "@/components/Datatable/statusT";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Modal from "@/components/Modal/Modal";
import Modal_delete from "@/components/Modal/Modal_delete";
import {
  formatDateToLocal,
  formatCurrency,
} from "@/components/Datatable/utils";
import Search from "@/components/Datatable/search";

// import Table from "@/components/Datatable/table1";
import Table from "@/components/Datatable/table";
import { Create } from "@/components/Datatable/buttons";
import toast from "react-hot-toast";
import Image from "next/image";

export default function InvoicesTable() {
  interface piece {
    id: string;
    photo: string;
    PieceID: string;
    num_piece: string;
    categorie1: {
      nom: string;
    };
    date: string;
    circonstance: String;
    arrondissement: string;
    deposer: string;
  }
  interface ModalDeleteProps {
    id: string | null;
    onDelete: (id: string) => void;
  }
  const [invoices, setInvoices] = useState<piece[]>([]);
  const [refrech, setrefrech] = useState(false);
  const [piece, setPiece] = useState<piece[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedPId, setSelectedPId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

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
  }, [session?.user?.id]);

  useEffect(() => {
    async function fetchData() {
      if (!selectedPId) return;
      try {
        const response = await fetch(`/api/piece?id=${selectedPId}`);
        const data = await response.json();
        console.log("Response data:", data);
        if (data.success) {
          setPiece(data.data);
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
  }, [selectedPId, refrech]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/declarations?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la déclaration");
      }
      toast.success("Déclaration supprimée");
      setSelectedId(null);
      setrefrech(true);
      setSelectedPId(null);
    } catch (error) {
      toast.error("Oups, quelque chose s'est mal passé, essayez encore");
    }
  };
  const Modal_delete: React.FC<ModalDeleteProps> = ({ id, onDelete }) => {
    return (
      <dialog id="my_modal_delete" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Confirmer la suppression</h3>
          <p className="py-4">
            Êtes-vous sûr de vouloir supprimer cette déclaration ?
          </p>
          <div className="modal-action">
            <button
              className="btn basis-1/4 justify-center rounded bg-success p-3 font-medium text-gray hover:bg-opacity-90"
              onClick={() => {
                if (id) onDelete(id);
                (
                  document.getElementById(
                    "my_modal_delete",
                  ) as HTMLDialogElement
                ).close();
              }}
            >
              Oui
            </button>
            <button
              className="btn ml-2 basis-1/4 justify-center rounded bg-danger px-1 py-3 font-medium text-gray hover:bg-opacity-90"
              onClick={() =>
                (
                  document.getElementById(
                    "my_modal_delete",
                  ) as HTMLDialogElement
                ).close()
              }
            >
              Non
            </button>
          </div>
        </div>
      </dialog>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      {/* <Modal piece={piece} /> */}
      <Modal_delete id={selectedId} onDelete={handleDelete} />
      <Breadcrumb pageName="Documents Trouvés" />
      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Rechercher un document..." />
          <Create label="Ajouter" href="/home/signaler/trouvee" />
        </div>
        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="bg-gray-50 rounded-lg p-2 md:pt-0">
              <div className="md:hidden">
                {invoices?.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <Image
                            src={invoice.photo}
                            className="mr-2 rounded-full"
                            width={28}
                            height={28}
                            alt={` document picture`}
                          />
                        </div>
                        <p className="text-xl font-medium">
                          {" "}
                          N° doc: {invoice.num_piece}
                        </p>
                      </div>
                      <InvoiceStatus status={invoice.deposer} />
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div>
                        <p className="text-gray-500 text-sm">
                          Categorie : {invoice.categorie1.nom}
                        </p>
                        <p>{formatDateToLocal(invoice.date)}</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button className="hover:bg-gray-100 rounded-md border p-2 text-success">
                          <span className="sr-only">View</span>
                          <FontAwesomeIcon icon={faEye} className="w-5" />
                        </button>
                        <Link
                          href={`/home/modification/egaree?pieceid=${invoice.PieceID}&Did=${invoice.id}`}
                        >
                          <button className="hover:bg-gray-100 rounded-md border p-2  text-warning">
                            <FontAwesomeIcon icon={faPencil} className="w-5" />
                          </button>
                        </Link>
                        <button
                          className="hover:bg-gray-100 rounded-md border p-2  text-danger"
                          onClick={() => {
                            setSelectedId(invoice.id);
                            const modalElement = document.getElementById(
                              "my_modal_delete",
                            ) as HTMLDialogElement | null;
                            if (modalElement) {
                              modalElement.close();
                            } else {
                              console.error(
                                "Element with id 'my_modal_delete' not found.",
                              );
                            }
                          }}
                        >
                          <span className="sr-only">Delete</span>
                          <FontAwesomeIcon icon={faTrash} className="w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="text-gray-900 hidden min-w-full md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Photos
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      categorie
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Numeros document
                    </th>

                    <th scope="col" className="px-3 py-5 font-medium">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Deposer
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {invoices?.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <Image
                            src={invoice.photo}
                            className="rounded-full"
                            width={28}
                            height={28}
                            alt={`'s profile picture`}
                          />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {invoice.categorie1.nom}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {invoice.num_piece}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {formatDateToLocal(invoice.date)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <InvoiceStatus status={invoice.deposer} />
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <button className="hover:bg-gray-100 rounded-md border p-2 text-success">
                            <span className="sr-only">View</span>
                            <FontAwesomeIcon icon={faEye} className="w-5" />
                          </button>
                          <Link
                            href={`/home/modification/egaree?pieceid=${invoice.PieceID}&Did=${invoice.id}`}
                          >
                            <button className="hover:bg-gray-100 rounded-md border p-2  text-warning">
                              <FontAwesomeIcon
                                icon={faPencil}
                                className="w-5"
                              />
                            </button>
                          </Link>
                          <button
                            className="hover:bg-gray-100 rounded-md border p-2  text-danger"
                            onClick={() => {
                              setSelectedId(invoice.id);
                              const modalElement = document.getElementById(
                                "my_modal_delete",
                              ) as HTMLDialogElement | null;
                              if (modalElement) {
                                modalElement.showModal();
                              } else {
                                console.error(
                                  "Element with id 'my_modal_delete' not found.",
                                );
                              }
                            }}
                          >
                            <span className="sr-only">Delete</span>
                            <FontAwesomeIcon icon={faTrash} className="w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
