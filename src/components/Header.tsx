import React from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

interface HeaderProps {
  onCopyAll: () => void;
  copied: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onCopyAll, copied, activeTab, setActiveTab }) => {
  return (
    <header className="flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 border-b border-stone-800 bg-stone-950/90 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-bold text-lg shadow-sm shadow-amber-500/20">
          ض
        </span>
        <span className="text-base sm:text-lg font-bold tracking-tight text-stone-100 font-cairo">
          كيبورد الزخارف والإيموجيات
        </span>
      </div>

      {/* Zone 2: 4 clean single-line navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-stone-300">
        <button
          onClick={() => setActiveTab('keyboard')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'keyboard' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          لوحة المفاتيح
        </button>
        <button
          onClick={() => setActiveTab('emojis')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'emojis' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          الإيموجيات النادرة
        </button>
        <button
          onClick={() => setActiveTab('styles')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'styles' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          استوديو الخطوط
        </button>
        <button
          onClick={() => setActiveTab('frames')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'frames' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          إطارات الأسماء والبايو
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onCopyAll}
          className="px-4 py-2 text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95 whitespace-nowrap shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-stone-950" />
              <span>تم النسخ!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-stone-950" />
              <span>نسخ النص الكامل</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
