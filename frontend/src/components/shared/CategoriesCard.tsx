import { categoriesType } from "@/config/types";
import { random } from "gsap";
import Link from "next/link";

const CategoriesCard = ({ categories }: { categories: categoriesType[] }) => {
  return (
    <div>
      <h4 className="heading-4 text-w-neutral-1 mb-20p">Category</h4>
      <ul className="grid grid-cols-1 gap-16p *:flex-y *:justify-between text-m-regular text-w-neutral-1">
        {categories?.map((item, idx) => (
          <li key={idx}>
            <Link href="#" className="hover:text-secondary transition-1">
              {item?.categoryName}
            </Link>
            <span className="text-w-neutral-4">({item?.id})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesCard;
