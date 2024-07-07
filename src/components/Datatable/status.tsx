import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClock } from "@fortawesome/free-solid-svg-icons";

import clsx from "clsx";

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-red-100 text-gray-500": status === "n",
          "bg-green-500 text-white": status === "o",
        },
      )}
    >
      {status === "n" ? (
        <>
          <FontAwesomeIcon
            icon={faClock}
            className="text-gray-500 ml-1 w-4 pr-1"
          />
          En cours...
        </>
      ) : null}
      {status === "o" ? (
        <>
          Trouvé
          <FontAwesomeIcon icon={faCheck} className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
