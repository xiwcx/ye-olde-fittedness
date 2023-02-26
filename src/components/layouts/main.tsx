import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { G } from "@mobily/ts-belt";
import { Button } from "../inputs";

export default function AuthButton() {
  const { data: session } = useSession();

  return G.isObject(session) ? (
    <Button onClick={() => signOut()}>Sign out</Button>
  ) : (
    <Button onClick={() => signIn()}>Sign in</Button>
  );
}

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
          <AuthButton />
        </nav>
      </header>

      <main className="p-4">{children}</main>
    </>
  );
};
