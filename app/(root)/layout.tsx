// React and Next.
import { redirect } from "next/navigation";

// External packages.
import { auth } from "@clerk/nextjs";

// Lib and utils.
import prismadb from "@/lib/prismadb";

interface SetupLayoutProps {
  children: React.ReactNode;
}

export default async function SetupLayout({ children }: SetupLayoutProps) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({ where: { userId } });
  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
}
