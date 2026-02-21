import { Link } from '@tanstack/react-router';
import { ArrowLeft, FileText, Code, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function LogicCorrectionDocsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[#2D5F3F] hover:text-[#1a3d28] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </Link>
          <img 
            src="/assets/ABL Logo (6).png" 
            alt="ABL Pulse" 
            className="h-10"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <FileText className="w-8 h-8 text-[#2D5F3F]" />
            <h1 className="text-3xl md:text-4xl font-bold text-[#2D5F3F]">
              Logic Correction Format
            </h1>
          </div>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            लॉजिक अपडेट फॉर्मेट | Use this template to document any logic corrections or feature updates
          </p>
        </div>

        {/* Introduction Card */}
        <Card className="border-[#2D5F3F] border-2">
          <CardHeader>
            <CardTitle className="text-xl text-[#2D5F3F]">📋 How to Use This Format</CardTitle>
            <CardDescription className="text-base">
              इस फॉर्मेट का उपयोग करके आप किसी भी logic update को structured तरीके से submit कर सकते हैं।
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-700">
              <strong>Purpose:</strong> This format ensures clear communication between you and the development team for any logic corrections, feature updates, or behavioral changes needed in the application.
            </p>
            <p className="text-sm text-gray-700">
              <strong>Benefits:</strong> Clear documentation, no miscommunication, faster implementation, easy tracking, and version history maintenance.
            </p>
          </CardContent>
        </Card>

        {/* Template Format */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-[#EBF3ED]">
            <CardTitle className="text-2xl text-[#2D5F3F] flex items-center gap-2">
              <Code className="w-6 h-6" />
              Logic Update Request Template
            </CardTitle>
            <CardDescription className="text-base">
              टेम्पलेट फॉर्मेट | Copy and fill this template for your logic updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Section 1: SECTION */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-[#2D5F3F]">1</Badge>
                <h3 className="text-lg font-semibold text-[#2D5F3F]">SECTION (कौनसा section update करना है)</h3>
              </div>
              <div className="pl-8 space-y-2 text-sm">
                <p className="text-gray-600">Select which section needs updating:</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" disabled />
                    <span>Section 1 (Foundation)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" disabled />
                    <span>Section 2 (Fuel)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" disabled />
                    <span>Section 3 (Mind)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" disabled />
                    <span>Section 4 (Motion)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" disabled />
                    <span>Primary Problem Logic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" disabled />
                    <span>Suggestions Generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" disabled />
                    <span>Medical History Integration</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 2: CURRENT BEHAVIOR */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-[#2D5F3F]">2</Badge>
                <h3 className="text-lg font-semibold text-[#2D5F3F]">CURRENT BEHAVIOR (अभी क्या हो रहा है)</h3>
              </div>
              <div className="pl-8 space-y-2">
                <p className="text-sm text-gray-600">Describe what is currently happening:</p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm italic text-gray-700">
                    Example: "Section 2 में 17/40 score पर sirf 'Alert' दिख रहा है, कोई specific nutrition suggestions नहीं"
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 3: EXPECTED BEHAVIOR */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-[#2D5F3F]">3</Badge>
                <h3 className="text-lg font-semibold text-[#2D5F3F]">EXPECTED BEHAVIOR (क्या होना चाहिए)</h3>
              </div>
              <div className="pl-8 space-y-2">
                <p className="text-sm text-gray-600">Describe what should happen instead:</p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm italic text-gray-700 mb-2">
                    Example: "Section 2 में 17/40 score पर यह suggestions दिखने चाहिए:"
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                    <li>Start morning herbal drink (methi/jeera water)</li>
                    <li>Add 1 tsp seeds (flax/chia/sunflower) daily</li>
                    <li>Try 12-hour fasting window</li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 4: CONDITION/RULE */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-[#2D5F3F]">4</Badge>
                <h3 className="text-lg font-semibold text-[#2D5F3F]">CONDITION/RULE (कब trigger होना चाहिए)</h3>
              </div>
              <div className="pl-8 space-y-2">
                <p className="text-sm text-gray-600">Define the condition or rule:</p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-xs">
                  <p className="text-gray-700">IF Section_2_Score &lt; 20 THEN</p>
                  <p className="text-gray-700 ml-4">Show Nutrition Alert Suggestions</p>
                  <p className="text-gray-700">ELSE IF Section_2_Score &lt; 30 THEN</p>
                  <p className="text-gray-700 ml-4">Show Mild Improvement Tips</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 5: MEDICAL HISTORY LINK */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-[#2D5F3F]">5</Badge>
                <h3 className="text-lg font-semibold text-[#2D5F3F]">MEDICAL HISTORY LINK (कोई medical condition relevant है?)</h3>
              </div>
              <div className="pl-8 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" disabled />
                    <span>Sugar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" disabled />
                    <span>BP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" disabled />
                    <span>Thyroid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" disabled />
                    <span>None</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-3">
                  <p className="text-sm italic text-gray-700">
                    Example: "Agar user ne Sugar = Yes select kiya ho, to Section 2 suggestions में sugar-free alternatives add karein"
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 6: PRIORITY */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-[#2D5F3F]">6</Badge>
                <h3 className="text-lg font-semibold text-[#2D5F3F]">PRIORITY (कितना urgent है)</h3>
              </div>
              <div className="pl-8 space-y-2">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" disabled />
                    <Badge variant="destructive">High</Badge>
                    <span className="text-gray-600">(Results page directly affect)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" disabled />
                    <Badge className="bg-amber-500">Medium</Badge>
                    <span className="text-gray-600">(Suggestions improvement)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" disabled />
                    <Badge variant="secondary">Low</Badge>
                    <span className="text-gray-600">(Minor text/wording change)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Example Entries */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#2D5F3F] flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            Example Entries | उदाहरण
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {/* Example 1: Medical History Integration */}
            <AccordionItem value="example-1" className="border-2 border-[#2D5F3F] rounded-lg overflow-hidden">
              <AccordionTrigger className="px-6 py-4 bg-[#EBF3ED] hover:bg-[#d5e7d9] text-left">
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-500">High Priority</Badge>
                  <span className="font-semibold text-[#2D5F3F]">Example #1: Medical History Integration (Sugar-Specific Tips)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 space-y-4 bg-white">
                {/* Section */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2D5F3F] flex items-center gap-2">
                    <Badge variant="outline">1</Badge>
                    SECTION
                  </h4>
                  <div className="pl-6 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Suggestions Generation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Medical History Integration</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Current Behavior */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2D5F3F] flex items-center gap-2">
                    <Badge variant="outline">2</Badge>
                    CURRENT BEHAVIOR
                  </h4>
                  <div className="pl-6 bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-sm text-gray-700">
                      "Small Habit Suggestions" section में sirf generic tips दिख रहे हैं जो सभी users के लिए same हैं:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-2 ml-4">
                      <li>Wake up at same time</li>
                      <li>Sleep by 10:30 PM</li>
                      <li>Drink warm water</li>
                    </ul>
                    <p className="text-sm text-gray-700 mt-2">
                      Medical history (Sugar, BP, Thyroid) का कोई consideration नहीं है।
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Expected Behavior */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2D5F3F] flex items-center gap-2">
                    <Badge variant="outline">3</Badge>
                    EXPECTED BEHAVIOR
                  </h4>
                  <div className="pl-6 bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Agar user ne Sugar = Yes select kiya ho, to personalized sugar-specific tips dikhen:
                    </p>
                    <div className="space-y-2 ml-4">
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <div>
                          <p className="text-sm font-medium">Choose low-GI foods (quinoa, brown rice, millets)</p>
                          <p className="text-xs text-gray-600">कम जीआई वाले खाद्य पदार्थ चुनें (क्विनोआ, ब्राउन राइस, बाजरा)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <div>
                          <p className="text-sm font-medium">Add karela/methi in diet (natural blood sugar control)</p>
                          <p className="text-xs text-gray-600">आहार में करेला/मेथी शामिल करें (प्राकृतिक रक्त शर्करा नियंत्रण)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <div>
                          <p className="text-sm font-medium">Walk 15 mins after meals (glucose management)</p>
                          <p className="text-xs text-gray-600">भोजन के बाद 15 मिनट टहलें (ग्लूकोज प्रबंधन)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <div>
                          <p className="text-sm font-medium">Avoid refined sugar and white flour completely</p>
                          <p className="text-xs text-gray-600">रिफाइंड शुगर और मैदा से पूरी तरह बचें</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Condition/Rule */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2D5F3F] flex items-center gap-2">
                    <Badge variant="outline">4</Badge>
                    CONDITION/RULE
                  </h4>
                  <div className="pl-6 bg-blue-50 p-4 rounded-lg border border-blue-200 font-mono text-xs">
                    <p className="text-gray-700">IF (section2Score &lt; 20 && medicalHistory.hasProblemsWithSugar === true) {'{'}</p>
                    <p className="text-gray-700 ml-4">suggestions.push("Sugar-specific nutrition tips")</p>
                    <p className="text-gray-700">{'}'} ELSE IF (section2Score &lt; 20) {'{'}</p>
                    <p className="text-gray-700 ml-4">suggestions.push("General nutrition improvement tips")</p>
                    <p className="text-gray-700">{'}'}</p>
                  </div>
                </div>

                <Separator />

                {/* Medical History Link */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2D5F3F] flex items-center gap-2">
                    <Badge variant="outline">5</Badge>
                    MEDICAL HISTORY LINK
                  </h4>
                  <div className="pl-6 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="font-medium">medicalHistory.hasProblemsWithSugar</span>
                    </div>
                    <p className="text-gray-600 mt-2 ml-6">
                      यह logic Sugar medical condition वाले users के लिए specific है।
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Priority */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2D5F3F] flex items-center gap-2">
                    <Badge variant="outline">6</Badge>
                    PRIORITY
                  </h4>
                  <div className="pl-6">
                    <Badge variant="destructive" className="text-sm">High Priority</Badge>
                    <p className="text-sm text-gray-600 mt-2">
                      Personalization directly impacts user engagement and health outcomes.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Example 2: Bilingual Suggestions */}
            <AccordionItem value="example-2" className="border-2 border-[#2D5F3F] rounded-lg overflow-hidden">
              <AccordionTrigger className="px-6 py-4 bg-[#EBF3ED] hover:bg-[#d5e7d9] text-left">
                <div className="flex items-center gap-3">
                  <Badge className="bg-amber-500">Medium Priority</Badge>
                  <span className="font-semibold text-[#2D5F3F]">Example #2: Bilingual Suggestions (English + Hindi)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 space-y-4 bg-white">
                {/* Section */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2D5F3F] flex items-center gap-2">
                    <Badge variant="outline">1</Badge>
                    SECTION
                  </h4>
                  <div className="pl-6 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>All Sections (Suggestions Display)</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Current Behavior */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2D5F3F] flex items-center gap-2">
                    <Badge variant="outline">2</Badge>
                    CURRENT BEHAVIOR
                  </h4>
                  <div className="pl-6 bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-sm text-gray-700 mb-2">
                      "Small Habit Suggestions" में sirf English text दिख रहा है:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                      <li>Wake up at the same time daily (±30 minutes)</li>
                      <li>Sleep by 10:30 PM consistently</li>
                      <li>Drink 1-2 glasses of warm water upon waking</li>
                    </ul>
                    <p className="text-sm text-gray-700 mt-2">
                      Hindi translation missing है।
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Expected Behavior */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2D5F3F] flex items-center gap-2">
                    <Badge variant="outline">3</Badge>
                    EXPECTED BEHAVIOR
                  </h4>
                  <div className="pl-6 bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      हर suggestion में English और Hindi दोनों text दिखना चाहिए:
                    </p>
                    <div className="space-y-2 ml-4">
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <div>
                          <p className="text-sm">Wake up at the same time daily (±30 minutes)</p>
                          <p className="text-xs text-gray-600">रोज़ एक ही समय पर उठें (±30 मिनट)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <div>
                          <p className="text-sm">Sleep by 10:30 PM consistently</p>
                          <p className="text-xs text-gray-600">रात 10:30 बजे तक सोएं (नियमित रूप से)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <div>
                          <p className="text-sm">Drink 1-2 glasses of warm water upon waking</p>
                          <p className="text-xs text-gray-600">उठते ही 1-2 गिलास गुनगुना पानी पिएं</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <div>
                          <p className="text-sm">Get 15-20 minutes of morning sunlight daily</p>
                          <p className="text-xs text-gray-600">रोज़ 15-20 मिनट सुबह की धूप लें</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Condition/Rule */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2D5F3F] flex items-center gap-2">
                    <Badge variant="outline">4</Badge>
                    CONDITION/RULE
                  </h4>
                  <div className="pl-6 bg-blue-50 p-4 rounded-lg border border-blue-200 font-mono text-xs">
                    <p className="text-gray-700">FOR ALL suggestions THEN</p>
                    <p className="text-gray-700 ml-4">Display format: "English text"</p>
                    <p className="text-gray-700 ml-4">Display format: "Hindi text" (smaller, gray)</p>
                    <p className="text-gray-700 mt-2">// Data structure example:</p>
                    <p className="text-gray-700">{'{'}</p>
                    <p className="text-gray-700 ml-4">text_en: "Wake up at the same time daily",</p>
                    <p className="text-gray-700 ml-4">text_hi: "रोज़ एक ही समय पर उठें"</p>
                    <p className="text-gray-700">{'}'}</p>
                  </div>
                </div>

                <Separator />

                {/* Medical History Link */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2D5F3F] flex items-center gap-2">
                    <Badge variant="outline">5</Badge>
                    MEDICAL HISTORY LINK
                  </h4>
                  <div className="pl-6 text-sm">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">None - applies to all users</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Priority */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#2D5F3F] flex items-center gap-2">
                    <Badge variant="outline">6</Badge>
                    PRIORITY
                  </h4>
                  <div className="pl-6">
                    <Badge className="bg-amber-500 text-sm">Medium Priority</Badge>
                    <p className="text-sm text-gray-600 mt-2">
                      Improves user experience and accessibility for Hindi-speaking users.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Footer Note */}
        <Card className="bg-[#EBF3ED] border-[#2D5F3F]">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#2D5F3F] mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-[#2D5F3F]">
                  📝 Note: इस format को copy करके अपने logic updates document करें।
                </p>
                <p className="text-sm text-gray-700">
                  हर update के लिए एक नया entry बनाएं और सभी 6 sections को properly fill करें। यह clear communication ensure करेगा और implementation smooth होगा।
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
