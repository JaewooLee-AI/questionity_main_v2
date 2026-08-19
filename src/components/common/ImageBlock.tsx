import React, { useState } from "react";

interface ImageBlockProps {
  imageUrl?: string;
  altText: string;
  isHovered?: boolean;
  aspectRatio?: string;
  className?: string;
  fallbackCategory?: "book" | "space" | "general";
}

const FALLBACK_IMAGES = {
  book: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80",
  space: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  general: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
};

export const ImageBlock: React.FC<ImageBlockProps> = ({
  imageUrl,
  altText,
  isHovered = false,
  aspectRatio = "aspect-[4/5]",
  className = "",
  fallbackCategory = "book",
}) => {
  const [hasError, setHasError] = useState(false);
  const fallback = FALLBACK_IMAGES[fallbackCategory];
  const finalSrc = hasError || !imageUrl ? fallback : imageUrl;

  return (
    <div
      className={`
        relative w-full ${aspectRatio} overflow-hidden bg-[#e8e6df]
        transition-all duration-700 ease-out-ace
        ${isHovered ? "-translate-y-2.5 shadow-2xl" : "translate-y-0 shadow-none"}
        ${className}
      `}
    >
      <img
        src={finalSrc}
        alt={altText}
        onError={() => setHasError(true)}
        className={`
          w-full h-full object-cover transition-transform duration-700 ease-out-ace
          ${isHovered ? "scale-105" : "scale-100"}
        `}
      />
      {/* Subtle overlay transition */}
      <div
        className={`
          absolute inset-0 bg-black transition-opacity duration-700 ease-out-ace pointer-events-none
          ${isHovered ? "opacity-0" : "opacity-10"}
        `}
      />
    </div>
  );
};

export default ImageBlock;
