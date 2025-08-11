interface GenericUpdate {
  title: string;
  description: string;
  descriptionList: string[];
}

export default function GenericUpdates({ updates }: { updates: GenericUpdate[] }) {
  if (!updates?.length) return null;

  return (
    <div className="pt-32 pb-52">
      <h2 className="text-2xl font-semibold mb-6 text-white">🛠 일반 변경사항</h2>

      <div className="flex flex-col gap-4">
        {updates.map((section, idx) => (
          <div
            key={idx}
            className="bg-gray-100 rounded-md p-4 shadow-sm"
          >
            <h3 className="text-lg font-bold mb-2 text-gray-900">{section.title}</h3>

            {section.descriptionList.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                {section.descriptionList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : section.description ? (
              <div
                className="text-gray-700 prose prose-sm"
                dangerouslySetInnerHTML={{ __html: section.description }}
              />
            ) : (
              <p className="text-gray-500 italic">내용 없음</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
