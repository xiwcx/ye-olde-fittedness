import Link from "next/link";

type MainLayoutProps = { children: React.ReactNode };

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <header className="bg-base-300 p-4">
        <h1 className="text-xl">Ye Olde Fittedness</h1>
        <nav className="flex gap-2">
          <Link href="/">home</Link>
          <Link href="/lifts">lifts</Link>
          <Link href="/exercises">exercises</Link>
        </nav>
      </header>

      <main className="p-4">{children}</main>
    </>
  );
};
