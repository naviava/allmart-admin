"use client";

// React and Next.
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// External packages.
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Custom hooks.
import useOrigin from "@/hooks/use-origin";

// Types.
import { Store } from "@prisma/client";

// Components.
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ApiAlert from "@/components/ui/api-alert";
import { Separator } from "@/components/ui/separator";
import AlertModal from "@/components/modals/alert-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({ name: z.string().min(1) });

type SettingsFormValues = z.infer<typeof formSchema>;

interface SettingsFormProps {
  initialData: Store;
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  async function onSubmit(data: SettingsFormValues) {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Store updated");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete() {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store deleted");
    } catch (err) {
      toast.error("Make sure you removed all products and categories first");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          variant="destructive"
          size="icon"
          disabled={loading}
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <Button type="submit" disabled={loading} className="ml-auto">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
}
