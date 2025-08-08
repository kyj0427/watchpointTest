import { userranks } from "@public/data/userrankData";
import Image from "next/image";
import Link from "next/link";

// 선택: 티어 문자열 → 이미지로 매핑하려면 추가
// import gm from "@public/images/ranks/gm.png"; ...
// const getTierImage = (tier: string) => ...

const UserRankComp = () => {
  return (
    <section className="section-pb pt-60p">
      <div className="container">
        <div className="overflow-x-auto scrollbar-sm">
          <table className="text-l-medium font-poppins text-w-neutral-1 w-full whitespace-nowrap">
            <thead className="text-left">
              <tr className="bg-shap rounded-t-12">
                <th className="text-l-medium px-24p py-3 lg:min-w-[150px] min-w-25">순위</th>
                <th className="px-24p py-3 min-w-[100px]">티어</th>
                <th className="px-24p py-3 min-w-[120px]">주영웅</th>
                <th className="text-l-medium px-24p py-3 lg:min-w-[300px] min-w-[280px]">플레이어</th>
                <th className="text-l-medium px-24p py-3 min-w-25">승리</th>
                <th className="text-l-medium px-24p py-3 min-w-25">패배</th>
                <th className="text-l-medium px-24p py-3 min-w-25">게임횟수</th>
                <th className="text-l-medium px-24p py-3 min-w-25">승률</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-solid divide-shap border-b border-shap bg-b-neutral-3">
              {userranks?.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-24p py-3">
                    <div className="flex items-center gap-3">
                      <i className="ti ti-chevrons-up icon-24 text-danger" />
                      <span className="text-l-medium">{item?.순위}</span>
                    </div>
                  </td>

                  <td className="px-24p py-3">
                    <span className="text-l-medium">{item?.티어}</span>
                  </td>

                  <td className="px-24p py-3">
                    <div className="flex items-center *:avatar *:size-10 *:border *:border-white *:-ml-3 ml-3">
                      {item?.주영웅?.slice(0, 3)?.map((avatar, idx) => (
                        <Image key={idx} src={avatar} alt="heros" />
                      ))}
                    </div>
                  </td>
                  <td className="px-24p py-3">{item?.플레이어}</td>

                  <td className="px-24p py-3">{item?.승리}</td>
                  <td className="px-24p py-3">{item?.패배}</td>
                  <td className="px-24p py-3">{item?.게임횟수}</td>
                  <td className="px-24p py-3">{item?.승률}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination pagination-primary lg:pagination-center pagination-center pagination-circle pagination-xl w-full mt-48p">
          <Link href="#" className="pagination-item pagination-prev">
            <i className="ti ti-chevron-left" />
          </Link>
          <div className="pagination-list">
            {[1, 2, 3, 4, 5].map((page) => (
              <Link
                key={page}
                href="#"
                className={`pagination-item pagination-circle ${page === 1 ? "active" : ""}`}
              >
                <span className="pagination-link">{page}</span>
              </Link>
            ))}
            <span className="pagination-item pagination-circle">
              <span className="pagination-link pagination-more">...</span>
            </span>
            <Link href="#" className="pagination-item pagination-circle">
              <span className="pagination-link">10</span>
            </Link>
          </div>
          <Link href="#" className="pagination-item pagination-next">
            <i className="ti ti-chevron-right" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UserRankComp;
