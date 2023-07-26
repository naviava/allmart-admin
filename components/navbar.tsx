// React and Next.
import { redirect } from "next/navigation";

// External packages.
import { UserButton, auth } from "@clerk/nextjs";

// Components.
import MainNav from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";

// Lib and utils.
import prismadb from "@/lib/prismadb";

interface NavbarProps {}

export default async function Navbar({}: NavbarProps) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const stores = await prismadb.store.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
