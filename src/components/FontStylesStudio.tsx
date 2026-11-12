import React, { useState } from 'react';
import { ARABIC_FONTS } from '../data/arabicFonts';
import { DECORATION_STYLES } from '../utils/arabicDecorators';
import { keyboardAudio } from '../utils/audio';
import { Copy, Check, ArrowRightLeft, Sparkles, Type } from 'lucide-react';

interface FontStylesStudioProps {
  currentText: string;
  onApplyStyle: (transformedText: string) => void;
  onApplyFont: (fontId: string) => void;
  onCopyStyle: (text: string) => void;
  selectedFontId: string;
}

export const FontStylesStudio: React.FC<FontStylesStudioProps> = ({
  currentText,
  onApplyStyle,
  onApplyFont,
  onCopyStyle,
  selectedFontId
}) => {
  const [activeTab, setActiveTab] = useState<'decorations' | 'fonts'>('decorations');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sampleText = currentText.trim() ? currentText : 'جمال الخط العربي والزخرفة الأصيلة';

  const handleCopy = (id: string, text: string) => {
    keyboardAudio.playKeySound();
    onCopyStyle(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };

  const handleApply = (text: string) => {
    keyboardAudio.playKeySound();
    onApplyStyle(text);
  };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
        <div>
          <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>استوديو الخطوط والزخارف العربية الفورية</span>
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            تحويل فوري لنصك إلى أكثر من 16 نمط زخرفة ونماذج الخطوط العربية الأصيلة
          </p>
        </div>

        {/* Tab switch: Decorations vs Fonts */}
        <div className="flex items-center gap-1 bg-stone-950/80 border border-stone-700/60 rounded-lg p-1 self-start sm:self-auto">
          <button
            onClick={() => {
              keyboardAudio.playKeySound();
              setActiveTab('decorations');
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'decorations'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>الأنماط المزخرفة ({DECORATION_STYLES.length})</span>
          </button>
          <button
            onClick={() => {
              keyboardAudio.playKeySound();
              setActiveTab('fonts');
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'fonts'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>عائلات الخطوط ({ARABIC_FONTS.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Arabic Decoration Styles */}
      {activeTab === 'decorations' && (
        <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto p-1">
          {DECORATION_STYLES.map((style) => {
            const transformed = style.transform(sampleText);
            const isCopied = copiedId === style.id;

            return (
              <div
                key={style.id}
                className="bg-stone-950/70 border border-stone-800/80 hover:border-amber-500/40 rounded-xl p-3.5 transition-all flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5">
                    <span className="font-semibold text-stone-300">{style.nameAr}</span>
                    <span className="text-[10px] text-stone-500">{style.category}</span>
                  </div>
                  <div className="bg-stone-900/90 border border-stone-800/60 rounded-lg p-3 text-stone-100 font-tajawal text-base sm:text-lg break-words select-all">
                    {transformed}
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-end pt-1 border-t border-stone-800/50">
                  <button
                    onClick={() => handleApply(transformed)}
                    className="px-2.5 py-1 text-xs text-stone-300 hover:text-amber-300 hover:bg-stone-800 rounded-md transition-colors flex items-center gap-1"
                    title="استبدال النص الحالي في المحرر بهذه الزخرفة"
                  >
                    <ArrowRightLeft className="w-3 h-3" />
                    <span>تطبيق بالمحرر</span>
                  </button>
                  <button
                    onClick={() => handleCopy(style.id, transformed)}
                    className="px-3 py-1 text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-600/40 rounded-md transition-all flex items-center gap-1 active:scale-95"
                    title="نسخ النص المزخرف للحافظة"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>نسخ</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Arabic Font Families Display */}
      {activeTab === 'fonts' && (
        <div className="pt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto p-1">
          {ARABIC_FONTS.map((font) => {
            const isSelected = selectedFontId === font.id;
            const isCopied = copiedId === font.id;

            return (
              <div
                key={font.id}
                className={`border rounded-xl p-3.5 transition-all flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/60 shadow-md shadow-amber-950/40'
                    : 'bg-stone-950/70 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-stone-200">{font.nameAr}</span>
                    <span className="text-[10px] text-stone-400">{font.name}</span>
                  </div>
                  <div className={`p-3 bg-stone-900/90 rounded-lg text-lg sm:text-xl text-stone-100 ${font.className} leading-relaxed min-h-[70px] flex items-center`}>
                    {sampleText}
                  </div>
                  <p className="text-[11px] text-stone-400 mt-2 leading-relaxed">
                    {font.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 justify-end pt-2 border-t border-stone-800/60">
                  <button
                    onClick={() => {
                      keyboardAudio.playKeySound();
                      onApplyFont(font.id);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                    }`}
                  >
                    {isSelected ? 'الخط المفعّل حالياً' : 'تفعيل للوحة المفاتيح'}
                  </button>
                  <button
                    onClick={() => handleCopy(font.id, sampleText)}
                    className="p-1.5 rounded-md hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
                    title="نسخ النص"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
