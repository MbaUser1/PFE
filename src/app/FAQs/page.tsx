import FAQ from "@/components/FAQ";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function Home() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <DefaultLayout>
        <main className="container mx-auto p-4">
          <FAQ />
        </main>
      </DefaultLayout>
    </div>
  );
}
