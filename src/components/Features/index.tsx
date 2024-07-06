import SectionTitle from "../common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section
        id="features"
        className="bg-white px-4 pb-10 pt-1 dark:bg-[#181c24] md:py-10 lg:py-15"
      >
        <div className="container">
          <SectionTitle
            title="Comment RestoreU vous aide?"
            paragraph="Trop facile de retrouver un objet."
            center
            mb="50px"
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
