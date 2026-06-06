'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Percent, 
  Coins, 
  TrendingUp, 
  UserCheck, 
  Home as HomeIcon, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Calculator, 
  ShieldCheck, 
  PhoneCall, 
  Copy, 
  Trash2, 
  Download, 
  ChevronRight, 
  X, 
  Menu,
  Lock,
  Clock,
  BadgePercent,
  TrendingDown,
  Building,
  Key,
  MapPin,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';

// Define Lead type
interface Lead {
  id: string;
  name: string;
  lastName?: string;
  phone: string;
  telegramUsername?: string;
  goal: 'buy' | 'sell';
  propertyValue: number;
  downPayment: number;
  useMatCap: boolean;
  program: string;
  monthlyPayment: number;
  submittedAt: string;
  // Quiz answers
  rooms?: string;
  locationType?: string;
  readiness?: string;
  condition?: string;
  urgency?: string;
  contactMethod?: string;
}

interface Complex {
  name: string;
  address: string;
  completion: string;
  developer: string;
  imgUrl: string;
  prices: {
    type: string;
    price: string;
  }[];
  officialSearch: string;
  websiteUrl: string;
}

const COMPLEXES: Complex[] = [
  {
    name: "ЖК «Иремель Тауэр»",
    address: "Республика Башкортостан, г. Уфа, Кировский р-н, ул. Менделеева, стр. 137",
    completion: "Сдан",
    developer: "Prime Development",
    imgUrl: "/centr_nedvighimosti/iremel.jpeg",
    prices: [
      { type: "Студия", price: "от 10,1 млн ₽" },
      { type: "1-комн", price: "от 26,5 млн ₽" },
      { type: "2-комн", price: "от 40,1 млн ₽" },
      { type: "3-комн", price: "от 53,6 млн ₽" }
    ],
    officialSearch: "ЖК Иремель Тауэр",
    websiteUrl: "https://iremel-tower.ru/"
  },
  {
    name: "ЖК «Прайм»",
    address: "Республика Башкортостан, г. Уфа, Октябрьский р-н, ул. Проспект Октября, д. 75",
    completion: "4 кв. 2026",
    developer: "Prime Development",
    imgUrl: "/centr_nedvighimosti/prime.jpeg",
    prices: [
      { type: "Студия", price: "от 7,6 млн ₽" },
      { type: "1-комн", price: "от 10,6 млн ₽" },
      { type: "2-комн", price: "от 19,4 млн ₽" },
      { type: "3-комн", price: "от 30,5 млн ₽" }
    ],
    officialSearch: "ЖК Прайм",
    websiteUrl: "https://yabs.yandex.ru/count/WkmejI_zOoVX2LbO0_KM0EEdcYMSm0cO4wZY3HFGctvLMgmWuBs0W0vzFfSxUxRVkVDTNpjVl-FrXZlSdvzd2Bj4aP6Gab09wz4DfH1Et9vAfr0fxhIZjjGf_RbnNR8I2I4TMMSepUs0APikhfGM40kYL7vW7E01iaKCEevt2o2HAw09NK2OBi2RG05S49hmA40BGfEf0hGWFCahG0l2aoC5Q45uWbU05eGdHWhGWl3ahW0j24-A5A05uGcu02q8IvWKe0LXoLy1MX2M-1MW1M69k00j24kM5A3jOBkOypMH-8M3YPLXXvmkBNRoXMGAhQb3DPvFgDJEeJZK-SIVjftd-BDsvZSElQ5tz8bBdRdKbW07wwUiteZiMCCgXZTU75SzrlfsL9bylDa54DEmWa5sFjymsNZfiStk0m4tW0FOm7Kk-JB4Birl1vL63Ji6NG1lYIWg0d1tlKRdO2JhXnOWtP0j6cvN1eOWB4H65l1WBNRNDNWofvLtmLp1NXCy7tr-WLKMjYOMDnYVUH3cBEoWoIgKRww0APYRFFGeREEOp37afeu5Cp5XzHWn7QDhKE0U181E-0DZ1JvW4A0188qBJJqBcbzwtEJIu-RkVsDpYjxY3zyCbar-C6s4wyZ_cj2ozRqcj6nzxWIHuhzFuCBLyRNUYndUptelPdXCSuOhGfZb35U4CCVCfTTFQVBDstLTrsapXh7LrSrZKoEztpmsDT9Rvfil-xEsyPadVx0XQc1-J7jm0djlYM_-wvke0h5e_PRMTQOcga0iMg_zasT_JBXyrdlT0r9PWu8roPKrFgAPkLAfL8QWqyMA7QDZO6QW_3CAO2CH012wd2NybdjZV9KSa2CyFTuJYlCoEat0eBD54WkzLLDnyFJx2CUJGtxkP7pcCSBZ4ABljFcv0k1eOFBgGS9oaQQCGAMisx4ga01Z3VUIGwXOsOVth9SEAXawSWIMwj6OT92aF306Aogso2rfBOf4XPKirfW4~2?etext=2202.yEgGGAkhSuuoqvVz8Lo-RDe5I9yGF8RX8_t7iJfQ2-BjpZ6teumzeC4b0YqRx9qYaO9A5ozo3oB_zpLfOOnqGHNxZ21yeXVrcHhncWdqdno.1014bb4ac3d789d75be67f0748ad8e01b0267ff2&from=yandex.ru%3Bsearch%26%23x2F%3B%3Bweb%3B%3B0%3B&q=%D0%B6%D0%BA+%D0%BF%D1%80%D0%B0%D0%B9%D0%BC+%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9+%D1%81%D0%B0%D0%B9%D1%82"
  },
  {
    name: "ЖК «АУРУМ»",
    address: "Республика Башкортостан, г. Уфа, Октябрьский р-н, ул. Комсомольская, д. 104",
    completion: "3 кв. 2026",
    developer: "СтройТЭК",
    imgUrl: "/centr_nedvighimosti/aurus.jpeg",
    prices: [
      { type: "1-комн", price: "от 9,2 млн ₽" },
      { type: "2-комн", price: "от 11 млн ₽" },
      { type: "3-комн", price: "от 13,3 млн ₽" },
      { type: "4+", price: "от 46,2 млн ₽" }
    ],
    officialSearch: "ЖК АУРУМ",
    websiteUrl: "https://aurum-ufa.ru/"
  },
  {
    name: "ЖК «Геос»",
    address: "Республика Башкортостан, г. Уфа, Кировский р-н, ул. Геофизиков, д. 6",
    completion: "3 кв. 2029",
    developer: "ГК БРИГ",
    imgUrl: "/centr_nedvighimosti/geos.jpeg",
    prices: [
      { type: "Студия", price: "от 6,2 млн ₽" },
      { type: "1-комн", price: "от 7,5 млн ₽" },
      { type: "2-комн", price: "от 9,7 млн ₽" },
      { type: "3-комн", price: "от 12,9 млн ₽" }
    ],
    officialSearch: "ЖК Геос",
    websiteUrl: "https://yabs.yandex.ru/count/WnOejI_zOoVX2Lbp0qKO02ChfhxMyk05IS2SG1MV0DSR9g0t_QeUWo3WzGZeqETpkRDd-vqxt_Mry_KxNc-um-MPSVJ3KwN-y039-E49-gdUA26412GqD4GD2l6KsZcUjlNeXb8EQv5HaVEPGsfBfpZkp9quVakZpgbpQkTuvhapEfNYKkWDnV5dTEgK4bsFae2cGZE0alAwhkkY4HXtm9HD5rSsMCGzKIgRunDJkZyOT1nDB4OGzm7K101qcEuMS9eBQ48N4AOBy2PG01U49ZmAq8BGPAe0BGXFyWhGWl3aI05Q49xW5Q05uOcH0hGWFBahG0l2ao85Q45u0Yv02y8I9WLeGLZoLu0MX2L-1MX1M28kG0l2aYK5Q3lOBkPyJGJcU43w5gERqwNz1ALCcK9hwb2DQ1H_ui_dzFdCxLiwXU9tBONYqMSUpQDFNEhCfRO4E5W_PVL6PCSQLZ6yyN8vuOK142RdymsJZPSUs-m-4703E80Dt07Ahg3uxQ3Ig677e0lWBU6q9m2NdgefqqrUJqfgn1oCPFtG0gGRiaN3xSh048I5oCW23kXQBxY2lIPuFlhy0giiR4rWgI2SI0UW0GixQB8AvPihO0hc9eymXQsdeCDCA5lW8dSLGsxgM30J4tQF4TCnEinNWRjSHCURumfym2100q0Q5vfw5ZI_zBZ9fSVDtVz6xqQ4-yDVpy_fWvNI2FzN0nYGxzK01kHpE_W8-_jIxqdaryROS_pP67kEJ7C58tlCSWKZUymnS-bbBlTTrtMTDjDOUrPS1c247AFt0HWXn-WjyysNRS9oL9xynSXHKNvCUt02LPnu4VqNoaHaJ6RAmjNbjNzo3ipCvhFUwnwGoXeKh4ckhF4HpSoLIgKo19t83tQCZe6PfFpGA1jG6VFGfIWZ_96ySIJUi1AWoljqvQ22terrw0YKuBa8ZftlFa_ShGW3CdB8KdeB-ENifLHVh_QVtEC2BwSSYYoHK4MYLFv549Zo9CUuloX_UheuEhld9UssFKxyJMLp35iFIcR4j1QLJzKcOb592okjbtWF~2?etext=2202.2fA1pKauuZqPQPMGyMafilL6y63tt23alRX9Hz_XKel1uLs4Z3w41xyZDzwgpwTMSJpKfqwR837qLcnEXk4oa2N0dnVzbG9xeHlnZXhwamY.965592f2e01d40a527a540a7cbda81a493ebb492&from=yandex.ru%3Bsearch%26%23x2F%3B%3Bweb%3B%3B0%3B&q=%D0%B6%D0%BA+%D0%B3%D0%B5%D0%BE%D1%81+%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9+%D1%81%D0%B0%D0%B9%D1%82"
  },
  {
    name: "ЖК «Terle park»",
    address: "Республика Башкортостан, г. Уфа, Кировский р-н, ул. Авроры, д.18/1",
    completion: "Сдан - 3 кв. 2026",
    developer: "ГК Садовое кольцо",
    imgUrl: "/centr_nedvighimosti/terle.jpeg",
    prices: [
      { type: "Студия", price: "от 6,2 млн ₽" },
      { type: "1-комн", price: "от 7,5 млн ₽" },
      { type: "2-комн", price: "от 8,8 млн ₽" },
      { type: "3-комн", price: "от 13,2 млн ₽" }
    ],
    officialSearch: "ЖК Terle park",
    websiteUrl: "https://yabs.yandex.ru/count/WqyejI_zOoVX2Ldv0mqQ04EjhCn3D3q1Sm9Ll642UjElwj4E0Uy517G9n9BeEqsWp-ToPy_sEtU-wsldwtUytd27-vJQFpy_jtCgnQ5GAFx4exPJAerAdpyqPYHHWNwgDtv-Y6mWKPzIcqU65SdcIJAAubEd4tSwRoaqZqwTjrFAKnKAeYPLSpXva8neM95ou7WUnP_IEmfrFdcKg4f9L1f8r2Fh499LYGJrkaGYIId86aBGa16DscfKmwXAJHhlW2cRBgvku3G5A9NDBXWOL724GSSHX2Oy2j22q6Ig02q8J_8Aq8Bmv4W1MX2Uu1MW1U69aGAq83ovAq0BmfCY1MX1U08kG0l24YO5Q45OybU05eGbVWLeGLWYBa0Bmf8b1MWxs2xcV4qSLZ1noEECWvmklQI9S6eAhQb3DQ9It7v2dRZzl9zE_6bFRzokxsSqnwMvBNtYKcSkjLVWOFsKrHkH7MjOnV36YpEYwV3ki9jRlDdNI4YUgtBdymsJZPSUs-m-4703E80DNE-ZQ-oBNPhV3YgD6dOCkW3U4b5K1E3IKpLb3aQoVcW1qWtPek5sPM08ma9aP047jDeTFECbJ56ArGLp1NjDy7pq-GLMMTYQm3902g0pAfc57JHPXVBD5J05SvE77eMjfw33J2Zx9Tfp3BcfOy5CJDWzHap7w1eKk1i_WA8tkohm0OC03G1fN6ZgMT3yqkCcbnutT_yRSVgez1y-mXlJFvX2b0_n_temxDRtUZ3irkVw8u1zVpVWhucEhsL-0GFxMUONC32c6OPEabc6ePDaZdTTrtNQx1cbX21PUdrDqllIwskItj9ZllozskmQFVbx6TdB_9Zsu0JqAJgp_thTiSiPej_IkiwaEtOvG_JQFwc3haxIPxtNVGyl42YoALcqQKSqCrSgbSeGT29Ds34w1cONvT-guYkWoDUH8p3yTm06AjbF01og93bG4LJ7UAx0V9BHQ3fMwZp0bS867ztLF_AtuKP9CSQZP-jAp5862i15D-LUJR1m0mYpUraE-DU-n2UEs3RMlFO8GxhjS0DdAksBr7CrfQO8nvRjKl3CfC2eetvd2YeQywBkTGVFOiYJPy89VLIUqwzNp6pnMUsoj1ODYx3IDq_8~2?etext=2202.dbysEqwYi_JFCrzWEqFf8TTFXSO6haKsI9DoFwH5UckMrrzfTEBKgm06vkkyWfsOfWa6U_xjWf7OOAOyjYQvTGFjb213d3BodGNoaWRyYXA.227ccc9fdcc9173929b47e52f5da5f0b25283b70&from=yandex.ru%3Bsearch%26%23x2F%3B%3Bweb%3B%3B0%3B&q=%D0%B6%D0%BA+terle+park+%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9+%D1%81%D0%B0%D0%B9%D1%82"
  }
];

// Safe helper to generate a unique ID outside of the React component's render body to adhere to stability constraints
function generateLeadId(): string {
  return 'L-' + Math.floor(Math.random() * 900000 + 100000);
}

export default function LandingPage() {
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lead submissions (localStorage based)
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states
  const [calcGoal, setCalcGoal] = useState<'buy' | 'sell'>('buy');
  const [propertyValue, setPropertyValue] = useState<number>(7500000);
  const [downPayment, setDownPayment] = useState<number>(1500000);
  const [useMatCap, setUseMatCap] = useState<boolean>(true);
  const [mortgageProgram, setMortgageProgram] = useState<string>('family'); // family, it, standard, state
  
  // Custom contact form states
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Expanded Quiz state variables
  const [lastName, setLastName] = useState('');
  const [quizRooms, setQuizRooms] = useState('2-комнатная'); // default
  const [quizLocationType, setQuizLocationType] = useState('Москва'); // City default
  const [quizReadiness, setQuizReadiness] = useState('В течение 3-6 месяцев'); // default
  const [quizCondition, setQuizCondition] = useState('Семейная'); // Benefit default
  const [quizUrgency, setQuizUrgency] = useState('В течение 1-2 месяцев'); // default
  const [quizContactMethod, setQuizContactMethod] = useState('Telegram'); // default
  const [quizTelegramUsername, setQuizTelegramUsername] = useState('');
  const [quizStep, setQuizStep] = useState(1); // steps: 1 (goal), 2 (params), 3 (contacts)

  // General feedback/interactive states
  const [secretCounter, setSecretCounter] = useState(0);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeAngle, setActiveAngle] = useState(180);
  const [wheelRadius, setWheelRadius] = useState<number>(360);

  // Complex carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedComplex, setSelectedComplex] = useState<Complex | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Dynamic header changing words
  const dynamicWords = [
    { word: 'Материнским Капиталом', prep: 'с' },
    { word: 'IT-льготами', prep: 'с' },
    { word: 'Гос. Поддержкой', prep: 'с' },
    { word: 'Семейными Льготами', prep: 'с' },
    { word: 'Легкостью', prep: 'с' },
    { word: 'Скоростью', prep: 'со' },
    { word: 'Выгодой', prep: 'с' },
    { word: 'Нами', prep: 'с' }
  ];

  const [dynamicWordIndex, setDynamicWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicWordIndex((prev) => (prev + 1) % 8);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Monitor screen size
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Automatic scrolling for housing complexes
  useEffect(() => {
    if (isCarouselHovered || selectedComplex) return;
    const maxSlide = isMobile ? COMPLEXES.length - 2 : COMPLEXES.length - 3;
    const interval = setInterval(() => {
      setActiveSlide((prev) => {
        return (prev + 1) > maxSlide ? 0 : prev + 1;
      });
    }, 4200);
    return () => clearInterval(interval);
  }, [isMobile, isCarouselHovered, selectedComplex]);

  // Standard constants for calculations
  const MAT_CAP_AMOUNT = 729000; // 2026 typical maternity capital amount
  
  // Load leads from localStorage asynchronously in useEffect to prevent rendering cycle issues
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('housing_leads');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Set leads state in animation frame to avoid synchronous effect updates
          requestAnimationFrame(() => {
            setLeads(parsed);
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  // Monitor screen size for Active Station dynamic alignment and wheel radius
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateDimensions = () => {
      if (window.innerWidth >= 1024) {
        setActiveAngle(180);
      } else {
        setActiveAngle(90);
      }

      // Responsive wheel radius
      if (window.innerWidth >= 1280) {
        setWheelRadius(440);
      } else if (window.innerWidth >= 1024) {
        setWheelRadius(380);
      } else if (window.innerWidth >= 640) {
        setWheelRadius(280);
      } else {
        setWheelRadius(185);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Scroll listener for Orbit Stepper
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let requestRef: number;
    
    const handleScroll = () => {
      const container = document.getElementById('how');
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate progress of scroll through this sticky container
      // progress is 0 when container starts to scroll, 1 when it is fully scrolled
      let progress = -rect.top / (containerHeight - windowHeight);
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      setScrollProgress(progress);
      
      // Map to discrete step indexes (0-7) using math rounding for focus mapping
      const stepValue = Math.min(7, Math.max(0, Math.round(progress * 7)));
      setActiveTimelineStep(stepValue);
    };

    const onScroll = () => {
      requestRef = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Run initially with small delay for accurate mounting dimensions
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  // Update input values directly with safe validation check
  const handlePropertyValueChange = (val: number) => {
    setPropertyValue(val);
    if (downPayment > val) {
      setDownPayment(val);
    }
  };

  const handleDownPaymentChange = (val: number) => {
    if (val > propertyValue) {
      setDownPayment(propertyValue);
    } else {
      setDownPayment(val);
    }
  };

  // Calculate actual down payment incorporating maternity capital
  const effectiveDownPayment = useMatCap 
    ? Math.min(downPayment + MAT_CAP_AMOUNT, propertyValue)
    : downPayment;

  // Rates in Russian currency & banking standards
  const getInterestRate = () => {
    if (calcGoal === 'sell') return 0;
    switch (mortgageProgram) {
      case 'it': return 0.05; // 5%
      case 'family': return 0.06; // 6%
      case 'state': return 0.08; // 8%
      case 'standard': return 0.16; // 16% market average estimation
      default: return 0.06;
    }
  };

  const getProgramName = () => {
    if (calcGoal === 'sell') return 'Продажа недвижимости / Обмен';
    switch (mortgageProgram) {
      case 'it': return 'IT-ипотека (5%)';
      case 'family': return 'Семейная ипотека (6%)';
      case 'state': return 'Господдержка (8%)';
      case 'standard': return 'Стандартная ипотека (16%)';
      default: return 'Семейная ипотека (6%)';
    }
  };

  const calculateMortgage = () => {
    const loanAmount = Math.max(0, propertyValue - effectiveDownPayment);
    if (loanAmount <= 0) return { monthly: 0, loanAmount: 0 };

    const annualRate = getInterestRate();
    if (annualRate === 0) return { monthly: 0, loanAmount: 0 };

    const monthlyRate = annualRate / 12;
    const months = 240; // 20 years average

    // PMT formula
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return {
      monthly: Math.round(monthlyPayment),
      loanAmount
    };
  };

  const mortgageResult = calculateMortgage();

  // Scroll handler helper
  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Scroll to step in continuous Orbit section
  const scrollToStep = (idx: number) => {
    const container = document.getElementById('how');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const containerHeight = container.clientHeight;
    const windowHeight = window.innerHeight;
    
    const stepProgress = idx / 7;
    const targetY = absoluteTop + stepProgress * (containerHeight - windowHeight);
    
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  // 8 steps textual copy for Awwwards-style orbital stepper
  const orbitSteps = [
    {
      title: 'Заявка на сайте',
      badge: 'Старт за 1 минуту',
      desc: 'Вы проходите минутный тест, и ваша заявка мгновенно регистрируется в системе для автоматического расчета тарифов.'
    },
    {
      title: 'Передача эксперту',
      badge: 'Автоподбор специалиста',
      desc: 'Интеллектуальная система анализирует ваш запрос и распределяет его лучшему аккредитованному специалисту.'
    },
    {
      title: 'Персональный созвон',
      badge: 'Связь за 10 минут',
      desc: 'Наш эксперт связывается с вами в течение 10 минут, чтобы детально уточнить все нюансы ваших пожеланий.'
    },
    {
      title: 'Анализ льгот и маткапитала',
      badge: 'Экономия до 1.5 млн',
      desc: 'Проводим аудит возможностей применения маткапитала, государственных субсидий и подбираем программы семейной ипотеки.'
    },
    {
      title: 'Закрытый показ вариантов',
      badge: 'Секретная база квартир',
      desc: 'Вы получаете подборку топовых планировок напрямую из реестра застройщиков — включая скрытые скидки и спецпредложения.'
    },
    {
      title: 'Одобрение и бронь',
      badge: 'Одобрение онлайн 98%',
      desc: 'Банк одобряет ипотеку онлайн по оптимизированной анкете в два клика, а мы фиксируем за вами текущую стоимость квартиры.'
    },
    {
      title: 'Юридическое оформление',
      badge: 'Сделка «под ключ»',
      desc: 'Полностью готовим и проверяем пакет документов, гарантируем безопасность сделки и сопровождаем вас на всех этапах.'
    },
    {
      title: 'Ключи ваши!',
      badge: 'Счастливое новоселье',
      desc: 'Поздравляем с приобретением! Вы забираете заветные ключи от вашей новой идеальной квартиры с готовым пакетом документов.'
    }
  ];

  // Carousel slide handlers
  const handleNext = () => {
    setActiveSlide((prev) => {
      const maxSlide = isMobile ? COMPLEXES.length - 2 : COMPLEXES.length - 3;
      return (prev + 1) > maxSlide ? 0 : prev + 1;
    });
  };

  const handlePrev = () => {
    setActiveSlide((prev) => {
      const maxSlide = isMobile ? COMPLEXES.length - 2 : COMPLEXES.length - 3;
      return (prev - 1) < 0 ? maxSlide : prev - 1;
    });
  };

  // Submit dynamic lead
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) return;

    setIsSubmitting(true);

    const newLead: Lead = {
      id: generateLeadId(),
      name: fullName,
      lastName: lastName,
      phone: phoneNumber,
      goal: calcGoal,
      propertyValue: propertyValue,
      downPayment: downPayment,
      useMatCap: useMatCap,
      program: getProgramName(),
      monthlyPayment: mortgageResult.monthly,
      submittedAt: new Date().toLocaleString('ru-RU'),
      rooms: quizRooms,
      locationType: calcGoal === 'buy' ? quizLocationType : undefined,
      readiness: calcGoal === 'buy' ? quizReadiness : undefined,
      condition: calcGoal === 'sell' ? quizCondition : undefined,
      urgency: calcGoal === 'sell' ? quizUrgency : undefined,
      contactMethod: quizContactMethod,
      telegramUsername: quizContactMethod === 'Telegram' ? quizTelegramUsername : undefined,
    };

    try {
      // Send the lead to our backend API route which handles Telegram delivery
      await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLead),
      });
    } catch (err) {
      console.error('Failed to dispatch lead integration:', err);
    }

    const updatedLeads = [newLead, ...leads];
    setLeads(updatedLeads);
    localStorage.setItem('housing_leads', JSON.stringify(updatedLeads));

    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  // Safe secret admin code logic
  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCode === '2026' || adminCode.toLowerCase() === 'admin') {
      setIsAdminAuthenticated(true);
      setAdminError('');
    } else {
      setAdminError('Неверный код доступа');
    }
  };

  // Clear single lead
  const handleDeleteLead = (id: string) => {
    const fresh = leads.filter(l => l.id !== id);
    setLeads(fresh);
    localStorage.setItem('housing_leads', JSON.stringify(fresh));
  };

  // Reset/Clear all leads
  const handleClearAllLeads = () => {
    if (window.confirm('Вы действительно хотите удалить все заявки?')) {
      setLeads([]);
      localStorage.setItem('housing_leads', JSON.stringify([]));
    }
  };

  // Copy telephone number
  const copyValue = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Logo secret click to reveal admin cabinet
  const handleLogoClick = () => {
    setSecretCounter(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setShowAdmin(true);
        return 0;
      }
      return next;
    });
  };

  // Convert leads to CSV string for handy exports
  const exportToCSV = () => {
    if (leads.length === 0) return;
    const headers = 'ID,Дата,Имя,Фамилия,Телефон,Способ связи,Цель,Цена недвижимости,Первоначальный взнос,Материнский капитал,Комнаты,Тип/Состояние,Срочность/Готовность,Программа,Месячный платеж\n';
    const rows = leads.map(l => {
      const typeStr = l.goal === 'buy' ? 'Покупка' : 'Продажа';
      const detail1 = l.goal === 'buy' ? (l.locationType || '') : (l.condition || '');
      const detail2 = l.goal === 'buy' ? (l.readiness || '') : (l.urgency || '');
      return `${l.id},"${l.submittedAt}","${l.name}","${l.lastName || ''}","${l.phone}","${l.contactMethod || 'Telegram'}","${typeStr}",${l.propertyValue},${l.downPayment},${l.useMatCap ? 'Да' : 'Нет'},"${l.rooms || ''}","${detail1}","${detail2}","${l.program}",${l.monthlyPayment}`;
    }).join('\n');
    
    // Create download trigger
    const blob = new Blob([`\ufeff${headers}${rows}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen text-slate-800 bg-linear-to-b from-white via-[#F8FAFC] to-[#F1F5F9] overflow-x-clip">
      
      {/* Dynamic Background Video/Ambient Color Frame */}
      <div className="absolute inset-x-0 top-0 h-[100vh] lg:h-[110vh] z-0 overflow-hidden select-none pointer-events-none">
        {/* We use standard HTML5 video tag with beautiful ambient blends */}
        <video 
          className="w-full h-full object-cover opacity-[0.42] scale-101"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        {/* Fading gradient overlay at the bottom so it fades out seamlessly into the light page body */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/30 to-transparent" />
        
        {/* Soft elegant liquid circles to represent modern glassmorphism refractions and luxury */}
        <div className="absolute top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-linear-to-tr from-sky-100/20 via-violet-100/10 to-rose-100/5 blur-3xl animate-pulse duration-10000" />
        <div className="absolute top-2/3 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-linear-to-bl from-teal-50/30 via-emerald-50/10 to-blue-50/5 blur-3xl animate-pulse duration-8000" />
      </div>

      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-gray-200/50 transition-all">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Logo with secret micro interaction */}
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 cursor-pointer group select-none active:scale-95 transition-transform"
            title="Кликните 5 раз для входа в панель распределения заявок"
          >
            <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white shadow-xl shadow-slate-900/10 transition-transform duration-500 group-hover:rotate-12">
              <Building className="w-5.5 h-5.5 text-white" />
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-rose-400 to-emerald-400 opacity-0 group-hover:opacity-30 blur-xs transition-opacity" />
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-tight text-slate-900 leading-tight flex items-center gap-1.5">
                ЦЕНТР <span className="text-emerald-600 font-bold">НЕДВИЖИМОСТИ</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#64748B] font-bold">
                Интерактивный Расчет
              </div>
            </div>
            {secretCounter > 0 && (
              <span className="text-[11px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full ml-1 font-bold">
                {secretCounter}/5
              </span>
            )}
          </div>

          {/* Navigation Links Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-slate-600">
            <span className="hover:text-slate-900 cursor-pointer transition-colors" onClick={scrollToCalculator}>
              Калькулятор
            </span>
            <a href="#benefits" className="hover:text-slate-900 transition-colors">Выгоды</a>
            <a href="#how" className="hover:text-slate-900 transition-colors">Как проходит расчет</a>
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Liquid Glass Styled Button */}
            <button 
              onClick={scrollToCalculator}
              className="relative overflow-hidden group px-6 py-3 rounded-xl text-xs uppercase font-extrabold tracking-widest text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/20 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              Рассчитать льготу
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 focus:outline-hidden"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* MOBILE DRIFT DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200/80 p-6 shadow-xl flex flex-col gap-5 md:hidden"
          >
            <div className="flex flex-col gap-4 font-semibold text-slate-800 text-lg">
              <div 
                className="py-2 border-b border-gray-100 cursor-pointer"
                onClick={() => { setIsMobileMenuOpen(false); scrollToCalculator(); }}
              >
                Калькулятор ипотеки
              </div>
              <a 
                href="#benefits" 
                className="py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Выгоды и программы
              </a>
              <a 
                href="#how" 
                className="py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Как проходит расчет
              </a>
            </div>
            <div className="pt-4 flex flex-col gap-3">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); scrollToCalculator(); }}
                className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold uppercase tracking-widest text-xs cursor-pointer border-0"
              >
                Подать экспресс-заявку
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 md:py-20 lg:py-24">
        
        {/* HERO SECTION */}
        <section className="mb-20 md:mb-28 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Copy: Display Typography with liquid glass layout */}
            <div className="lg:col-span-7 flex flex-col items-start text-left bg-white/20 sm:bg-white/30 backdrop-blur-2xl border border-white/50 p-6 sm:p-10 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(30,41,59,0.06)] relative overflow-hidden">
              {/* Glass liquid ambient reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
              
              {/* Luxury gold/slate badge */}
              <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Государственные субсидии 2026
              </div>

              {/* Bold Headline (Apple Style typography hierarchy) */}
              <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] mb-6 min-h-[2.8em] sm:min-h-[2.2em]">
                Честный расчет <br className="hidden sm:inline" />
                ипотеки{' '}
                <span className="inline-flex flex-wrap items-center gap-x-2">
                  <span>{dynamicWords[dynamicWordIndex].prep}</span>
                  <span className="relative inline-block">
                    {/* Invisible template to dynamically preserve space avoiding layout shift */}
                    <span className="invisible select-none pointer-events-none whitespace-nowrap">
                      {dynamicWords[dynamicWordIndex].word}
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={dynamicWordIndex}
                        initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute left-0 top-0 w-full h-full text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 whitespace-nowrap"
                      >
                        {dynamicWords[dynamicWordIndex].word}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </span>
              </h1>

              {/* Responsive Elegant Subtitle */}
              <p className="relative z-10 text-lg md:text-xl text-[#475569] leading-relaxed max-w-2xl mb-10 font-normal">
                Интерактивный инструмент для безопасного подбора, продажи и обмена квартир с использованием средств государственной поддержки. Без ложных обещаний, скрытых комиссий и навязанных услуг. Рассчитайте реальные параметры прямо сейчас.
              </p>

              {/* Rapid trust icons + action buttons */}
              <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <button 
                  onClick={scrollToCalculator}
                  className="relative group px-8 py-4.5 rounded-2xl font-bold bg-slate-900 text-white shadow-xl shadow-slate-900/15 hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  Рассчитать за 1 минуту
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button 
                  onClick={() => {
                    setCalcGoal('sell');
                    setTimeout(scrollToCalculator, 100);
                  }}
                  className="relative overflow-hidden group px-8 py-4.5 rounded-2xl font-bold text-slate-900 bg-white/40 hover:bg-white/80 border border-slate-300/60 backdrop-blur-md shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Хочу продать квартиру
                </button>
              </div>

              {/* Genuine trust indicators */}
              <div className="relative z-10 mt-12 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-semibold border-t border-slate-200/50 pt-8 w-full">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-emerald-100/60 text-emerald-700">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-900 block font-extrabold leading-none">Онлайн проверка</span>
                    <span className="text-[10px] text-zinc-650">Мгновенный расчет параметров льготных программ</span>
                  </div>
                </div>

                <div className="h-6 w-[1px] bg-slate-200/80 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-emerald-100/60 text-emerald-700">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-900 block font-extrabold leading-none">Полное соответствие</span>
                    <span className="text-[10px] text-zinc-650">Все расчеты базируются на актуальных регламентах регуляторов</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Card: Apple-like Visual Accent Frame */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center">
              
              {/* Elegant floating gradient ornament */}
              <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-emerald-200/20 blur-2xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-cyan-200/20 blur-2xl animate-pulse" />

              <div className="relative w-full rounded-3xl border border-white/60 p-7 bg-white/45 backdrop-blur-2xl shadow-2xl shadow-slate-900/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-100/60 to-transparent rounded-bl-full pointer-events-none" />
                
                {/* Visual content: Key Program Overviews */}
                <h3 className="font-extrabold text-slate-900 text-lg mb-5 flex items-center gap-2">
                  <BadgePercent className="w-5.2 h-5.2 text-emerald-500" />
                  Льготные программы 2026
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      title: 'Семейная Ипотека',
                      rate: '6%',
                      desc: 'Для семей с детьми до 6 лет или двумя несовершеннолетними. Маткапитал идет на первый взнос.',
                      color: 'border-emerald-100 bg-emerald-50/20',
                      rateColor: 'text-emerald-750 bg-emerald-50 border border-emerald-100'
                    },
                    {
                      title: 'IT-Ипотека',
                      rate: '5%',
                      desc: 'Для сотрудников аккредитованных IT-компаний. Максимальная сумма до 18 000 000 рублей.',
                      color: 'border-emerald-100/70 bg-emerald-50/15',
                      rateColor: 'text-emerald-750 bg-emerald-50 border border-emerald-100'
                    },
                    {
                      title: 'Материнский Капитал',
                      rate: '729k ₽',
                      desc: 'Используйте всю государственную поддержку в качестве первоначального взноса прямо сейчас.',
                      color: 'border-emerald-100 bg-emerald-50/20',
                      rateColor: 'text-emerald-750 bg-emerald-50 border border-emerald-100'
                    }
                  ].map((prog, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ scale: 1.01, y: -2 }}
                      className={`p-4 rounded-xl border ${prog.color} transition-all duration-300`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-extrabold text-slate-900 text-sm">{prog.title}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${prog.rateColor}`}>
                          {prog.rate}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {prog.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/60 text-center">
                  <div className="text-xs text-slate-500 font-semibold mb-1.5">
                    Интересует обмен или продажа квартиры?
                  </div>
                  <button 
                    onClick={() => {
                      setCalcGoal('sell');
                      setTimeout(scrollToCalculator, 100);
                    }}
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-black inline-flex items-center gap-1 cursor-pointer transition-all hover:scale-103 bg-transparent border-0"
                  >
                    Получить бесплатный аудит стоимости квартиры
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* INTERACTIVE MORTGAGE & SUBSIDY CALCULATOR (The Conversion Engine) */}
        <section 
          className="scroll-mt-24 mb-24 md:mb-32"
          id="calculator"
        >
          {/* Animated decorative heading */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-extrabold tracking-widest text-[#64748B] uppercase">Интерактивный симулятор</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mt-2 mb-4">
              Рассчитайте выгоду ипотеки в реальном времени
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Тонкая настройка всех государственных субсидий, материнского капитала и спецставок для покупки и продажи
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Inputs Controls (Glass card) */}
            <div className="lg:col-span-7 rounded-3xl border border-white/70 bg-white/70 backdrop-blur-xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
              <div>
                
                {/* Goal selector tabs (Apple Style) */}
                <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-8">
                  <button 
                    onClick={() => setCalcGoal('buy')}
                    className={`py-3.5 rounded-lg text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                      calcGoal === 'buy' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-900 bg-transparent'
                    }`}
                  >
                    Покупка новой квартиры
                  </button>
                  <button 
                    onClick={() => setCalcGoal('sell')}
                    className={`py-3.5 rounded-lg text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                      calcGoal === 'sell' 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-900 bg-transparent'
                    }`}
                  >
                    Продажа / Обмен старой
                  </button>
                </div>

                {calcGoal === 'buy' ? (
                  /* BUY FLOW CONTROLS */
                  <div className="space-y-6">
                    
                    {/* Cost slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Стоимость квартиры</label>
                        <span className="font-black text-slate-950 text-base sm:text-lg">
                          {propertyValue.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="2500000" 
                        max="30000000" 
                        step="100000"
                        value={propertyValue}
                        onChange={(e) => handlePropertyValueChange(Number(e.target.value))}
                        className="w-full accent-emerald-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-zinc-400 font-semibold mt-1">
                        <span>2.5 млн ₽</span>
                        <span>15 млн ₽</span>
                        <span>30 млн ₽</span>
                      </div>
                    </div>

                    {/* Down payment slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Собственные средства (Первый взнос)</label>
                        <span className="font-black text-slate-950 text-base sm:text-lg">
                          {downPayment.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="500000" 
                        max={propertyValue} 
                        step="50000"
                        value={downPayment}
                        onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
                        className="w-full accent-emerald-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-zinc-400 font-semibold mt-1">
                        <span>500 тыс. ₽</span>
                        <span>макс. {propertyValue.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>

                    {/* Subsidies checkboxes / Maternity Capital integrated beautifully */}
                    <div className="bg-slate-50/80 border border-slate-200/50 rounded-2xl p-5 space-y-4">
                      
                      <div className="flex items-start gap-3">
                        <input 
                          type="checkbox" 
                          id="matcap" 
                          checked={useMatCap}
                          onChange={(e) => setUseMatCap(e.target.checked)}
                          className="w-5 h-5 rounded-md border-gray-300 text-emerald-600 focus:ring-emerald-500 mt-0.5 cursor-pointer"
                        />
                        <label htmlFor="matcap" className="cursor-pointer select-none">
                          <span className="block font-black text-slate-900 text-xs sm:text-sm">Использовать Материнский Капитал (+729 000 ₽ к взносу)</span>
                          <span className="block text-[11.5px] text-zinc-500 mt-0.5 leading-normal">
                            Позволяет сократить собственные средства или уменьшить проценты банку. Сертификат полностью учитывается в расчете!
                          </span>
                        </label>
                      </div>

                    </div>

                    {/* Mortgage Rates Multi-Selector Toggle */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">Выберите льготную программу банка</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'family', val: '6%', label: 'Семейная 6%' },
                          { id: 'it', val: '5%', label: 'IT-ипотека 5%' },
                          { id: 'state', val: '8%', label: 'Господдержка 8%' },
                          { id: 'standard', val: '16%', label: 'Стандартная 16%' },
                        ].map((item) => (
                          <div 
                            key={item.id}
                            onClick={() => setMortgageProgram(item.id)}
                            className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                              mortgageProgram === item.id 
                                ? 'border-emerald-500 bg-emerald-50/10' 
                                : 'border-gray-200 hover:border-gray-400 bg-transparent'
                            }`}
                          >
                            <span className="font-black text-slate-900 text-sm leading-tight">{item.label}</span>
                            <span className="text-[10px] text-[#64748B] mt-0.5 font-semibold">Годовая ставка</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ) : (
                  /* SELL FLOW CONTROLS */
                  <div className="space-y-6">
                    
                    <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-4 flex gap-3 text-amber-900">
                      <TrendingDown className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                      <div>
                        <span className="block font-black text-xs sm:text-sm">Продажа обремененной квартиры или трейд-ин</span>
                        <span className="block text-xs text-amber-800/80 mt-1 leading-normal">
                          Если вы приобретали недвижимость с маткапиталом и на ней висит ипотечный долг — мы поможем благополучно продать её или обменять по закону с выделением долей несовершеннолетним. Нет нерешаемых проблем!
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Оценочная стоимость вашей квартиры</label>
                        <span className="font-black text-slate-950 text-base sm:text-lg">
                          {propertyValue.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="2000000" 
                        max="35000000" 
                        step="100000"
                        value={propertyValue}
                        onChange={(e) => handlePropertyValueChange(Number(e.target.value))}
                        className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-zinc-400 font-semibold mt-1">
                        <span>2 млн ₽</span>
                        <span>18 млн ₽</span>
                        <span>35 млн ₽</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Остаток ипотечного долга (если есть)</label>
                        <span className="font-black text-slate-950 text-base sm:text-lg">
                          {downPayment.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max={propertyValue} 
                        step="50000"
                        value={downPayment}
                        onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
                        className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-zinc-400 font-semibold mt-1">
                        <span>0 ₽ (Долга нет)</span>
                        <span>макс. {propertyValue.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-5 space-y-4">
                      
                      <div className="flex items-start gap-3">
                        <input 
                          type="checkbox" 
                          id="matcapSell" 
                          checked={useMatCap}
                          onChange={(e) => setUseMatCap(e.target.checked)}
                          className="w-5 h-5 rounded-md border-gray-300 text-slate-900 focus:ring-slate-500 mt-0.5 cursor-pointer"
                        />
                        <label htmlFor="matcapSell" className="cursor-pointer select-none">
                          <span className="block font-black text-slate-900 text-xs sm:text-sm">В покупку квартиры вкладывался материнский капитал?</span>
                          <span className="block text-[11.5px] text-zinc-500 mt-0.5 leading-normal">
                            Потребуется согласование с органами опеки и попечительства. Наша юридическая команда подготовит все документы без задержек.
                          </span>
                        </label>
                      </div>

                    </div>

                  </div>
                )}

              </div>

              {/* Security info stamp */}
              <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center gap-2.5 text-[11.5px] text-[#617281] font-semibold">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                Расчет является предварительным планированием сделки с учетом банковских регламентов РФ 2026 г.
              </div>

            </div>

            {/* Right Form Summary & Capture Screen (Luxury glass interactive output) */}
            <div className="lg:col-span-5 rounded-3xl border border-white/70 bg-[#1C2330] text-white p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              {/* background light glow effects inside darkness */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#94A3B8]">Результаты расчета</span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    Актуально в июне 2026
                  </span>
                </div>

                {calcGoal === 'buy' ? (
                  /* CALCULATED RATES BUY RESULT */
                  <div className="space-y-6">
                    
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1">Сумма кредита</div>
                      <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                        {mortgageResult.loanAmount.toLocaleString('ru-RU')} ₽
                      </div>
                      <div className="text-xs text-emerald-300 mt-1 font-semibold flex items-center gap-1">
                        {useMatCap && (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-450 shrink-0" />
                            Включая скидку маткапитала: {MAT_CAP_AMOUNT.toLocaleString('ru-RU')} ₽!
                          </>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-0.5">Ставка банка</div>
                        <div className="text-lg font-black text-[#10B981]">
                          {(getInterestRate() * 100)} %
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-0.5">Срок кредита</div>
                        <div className="text-lg font-black text-white">
                          240 мес. <span className="text-[11px] font-normal text-slate-400">(20 лет)</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mt-4">
                      <div className="text-xs text-[#94A3B8] font-bold uppercase tracking-wider mb-1">Ориентировочный платеж</div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-baseline gap-1.5">
                        {mortgageResult.monthly.toLocaleString('ru-RU')} 
                        <span className="text-base font-bold text-[#94A3B8]">₽/мес</span>
                      </div>
                      <p className="text-[10px] text-emerald-400/90 flex items-center gap-1 mt-2.5 font-semibold">
                        <Check className="w-3.5 h-3.5 shrink-0 animate-pulse text-emerald-400" />
                        Планируемый регулярный ежемесячный взнос за ипотеку.
                      </p>
                    </div>

                  </div>
                ) : (
                  /* CALCULATED RATES SELL RESULT */
                  <div className="space-y-6 animate-fadeIn">
                    
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1">Оценочная стоимость вашей квартиры</div>
                      <div className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
                        {propertyValue.toLocaleString('ru-RU')} ₽
                      </div>
                      <div className="text-xs text-indigo-300 mt-1 font-semibold flex items-center gap-1">
                        Рыночная оценка на основе сделок РФ 2026
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-0.5">Ориентир. срок продажи</div>
                        <div className="text-lg font-black text-emerald-400">
                          {quizUrgency === 'Срочно (2-3 недели)' ? '14-20 дней' : '30-45 дней'}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-0.5">Средняя комиссия</div>
                        <div className="text-lg font-black text-white">
                          {Math.max(150000, Math.round(propertyValue * 0.02)).toLocaleString('ru-RU')} ₽
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mt-4">
                      <div className="text-xs text-[#94A3B8] font-bold uppercase tracking-wider mb-1">Прогнозируемый чистый доход от сделки</div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-baseline gap-1.5 font-sans">
                        {(propertyValue - Math.max(150000, Math.round(propertyValue * 0.02))).toLocaleString('ru-RU')}
                        <span className="text-base font-bold text-[#94A3B8]">₽</span>
                      </div>
                      <p className="text-[10px] text-emerald-400/90 flex items-center gap-1 mt-2.5 font-semibold">
                        <Check className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                        Включает полное юридическое сопровождение, рекламу и опеку!
                      </p>
                    </div>

                  </div>
                )}
              </div>

              {/* Lead capture form inside luxury container */}
              <div className="mt-8 pt-6 border-t border-white/15 relative z-10">
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form 
                      key="lead-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleLeadSubmit}
                      className="space-y-4"
                    >
                      {/* Step indicator system */}
                      <div className="flex items-center justify-between gap-1 mb-5">
                        {[1, 2, 3].map((step) => {
                          const isCompleted = step < quizStep;
                          const isCurrent = step === quizStep;
                          return (
                            <div key={step} className="flex-1 flex flex-col gap-1">
                              <div className={`h-1.5 rounded-full transition-all duration-300 ${isCompleted ? 'bg-emerald-500' : isCurrent ? 'bg-emerald-400' : 'bg-white/10'}`} />
                              <span className={`text-[9px] uppercase font-black tracking-widest ${isCurrent ? 'text-emerald-400' : isCompleted ? 'text-emerald-600' : 'text-slate-400'}`}>
                                Шаг {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {quizStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-4 text-left"
                        >
                          <h4 className="text-sm font-black text-white tracking-wide uppercase mb-2">
                            Шаг 1: Какая у вас цель со сделкой?
                          </h4>
                          <div className="grid grid-cols-2 gap-3.5">
                            <button
                              type="button"
                              onClick={() => {
                                setCalcGoal('buy');
                              }}
                              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between h-32 relative group select-none ${
                                calcGoal === 'buy'
                                  ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
                                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:bg-white/10'
                              }`}
                            >
                              <Building className={`w-6 h-6 mb-2 transition-transform duration-300 group-hover:scale-110 ${calcGoal === 'buy' ? 'text-emerald-400' : 'text-slate-400'}`} />
                              <div>
                                <span className="block font-black text-xs text-white uppercase tracking-wider">Купить жилье</span>
                                <span className="block text-[10px] text-slate-400 mt-1 leading-tight font-medium">Новостройка или вторичка</span>
                              </div>
                              {calcGoal === 'buy' && (
                                <span className="absolute top-3 right-3 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px]">✓</span>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setCalcGoal('sell');
                              }}
                              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between h-32 relative group select-none ${
                                calcGoal === 'sell'
                                  ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
                                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:bg-white/10'
                              }`}
                            >
                              <Key className={`w-6 h-6 mb-2 transition-transform duration-300 group-hover:scale-110 ${calcGoal === 'sell' ? 'text-emerald-400' : 'text-slate-400'}`} />
                              <div>
                                <span className="block font-black text-xs text-white uppercase tracking-wider">Продать жилье</span>
                                <span className="block text-[10px] text-slate-400 mt-1 leading-tight font-medium">Быстро и по рыночной стоимости</span>
                              </div>
                              {calcGoal === 'sell' && (
                                <span className="absolute top-3 right-3 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px]">✓</span>
                              )}
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => setQuizStep(2)}
                            className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest cursor-pointer transition-all mt-6 flex items-center justify-center gap-2 border-0"
                          >
                            Перейти далее
                            <ArrowRight className="w-4 h-4 text-slate-950" />
                          </button>
                        </motion.div>
                      )}

                      {quizStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-4 text-left font-sans"
                        >
                          <h4 className="text-sm font-black text-white tracking-wide uppercase mb-1">
                            Шаг 2: Условия и город
                          </h4>
                          
                          {/* City Selection */}
                          <div className="space-y-2">
                            <span className="block text-[10px] uppercase font-black text-slate-300 tracking-wider">Выберите город:</span>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                              {['Москва', 'СПб', 'Казань', 'Новосибирск', 'Другой'].map((city) => {
                                const isSel = quizLocationType === city;
                                return (
                                  <button
                                    key={city}
                                    type="button"
                                    onClick={() => setQuizLocationType(city)}
                                    className={`py-2 rounded-xl text-[10px] font-extrabold text-center cursor-pointer transition-all border ${
                                      isSel 
                                        ? 'bg-emerald-500 border-emerald-500 text-slate-950' 
                                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                                    }`}
                                  >
                                    {city}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Benefit Selection */}
                          <div className="space-y-2">
                            <span className="block text-[10px] uppercase font-black text-slate-300 tracking-wider">Какая льгота у вас есть или планируется?</span>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                              {[
                                { id: 'Семейная', name: 'Семейная до 6%' },
                                { id: 'IT', name: 'IT-ипотека 5%' },
                                { id: 'Маткапитал', name: 'Маткапитал' },
                                { id: 'Другая', name: 'Другая льгота' },
                                { id: 'Нет', name: 'Нет льгот' }
                              ].map((benefit) => {
                                const isSel = quizCondition === benefit.id;
                                return (
                                  <button
                                    key={benefit.id}
                                    type="button"
                                    onClick={() => setQuizCondition(benefit.id)}
                                    className={`py-2 px-1 rounded-xl text-[10px] font-bold text-center cursor-pointer transition-all border ${
                                      isSel 
                                        ? 'bg-emerald-500 border-emerald-500 text-slate-950' 
                                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                                    }`}
                                  >
                                    {benefit.name}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Rooms Selector */}
                          <div className="space-y-2">
                            <span className="block text-[10px] uppercase font-black text-slate-300 tracking-wider">Количество комнат:</span>
                            <div className="grid grid-cols-5 gap-1.5">
                              {['Студия', '1-комн', '2-комн', '3-комн', '4-комн+'].map((room) => {
                                const isSel = quizRooms === room;
                                return (
                                  <button
                                    key={room}
                                    type="button"
                                    onClick={() => setQuizRooms(room)}
                                    className={`py-2 rounded-xl text-[10px] font-extrabold text-center cursor-pointer transition-all select-none border ${
                                      isSel 
                                        ? 'bg-emerald-500 border-emerald-500 text-slate-950' 
                                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                                    }`}
                                  >
                                    {room}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Timeline/Urgency Selector */}
                          <div className="space-y-2">
                            <span className="block text-[10px] uppercase font-black text-slate-300 tracking-wider">Сроки планируемой сделки:</span>
                            <div className="grid grid-cols-2 gap-1.5">
                              {[
                                { id: 'urgent', name: 'Срочно (в течение месяца)' },
                                { id: 'medium', name: 'В течение 1-3 месяцев' },
                                { id: 'planning', name: 'В течение 3-6 месяцев' },
                                { id: 'watching', name: 'Просто прицениваюсь' }
                              ].map((item) => {
                                const isSel = quizReadiness === item.name;
                                return (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                      setQuizReadiness(item.name);
                                      setQuizUrgency(item.name);
                                    }}
                                    className={`py-2.5 px-2 rounded-xl text-[10px] font-bold text-center cursor-pointer transition-all border leading-tight ${
                                      isSel 
                                        ? 'bg-emerald-500 border-emerald-500 text-slate-950 px-1' 
                                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                                    }`}
                                  >
                                    {item.name}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Movement Buttons */}
                          <div className="grid grid-cols-3 gap-2 pt-4">
                            <button
                              type="button"
                              onClick={() => setQuizStep(1)}
                              className="col-span-1 bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer border-0 transition-all text-center"
                            >
                              Назад
                            </button>
                            
                            <button 
                              type="button"
                              onClick={() => setQuizStep(3)}
                              className="col-span-2 bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest cursor-pointer transition-all flex items-center justify-center gap-2 border-0"
                            >
                              Далее
                              <ArrowRight className="w-4 h-4 text-slate-950" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {quizStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-4 text-left font-sans"
                        >
                          <h4 className="text-sm font-black text-white tracking-wide uppercase mb-1">
                            Шаг 3: Ваши контактные данные
                          </h4>

                          {/* Full Name input */}
                          <div className="space-y-1.5">
                            <label className="block text-[10px] uppercase font-black text-slate-350 tracking-wider">Ваше имя:</label>
                            <input 
                              type="text"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="Иван Смирнов"
                              className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-hidden transition-all"
                              required
                            />
                          </div>

                          {/* Phone input */}
                          <div className="space-y-1.5">
                            <label className="block text-[10px] uppercase font-black text-slate-350 tracking-wider">Номер телефона для связи:</label>
                            <input 
                              type="tel"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              placeholder="+7 (999) 000-00-00"
                              className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-hidden transition-all"
                              required
                            />
                          </div>

                          {/* Preffered messenger choice */}
                          <div className="space-y-2">
                            <span className="block text-[10px] uppercase font-black text-slate-350 tracking-wider">Где удобнее получить расчет?</span>
                            <div className="grid grid-cols-3 gap-1.5">
                              {['Telegram', 'WhatsApp', 'Звонок'].map((method) => {
                                const isSel = quizContactMethod === method;
                                return (
                                  <button
                                    key={method}
                                    type="button"
                                    onClick={() => {
                                      setQuizContactMethod(method);
                                    }}
                                    className={`py-2 rounded-xl text-[10px] font-bold text-center cursor-pointer transition-all border ${
                                      isSel 
                                        ? 'bg-emerald-500 border-emerald-500 text-slate-950' 
                                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                                    }`}
                                  >
                                    {method}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Conditional Telegram Username input */}
                          {quizContactMethod === 'Telegram' && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="space-y-1.5"
                            >
                              <label className="block text-[10px] uppercase font-black text-emerald-400 tracking-wider">Ваш Telegram Username (с @):</label>
                              <input 
                                type="text"
                                value={quizTelegramUsername}
                                onChange={(e) => setQuizTelegramUsername(e.target.value)}
                                placeholder="@username_realty"
                                className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-hidden transition-all"
                                required
                              />
                            </motion.div>
                          )}

                          {/* Submission Buttons */}
                          <div className="grid grid-cols-3 gap-2 pt-4">
                            <button
                              type="button"
                              onClick={() => setQuizStep(2)}
                              className="col-span-1 bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer border-0 transition-all text-center"
                            >
                              Назад
                            </button>
                            
                            <button 
                              type="submit"
                              disabled={isSubmitting || !fullName.trim() || !phoneNumber.trim() || (quizContactMethod === 'Telegram' && !quizTelegramUsername.trim())}
                              className="col-span-2 bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 py-3.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-widest cursor-pointer transition-all disabled:opacity-50 flex items-center justify-center gap-2 border-0"
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
                                  Отправка...
                                </>
                              ) : (
                                <>
                                  Завершить расчет
                                  <ArrowRight className="w-4 h-4 text-slate-950" />
                                </>
                              )}
                            </button>
                          </div>

                          <div className="text-[10px] text-[#94A3B8] text-center leading-normal">
                            Нажимая кнопку, вы подтверждаете согласие на обработку персональных данных по ст. 152-ФЗ РФ.
                          </div>
                        </motion.div>
                      )}
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="lead-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6 space-y-4"
                    >
                      <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                        <Check className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-white">Вы идеально прошли тест!</h4>
                        <p className="text-xs text-slate-400 mt-2 leading-normal px-2">
                          Все 10+ параметров вашего запроса зафиксированы в CRM. Персональная девелоперская и банковская подборка выслана на указанный <span className="text-white font-black">{quizContactMethod}</span> по номеру <span className="text-white font-bold">{phoneNumber}</span>.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setFullName('');
                          setLastName('');
                          setPhoneNumber('');
                          setQuizStep(1);
                        }}
                        className="text-xs text-slate-400 hover:text-white underline cursor-pointer font-bold inline-block bg-transparent border-0 mt-2"
                      >
                        Пройти повторно
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </section>

        {/* PREMIUM RESIDENCES CAROUSEL SECTION */}
        <section id="complexes-carousel" className="py-24 bg-slate-100/75 border-y border-slate-200/50 relative overflow-hidden">
          {/* Animated Ambient Accents */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-100/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-sky-100/30 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div className="max-w-2xl text-left">
                <span className="text-[11px] font-black tracking-widest text-[#64748B] uppercase bg-white border border-slate-200/80 px-3 py-1.5 rounded-full inline-block mb-3">
                  Эксклюзивные ЖК России
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  Ставки от 4.8% в лучших новостройках
                </h2>
                <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">
                  Мы отобрали премиальные жилые комплексы с максимальной выгодой субсидирования. Нажмите на карточку, чтобы перейти на сайт объекта, или «Подробнее» для разбора цен.
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <button 
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full border border-slate-250 bg-white shadow-xs hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer text-slate-800 hover:text-slate-950 active:scale-95 border-0"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full border border-slate-250 bg-white shadow-xs hover:bg-slate-50 transition-all flex items-center justify-center cursor-pointer text-slate-800 hover:text-slate-950 active:scale-95 border-0"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slider Container with Viewport */}
            <div 
              className="relative overflow-hidden -ml-6 sm:-ml-12 pl-6 sm:pl-12 w-[calc(100%+1.5rem)] sm:w-[calc(100%+3rem)]"
              onMouseEnter={() => setIsCarouselHovered(true)}
              onMouseLeave={() => setIsCarouselHovered(false)}
            >
              <motion.div 
                animate={{ 
                  x: isMobile 
                    ? `calc(-${activeSlide * 50}% - ${activeSlide * 8}px)` 
                    : `calc(-${activeSlide * 33.333}% - ${activeSlide * 16}px)` 
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="flex gap-4 sm:gap-6 w-full cursor-grab active:cursor-grabbing"
              >
                {COMPLEXES.map((item, index) => {
                  return (
                    <motion.div 
                      key={index}
                      whileHover={{ y: -6 }}
                      onClick={() => {
                        window.open(item.websiteUrl, '_blank');
                      }}
                      className="relative bg-white border border-slate-200/60 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden p-4 select-none h-[410px] md:h-[440px] w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] flex-shrink-0 group"
                    >
                      {/* Photo Area */}
                      <div className="h-[180px] md:h-[210px] w-full relative overflow-hidden rounded-xl md:rounded-2xl bg-slate-100">
                        <img 
                          src={item.imgUrl} 
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                        />
                        {/* Dark fade-in gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Status Badge */}
                        <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md border border-white/10">
                          {item.completion}
                        </span>
                      </div>

                      {/* Info Area */}
                      <div className="flex-1 flex flex-col pt-3 text-left">
                        <span className="text-[9px] font-black tracking-widest text-[#64748B] uppercase">
                          {item.developer}
                        </span>
                        
                        <h3 className="text-sm md:text-base font-extrabold text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer mt-1 leading-tight line-clamp-1">
                          {item.name}
                        </h3>

                        <p className="text-[10px] text-slate-500 font-semibold leading-normal flex items-start gap-1 mt-1.5 flex-1 line-clamp-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                          <span>{item.address}</span>
                        </p>

                        {/* Prices Preview */}
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1 py-2 my-2 border-t border-slate-100">
                          {item.prices.slice(0, 2).map((priceItem, pIdx) => (
                            <div key={pIdx} className="flex flex-col">
                              <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider">{priceItem.type}</span>
                              <span className="text-[10px] md:text-[11px] text-slate-800 font-black">{priceItem.price}</span>
                            </div>
                          ))}
                          {item.prices.length > 2 && (
                            <div className="col-span-2 text-right">
                              <span className="text-[9px] text-emerald-600 font-black">+ еще {item.prices.length - 2} планировки</span>
                            </div>
                          )}
                        </div>

                        {/* Details Toggle Button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedComplex(item);
                          }}
                          className="w-full bg-slate-50 hover:bg-emerald-50 text-slate-900 hover:text-emerald-700 border border-slate-200/50 hover:border-emerald-200 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          Подробнее
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Pagination Bullet Indicators */}
            <div className="flex justify-center items-center gap-1.5 mt-8">
              {COMPLEXES.map((_, idx) => {
                const maxSlide = isMobile ? COMPLEXES.length - 2 : COMPLEXES.length - 3;
                if (idx > maxSlide) return null;
                const isItemSel = idx === activeSlide;
                return (
                  <button 
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer border-0 ${
                      isItemSel 
                        ? 'w-7 bg-emerald-500' 
                        : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                );
              })}
            </div>

            {/* Bottom Slogan Statement */}
            <div className="mt-10 max-w-xl mx-auto text-center">
              <p className="text-xs text-slate-600 font-extrabold tracking-wide uppercase leading-normal">
                💥 Это лишь <span className="text-emerald-600 underline decoration-2 underline-offset-2">0.1% от всех</span> наших реальных предложений!
              </p>
              <p className="text-[11px] text-slate-500 font-semibold mt-1.5 px-4 leading-relaxed">
                Пройдите полный расчет в симуляторе выше и зафиксируйте в CRM доступ к закрытой базе из 12,400+ квартир со всей России с субсидиями от застройщиков до 12%.
              </p>
            </div>

          </div>
        </section>

        {/* DETAILED DIALOG MODEL */}
        <AnimatePresence>
          {selectedComplex && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md"
              onClick={() => setSelectedComplex(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl border border-slate-200/80 flex flex-col relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header Image Area */}
                <div className="h-[200px] w-full relative">
                  <img 
                    src={selectedComplex.imgUrl} 
                    alt={selectedComplex.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  
                  {/* Floating Close Button */}
                  <button 
                    onClick={() => setSelectedComplex(null)}
                    className="absolute top-4 right-4 w-9 h-9 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white rounded-full flex items-center justify-center cursor-pointer transition-colors border-0"
                  >
                    <X className="w-5 h-5 pointer-events-none" />
                  </button>

                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="text-[9px] font-black tracking-wider text-emerald-400 bg-emerald-950/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-emerald-500/20 uppercase">
                      {selectedComplex.developer}
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-white mt-1 leading-tight tracking-tight shadow-text">
                      {selectedComplex.name}
                    </h2>
                  </div>
                </div>

                {/* Body Content Area */}
                <div className="p-5 text-left flex-1 overflow-y-auto max-h-[60vh] space-y-4">
                  
                  {/* Address element */}
                  <div className="space-y-1">
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Адрес объекта:</span>
                    <p className="text-xs text-slate-600 font-bold flex items-start gap-1.5 leading-relaxed">
                      <MapPin className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {selectedComplex.address}
                    </p>
                  </div>

                  {/* Date and General Specs */}
                  <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-xs">
                    <div>
                      <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider">Срок сдачи:</span>
                      <span className="font-extrabold text-emerald-600 mt-0.5 block text-xs">{selectedComplex.completion}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider">Девелопер:</span>
                      <span className="font-extrabold text-slate-800 mt-0.5 block text-xs">{selectedComplex.developer}</span>
                    </div>
                  </div>

                  {/* Plan / Price Rows */}
                  <div className="space-y-2 pt-1">
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Доступные планировки:</span>
                    <div className="space-y-1.5">
                      {selectedComplex.prices.map((price, pIdx) => (
                        <div 
                          key={pIdx} 
                          className="flex justify-between items-center py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100/60 hover:border-slate-200 transition-colors"
                        >
                          <span className="text-xs font-extrabold text-slate-700 flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                            {price.type}
                          </span>
                          <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100/55">
                            {price.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => {
                        window.open(selectedComplex.websiteUrl, '_blank');
                      }}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 px-2 rounded-xl text-[10px] uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1 border-0"
                    >
                      Сайт ЖК <ExternalLink className="w-3 h-3" />
                    </button>

                    <button 
                      onClick={() => {
                        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedComplex.name + ' ' + selectedComplex.address)}`;
                        window.open(mapUrl, '_blank');
                      }}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 px-2 rounded-xl text-[10px] uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1 border-0 shadow-xs active:scale-95 text-center"
                    >
                      На карте
                    </button>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP BY STEP TIMELINE (SCROLL-DRIVEN STACKED CARDS) */}
        <section id="how" className="relative w-full h-[350vh]">
          {/* Sticky view holder */}
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9]/85 to-[#F8FAFC] text-slate-900 border-y border-slate-200/50 md:rounded-3xl shadow-2xl">
            
            {/* Background Looping timelapse video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-[0.22] transition-opacity duration-1000"
            >
              <source src="/timelaps.mp4" type="video/mp4" />
            </video>

            {/* Modern light glassmorphism ambient backgrounds */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-100/40 rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-200/30 rounded-full blur-[120px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-100/20 rounded-full blur-[150px]" />
              <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full py-8 md:py-16">
              
              {/* Left Column: Interactive Step Explanations (Glassmorphism layout) */}
              <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left h-full max-w-xl mx-auto lg:mx-0 z-20">
                <div className="mb-4 flex justify-center lg:justify-start">
                  <span className="text-xs font-extrabold tracking-widest text-emerald-700 uppercase bg-emerald-50/90 px-4 py-2 rounded-full border border-emerald-200/60 shadow-[0_4px_16px_rgba(16,185,129,0.06)] backdrop-blur-md">
                    Интерактивный путеводитель
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                  8 простых шагов к вашей новой квартире
                </h2>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 hidden lg:block font-semibold">
                  Следите за интерактивным прогрессом при прокрутке страницы. Каждая карточка представляет собой отдельный этап работы нашей команды.
                </p>

                {/* Vertical Step Tracker Panel for Desktop only */}
                <div className="hidden lg:flex flex-col gap-3 relative pl-6 border-l border-slate-200/60 my-4 text-left">
                  {/* Sliding Filled Progress Bar overlay */}
                  <div 
                    style={{
                      height: `${scrollProgress * 100}%`,
                      transition: 'height 0.2s ease-out'
                    }}
                    className="absolute left-[-1.5px] top-0 w-[3px] bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                  />

                  {orbitSteps.map((step, idx) => {
                    const isPassed = idx < activeTimelineStep;
                    const isCurrent = idx === activeTimelineStep;
                    return (
                      <button
                        key={idx}
                        onClick={() => scrollToStep(idx)}
                        className="text-left flex items-center gap-4 group transition-all duration-300 bg-transparent border-0 py-1.5 cursor-pointer outline-none"
                      >
                        <span 
                          className={`
                            font-mono text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                            ${isCurrent 
                              ? 'bg-emerald-500 text-white shadow-md scale-110' 
                              : isPassed 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                            }
                          `}
                        >
                          {idx + 1}
                        </span>
                        
                        <div className="flex flex-col">
                          <span 
                            className={`
                              text-xs font-bold leading-none tracking-wide transition-all duration-300
                              ${isCurrent 
                                ? 'text-slate-900 font-extrabold translate-x-1 scale-102 origin-left' 
                                : 'text-slate-400 group-hover:text-slate-600 font-semibold'
                              }
                            `}
                          >
                            {step.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                {/* Compact mobile layout progress indicator bar container */}
                <div className="lg:hidden w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3 border border-slate-200/40">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300" 
                    style={{ width: `${((activeTimelineStep + 1) / 8) * 100}%` }}
                  />
                </div>
                
                <div className="lg:hidden text-center text-xs text-slate-500 font-bold mb-4">
                  Шаг {activeTimelineStep + 1} из 8: {orbitSteps[activeTimelineStep].title}
                </div>

                {/* Step quick actions for instant calculator link */}
                <div className="mt-2 flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                  <button
                    onClick={scrollToCalculator}
                    className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all border-0 cursor-pointer shadow-lg shadow-slate-900/15 z-30"
                  >
                    <span>Рассчитать ипотеку</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                  <span className="text-xs text-slate-400 font-bold hidden lg:inline-block">Прокручивайте страницу вниз ↓</span>
                </div>
              </div>

              {/* Right Column: Dynamic Stacked Glassmorphic Cards */}
              <div className="lg:col-span-7 flex items-center justify-center relative select-none w-full h-[320px] sm:h-[380px] lg:h-[440px] xl:h-[480px]">
                {orbitSteps.map((step, idx) => {
                  const isPast = idx < activeTimelineStep;
                  const isCurrent = idx === activeTimelineStep;
                  const isFuture = idx > activeTimelineStep;
                  const isVisible = idx >= activeTimelineStep && idx <= activeTimelineStep + 2;

                  if (!isVisible && !isPast) return null;

                  const relativeIndex = idx - activeTimelineStep;
                  
                  let y = 0;
                  let scale = 1;
                  let opacity = 0;
                  let rotate = 0;
                  let pointerEvents: 'auto' | 'none' = 'none';

                  if (isPast) {
                    y = -180;
                    scale = 0.85;
                    opacity = 0;
                    rotate = -8;
                  } else if (isCurrent) {
                    y = 0;
                    scale = 1;
                    opacity = 1;
                    pointerEvents = 'auto';
                  } else if (isFuture) {
                    if (relativeIndex <= 2) {
                      y = relativeIndex * 18;
                      scale = 1 - relativeIndex * 0.04;
                      opacity = relativeIndex === 1 ? 0.8 : 0.35;
                      rotate = relativeIndex * 2;
                    } else {
                      y = 40;
                      scale = 0.9;
                      opacity = 0;
                      rotate = 4;
                    }
                  }

                  const IconComponent = (() => {
                    switch (idx) {
                      case 0: return Sparkles;
                      case 1: return UserCheck;
                      case 2: return PhoneCall;
                      case 3: return Coins;
                      case 4: return HomeIcon;
                      case 5: return Calculator;
                      case 6: return Lock;
                      case 7: return Key;
                      default: return Sparkles;
                    }
                  })();

                  return (
                    <motion.div
                      key={idx}
                      style={{
                        pointerEvents,
                        zIndex: 50 - idx,
                      }}
                      animate={{
                        y,
                        scale,
                        opacity,
                        rotate,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 240,
                        damping: 24,
                      }}
                      className="absolute inset-0 max-w-lg mx-auto w-full h-full"
                    >
                      <div className={`
                        w-full h-full p-6 sm:p-10 rounded-3xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 border
                        ${isCurrent 
                          ? 'bg-white/80 border-white backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(148,163,184,0.22)] ring-2 ring-emerald-500/5' 
                          : 'bg-white/60 border-white/70 backdrop-blur-lg shadow-[0_15px_35px_-10px_rgba(148,163,184,0.12)]'
                        }
                        text-slate-800
                      `}>
                        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.06]">
                          <div className="absolute top-[-20%] right-[-10%] w-[220px] h-[220px] bg-emerald-500 rounded-full blur-[45px]" />
                          <div className="absolute bottom-[-20%] left-[-10%] w-[220px] h-[220px] bg-teal-500 rounded-full blur-[45px]" />
                        </div>

                        <div className="absolute right-6 top-4 select-none pointer-events-none font-mono text-[90px] sm:text-[110px] leading-none font-extrabold tracking-tighter text-slate-900/[0.04]">
                          0{idx + 1}
                        </div>

                        <div className="relative z-10 w-full flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-500/20 shadow-sm">
                                <IconComponent className="w-5.5 h-5.5 sm:w-6 sm:h-6" />
                              </div>
                              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-150 px-3 py-1 rounded-full">
                                {step.badge}
                              </span>
                            </div>

                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-2 sm:mb-3">
                              {step.title}
                            </h3>

                            <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed font-semibold pr-4">
                              {step.desc}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                            <div className="flex items-center gap-1">
                              {orbitSteps.map((_, dotIdx) => (
                                <button
                                  key={`dot-${dotIdx}`}
                                  onClick={() => scrollToStep(dotIdx)}
                                  className={`
                                    w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full cursor-pointer transition-all border-0 p-0
                                    ${dotIdx === idx 
                                      ? 'bg-emerald-500 w-4 sm:w-5' 
                                      : dotIdx < activeTimelineStep
                                        ? 'bg-emerald-400/60'
                                        : 'bg-slate-200 hover:bg-slate-300'
                                    }
                                  `}
                                  title={`Шаг ${dotIdx + 1}`}
                                />
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {idx < 7 ? (
                                <button
                                  onClick={() => scrollToStep(idx + 1)}
                                  className="text-[10px] sm:text-xs font-black uppercase text-emerald-600 tracking-wider flex items-center gap-1 cursor-pointer bg-slate-50 hover:bg-emerald-50 border border-slate-200/50 hover:border-emerald-200/50 py-1.5 px-3 rounded-xl transition-all font-semibold"
                                >
                                  Далее
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <button
                                  onClick={scrollToCalculator}
                                  className="text-[10px] sm:text-xs font-black uppercase text-emerald-700 tracking-wider flex items-center gap-1.5 cursor-pointer bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl transition-all animate-bounce font-semibold"
                                >
                                  Рассчитать ипотеку
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>

          </div>
        </section>

        {/* CUSTOM TRUST FAQ ACCORDION SECTION */}
        <section className="mt-32 sm:mt-48 md:mt-64 mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5">
              <span className="text-xs font-extrabold tracking-widest text-[#64748B] uppercase">Ответы на вопросы</span>
              <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight mt-2 mb-4">
                Часто задаваемые вопросы клиентов
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                Не нашли нужную информацию? Введите параметры в калькуляторе и зафиксируйте расчет для детального анализа — система сформирует оптимальные рекомендации.
              </p>
              <div className="mt-8 flex gap-4">
                <button 
                  onClick={scrollToCalculator}
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer border-0 w-full sm:w-auto text-center"
                >
                  Оформить онлайн аудит
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  q: 'Можно ли использовать маткапитал в качестве первоначального взноса без собственных накоплений?',
                  a: 'Да. По закону РФ сертификат материнского капитала можно направить на формирование первоначального взноса. Некоторые банки требуют небольшую доплату наличными (от 5% до 10%), однако существуют специальные программы, позволяющие оформить расчет абсолютно без личных накоплений.'
                },
                {
                  q: 'Как быть, если ребенку еще не исполнилось 3 года?',
                  a: 'Если вы берете ипотечный кредит, то использовать материнский капитал на первоначальный взнос или гашение долга можно в любой момент сразу после рождения ребенка. Ждать исполнения 3-х лет не требуется!'
                },
                {
                  q: 'Как продать квартиру, если в нее уже вложен материнский капитал?',
                  a: 'Для этого необходимо наделить детей долями в праве собственности, получить официальное согласие органов опеки на продажу этого объекта с одновременным выделением соразмерных долей в покупаемой квартире. Данная процедура требует согласованного поэтапного оформления для освобождения вашего времени от лишней бюрократии.'
                },
                {
                  q: 'Какие документы нужны для старта расчета?',
                  a: 'На первом этапе потребуются только базовые сведения: ваш паспорт РФ, СНИЛС и сам сертификат материнского капитала (бумажный оригинал либо выписка с портала Госуслуг). Одобрение банка по двум документам занимает до 2-х часов.'
                }
              ].map((faq, idx) => {
                const isOpen = activeFaqIndex === idx;
                const handleFaqToggle = () => {
                  setActiveFaqIndex(isOpen ? null : idx);
                };
                return (
                  <div key={idx} className="bg-white/40 border border-gray-200/60 rounded-2xl p-5 transition-all">
                    <button 
                      onClick={handleFaqToggle}
                      className="w-full flex items-center justify-between text-left focus:outline-hidden bg-transparent border-0 cursor-pointer"
                    >
                      <span className="font-extrabold text-slate-900 text-sm sm:text-base pr-4">
                        {faq.q}
                      </span>
                      <span className="text-xl text-slate-500 font-extralight select-none">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium block">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white relative z-10 border-t border-slate-800" id="contacts">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            
            <div className="md:col-span-2 space-y-4">
              <div 
                className="flex items-center gap-2.5 cursor-pointer select-none"
                onClick={handleLogoClick}
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-500 text-white">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <div className="font-extrabold text-base tracking-tight text-white">
                  ЛЬГОТНАЯ ИПОТЕКА <span className="text-[#94A3B8] font-normal">| {new Date().getFullYear()}</span>
                </div>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed font-semibold max-w-sm">
                Интерактивный независимый инструмент для подбора программ государственной поддержки, расчета платежей и анализа условий ипотечного кредитования.
              </p>
              
              {/* Back Office Button link */}
              <button
                onClick={() => { setShowAdmin(true); }}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1.5 transition-all outline-hidden mt-3 cursor-pointer bg-transparent border-0"
              >
                <Lock className="w-3.5 h-3.5" />
                Кабинет обработки заявок
              </button>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold text-xs uppercase tracking-widest text-[#94A3B8] mb-4">Навигация</h4>
              <ul className="space-y-2 text-xs text-slate-300 font-semibold list-none p-0 flex flex-col gap-1">
                <li><span className="hover:text-white cursor-pointer transition-colors" onClick={scrollToCalculator}>Калькулятор</span></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">Выгоды программ</a></li>
                <li><a href="#how" className="hover:text-white transition-colors">План расчета</a></li>
              </ul>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-[11px] text-[#64748B] font-semibold space-y-3 max-w-4xl mx-auto leading-relaxed">
            <div>
              © 2026 Единый Центр Недвижимости (centr-nedvighimosti.ru). Все права защищены.
            </div>
            <div>
              Информация на данном сайте носит исключительно ознакомительный характер и ни при каких условиях не является публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса РФ. Расчеты в калькуляторе являются предварительными. Для получения точных условий по кредитованию и государственным программам обратитесь к сертифицированному специалисту центра.
            </div>
            <div>
              Нажимая на кнопки на сайте, вы даете{' '}
              <span className="underline cursor-pointer hover:text-emerald-400 transition-colors">
                Согласие на обработку персональных данных
              </span>{' '}
              и соглашаетесь с{' '}
              <span className="underline cursor-pointer hover:text-emerald-400 transition-colors">
                Политикой конфиденциальности
              </span>
              .
            </div>
          </div>
        </div>
      </footer>

      {/* REVELATION ADMIN DRAWER: REAL CLIENT-SIDE CABINET */}
      <AnimatePresence>
        {showAdmin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden border border-gray-200"
            >
              
              {/* Cabinet Header */}
              <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500 rounded-lg text-white">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg">Кабинет Заявок (СRM)</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Безопасный доступ к отправленным лидам</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowAdmin(false);
                    setAdminCode('');
                    setIsAdminAuthenticated(false);
                    setAdminError('');
                  }}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer"
                >
                  <X className="w-5.5 h-5.5" />
                </button>
              </div>

              {/* Login block if not authenticated */}
              {!isAdminAuthenticated ? (
                <div className="p-8 sm:p-12 text-center max-w-sm mx-auto space-y-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-500 font-semibold text-lg">
                    <Lock className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">Авторизация владельца сайта</h4>
                    <p className="text-xs text-slate-500 mt-1">Введите пароль для просмотра списка лидов рекламной кампании.</p>
                  </div>

                  <form onSubmit={handleAdminVerify} className="space-y-4 text-left">
                    <div>
                      <input 
                        type="password"
                        placeholder="Код доступа (введите '2026' или 'admin')"
                        value={adminCode}
                        onChange={(e) => setAdminCode(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
                        required
                        autoFocus
                      />
                    </div>
                    {adminError && <p className="text-xs text-rose-600 font-bold text-center">{adminError}</p>}
                    <button 
                      type="submit"
                      className="w-full bg-slate-950 text-white font-bold py-3 text-xs uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-colors cursor-pointer border-0"
                    >
                      Посмотреть лиды
                    </button>
                  </form>
                </div>
              ) : (
                /* ACTUAL CRM DATA PANELS */
                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                  
                  {/* Top quick stats widget */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-50 border border-gray-200/60 rounded-xl p-4 text-center">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Всего Лидов</span>
                      <span className="block text-2xl font-black text-slate-900 mt-0.5">{leads.length}</span>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-4 text-center">
                      <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">Купить жилье</span>
                      <span className="block text-2xl font-black text-emerald-900 mt-0.5">
                        {leads.filter(l => l.goal === 'buy').length}
                      </span>
                    </div>
                    <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4 text-center">
                      <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Продать жилье</span>
                      <span className="block text-2xl font-black text-amber-900 mt-0.5">
                        {leads.filter(l => l.goal === 'sell').length}
                      </span>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <span className="text-xs font-extrabold text-slate-800 uppercase">Список заявителей {leads.length > 0 && `(${leads.length})`}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={exportToCSV}
                        disabled={leads.length === 0}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer border-0"
                      >
                        <Download className="w-3.5 h-3.5" /> Экспорт CSV (Excel)
                      </button>
                      <button 
                        onClick={handleClearAllLeads}
                        disabled={leads.length === 0}
                        className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 disabled:opacity-40 border border-rose-200 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Очистить все
                      </button>
                    </div>
                  </div>

                  {/* Table with applicants */}
                  {leads.length === 0 ? (
                    <div className="py-12 border border-dashed border-gray-200 rounded-2xl text-center space-y-3">
                      <p className="text-sm text-slate-500 font-semibold">На данный момент заявок нет</p>
                      <p className="text-xs text-slate-400">Заполните форму калькулятора, чтобы смоделировать поступление нового лида</p>
                      <button 
                        onClick={() => {
                          setShowAdmin(false);
                          scrollToCalculator();
                        }}
                        className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg text-xs font-black text-slate-800 border-0 cursor-pointer"
                      >
                        Перейти к заполнению
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-gray-100 rounded-xl">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-gray-100 text-[#475569] font-bold">
                            <th className="p-3.5">Дата / ID</th>
                            <th className="p-3.5">ФИО</th>
                            <th className="p-3.5">Телефон для связи</th>
                            <th className="p-3.5">Запрос / Капитал</th>
                            <th className="p-3.5 text-right">Расчет</th>
                            <th className="p-3.5 text-center">Действия</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {leads.map((l) => (
                            <tr key={l.id} className="hover:bg-slate-50/70 transition-colors text-slate-700 font-semibold border-b border-gray-100/60">
                              <td className="p-3.5">
                                <span className="block text-slate-900 font-black">{l.submittedAt}</span>
                                <span className="text-[10px] text-zinc-400 font-mono">{l.id}</span>
                              </td>
                              <td className="p-3.5">
                                <span className="block font-black text-slate-900">
                                  {l.lastName ? `${l.name} ${l.lastName}` : l.name}
                                </span>
                                {l.contactMethod && (
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-sky-50 text-sky-700 text-[9px] font-black uppercase tracking-wider mt-1 mr-1">
                                    💬 {l.contactMethod}
                                  </span>
                                )}
                                {l.telegramUsername && (
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-wider mt-1">
                                    ✈️ {l.telegramUsername.startsWith('@') ? l.telegramUsername : '@' + l.telegramUsername}
                                  </span>
                                )}
                              </td>
                              <td className="p-3.5">
                                <div className="flex items-center gap-1.5 matches-phone">
                                  <span className="font-extrabold text-slate-900">{l.phone}</span>
                                  <button 
                                    onClick={() => copyValue(l.phone, l.id)}
                                    className="p-1 hover:bg-gray-100 rounded text-slate-400 hover:text-slate-900 transition-colors relative bg-transparent border-0 cursor-pointer"
                                    title="Скопировать телефон"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                    {copiedId === l.id && (
                                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] py-0.5 px-1.5 rounded shadow-sm whitespace-nowrap">
                                        Скопировано!
                                      </span>
                                    )}
                                  </button>
                                </div>
                              </td>
                              <td className="p-3.5 space-y-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-extrabold text-[#111827]">
                                    {l.goal === 'buy' ? '🏠 Покупка' : '🔑 Продажа'}
                                  </span>
                                  {l.rooms && (
                                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[#475569] text-[9px] font-black">
                                      {l.rooms}
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-500 font-medium leading-relaxed space-y-0.5">
                                  <div>Программа: <span className="text-slate-800 font-extrabold">{l.program}</span></div>
                                  <div>Маткапитал: <span className="text-slate-800 font-extrabold">{l.useMatCap ? 'Да' : 'Нет'}</span></div>
                                  {l.goal === 'buy' && (
                                    <>
                                      {l.locationType && <div>Тип объекта: <span className="text-emerald-700 font-bold">{l.locationType}</span></div>}
                                      {l.readiness && <div>Сроки: <span className="text-amber-700 font-bold">{l.readiness}</span></div>}
                                    </>
                                  )}
                                  {l.goal === 'sell' && (
                                    <>
                                      {l.condition && <div>Состояние ремонта: <span className="text-indigo-700 font-bold">{l.condition}</span></div>}
                                      {l.urgency && <div>Срочность: <span className="text-rose-700 font-bold">{l.urgency}</span></div>}
                                    </>
                                  )}
                                </div>
                              </td>
                              <td className="p-3.5 text-right">
                                <span className="block text-slate-900 font-black">
                                  {l.propertyValue.toLocaleString('ru-RU')} ₽
                                </span>
                                {l.goal === 'buy' && (
                                  <span className="text-[10px] text-emerald-600 block font-bold">
                                    {l.monthlyPayment.toLocaleString('ru-RU')} ₽/мес
                                  </span>
                                )}
                              </td>
                              <td className="p-3.5 text-center">
                                <button 
                                  onClick={() => handleDeleteLead(l.id)}
                                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer border-0"
                                  title="Удалить лид"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="text-[10px] text-[#64748B] font-semibold text-center mt-3 pt-3 border-t border-gray-100">
                    Панель полностью энергонезависима и работает изолированно в вашем браузере. Вы можете экспортировать заявки в Excel в любое время дня.
                  </div>

                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
