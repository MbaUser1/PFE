"use client";

import { useState } from "react";

export default function Modal_valider({
  id,
  onValidate,
}: {
  id: string;
  onValidate: (id: string) => void;
}) {
  const handleValidateAndClose = () => {
    onValidate(id);
    const modal = document.getElementById("modal_valider") as HTMLDialogElement;
    if (modal) {
      modal.close(); // Fermer le modal après validation
    }
  };

  return (
    <div>
      <dialog id="modal_valider" className="modal">
        <div className="modal-box bg-white">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Confirmation de validation
              </h3>
            </div>

            <div className="p-6.5">
              <div className="mb-4.5">
                <p className="text-sm text-black dark:text-white">
                  Êtes-vous sûr de vouloir valider cette déclaration ? Cette
                  action est irréversible.
                </p>
              </div>
              <div className="flex flex-row">
                <button
                  className="basis-1/4 justify-center rounded bg-success p-3 font-medium text-gray hover:bg-opacity-90"
                  onClick={handleValidateAndClose}
                >
                  Valider
                </button>
                <form method="dialog" className="modal-backdrop basis-1/4">
                  <button className="ml-2 basis-1/4 justify-center rounded bg-danger px-5 py-3 font-medium text-gray hover:bg-opacity-90">
                    close
                  </button>
                </form>
                <div className="modal-action"></div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
