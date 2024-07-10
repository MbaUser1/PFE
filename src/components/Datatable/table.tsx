import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faPencil,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import InvoiceStatus from "@/components/Datatable/status";
import Link from "next/link";
import {
  formatDateToLocal,
  formatCurrency,
} from "@/components/Datatable/utils";
import Modal from "@/components/Modal/Modal";
import Modal_modifier from "@/components/Modal/Modal_modifier";
import Modal_delete from "@/components/Modal/Modal_delete";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DataTable({
  items,
  fields,
}: {
  items: any[];
  fields: {
    key: string;
    label: string;
    isImage?: boolean;
    isStatus?: boolean;
    isCurrency?: boolean;
    isDate?: boolean;
  }[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedPId, setSelectedPId] = useState<string | null>(null);
  const [piece, setPiece] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

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
  }, [selectedPId]);

  const handleDelete = async (id: string, idP: string) => {
    try {
      const response = await fetch(`/api/declarations?id=${id}&idP=${idP}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la déclaration");
      }
      toast.success("Déclaration supprimée");
      setSelectedId(null);
      setSelectedPId(null);

      router.push("/pieces/egarees");
    } catch (error) {
      toast.error("Oups, quelque chose s'est mal passé, essayez encore");
    }
  };

  const filteredItems = items.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <div className="mt-6 flow-root">
      {/* <Modal piece={piece} /> */}
      {/* <Modal_modifier piece={piece} /> */}
      {/* <Modal_delete id={selectedId} idP={selectedPId} onDelete={handleDelete} /> */}
      <div className="inline-block min-w-full align-middle">
        <div className="bg-gray-50 rounded-lg p-2 md:pt-0">
          <div className="md:hidden">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {fields.map((field) =>
                        field.isImage ? (
                          <Image
                            key={field.key}
                            src={item[field.key]}
                            className="mr-2 rounded-full"
                            width={28}
                            height={28}
                            alt={`${item.name}'s profile picture`}
                          />
                        ) : (
                          <p key={field.key}>{item[field.key]}</p>
                        ),
                      )}
                    </div>
                  </div>
                  {fields.map((field) =>
                    field.isStatus ? (
                      <InvoiceStatus key={field.key} status={item[field.key]} />
                    ) : null,
                  )}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    {fields.map((field) =>
                      field.isCurrency ? (
                        <p key={field.key} className="text-xl font-medium">
                          {formatCurrency(item[field.key])}
                        </p>
                      ) : field.isDate ? (
                        <p key={field.key}>
                          {formatDateToLocal(item[field.key])}
                        </p>
                      ) : null,
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      className="hover:bg-gray-100 rounded-md border p-2  text-success"
                      onClick={() => {
                        setSelectedPId(item.PieceId);
                        // document.getElementById("my_modal_2").showModal();
                      }}
                    >
                      <span className="sr-only">View</span>
                      <FontAwesomeIcon icon={faEye} className="w-5" />
                    </button>
                    <Link
                      href={`/home/modification/egaree?pieceid=${item.PieceID}&Did=${item.id}`}
                    >
                      <button
                        className="hover:bg-gray-100 rounded-md border p-2  text-warning"
                        onClick={() => {
                          setSelectedPId(item.PieceId);
                          // document.getElementById("my_modal_m").showModal();
                        }}
                      >
                        <FontAwesomeIcon icon={faPencil} className="w-5" />
                      </button>
                    </Link>
                    <button
                      className="hover:bg-gray-100 rounded-md border p-2  text-danger"
                      onClick={() => {
                        setSelectedId(item.id);
                        // document.getElementById("my_modal_delete").showModal();
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
                {fields.map((field) => (
                  <th
                    key={field.key}
                    scope="col"
                    className="px-4 py-5 font-medium sm:pl-6"
                  >
                    {field.label}
                  </th>
                ))}
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  {fields.map((field) => (
                    <td
                      key={field.key}
                      className="whitespace-nowrap py-3 pl-6 pr-3"
                    >
                      {field.isImage ? (
                        <div className="flex items-center gap-3">
                          <Image
                            src={item[field.key]}
                            className="rounded-full"
                            width={28}
                            height={28}
                            alt={`${item.name}'s profile picture`}
                          />
                          <p>{item.name}</p>
                        </div>
                      ) : field.isStatus ? (
                        <InvoiceStatus status={item[field.key]} />
                      ) : field.isCurrency ? (
                        formatCurrency(item[field.key])
                      ) : field.isDate ? (
                        formatDateToLocal(item[field.key])
                      ) : (
                        item[field.key]
                      )}
                    </td>
                  ))}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <button
                        className="hover:bg-gray-100 rounded-md border p-2 text-success"
                        onClick={() => {
                          setSelectedPId(item.PieceID);
                          // document.getElementById("my_modal_2").showModal();
                        }}
                      >
                        <span className="sr-only">View</span>
                        <FontAwesomeIcon icon={faEye} className="w-5" />
                      </button>
                      <Link
                        href={`/home/modification/egaree?pieceid=${item.PieceID}&Did=${item.id}`}
                      >
                        <button className="hover:bg-gray-100 rounded-md border p-2  text-warning">
                          <FontAwesomeIcon icon={faPencil} className="w-5" />
                        </button>
                      </Link>
                      <button
                        className="hover:bg-gray-100 rounded-md border p-2  text-danger"
                        onClick={() => {
                          setSelectedId(item.id);
                          // document
                          //   .getElementById("my_modal_delete")
                          //   .showModal();
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
  );
}
