import { Stat } from "@/types/stat";

const SingleStat = ({ stat }: { stat: Stat }) => {
  const { icon, designation, paragraph } = stat;

  return (
    <div className="w-full items-center text-center">
      <div className="shadow-two hover:shadow-one dark:shadow-three dark:hover:shadow-gray-dark rounded-sm bg-white p-8 duration-300 dark:bg-black lg:px-5 xl:px-8">
        <div className="flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
          {icon}
        </div>
        <h3 className=" text-dark text-lg font-semibold dark:text-white lg:text-base xl:text-lg">
          {designation}
        </h3>
        <p className="border-body-color text-body-color border-b border-opacity-10 text-base leading-relaxed dark:border-white dark:border-opacity-10 dark:text-white">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleStat;
