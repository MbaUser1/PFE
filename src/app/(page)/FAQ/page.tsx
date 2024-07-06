import FAQ from "@/components/FAQ";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restore | FAQs",
  description: "Faqs",
  // other metadata
};

const Faq = () => {
  return (
    <>
      <Breadcrumb pageName="FAQs" />
      <FAQ />
    </>
  );
};

export default Faq;
