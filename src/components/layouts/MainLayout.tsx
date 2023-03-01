import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { G } from "@mobily/ts-belt";
import { Button } from "../inputs";
import { GiWeightLiftingUp } from "react-icons/gi";
import {
  RiAddBoxLine,
  RiListUnordered,
  RiLoginBoxLine,
  RiLogoutBoxLine,
} from "react-icons/ri";

const iconSize = 32;

export default function AuthButton() {
  const { data: session } = useSession();

  return G.isObject(session) ? (
    <Button onClick={() => signOut()}>
      <RiLoginBoxLine size={iconSize} />
    </Button>
  ) : (
    <Button onClick={() => signIn()}>
      <RiLogoutBoxLine size={iconSize} />
    </Button>
  );
}

type MainLayoutProps = { children: React.ReactNode };

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <header className="fixed bottom-0 w-full bg-base-300 p-4">
        <nav className="grid grid-cols-4 gap-2">
          <AuthButton />

          <Link className="btn" href="/exercises">
            <GiWeightLiftingUp size={iconSize} />
          </Link>
          <Link className="btn" href="/">
            <RiListUnordered size={iconSize} />
          </Link>
          <Link className="btn" href="/lifts/add">
            <RiAddBoxLine size={iconSize} />
          </Link>
        </nav>
      </header>

      <main className="mb-32 p-4">{children}</main>
    </>
  );
};
