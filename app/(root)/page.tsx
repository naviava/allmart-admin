"use client";

// React and Next.
import { useEffect } from "react";

// Custom hooks.
import { useStoreModal } from "@/hooks/use-store-modal";

// Components.
import Modal from "@/components/ui/modal";

export default function HomePage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return <div className="p-4">Hello World!</div>;
}
