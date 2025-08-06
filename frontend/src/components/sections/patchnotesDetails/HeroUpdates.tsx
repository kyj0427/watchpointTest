interface HeroUpdate {
  heroName: string;
  heroIcon: string;
  patchUpdateList: string[];
}

export default function HeroUpdates({ updates }: { updates: HeroUpdate[] }) {
  if (!updates?.length) return null;

  return (
    <div className="pt-32 pb-52">
      <h2 className="text-2xl font-semibold mb-6 text-white"> 영웅 변경사항</h2>

      <div className="flex flex-col gap-4">
        {updates.map((hero, idx) => (
          <details
            key={idx}
            className="bg-gray-200 text-gray-900 rounded-md p-4 shadow-md"
          >
            <summary className="cursor-pointer flex items-center gap-3 text-lg font-semibold">
              <img src={hero.heroIcon} alt={hero.heroName} className="w-8 h-8 rounded-full" />
              <span>{hero.heroName}</span>
            </summary>

            <ul className="list-disc pl-6 mt-3 space-y-1 text-base text-gray-800">
              {hero.patchUpdateList.length > 0 ? (
                hero.patchUpdateList.map((line, i) => <li key={i}>{line}</li>)
              ) : (
                <li className="text-gray-500">변경 없음</li>
              )}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}
