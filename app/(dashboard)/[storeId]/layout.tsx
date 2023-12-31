// React and Next.
import { redirect } from "next/navigation";

// External packages.
import { auth } from "@clerk/nextjs";

// Components.
import Navbar from "@/components/navbar";

// Lib and utils.
import prismadb from "@/lib/prismadb";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId },
  });

  if (!store) redirect("/");

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
