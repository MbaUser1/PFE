"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginProps>();

  interface LoginProps {
    email: string;
    password: string;
  }
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: LoginProps) {
    console.log(data);
    try {
      setLoading(true);
      console.log("Attempting to sign in with credentials:", data);
      const loginData = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log("SignIn response:", loginData);
      if (loginData?.error) {
        setLoading(false);
        toast.error(
          "Une erreur est survenue, l'utilisateur est peut-etre introuvable",
        );
      } else {
        // Sign-in was successful
        toast.success("Login Successful");
        reset();
        router.push("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong with your Network");
    }
  }

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 dark:bg-[#181c24] md:pb-20 lg:pb-28 lg:pt-[180px] ">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[500px] rounded bg-white px-6 py-10 shadow-three dark:bg-[#181c24] dark:bg-black  sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Connectez-vous à votre compte
              </h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="text-dark mb-3 block text-sm dark:text-white"
                  >
                    Votre Email
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    id="email"
                    placeholder="Entrer votre Email"
                    className="dark:text-body-color-dark text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                  {errors.email && (
                    <small className="text-red-600 text-sm ">
                      Remplir ce champ
                    </small>
                  )}
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="password"
                    className="text-dark mb-3 block text-sm dark:text-white"
                  >
                    Votre mot de passe
                  </label>
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    id="password"
                    placeholder="Entrer votre mot de passe"
                    className="dark:text-body-color-dark text-body-color w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                  />
                  {errors.password && (
                    <small className="text-red-600 text-sm ">
                      Votre mot de passe
                    </small>
                  )}
                </div>

                <div className="mb-6">
                  {loading ? (
                    <button className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                      Connexion...
                    </button>
                  ) : (
                    <button className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                      Connexion
                    </button>
                  )}
                </div>
              </form>
              <p className="text-body-color text-center text-base font-medium">
                Pas de compte?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SigninPage;
