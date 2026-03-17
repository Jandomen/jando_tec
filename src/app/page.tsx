import Crossword from "@/components/Crossword";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-6 md:py-12 px-2 md:px-4 gap-6 md:gap-12 w-full max-w-[100vw] overflow-x-hidden">
      <header className="text-center space-y-1 px-2">
        <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
          Química Mexicana
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-sm md:max-w-2xl mx-auto">
          Cuestionario interactivo sobre la abundancia de elementos químicos en México.
        </p>
      </header>

      <section className="w-full max-w-7xl">
        <Crossword />
      </section>

      <footer className="mt-auto py-6 text-gray-400 text-[10px] md:text-xs">
        Desarrollado para el TecNM Campus Zitacuaro.
      </footer>
    </main>
  );
}
