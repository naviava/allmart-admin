"use client";

// React and Next.
import { useEffect } from "react";

// Custom hooks.
import { useStoreModal } from "@/hooks/use-store-modal";

export default function SetupPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return null;
}
