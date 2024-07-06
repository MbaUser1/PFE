import { PointD } from "@/types/pointD";
import Image from "next/image";
import Link from "next/link";

const SinglePoint = ({ pointD }: { pointD: PointD }) => {
  const { title, paragraph, image, heureO, heureF } = pointD;
  return (
    <>
      <div className="shadow-one hover:shadow-two dark:hover:shadow-gray-dark group relative overflow-hidden rounded-sm bg-white duration-300 dark:bg-[#181c24]">
        <div className="relative block aspect-[37/22] w-full">
          <Image src={image} alt="image" fill />
        </div>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <div className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl">
              {title}
            </div>
          </h3>
          <p className="border-body-color text-body-color mb-6 border-b border-opacity-10 pb-6 text-base font-medium dark:border-white dark:border-opacity-10">
            {paragraph}
          </p>
          <div className="flex items-center">
            <div className="border-body-color mr-5 flex items-center border-r border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
              <div className="w-full">
                <h4 className="text-dark mb-1 text-sm font-medium dark:text-white">
                  Heure ouverture : {heureO}
                </h4>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="text-dark mb-1 text-sm font-medium dark:text-white">
                Heure de Fermeture : {heureF}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePoint;
