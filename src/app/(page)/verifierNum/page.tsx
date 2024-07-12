"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const OtpForm = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [otp, setOtp] = useState("");
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true); // Set mounted to true once the component is mounted
  }, []);

  useEffect(() => {
    if (mounted) {
      const query = new URLSearchParams(window.location.search);
      const telephoneParam = query.get("telephone");
      if (telephoneParam) {
        setTelephone(telephoneParam);
      }
    }
  }, [mounted]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/verify-otp", { otp, telephone });
      if (response.data.valid) {
        setSuccess("Le code OTP est valide !");
        setError("");
        toast.success("Le code OTP est valide");
        router.push("/signin");
      } else {
        setError("Le code OTP est invalide.");
        setSuccess("");
      }
    } catch (err) {
      setError("Une erreur est survenue.");
      setSuccess("");
    }
  };

  if (!mounted) return null; // Render nothing or a loading spinner while mounting

  return (
    <div className="bg-gray-100 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Vérification du Code OTP
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="text-gray-700 block text-sm font-medium"
            >
              Entrez le code OTP reçu par SMS
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          {success && <p className="mb-4 text-sm text-green-500">{success}</p>}
          <div>
            {loading ? (
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                En cours .....
              </button>
            ) : (
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Vérifier
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpForm;
