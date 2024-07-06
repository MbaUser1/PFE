import { useEffect, useRef, useState } from "react";
// import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGear,
  faSignOutAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface DropdownUserProps {
  nom: string;
  email: string;
  role: string;
  img: string;
}

const DropdownUser: React.FC<DropdownUserProps> = ({
  nom,
  email,
  role,
  img,
}) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // const handleLogout = async () => {
  //   const data = await signOut({ redirect: false, callbackUrl: "/" });
  //   if (data.error) {
  //     console.error("Déconnexion échouée :", data.error);
  //   } else {
  //     // Vérifie que le router est disponible avant de faire la redirection

  //     router.push("/");
  //     console.error("Déconnexion");
  //   }
  // };

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      ) {
        return;
      }
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {nom}
          </span>
          <span className="block text-xs"> {role}</span>
        </span>

        <span className="h-11 w-11 overflow-hidden rounded-full">
          <Image
            width={112}
            height={112}
            src={img}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User"
          />
        </span>
        <FontAwesomeIcon icon={faChevronDown} />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              href="/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <FontAwesomeIcon icon={faUserGear} />
              Parametre
            </Link>
          </li>
        </ul>
        <button
          // onClick={handleLogout}
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <FontAwesomeIcon
            icon={faSignOutAlt}
            style={{ transform: "scaleX(-1)" }}
          />
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
