// React and Next.
import { redirect } from "next/navigation";

// External packages.
import { auth } from "@clerk/nextjs";

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
      <div>This will be a NavBar</div>
      {children}
    </>
  );
}
