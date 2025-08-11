import RatingStars from "./RatingStars";

const RatingStarsInput = ({
    rating,
    setRating,
    }: {
    rating: number;
    setRating: (r: number) => void;
    }) => {
    const options = Array.from({ length: 11 }, (_, i) => i * 0.5);

    return (
        <div>
        <select
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            className="bg-b-neutral-2 text-white px-3 py-2 rounded-md outline-none"
        >
            {options.map((value) => (
            <option key={value} value={value}>
                {value} 점
            </option>
            ))}
        </select>

        <div className="mt-2">
            <RatingStars rating={rating} />
        </div>
        </div>
    );
};

export default RatingStarsInput;
