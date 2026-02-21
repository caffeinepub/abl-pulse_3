import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface TipCardProps {
  icon: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  expandedContent: string;
  expandedContentHindi: string;
}

export function TipCard({
  icon,
  title,
  titleHindi,
  description,
  descriptionHindi,
  expandedContent,
  expandedContentHindi,
}: TipCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-200 ease-in-out border-l-4 space-y-3"
         style={{ borderLeftColor: '#C58F58' }}>
      {/* Icon */}
      <div className="text-5xl">{icon}</div>

      {/* Title - English */}
      <h3 className="font-montserrat font-bold text-lg text-gray-900">
        {title}
      </h3>

      {/* Title - Hindi */}
      <h3 className="font-montserrat font-bold text-lg text-gray-900">
        {titleHindi}
      </h3>

      {/* Description - English */}
      <p className="text-sm leading-relaxed text-gray-700">
        {description}
      </p>

      {/* Description - Hindi */}
      <p className="text-sm leading-relaxed text-gray-700">
        {descriptionHindi}
      </p>

      {/* Accordion Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex flex-row justify-between items-center w-full text-left hover:underline transition-all duration-200 ease-in-out"
        style={{ color: '#C58F58' }}
      >
        <span className="text-sm font-medium">
          Why This Helps / यह कैसे मदद करता है
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ease-in-out ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div
          className="p-4 mt-4 rounded-md border-t text-sm leading-relaxed"
          style={{
            backgroundColor: '#FFF8F0',
            borderTopColor: '#C58F58',
            borderTopWidth: '1px',
          }}
        >
          <p className="text-gray-800 mb-3">{expandedContent}</p>
          <p className="text-gray-800">{expandedContentHindi}</p>
        </div>
      )}
    </div>
  );
}

// Demo/Example instance for testing and verification
export function TipCardDemo() {
  return (
    <TipCard
      icon="🌙"
      title="Establish a consistent sleep routine"
      titleHindi="एक नियमित नींद की दिनचर्या बनाएं"
      description="Going to bed and waking up at the same time every day helps regulate your body's internal clock, improving sleep quality and overall rest. Consistency is key to restorative sleep."
      descriptionHindi="हर दिन एक ही समय पर सोना और जागना आपके शरीर की आंतरिक घड़ी को नियंत्रित करने में मदद करता है, नींद की गुणवत्ता और समग्र आराम में सुधार करता है। पुनर्स्थापनात्मक नींद के लिए निरंतरता महत्वपूर्ण है।"
      expandedContent="According to Ayurveda, the body operates on natural rhythms aligned with the sun and moon cycles. Sleeping by 10 PM allows the body to enter its deepest restorative phase (Pitta time), when cellular repair and detoxification occur. Consistent sleep timing balances all three doshas—Vata, Pitta, and Kapha—leading to improved digestion, mental clarity, and emotional stability. Modern science confirms this through circadian rhythm research, showing that irregular sleep patterns disrupt hormone production, metabolism, and immune function."
      expandedContentHindi="आयुर्वेद के अनुसार, शरीर सूर्य और चंद्रमा चक्रों के साथ संरेखित प्राकृतिक लय पर काम करता है। रात 10 बजे तक सोने से शरीर अपने सबसे गहरे पुनर्स्थापनात्मक चरण (पित्त समय) में प्रवेश करता है, जब कोशिका की मरम्मत और विषहरण होता है। लगातार नींद का समय तीनों दोषों—वात, पित्त और कफ—को संतुलित करता है, जिससे पाचन, मानसिक स्पष्टता और भावनात्मक स्थिरता में सुधार होता है। आधुनिक विज्ञान सर्कैडियन रिदम अनुसंधान के माध्यम से इसकी पुष्टि करता है, यह दर्शाता है कि अनियमित नींद पैटर्न हार्मोन उत्पादन, चयापचय और प्रतिरक्षा कार्य को बाधित करते हैं।"
    />
  );
}
