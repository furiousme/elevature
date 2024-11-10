import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className="debug container mx-auto">
        <header className="p-5">
          <Link href="/" className="text-xl font-bold uppercase">
            Elevature
          </Link>
        </header>
        <main className="flex flex-1">
          <div className="mx-auto flex flex-col items-center justify-center gap-4 p-5 pt-8">
            <h1 className="text-4xl font-bold">Career Skill Quiz & Suggestions</h1>
            <p className="text-xl">Find your path, master new skills.</p>
            <Link href="/search" className="btn btn-primary">
              Get started
            </Link>
          </div>
        </main>
        <footer className=""></footer>
      </div>
    </div>
  );
}
