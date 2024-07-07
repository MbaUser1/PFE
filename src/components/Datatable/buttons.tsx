"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faPencil,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface ButtonProps {
  label: string;
  href: string;
}

// const getData = async (id: string) => {
//   const res = await fetch(`http://localhost:3000/api/declarations/${id}`, {
//     next: {
//       revalidate: 1,
//     },
//   });
//   const data = await res.json();
//   return data;
// };

export function Create({ label, href }: ButtonProps) {
  return (
    <Link
      href={href}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{label}</span>{" "}
      <FontAwesomeIcon icon={faPlus} className="h-5 md:ml-4" />
    </Link>
  );
}

export function Update({ id }: { id: string }) {
  return (
    <Link
      href="/dashboard/invoices"
      className="hover:bg-gray-100 rounded-md border p-2"
    >
      <FontAwesomeIcon icon={faPencil} className="w-5" />
    </Link>
  );
}

export function Delete({ id }: { id: string }) {
  return (
    <>
      <button className="hover:bg-gray-100 rounded-md border p-2">
        <span className="sr-only">Delete</span>
        <FontAwesomeIcon icon={faTrash} className="w-5" />
      </button>
    </>
  );
}
export function SeeAll({ id }: { id: string }) {
  // const data = await getData(id);
  return (
    <>
      <button
        className="hover:bg-gray-100 rounded-md border p-2"
        // onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        <span className="sr-only">Delete</span>
        <FontAwesomeIcon icon={faEye} className="w-5" />
      </button>
    </>
  );
}
