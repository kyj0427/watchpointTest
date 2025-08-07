

import Image from "next/image";
import Link from "next/link";
import { proteamData } from "@public/data/proteamData";


const ProTeamRank = () => {


  return (
    <section className="section-pb pt-60p">
      <div className="container" >
        <h2 className="heading-2 text-w-neutral-1 text-split-left mb-3">
            팀 랭킹
        </h2>
        <div className="overflow-x-auto scrollbar-sm">
          <table className="text-l-medium font-poppins text-w-neutral-1 w-full whitespace-nowrap">
            <thead className="text-left">
              <tr className="bg-shap rounded-t-12">
                <th className="text-l-medium px-24p py-3 lg:min-w-[150px] min-w-25">
                  순위
                </th>
                <th className="px-24p py-3 min-w-[100px]">지역</th>
                <th className="px-24p py-3 min-w-[120px]">선수</th>
                <th className="text-l-medium px-24p py-3 lg:min-w-[300px] min-w-[280px]">
                  팀이름
                </th>
                <th className="text-l-medium px-24p py-3 min-w-25">승리</th>
                <th className="text-l-medium px-24p py-3 min-w-25">패배</th>
                <th className="text-l-medium px-24p py-3 min-w-25">게임횟수</th>
                <th className="text-l-medium px-24p py-3 min-w-25">승률</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-solid divide-shap border-b border-shap bg-b-neutral-3">
              {proteamData.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-24p py-3">
                    <div className="flex items-center gap-3">
                      <i className="ti ti-chevrons-up icon-24 text-danger" />
                      <span className="text-l-medium">{item?.순위}</span>
                    </div>
                  </td>

                  <td className="px-24p py-3">
                    <span className="text-l-medium">{item?.지역}</span>
                  </td>

                  <td className="px-24p py-3">
                    <div className="flex items-center *:avatar *:size-10 *:border *:border-white *:-ml-3 ml-3">
                      {item?.선수?.slice(0, 3)?.map((avatar, idx) => (
                        <Image key={idx} src={avatar} alt="heros" />
                      ))}
                    </div>
                  </td>
                  <td className="px-24p py-3">
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.로고}
                        alt={item.팀이름}
                        width={40}
                        height={40}
                      />
                      <span>{item.팀이름}</span>
                    </div>
                  </td>

                  <td className="px-24p py-3">{item?.승리}</td>
                  <td className="px-24p py-3">{item?.패배}</td>
                  <td className="px-24p py-3">{item?.게임횟수}</td>
                  <td className="px-24p py-3">{item?.승률}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이징기능 */}
        {/* <div className="pagination pagination-primary lg:pagination-center pagination-center pagination-circle pagination-xl w-full mt-48p">
          <button className="pagination-item pagination-prev disabled:opacity-50"
            onClick={handlePrevPage}
            disabled={currentPage === 1}>
            <i className="ti ti-chevron-left" />
          </button>
          <div className="pagination-list">
            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
              <button
                key={page}        
                onClick={()=>{handlePageChange(page)}}        
                className={`pagination-item pagination-circle ${
                  page === currentPage ? "active" : ""
                }`}
              >
                <span className="pagination-link">{page}</span>
              </button>
            ))}
            <span className="pagination-item pagination-circle">
              <span className="pagination-link pagination-more">...</span>
            </span>
            <Link href="#" className="pagination-item pagination-circle">
              <span className="pagination-link">10</span>
            </Link>
          </div>
          <button className="pagination-item pagination-next disabled:opacity-50"
            onClick={handleNextPage} disabled={currentPage === totalPages}
          >
            <i className="ti ti-chevron-right" />
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default ProTeamRank;
