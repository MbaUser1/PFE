"use client";
import { useState } from "react";

const faqs = [
  {
    question: "Qu'est-ce que RestoreU ?",
    answer:
      "RestoreU est une plateforme en ligne dédiée à aider les utilisateurs à déclarer et récupérer des documents perdus. Notre objectif est de faciliter la mise en relation entre les personnes ayant perdu des documents et ceux qui les ont trouvés.",
  },
  {
    question: "Comment fonctionne RestoreU",
    answer:
      "Les utilisateurs peuvent déclarer des documents perdus ou trouvés sur notre plateforme. Nous utilisons des outils de géolocalisation pour associer les annonces et faciliter la récupération des documents égarés.",
  },
  {
    question: "Comment déclarer un document perdu ou trouvé?",
    answer:
      "Après vous être connecté, accédez à la section *signaler un document* et remplissez le formulaire avec les détails de votre document.",
  },
  {
    question: "Comment puis-je rechercher des documents perdus ?",
    answer:
      "Utilisez la barre de recherche en haut de la page pour entrer des mots-clés liés à votre document perdu. Vous pouvez aussi filtrer les résultats par région ou type de document.",
  },
  {
    question:
      "Mes informations personnelles sont-elles sécurisées sur RestoreU ?",
    answer:
      "Oui, nous utilisons des protocoles de sécurité avancés, y compris le chiffrement des données et l'authentification multi-facteurs, pour protéger vos informations personnelles.",
  },

  {
    question: "Qui contacter en cas de problème avec la plateforme ?",
    answer:
      "HVous pouvez contacter notre équipe de support via le formulaire de contact sur notre site ou par email à support@restoreu.com.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto my-8 w-full max-w-2xl p-4">
      <h2 className="text-gray-900 mb-4 text-2xl font-bold dark:text-white">
        Questions fréquemment posées
      </h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            className="border-gray-200 dark:border-gray-700 dark:text-gray-200 flex w-full items-center justify-between rounded-md border bg-white p-4 text-left dark:bg-black"
            onClick={() => toggleFAQ(index)}
          >
            <span>{faq.question}</span>
            <span>{openIndex === index ? "-" : "+"}</span>
          </button>
          {openIndex === index && (
            <div className="border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 rounded-b-md border border-t-0 p-4">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
