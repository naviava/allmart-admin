// Components.
import SizeForm from "./components/size-form";

// Lib and utils.
import prismadb from "@/lib/prismadb";

interface SizePageProps {
  params: { sizeId: string };
}

export default async function SizePage({ params }: SizePageProps) {
  const size = await prismadb.size.findUnique({
    where: { id: params.sizeId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
}
