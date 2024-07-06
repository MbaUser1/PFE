import NewsLatterBox from "./NewsLatterBox";
import SectionTitle from "../common/SectionTitle";

const Contact = () => {
  return (
    <section
      id="contact"
      className="overflow-hidden py-10 dark:bg-[#181c24] md:py-20 lg:py-25"
    >
      <div className="container">
        <SectionTitle
          title="Contactez Nous"
          paragraph="Pour toute demande ou suggestion merci de nous contacter en remplissant le formulaire ci-dessous."
          center
          mb="50px"
        />
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="shadow-three mb-12 rounded-sm bg-white px-8 py-11 dark:bg-black sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Besoin aide ?
              </h2>
              <p className="text-body-color mb-12 text-base font-medium">
                Laissez-nous un message par email.
              </p>
              <form>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="text-dark mb-3 block text-sm font-medium dark:text-white"
                      >
                        Votre Nom
                      </label>
                      <input
                        type="text"
                        placeholder="Entrez votre nom"
                        className="text-body-color dark:text-body-color-dark dark:shadow-two w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="text-dark mb-3 block text-sm font-medium dark:text-white"
                      >
                        Votre Email
                      </label>
                      <input
                        type="email"
                        placeholder="Entrez votre email"
                        className="text-body-color dark:text-body-color-dark dark:shadow-two w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="text-dark mb-3 block text-sm font-medium dark:text-white"
                      >
                        Votre Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Entrez votre Message"
                        className="text-body-color dark:text-body-color-dark dark:shadow-two w-full resize-none rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button className="shadow-submit dark:shadow-submit-dark rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                      Envoyer
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
