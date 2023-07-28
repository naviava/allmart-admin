// Components.
import CategoryForm from "./components/category-form";

// Lib and utils.
import prismadb from "@/lib/prismadb";

interface CategoryPageProps {
  params: { categoryId: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await prismadb.category.findUnique({
    where: { id: params.categoryId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
}
