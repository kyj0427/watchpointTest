import { tagType } from "@/config/types";
import Link from "next/link";

const TagsCard = ({ tags }: { tags: tagType[] }) => {
  return (
    <div>
      <h4 className="heading-4 text-w-neutral-1 mb-20p">Tags</h4>
      <div className="tag">
        {tags?.map((item, idx) => (
          <Link key={idx} href={item.url} className="tag-item tag-neutral-4">
            {item?.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsCard;
