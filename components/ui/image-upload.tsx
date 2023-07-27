"use client";

// React and Next.
import { useEffect, useState } from "react";
import Image from "next/image";

// External packages.
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

// Components.
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

export default function ImageUpload({
  value,
  disabled,
  onChange,
  onRemove,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  function onUpload(result: any) {
    onChange(result.info.secure_url);
  }

  if (!isMounted) return null;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => onRemove(url)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill src={url} alt="Image" className="object-cover" />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="x6yjf4az">
        {({ open }) => {
          const onClick = () => open();
          return (
            <Button
              type="button"
              variant="secondary"
              disabled={disabled}
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
