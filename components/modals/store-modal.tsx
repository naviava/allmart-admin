"use client";

// Custom hooks.
import { useStoreModal } from "@/hooks/use-store-modal";

// Components.
import Modal from "@/components/ui/modal";

interface StoreModalProps {}

export default function StoreModal({}: StoreModalProps) {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage it's products and categories."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      StoreModal
    </Modal>
  );
}
