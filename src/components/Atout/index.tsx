import SectionTitle from "../common/SectionTitle";
import SingleAtout from "./singleAtout";
import atoutData from "./atoutData";

const Atouts = () => {
  return (
    <>
      <section
        id="atout"
        className="bg-gray-light px-4 py-10 dark:bg-black md:py-20 lg:py-25"
      >
        <div className="container">
          <SectionTitle title="Nos Atouts" paragraph="" center mb="50px" />
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {atoutData.map((atout) => (
              <SingleAtout key={atout.id} atout={atout} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Atouts;
