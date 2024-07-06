import SectionTitle from "../common/SectionTitle";
import SinglePoint from "./SinglePoint";
import pointData from "./pointData";

const PointD = () => {
  return (
    <section
      id="depot"
      className="bg-gray-light  px-10 py-10 dark:bg-black md:py-20 lg:py-25"
    >
      <div className="container">
        <SectionTitle
          title="Nos points de dépôts"
          paragraph="Liste de quelques points de depôts les plus connus."
          center
        />

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {pointData.map((pointD) => (
            <div key={pointD.id} className="w-full">
              <SinglePoint pointD={pointD} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PointD;
