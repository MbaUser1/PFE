"use client";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

declare global {
  interface Window {
    CinetPay: any;
  }
}

const UpgradeToPremium = () => {
  const apiKey = process.env.API_KEY || "";
  const siteId = process.env.SITE_ID || "";
  const notifyUrl = process.env.NOTIFY_URL || "";

  useEffect(() => {
    // Charger le script CinetPay seulement côté client
    const script = document.createElement("script");
    script.src = "https://cdn.cinetpay.com/seamless/main.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.CinetPay) {
        window.CinetPay.setConfig({
          apikey: "52299249666a35af675c81.82838404",
          site_id: "5873821",
          notify_url: "http://mondomaine.com/notify/",
          mode: "PRODUCTION",
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleUpgrade = () => {
    if (!window.CinetPay) {
      console.error("CinetPay script not loaded");
      return;
    }

    window.CinetPay.getCheckout({
      transaction_id: Math.floor(Math.random() * 100000000).toString(), // YOUR TRANSACTION ID
      amount: 1000,
      currency: "XAF",
      channels: "ALL",
      description: "Upgrade to Premium",
      customer_name: "Joe", // Le nom du client
      customer_surname: "Down", // Le prenom du client
      customer_email: "down@test.com", // l'email du client
      customer_phone_number: "656932636", // le numéro de téléphone du client
      customer_address: "BP 0024", // adresse du client
      customer_city: "Antananarivo", // La ville du client
      customer_country: "CM", // le code ISO du pays
      customer_state: "CM", // le code ISO de l'état
      customer_zip_code: "06510", // code postal
    });

    // window.CinetPay.waitResponse((data: any) => {
    //     if (data.status === 'REFUSED') {
    //         if (alert('Votre paiement a échoué')) {
    //             window.location.reload();
    //         }
    //     } else if (data.status === 'ACCEPTED') {
    //         if (alert('Votre paiement a été effectué avec succès')) {
    //             window.location.reload();
    //         }
    //     }
    // });

    window.CinetPay.onError((data: any) => {
      console.error(data);
    });
  };

  return (
    <div className="bg-gray-100 fixed inset-0 flex items-center justify-center p-4">
      <div className="W-10 w-full max-w-md rounded-lg bg-white   p-6 text-center shadow-lg">
        <h2 className="text-gray-800 mb-4 text-2xl font-bold">
          Passez à un compte Premium
        </h2>
        <p className="text-gray-600 mb-6">
          Profitez de fonctionnalités exclusives et une expérience améliorée.
        </p>
        <ul className="text-gray-600 mb-6 text-left">
          <li className="mb-2 flex items-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="mr-2 h-5 w-5 text-green-500"
            />
            Notifications par SMS en cas de pièce trouvée
          </li>
          <li className="mb-2 flex items-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="mr-2 h-5 w-5 text-green-500"
            />
            Accès à toutes les fonctionnalités
          </li>
          <li className="mb-2 flex items-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="mr-2 h-5 w-5 text-green-500"
            />
            Mises à jour régulières
          </li>
        </ul>
        <button
          onClick={handleUpgrade}
          className="w-full rounded bg-blue-600 px-4 py-2 font-bold text-white transition duration-300 hover:bg-blue-700"
        >
          Devenir Premium
        </button>
      </div>
    </div>
  );
};

export default UpgradeToPremium;
