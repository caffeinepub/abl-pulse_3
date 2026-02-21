import { Home, Activity, Info, Phone, Languages, FileText } from 'lucide-react';
import { Link, useRouterState, useNavigate } from '@tanstack/react-router';
import { useBasicInfoStorage } from '../hooks/useBasicInfoStorage';
import { useAssessment } from '../contexts/AssessmentContext';

export default function Navigation() {
  const routerState = useRouterState();
  const navigate = useNavigate();
  const currentPath = routerState.location.pathname;
  const { isBasicInfoComplete } = useBasicInfoStorage();
  const { language, setLanguage } = useAssessment();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAssessmentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isBasicInfoComplete()) {
      navigate({ to: '/assessment' });
    } else {
      navigate({ to: '/assessment' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home, action: () => scrollToSection('hero'), isLink: false, to: '/' },
    { id: 'assessment', label: 'Assessment', icon: Activity, action: handleAssessmentClick, isLink: true, to: '/assessment' },
    { id: 'about', label: 'About', icon: Info, action: () => scrollToSection('about'), isLink: false, to: '/' },
    { id: 'contact', label: 'Contact', icon: Phone, action: () => scrollToSection('contact'), isLink: false, to: '/' },
  ];

  const isAssessmentActive = currentPath.startsWith('/assessment');
  const showLanguageToggle = currentPath.startsWith('/assessment/section');

  return (
    <>
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <img 
          src="/assets/ABL Logo (6).png" 
          alt="ABL PULSE" 
          className="h-12 w-auto drop-shadow-lg"
        />
      </div>

      {showLanguageToggle && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-primary shadow-lg transition-all hover:bg-brand-accent hover:text-white hover:scale-105"
          >
            <Languages className="h-5 w-5" />
            <span>{language === 'en' ? 'EN' : 'HI'}</span>
          </button>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 hidden bg-white/95 backdrop-blur-sm shadow-md md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-shrink-0">
              <img 
                src="/assets/ABL Logo (6).png" 
                alt="ABL PULSE" 
                className="h-10 w-auto"
              />
            </div>
            
            <div className="flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = item.id === 'assessment' && isAssessmentActive;
                
                if (item.isLink) {
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all hover:text-brand-accent hover:scale-105 ${
                        isActive ? 'text-brand-accent' : 'text-brand-primary'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                }
                
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-primary transition-all hover:text-brand-accent hover:scale-105"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <Link
                to="/docs/logic-corrections"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-primary transition-all hover:text-brand-accent hover:scale-105"
              >
                <FileText className="h-5 w-5" />
                <span>Logic Docs</span>
              </Link>

              {showLanguageToggle && (
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-accent hover:scale-105"
                >
                  <Languages className="h-5 w-5" />
                  <span>{language === 'en' ? 'EN' : 'HI'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-[0_-4px_12px_rgba(0,0,0,0.1)] md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = item.id === 'assessment' && isAssessmentActive;
            
            if (item.isLink) {
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="flex flex-col items-center gap-0.5 px-2 py-1.5 transition-all active:scale-95"
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-brand-accent' : 'text-brand-primary'}`} />
                  <span className={`text-[10px] font-medium ${isActive ? 'text-brand-accent' : 'text-brand-primary'}`}>
                    {item.label}
                  </span>
                </button>
              );
            }
            
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="flex flex-col items-center gap-0.5 px-2 py-1.5 transition-all active:scale-95"
              >
                <item.icon className="h-5 w-5 text-brand-primary" />
                <span className="text-[10px] font-medium text-brand-primary">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
