import { IconStarFilled, IconStarHalfFilled } from "@tabler/icons-react";

const RatingStars = ({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) => {
  // Calculate full stars, half stars, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className={`flex-y gap-1 icon-24 text-primary ${className}`}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, idx) => (
        <IconStarFilled className={className} key={idx} />
      ))}

      {/* Half star */}
      {hasHalfStar && <IconStarHalfFilled />}
    </div>
  );
};

export default RatingStars;
