"use client";

// react and Next.
import { useParams, useRouter } from "next/navigation";

// External packages.
import { Plus } from "lucide-react";

// Types.
import { OrderColumn, columns } from "./columns";

// Components.
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface OrderClientProps {
  data: OrderColumn[];
}

export default function OrderClient({ data }: OrderClientProps) {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="View orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
}
