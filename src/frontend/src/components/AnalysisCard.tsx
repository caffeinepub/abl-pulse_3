interface AnalysisCardProps {
  titleEn: string;
  titleHi: string;
  items: string[];
  cardType: 'problems' | 'suggestions';
  language: 'en' | 'hi';
}

export function AnalysisCard({
  titleEn,
  titleHi,
  items,
  cardType,
  language,
}: AnalysisCardProps) {
  const bgColor = cardType === 'problems' ? 'bg-red-50' : 'bg-green-50';

  return (
    <div className={`${bgColor} rounded-lg p-5 space-y-3`}>
      <h3 className="font-semibold text-gray-900 text-base">
        {titleEn}
      </h3>
      <p className="text-sm text-gray-600">{titleHi}</p>

      {items.length > 0 ? (
        cardType === 'problems' ? (
          <p className="text-sm text-gray-700 leading-relaxed">
            {items.join(', ')}
          </p>
        ) : (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-green-600 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )
      ) : (
        <p className="text-sm text-gray-500 italic">
          {language === 'en' ? 'No issues detected' : 'कोई समस्या नहीं मिली'}
        </p>
      )}
    </div>
  );
}
