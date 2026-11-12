import React from 'react';
import { SoundType, KeyboardTheme } from '../types/keyboard';
import { KEYBOARD_THEMES } from '../data/themes';
import { keyboardAudio } from '../utils/audio';
import { Volume2, VolumeX, Palette, Sparkles } from 'lucide-react';

interface SoundAndThemeControlsProps {
  soundType: SoundType;
  setSoundType: (sound: SoundType) => void;
  currentTheme: KeyboardTheme;
  setCurrentTheme: (theme: KeyboardTheme) => void;
}

export const SoundAndThemeControls: React.FC<SoundAndThemeControlsProps> = ({
  soundType,
  setSoundType,
  currentTheme,
  setCurrentTheme
}) => {
  const soundOptions: { id: SoundType; nameAr: string; desc: string }[] = [
    { id: 'mechanical', nameAr: 'صوت ميكانيكي', desc: 'نقر سويتش كيبورد احترافي ملموس' },
    { id: 'soft', nameAr: 'نقر ناعم', desc: 'لمسة هادئة كشاشات الهواتف الذكية' },
    { id: 'typewriter', nameAr: 'آلة كاتبة', desc: 'صوت ميكانيكي كلاسيكي عتيق' },
    { id: 'bubble', nameAr: 'فقاعة مائية', desc: 'صوت مرح ومبهج مع كل ضغطة' },
    { id: 'mute', nameAr: 'كتم الصوت', desc: 'كتابة صامتة بدون مؤثرات صوتية' }
  ];

  const handleSoundChange = (type: SoundType) => {
    setSoundType(type);
    keyboardAudio.setSoundType(type);
    keyboardAudio.playKeySound();
  };

  const handleThemeChange = (themeId: KeyboardTheme) => {
    setCurrentTheme(themeId);
    keyboardAudio.playKeySound();
  };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-stone-800 mb-4">
        <div>
          <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
            <Palette className="w-4 h-4 text-amber-400" />
            <span>تخصيص مظهر لوحة المفاتيح والمؤثرات الصوتية</span>
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            اختر نمط الإضاءة والألوان، ومؤثرات صوت نقرات المفاتيح الحقيقية
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Sound Selection */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-300 mb-2.5">
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <span>مؤثر صوت نقرات المفاتيح</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {soundOptions.map((opt) => {
              const isSelected = soundType === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSoundChange(opt.id)}
                  className={`p-3 rounded-xl border text-right transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/60 text-stone-100 shadow-sm'
                      : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 text-stone-300'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold block">{opt.nameAr}</span>
                    <span className="text-[10px] text-stone-400">{opt.desc}</span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-amber-400 bg-amber-500' : 'border-stone-600'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-stone-950" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Theme Selection */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-300 mb-2.5">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>سمات وألوان الكيبورد (5 ستايلات عربية)</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {Object.values(KEYBOARD_THEMES).map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`p-3 rounded-xl border text-right transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/60 text-stone-100 shadow-sm'
                      : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold">{theme.nameAr}</span>
                    <span className="text-[10px] opacity-75">{theme.badge}</span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-amber-400 bg-amber-500' : 'border-stone-600'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-stone-950" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
