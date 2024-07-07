"use client";

import Link from "next/link";

import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

const SignupPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();

  interface RegisterFormData {
    nom: string;
    prenom: string;
    email: string;
    telephone: number;
    password: string;
    sexe: string;
    // Add other form fields as needed (e.g., name)
  }

  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  async function onSubmit(data: RegisterFormData) {
    try {
      console.log(data);
      setLoading(true);
      const response = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setLoading(false);
        toast.success("Utilisateur créé avec succès");
        reset();

        const params = new URLSearchParams({
          telephone: responseData.data.telephone,
        });

        router.push(`/verifierNum?${params.toString()}`);
        console.log(responseData.data);
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailErr(
            "Un utilisateur avec cette adresse email ou Numero de telephone existe déjà",
          );
          toast.error(
            "Un utilisateur avec cette adresse email ou Numero de telephone existe déjà",
          );
        } else {
          // Handle other errors
          console.error("Server Error:", responseData.message);
          toast.error("Oups, quelque chose s'est mal passé");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Oups, quelque chose s'est mal passé, essayez encore");
    }
  }

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36  dark:bg-[#181c24] md:pb-20  lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="dark:bg-dark sm:p-[60px]dark:bg-black mx-auto max-w-[500px] rounded bg-white px-6 py-10  shadow-three dark:bg-black">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Creer votre compte
                </h3>
                <p className="text-body-color mb-11 text-center text-base font-medium">
                  Gratuit et super facile
                </p>

                <div className="mb-2 flex items-center justify-center">
                  <span className="bg-body-color/50 hidden h-[1px] w-full max-w-[60px] sm:block"></span>
                  <span className="bg-body-color/50 hidden h-[1px] w-full max-w-[60px] sm:block"></span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-5">
                    <label
                      htmlFor="name"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Nom{" "}
                    </label>
                    <input
                      {...register("nom", { required: true })}
                      type="text"
                      name="nom"
                      placeholder="Entrez votre nom"
                      className="dark:text-body-color-dark text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                    {errors.nom && (
                      <small className="text-sm text-rose-600 ">
                        Ce champ est obligatoire *
                      </small>
                    )}
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Prénom{" "}
                    </label>
                    <input
                      {...register("prenom", { required: true })}
                      type="text"
                      name="prenom"
                      placeholder="Entrez votre prenom"
                      className="dark:text-body-color-dark text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                    {errors.prenom && (
                      <small className="text-sm text-rose-600 ">
                        Ce champ est obligatoire *
                      </small>
                    )}
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Email{" "}
                    </label>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      name="email"
                      placeholder="Entrez votre Email"
                      className="dark:text-body-color-dark text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                    {errors.email && (
                      <small className="text-sm text-rose-600 ">
                        Ce champ est obligatoire *
                      </small>
                    )}
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Telephone{" "}
                    </label>
                    <input
                      {...register("telephone", { required: true })}
                      type="number"
                      name="telephone"
                      placeholder="+237600000000"
                      className="dark:text-body-color-dark text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                    {errors.telephone && (
                      <small className="text-sm text-rose-600 ">
                        Ce champ est obligatoire *
                      </small>
                    )}
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="password"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Sexe{" "}
                    </label>
                    <select
                      {...register("sexe", { required: true })}
                      className="dark:text-body-color-dark text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    >
                      <option value="" disabled selected>
                        <span className="bg-gray-300 pointer-events-none absolute -inset-x-0 -top-2 px-2 py-1 opacity-75">
                          Selectionez votre Sexe
                        </span>
                      </option>
                      <option value="Male">M</option>
                      <option value="Female">F</option>
                    </select>
                    {errors.sexe && (
                      <small className="text-sm text-rose-600 ">
                        Ce champ est obligatoire *
                      </small>
                    )}
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="password"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      {" "}
                      Mot de Passe{" "}
                    </label>
                    <input
                      {...register("password", { required: true })}
                      type="password"
                      name="password"
                      placeholder="Entrer votre mot de passe"
                      className="dark:text-body-color-dark text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                    {errors.password && (
                      <small className="text-sm text-rose-600 ">
                        Ce champ est obligatoire *
                      </small>
                    )}
                  </div>
                  <div className="mb-5 flex">
                    <label
                      htmlFor="checkboxLabel"
                      className="text-body-color flex cursor-pointer select-none text-sm font-medium"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="checkboxLabel"
                          className="sr-only"
                        />
                        <div className="box border-body-color mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border border-opacity-20 dark:border-white dark:border-opacity-10">
                          <span className="opacity-0">
                            <svg
                              width="11"
                              height="8"
                              viewBox="0 0 11 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                fill="#3056D3"
                                stroke="#3056D3"
                                strokeWidth="0.4"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <span>
                        En créant votre compte vous accepter
                        <a href="#0" className="text-primary hover:underline">
                          {" "}
                          Termes et conditions{" "}
                        </a>
                        , et notre
                        <a href="#0" className="text-primary hover:underline">
                          {" "}
                          Politique de confidentialité{" "}
                        </a>
                      </span>
                    </label>
                  </div>
                  <div className="mb-6">
                    {loading ? (
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
                      >
                        ...Patientez un instant
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
                      >
                        Inscription
                      </button>
                    )}
                  </div>
                </form>
                <p className="text-body-color text-center text-base font-medium">
                  Avez vous déjà un compte?{" "}
                  <Link href="/signin" className="text-primary hover:underline">
                    Connexion
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
