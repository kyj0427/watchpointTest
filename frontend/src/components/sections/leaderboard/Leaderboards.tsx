import { leaderboards } from "@public/data/leaderboard";
import Image from "next/image";
import Link from "next/link";

const Leaderboards = () => {
  return (
    <section className="section-pb pt-60p">
      <div className="container">
        <div className="overflow-x-auto scrollbar-sm">
          <table className="text-l-medium font-poppins text-w-neutral-1 w-full whitespace-nowra">
            <thead className="text-left">
              <tr className="bg-shap rounded-t-12">
                <th className="text-l-medium px-24p py-3 lg:min-w-[150px] min-w-25">
                  Placement
                </th>
                <th className="text-l-medium px-24p py-3 lg:min-w-[300px] min-w-[280px]">
                  Team Name
                </th>
                <th className="text-l-medium px-24p py-3 min-w-[216px]">
                  Roster
                </th>
                <th className="text-l-medium px-24p py-3 min-w-25">Win</th>
                <th className="text-l-medium px-24p py-3 min-w-25">Lose</th>
                <th className="text-l-medium px-24p py-3 min-w-25">Played</th>
                <th className="text-l-medium px-24p py-3 min-w-25">Ratio</th>
                <th className="text-l-medium px-24p py-3 min-w-25">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-solid divide-shap border-b border-shap bg-b-neutral-3">
              {leaderboards?.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-24p py-3">
                    <div className="flex-y gap-3">
                      <i className="ti ti-chevrons-up icon-24 text-danger"></i>
                      <span className="text-l-medium">{item?.placement}</span>
                    </div>
                  </td>
                  <td className="px-24p py-3">
                    <div className="flex items-center gap-20p">
                      <Image
                        className="avatar size-60p shrink-0"
                        src={item?.teamImage}
                        alt="team"
                      />
                      <div>
                        <span className="text-m-medium text-danger mb-1">
                          {item?.teamRank}
                        </span>
                        <Link
                          href={item?.placement}
                          className="text-l-medium text-w-neutral-1 link-1 line-clamp-1"
                        >
                          {item?.teamName}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-24p py-3">
                    <div className="flex items-center *:avatar *:size-10 *:border *:border-white *:-ml-3 ml-3">
                      {item?.roster?.slice(0, 5)?.map((avatar, idx) => (
                        <Image key={idx} src={avatar} alt="user" />
                      ))}
                    </div>
                  </td>
                  <td className="px-24p py-3">{item?.win}</td>
                  <td className="px-24p py-3">{item?.lose}</td>
                  <td className="px-24p py-3">{item?.played}</td>
                  <td className="px-24p py-3">{item?.ratio}%</td>
                  <td className="px-24p py-3">{item?.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination pagination-primary lg:pagination-center pagination-center pagination-circle pagination-xl w-full mt-48p">
          <Link href="#" className="pagination-item pagination-prev">
            <i className="ti ti-chevron-left"></i>
          </Link>
          <div className="pagination-list">
            <Link href="#" className="pagination-item pagination-circle active">
              <span className="pagination-link">1</span>
            </Link>
            <Link href="#" className="pagination-item pagination-circle">
              <span className="pagination-link">2</span>
            </Link>
            <Link href="#" className="pagination-item pagination-circle">
              <span className="pagination-link">3</span>
            </Link>
            <Link href="#" className="pagination-item pagination-circle">
              <span className="pagination-link">4</span>
            </Link>
            <Link href="#" className="pagination-item pagination-circle">
              <span className="pagination-link">5</span>
            </Link>
            <Link href="#" className="pagination-item pagination-circle">
              <span className="pagination-link pagination-more">...</span>
            </Link>
            <Link href="#" className="pagination-item pagination-circle">
              <span className="pagination-link">10</span>
            </Link>
          </div>
          <Link href="#" className="pagination-item pagination-next">
            <i className="ti ti-chevron-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Leaderboards;
