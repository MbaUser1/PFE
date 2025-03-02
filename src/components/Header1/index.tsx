"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(true);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  // const handleSubmenu = (index) => {
  //   if (openIndex === index) {
  //     setOpenIndex(-1);
  //   } else {
  //     setOpenIndex(index);
  //   }
  // };

  const usePathName = usePathname();

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center bg-white pl-8 dark:bg-black ${
          sticky
            ? "shadow-sticky fixed z-[9999] !bg-opacity-80 backdrop-blur-sm transition dark:shadow-black"
            : "absolute bg-transparent"
        } ${
          // Applying different padding based on screen size
          "md:-py-8 lg:-py-8 xl:-py-8 2xl:-py-8 sm:-py-4 py-2"
        }`}
      >
        {" "}
        <div className="container mx-auto">
          <div className="container">
            <div className="relative -mx-4 flex items-center justify-between">
              <div className="w-60 max-w-full px-4 xl:mr-12">
                <Link
                  href="/"
                  className={`header-logo flex w-full items-start ${
                    sticky ? "py-5 lg:py-2" : " py-4"
                  }`}
                >
                  <h1
                    className={`-ml-12 py-2 text-xl font-bold text-black dark:text-white ${sticky ? "" : "lg:hidden"}`}
                  >
                    RestoreU
                  </h1>
                  <div className="ml-2 hidden lg:block">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 640 480"
                      className="fill-current"
                    >
                      <path fill="#007a5e" d="M0 0h213.3v480H0z" />
                      <path fill="#ce1126" d="M213.3 0h213.4v480H213.3z" />
                      <path fill="#fcd116" d="M426.7 0H640v480H426.7z" />
                      <path
                        fill="#fcd116"
                        d="M320 118.6l28.2 86.7h91.2l-73.7 53.6 28.2 86.7-73.7-53.6-73.7 53.6 28.2-86.7-73.7-53.6h91.2z"
                      />
                    </svg>
                  </div>
                </Link>
              </div>

              <div className="xl:mr-300 flex w-full items-center justify-between px-4">
                <div>
                  <button
                    onClick={navbarToggleHandler}
                    id="navbarToggler"
                    aria-label="Mobile Menu"
                    className="absolute right-2 top-1/2 block translate-y-[-50%] rounded-lg px-2 py-[6px] ring-primary focus:ring-2 lg:hidden"
                  >
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                        navbarOpen ? " top-[7px] rotate-45" : " "
                      }`}
                    />
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                        navbarOpen ? "opacity-0 " : " "
                      }`}
                    />
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                        navbarOpen ? " top-[-8px] -rotate-45" : " "
                      }`}
                    />
                  </button>
                  <nav
                    id="navbarCollapse"
                    className={`border-body-color/50 dark:border-body-color/20 dark:bg-dark navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] bg-white px-6 py-4 duration-300 dark:bg-black lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                      navbarOpen
                        ? "visibility top-full opacity-100"
                        : "invisible top-[120%] opacity-0"
                    }`}
                  >
                    <ul className="block lg:flex lg:space-x-12">
                      {menuData.map((menuItem, index) => (
                        <li
                          key={index}
                          className="group relative w-22 flex-initial"
                        >
                          {menuItem.path ? (
                            <Link
                              href={menuItem.path}
                              className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0  ${
                                usePathName === menuItem.path
                                  ? "text-primary dark:text-white"
                                  : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                              }`}
                            >
                              {menuItem.title}
                            </Link>
                          ) : (
                            <>
                              <p
                                // onClick={() => handleSubmenu(index)}
                                className="text-dark flex cursor-pointer items-center justify-between py-0 text-base group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                              >
                                {menuItem.title}
                                <span className="pl-3">
                                  <svg
                                    width="25"
                                    height="24"
                                    viewBox="0 0 25 24"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </span>
                              </p>
                              <div
                                className={`submenu dark:bg-dark relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                  openIndex === index ? "block" : "hidden"
                                }`}
                              >
                                {menuItem.submenu &&
                                  menuItem.submenu.map((submenuItem, index) => (
                                    <Link
                                      //submenuItem.path
                                      href={"#"}
                                      key={index}
                                      className="text-dark block rounded py-0 text-sm hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
                                    >
                                      {submenuItem.title}
                                    </Link>
                                  ))}
                              </div>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                <div className="flex items-center justify-end pr-16 lg:pr-0">
                  <Link
                    href="/signin"
                    className="rounded-lg bg-primary px-4 py-3 font-medium text-white hover:opacity-70  dark:text-white sm:bg-primary md:block md:bg-transparent  md:text-black lg:text-black xl:bg-transparent"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/signup"
                    className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                  >
                    Inscrire
                  </Link>
                  <div>
                    <ThemeToggler />
                  </div>
                  <div className="flex items-start justify-end pr-12 lg:pr-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
