import React, { useState } from 'react';
import { 
  TASHKEEL_KEYS, 
  ARABIC_ROW_NUMBERS, 
  ARABIC_ROW_1, 
  ARABIC_ROW_2, 
  ARABIC_ROW_3 
} from '../data/keyboardLayouts';
import { KeyboardKey, SoundType, KeyboardTheme } from '../types/keyboard';
import { KEYBOARD_THEMES } from '../data/themes';
import { keyboardAudio } from '../utils/audio';
import { Delete, CornerDownLeft, ArrowUp, Volume2, Sparkles, Smile, Palette } from 'lucide-react';

interface VirtualKeyboardProps {
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onSpace: () => void;
  currentTheme: KeyboardTheme;
  soundType: SoundType;
  setSoundType: (sound: SoundType) => void;
  setCurrentTheme: (theme: KeyboardTheme) => void;
  onOpenEmojis: () => void;
  onOpenStyles: () => void;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onKeyPress,
  onBackspace,
  onEnter,
  onSpace,
  currentTheme,
  soundType,
  setSoundType,
  setCurrentTheme,
  onOpenEmojis,
  onOpenStyles
}) => {
  const [isShift, setIsShift] = useState(false);
  const theme = KEYBOARD_THEMES[currentTheme];

  const handleKeyClick = (key: KeyboardKey) => {
    keyboardAudio.playKeySound();
    const charToInsert = isShift && key.shiftLabel ? key.shiftLabel : key.label;
    onKeyPress(charToInsert);
  };

  const handleBackspace = () => {
    keyboardAudio.playKeySound();
    onBackspace();
  };

  const handleSpace = () => {
    keyboardAudio.playKeySound();
    onSpace();
  };

  const handleEnter = () => {
    keyboardAudio.playKeySound();
    onEnter();
  };

  const handleShiftToggle = () => {
    keyboardAudio.playKeySound();
    setIsShift(!isShift);
  };

  return (
    <div className={`rounded-2xl p-2.5 sm:p-4 border ${theme.borderClass} ${theme.surfaceClass} shadow-2xl transition-colors duration-200 select-none`}>
      {/* Top Bar for Tashkeel & Harakat (Quick Diacritics Strip) */}
      <div className="mb-2.5 pb-2.5 border-b border-stone-800/60">
        <div className="flex items-center justify-between gap-2 mb-1.5 px-1">
          <span className="text-[11px] font-semibold text-amber-400/90 flex items-center gap-1">
            <span>تشكيل الحركات وعلامات الضبط</span>
          </span>
          <span className="text-[10px] text-stone-400">انقر لإضافة الحركة مباشرة للحرف السابق</span>
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
          {TASHKEEL_KEYS.map((k, idx) => (
            <button
              key={idx}
              onClick={() => handleKeyClick(k)}
              className={`min-h-[42px] py-1 px-1.5 rounded-lg font-bold text-base sm:text-lg flex flex-col items-center justify-center border transition-all key-press-effect ${
                k.type === 'tashkeel'
                  ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-600/30'
                  : 'bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 border-stone-700/50'
              }`}
              title={k.shiftLabel}
            >
              <span>{k.label}</span>
              <span className="text-[8px] font-normal opacity-70 leading-none mt-0.5">{k.shiftLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Row 1: Numbers & Shift Glyphs */}
      <div className="grid grid-cols-10 gap-1 sm:gap-1.5 mb-1.5">
        {ARABIC_ROW_NUMBERS.map((k, idx) => (
          <button
            key={idx}
            onClick={() => handleKeyClick(k)}
            className={`min-h-[42px] sm:min-h-[44px] rounded-lg font-semibold text-sm sm:text-base flex flex-col items-center justify-center border transition-all key-press-effect ${theme.keyBgClass} ${theme.keyActiveBg}`}
          >
            <span>{isShift && k.shiftLabel ? k.shiftLabel : k.label}</span>
            <span className="text-[8px] opacity-40 leading-none">{k.shiftLabel}</span>
          </button>
        ))}
      </div>

      {/* Row 2: Letters (ض ص ث ق ف غ ع ه خ ح ج د) */}
      <div className="grid grid-cols-12 gap-1 sm:gap-1.5 mb-1.5">
        {ARABIC_ROW_1.map((k, idx) => (
          <button
            key={idx}
            onClick={() => handleKeyClick(k)}
            className={`min-h-[42px] sm:min-h-[46px] rounded-lg font-bold text-base sm:text-lg flex flex-col items-center justify-center border transition-all key-press-effect ${theme.keyBgClass} ${theme.keyActiveBg}`}
          >
            <span>{isShift && k.shiftLabel ? k.shiftLabel : k.label}</span>
            {k.shiftLabel && (
              <span className="text-[8px] opacity-40 leading-none">{k.shiftLabel}</span>
            )}
          </button>
        ))}
      </div>

      {/* Row 3: Letters (ش س ي ب ل ا ت ن م ك ط) */}
      <div className="grid grid-cols-11 gap-1 sm:gap-1.5 mb-1.5 px-1 sm:px-3">
        {ARABIC_ROW_2.map((k, idx) => (
          <button
            key={idx}
            onClick={() => handleKeyClick(k)}
            className={`min-h-[42px] sm:min-h-[46px] rounded-lg font-bold text-base sm:text-lg flex flex-col items-center justify-center border transition-all key-press-effect ${theme.keyBgClass} ${theme.keyActiveBg}`}
          >
            <span>{isShift && k.shiftLabel ? k.shiftLabel : k.label}</span>
            {k.shiftLabel && (
              <span className="text-[8px] opacity-40 leading-none">{k.shiftLabel}</span>
            )}
          </button>
        ))}
      </div>

      {/* Row 4: Shift, Letters (ئ ء ؤ ر ى ة و ز ظ), Backspace */}
      <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5">
        {/* Shift Key */}
        <button
          onClick={handleShiftToggle}
          className={`min-w-[48px] sm:min-w-[62px] min-h-[42px] sm:min-h-[46px] rounded-lg flex items-center justify-center border transition-all key-press-effect ${
            isShift
              ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md'
              : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border-stone-700'
          }`}
          title="تبديل الرموز والحركات العلوية"
        >
          <ArrowUp className={`w-4 h-4 ${isShift ? 'stroke-[3]' : ''}`} />
        </button>

        {/* Letters Grid */}
        <div className="grid grid-cols-9 flex-1 gap-1 sm:gap-1.5">
          {ARABIC_ROW_3.map((k, idx) => (
            <button
              key={idx}
              onClick={() => handleKeyClick(k)}
              className={`min-h-[42px] sm:min-h-[46px] rounded-lg font-bold text-base sm:text-lg flex flex-col items-center justify-center border transition-all key-press-effect ${theme.keyBgClass} ${theme.keyActiveBg}`}
            >
              <span>{isShift && k.shiftLabel ? k.shiftLabel : k.label}</span>
              {k.shiftLabel && (
                <span className="text-[8px] opacity-40 leading-none">{k.shiftLabel}</span>
              )}
            </button>
          ))}
        </div>

        {/* Backspace Key */}
        <button
          onClick={handleBackspace}
          className="min-w-[48px] sm:min-w-[62px] min-h-[42px] sm:min-h-[46px] rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-200 border border-rose-800/40 flex items-center justify-center transition-all key-press-effect active:scale-95"
          title="حذف"
        >
          <Delete className="w-4 h-4" />
        </button>
      </div>

      {/* Row 5: Action Row (Symbols, Emojis, Spacebar, Tatweel, Enter) */}
      <div className="flex items-center gap-1.5 pt-1">
        {/* Quick Emoji Switcher Button */}
        <button
          onClick={onOpenEmojis}
          className="min-h-[44px] px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-600/30 text-amber-300 flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition-colors key-press-effect"
          title="فتح باقة الإيموجيات النادرة"
        >
          <Smile className="w-4 h-4" />
          <span className="hidden sm:inline">إيموجيات نادرة</span>
        </button>

        {/* Quick Style Switcher Button */}
        <button
          onClick={onOpenStyles}
          className="min-h-[44px] px-3 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-600/30 text-purple-300 flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap transition-colors key-press-effect"
          title="محول الخطوط والزخارف"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">الزخارف</span>
        </button>

        {/* Spacebar */}
        <button
          onClick={handleSpace}
          className={`flex-1 min-h-[44px] rounded-lg border font-medium text-xs sm:text-sm flex items-center justify-center gap-1 transition-all key-press-effect ${theme.keyBgClass} ${theme.keyActiveBg}`}
        >
          <span>مسافة</span>
        </button>

        {/* Tatweel / Kashida */}
        <button
          onClick={() => onKeyPress('ـ')}
          className="min-w-[48px] sm:min-w-[56px] min-h-[44px] rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700/60 font-bold text-base flex flex-col items-center justify-center transition-colors key-press-effect"
          title="تطويل الحرف بالكشيدة"
        >
          <span>ـ</span>
          <span className="text-[8px] text-stone-400 font-normal leading-none">كشيدة</span>
        </button>

        {/* Enter Key */}
        <button
          onClick={handleEnter}
          className="min-w-[52px] sm:min-w-[68px] min-h-[44px] rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1 border border-amber-400 shadow-md transition-all key-press-effect active:scale-95"
          title="سطر جديد"
        >
          <CornerDownLeft className="w-4 h-4" />
          <span className="hidden sm:inline">إدخال</span>
        </button>
      </div>
    </div>
  );
};
