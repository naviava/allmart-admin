// React and Next.
import { redirect } from "next/navigation";

// External packages.
import { auth } from "@clerk/nextjs";

// Components.
import SettingsForm from "./components/settings-form";

// Lib and utils.
import prismadb from "@/lib/prismadb";

interface SettingsPageProps {
  params: { storeId: string };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { userId } = auth();
  if (!userId) redirect("sign-in");

  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId },
  });
  if (!store) redirect("/");

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}
