"use client";

// React and Next.
import { useEffect, useState } from "react";

// Components.
import StoreModal from "@/components/modals/store-modal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <>
      <StoreModal />
    </>
  );
}
