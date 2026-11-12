import React, { useRef } from 'react';
import { 
  Copy, 
  Check, 
  Trash2, 
  RotateCcw, 
  RotateCw, 
  Share2, 
  Download, 
  Sparkles, 
  Type, 
  Maximize2,
  ExternalLink
} from 'lucide-react';
import { ARABIC_FONTS } from '../data/arabicFonts';
import { stripTashkeel, addKashida } from '../utils/arabicDecorators';

interface EditorAreaProps {
  text: string;
  setText: (text: string) => void;
  selectedFontId: string;
  setSelectedFontId: (id: string) => void;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  setFontSize: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  onCopy: (textToCopy?: string) => void;
  copied: boolean;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onInsertText: (inserted: string) => void;
}

export const EditorArea: React.FC<EditorAreaProps> = ({
  text,
  setText,
  selectedFontId,
  setSelectedFontId,
  fontSize,
  setFontSize,
  onCopy,
  copied,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  textareaRef,
  onInsertText
}) => {
  const currentFont = ARABIC_FONTS.find((f) => f.id === selectedFontId) || ARABIC_FONTS[0];

  const fontSizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl'
  }[fontSize];

  // Quick stats calculation
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const tashkeelCount = (text.match(/[\u064B-\u065F\u0670\u06D6-\u06DC]/g) || []).length;

  const handleShareWhatsApp = () => {
    if (!text.trim()) return;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareTelegram = () => {
    if (!text.trim()) return;
    const url = `https://t.me/share/url?url=&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareTwitter = () => {
    if (!text.trim()) return;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadTxt = () => {
    if (!text.trim()) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `زخرفة_عربية_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleWrapWith = (start: string, end: string) => {
    if (!text.trim()) {
      setText(`${start} نصك هنا ${end}`);
      return;
    }
    setText(`${start} ${text.trim()} ${end}`);
  };

  const handleElongate = () => {
    if (!text.trim()) return;
    setText(addKashida(text, 2));
  };

  const handleStrip = () => {
    if (!text.trim()) return;
    setText(stripTashkeel(text));
  };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-xl relative backdrop-blur-sm">
      {/* Top Editor Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800 text-xs text-stone-300">
        {/* Font Family Selector & Size */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-stone-950/80 border border-stone-700/60 rounded-lg px-2.5 py-1.5">
            <Type className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <select
              value={selectedFontId}
              onChange={(e) => setSelectedFontId(e.target.value)}
              className="bg-transparent text-stone-100 text-xs focus:outline-none cursor-pointer pr-1"
            >
              {ARABIC_FONTS.map((font) => (
                <option key={font.id} value={font.id} className="bg-stone-900 text-stone-100">
                  {font.nameAr}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size Selector */}
          <div className="flex items-center gap-1 bg-stone-950/80 border border-stone-700/60 rounded-lg p-1">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                fontSize === 'sm' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
              title="حجم خط صغير"
            >
              صغير
            </button>
            <button
              onClick={() => setFontSize('md')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                fontSize === 'md' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
              title="حجم خط متوسط"
            >
              متوسط
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                fontSize === 'lg' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
              title="حجم خط كبير"
            >
              كبير
            </button>
            <button
              onClick={() => setFontSize('xl')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                fontSize === 'xl' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
              title="حجم خط ضخم"
            >
              ضخم
            </button>
          </div>
        </div>

        {/* Undo / Redo / Clear Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-1.5 rounded-lg bg-stone-950/80 border border-stone-700/60 text-stone-300 hover:text-stone-100 disabled:opacity-40 disabled:hover:text-stone-300 transition-colors"
            title="تراجع"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-1.5 rounded-lg bg-stone-950/80 border border-stone-700/60 text-stone-300 hover:text-stone-100 disabled:opacity-40 disabled:hover:text-stone-300 transition-colors"
            title="إعادة"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setText('')}
            className="p-1.5 rounded-lg bg-stone-950/80 border border-stone-700/60 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
            title="مسح النص بالكامل"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Text Area */}
      <div className="relative my-3">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب هنا أو استخدم أزرار لوحة المفاتيح والتشكيل والإيموجيات النادرة في الأسفل..."
          rows={3}
          dir="rtl"
          className={`w-full bg-stone-950/70 border border-stone-800 focus:border-amber-500/80 rounded-xl p-3 sm:p-4 text-stone-100 focus:outline-none transition-colors resize-y min-h-[120px] max-h-[300px] leading-relaxed ${currentFont.className} ${fontSizeClasses}`}
        />
      </div>

      {/* Quick Diacritics & Frames Toolstrip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs no-scrollbar">
        <span className="text-[11px] text-stone-400 whitespace-nowrap pl-1">أدوات سريعة:</span>
        <button
          onClick={handleElongate}
          className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-md transition-colors whitespace-nowrap text-xs border border-stone-700/60"
          title="تمديد الحروف بكشيدة ممتدة"
        >
          تمديد بالكشيدة (ـ)
        </button>
        <button
          onClick={handleStrip}
          className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-md transition-colors whitespace-nowrap text-xs border border-stone-700/60"
          title="حذف جميع علامات التشكيل"
        >
          إزالة التشكيل
        </button>
        <button
          onClick={() => handleWrapWith('﴿', '﴾')}
          className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded-md transition-colors whitespace-nowrap text-xs border border-stone-700/60"
        >
          ﴿ أقواس قرآنية ﴾
        </button>
        <button
          onClick={() => handleWrapWith('𓆩', '𓆪')}
          className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-cyan-300 rounded-md transition-colors whitespace-nowrap text-xs border border-stone-700/60"
        >
          𓆩 أجنحة فخمة 𓆪
        </button>
        <button
          onClick={() => handleWrapWith('𓆩♡𓆪', '𓆩♡𓆪')}
          className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-rose-300 rounded-md transition-colors whitespace-nowrap text-xs border border-stone-700/60"
        >
          𓆩♡𓆪 قلوب 𓆩♡𓆪
        </button>
        <button
          onClick={() => handleWrapWith('亗', '亗')}
          className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-emerald-300 rounded-md transition-colors whitespace-nowrap text-xs border border-stone-700/60"
        >
          亗 تاج الهيبة 亗
        </button>
        <button
          onClick={() => handleWrapWith('★彡', '彡★')}
          className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-yellow-300 rounded-md transition-colors whitespace-nowrap text-xs border border-stone-700/60"
        >
          ★彡 نجوم 彡★
        </button>
      </div>

      {/* Footer Stats & Sharing Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800/80 text-xs">
        {/* Unboxed Metadata Stats with · separators */}
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <span>{charCount} حرف</span>
          <span aria-hidden="true">·</span>
          <span>{wordCount} كلمة</span>
          <span aria-hidden="true">·</span>
          <span>{tashkeelCount} حركة تشكيل</span>
        </div>

        {/* Share buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={handleShareWhatsApp}
            className="px-2.5 py-1 bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/50 rounded-md transition-colors flex items-center gap-1 text-[11px]"
            title="مشاركة عبر واتساب"
          >
            واتساب
          </button>
          <button
            onClick={handleShareTelegram}
            className="px-2.5 py-1 bg-sky-950/70 hover:bg-sky-900 text-sky-300 border border-sky-700/50 rounded-md transition-colors flex items-center gap-1 text-[11px]"
            title="مشاركة عبر تليجرام"
          >
            تليجرام
          </button>
          <button
            onClick={handleShareTwitter}
            className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700/60 rounded-md transition-colors flex items-center gap-1 text-[11px]"
            title="مشاركة عبر X"
          >
            منصة X
          </button>
          <button
            onClick={handleDownloadTxt}
            className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700/60 rounded-md transition-colors flex items-center gap-1 text-[11px]"
            title="تحميل كملف نصي"
          >
            <Download className="w-3 h-3" />
            <span>تنزيل</span>
          </button>
        </div>
      </div>
    </div>
  );
};
