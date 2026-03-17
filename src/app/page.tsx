import Crossword from "@/components/Crossword";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-12 px-4 gap-12">
      <header className="text-center space-y-2">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
          Química Mexicana
        </h1>

      </header>

      <section className="w-full max-w-7xl">
        <Crossword />
      </section>

      <footer className="mt-auto pt-12 text-gray-500 text-sm">
        Desarrollado para el TecNM Campus Zitacuaro.
      </footer>
    </main>
  );
}
