import React, { useState } from "react";
import ImageBlock from "./ImageBlock";

export interface EditorialCardData {
  id: string | number;
  title: string;
  category?: string;
  type?: string;
  book?: string;
  bookAuthor?: string;
  imageUrl?: string;
  date?: string;
  location?: string;
  leader?: string;
  price?: string;
  status?: string;
}

interface EditorialCardProps {
  data: EditorialCardData;
  isActive?: boolean;
  isAnyActive?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  aspectRatio?: string;
}

export const EditorialCard: React.FC<EditorialCardProps> = ({
  data,
  isActive = false,
  isAnyActive = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
  aspectRatio = "aspect-[4/5]",
}) => {
  const isDimmed = isAnyActive && !isActive;

  return (
    <article
      className={`
        flex flex-col cursor-pointer transition-all duration-700 ease-out-ace group
        ${isDimmed ? "opacity-60 grayscale-[30%]" : "opacity-100 grayscale-0"}
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <ImageBlock
        imageUrl={data.imageUrl}
        altText={data.title}
        isHovered={isActive}
        aspectRatio={aspectRatio}
        fallbackCategory="book"
      />

      {/* Typography & Editorial Details */}
      <div
        className={`
          mt-6 flex flex-col space-y-3 transition-transform duration-700 ease-out-ace
          ${isActive ? "-translate-y-2" : "translate-y-0"}
        `}
      >
        {data.category && (
          <div className="flex items-center space-x-2 font-sans text-xs font-bold tracking-widest text-[#1a1a1a]/60 uppercase">
            <span>{data.category}</span>
            {data.type && <span>— {data.type}</span>}
            {data.status && (
              <span className="ml-auto px-2 py-0.5 text-[10px] bg-[#1a1a1a] text-[#f4f3ee] tracking-widest font-mono">
                {data.status}
              </span>
            )}
          </div>
        )}

        {/* Serif Headline with 3D feel */}
        <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#1a1a1a] leading-tight tracking-tight font-medium group-hover:text-[#8C2318] transition-colors duration-300">
          {data.title}
        </h3>

        {/* Book / Subtitle */}
        {data.book && (
          <p className="font-sans text-base text-[#1a1a1a]/80 leading-relaxed tracking-tightest line-clamp-2">
            {data.book} {data.bookAuthor && <span className="opacity-60">| {data.bookAuthor}</span>}
          </p>
        )}

        {/* Editorial Metadata (Borderless) */}
        {(data.date || data.location || data.leader || data.price) && (
          <div className="pt-4 mt-2 flex flex-col space-y-1.5 font-sans text-xs text-[#1a1a1a]/70 border-t border-[#1a1a1a]/10">
            {data.date && <span>일정: {data.date} {data.location ? `| ${data.location}` : ""}</span>}
            {data.leader && <span>클럽장: {data.leader} {data.price ? `| ${data.price}` : ""}</span>}
          </div>
        )}
      </div>
    </article>
  );
};

interface EditorialListWrapperProps {
  title?: string;
  subtitle?: string;
  children: (hoveredId: string | number | null, setHoveredId: (id: string | number | null) => void) => React.ReactNode;
  className?: string;
}

export const EditorialListWrapper: React.FC<EditorialListWrapperProps> = ({
  title,
  subtitle,
  children,
  className = "",
}) => {
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  return (
    <section
      className={`
        w-full px-6 py-24 md:px-12 lg:px-20 transition-colors duration-700 ease-out-ace
        ${hoveredId !== null ? "bg-[#e8e6df]" : "bg-[#f4f3ee]"}
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="mb-16 md:mb-20">
            {subtitle && (
              <span className="block font-sans text-xs font-bold tracking-widest text-[#1a1a1a]/60 uppercase mb-3">
                {subtitle}
              </span>
            )}
            <h2 className="font-serif text-4xl md:text-6xl text-[#1a1a1a] tracking-tight">
              {title}
            </h2>
          </div>
        )}
        {children(hoveredId, setHoveredId)}
      </div>
    </section>
  );
};

export default EditorialCard;
