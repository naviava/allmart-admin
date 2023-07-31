// External packages.
import { format } from "date-fns";

// Types.
import { ProductColumn } from "./components/columns";

// Components.
import ProductClient from "./components/product-client";

// Lib and utils.
import prismadb from "@/lib/prismadb";
import { priceFormatter } from "@/lib/utils";

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await prismadb.product.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
    include: { category: true, size: true, color: true },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: priceFormatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
}
