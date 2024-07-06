import SectionTitle from "../common/SectionTitle";
import Image from "next/image";

const Partenaire = () => {
  return (
    <section
      id="partenaire"
      className=" bg-white px-3 py-10 dark:bg-[#181c24] md:py-20 lg:py-25"
    >
      <div className="container">
        <SectionTitle
          title="Nos Partenaires"
          paragraph="Ceux qui non seulement nous font confiance mais croient aussi en nos connaissances, notre savoir-faire, notre esprit d'équipe et notre détermination."
          center
          width="700px"
          mb="50px"
        />

        <div className="flex items-center justify-center">
          <div className="grid  gap-x-8 gap-y-10 ">
            <Image
              src="/images/partenaires/cmr.png"
              alt="image"
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partenaire;
