// Components.
import ColorForm from "./components/color-form";

// Lib and utils.
import prismadb from "@/lib/prismadb";

interface ColorPageProps {
  params: { colorId: string };
}

export default async function ColorPage({ params }: ColorPageProps) {
  const color = await prismadb.color.findUnique({
    where: { id: params.colorId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
}
