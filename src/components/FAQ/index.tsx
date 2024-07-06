"use client";
import { useState } from "react";

const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer: "I don't know, but the flag is a big plus.",
  },
  {
    question: "How do you make holy water?",
    answer: "You boil the hell out of it.",
  },
  {
    question: "What do you call someone with no body and no nose?",
    answer: "Nobody knows.",
  },
  {
    question: "Why do you never see elephants hiding in trees?",
    answer: "Because they're so good at it.",
  },
  {
    question: "Why can't you hear a pterodactyl go to the bathroom?",
    answer: "Because the P is silent.",
  },
  {
    question: "Why did the invisible man turn down the job offer?",
    answer: "He couldn't see himself doing it.",
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
        Questions fréquemment posée s
      </h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            className="border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex w-full items-center justify-between rounded-md border bg-white p-4 text-left dark:text-gray-200"
            onClick={() => toggleFAQ(index)}
          >
            <span>{faq.question}</span>
            <span>{openIndex === index ? "-" : "+"}</span>
          </button>
          {openIndex === index && (
            <div className="border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-b-md border border-t-0 p-4 dark:text-gray-200">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
