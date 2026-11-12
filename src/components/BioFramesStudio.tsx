import React, { useState } from 'react';
import { BIO_NAME_PRESETS } from '../data/emojisAndSymbols';
import { keyboardAudio } from '../utils/audio';
import { Copy, Check, ArrowRightLeft, Sparkles, UserCheck } from 'lucide-react';

interface BioFramesStudioProps {
  currentText: string;
  onApplyPreset: (text: string) => void;
  onCopyPreset: (text: string) => void;
}

export const BioFramesStudio: React.FC<BioFramesStudioProps> = ({
  currentText,
  onApplyPreset,
  onCopyPreset
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const sampleName = currentText.trim() ? currentText : 'اسم المستخدم أو اللقب';

  const handleCopy = (index: number, text: string) => {
    keyboardAudio.playKeySound();
    onCopyPreset(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 1500);
  };

  const handleApply = (text: string) => {
    keyboardAudio.playKeySound();
    onApplyPreset(text);
  };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
        <div>
          <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-amber-400" />
            <span>إطارات الأسماء والبايو الفخمة</span>
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            قوالب جاهزة لأسماء الحسابات وحالات الواتساب وبايو الإنستغرام والتيك توك
          </p>
        </div>
      </div>

      <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto p-1">
        {BIO_NAME_PRESETS.map((preset, idx) => {
          const generated = preset.template.replace('{text}', sampleName);
          const isCopied = copiedIndex === idx;

          return (
            <div
              key={idx}
              className="bg-stone-950/70 border border-stone-800 hover:border-amber-500/40 rounded-xl p-3 flex flex-col justify-between gap-3 group transition-all"
            >
              <div>
                <span className="text-[11px] font-semibold text-stone-400 block mb-1">
                  {preset.name}
                </span>
                <div className="bg-stone-900/90 border border-stone-800/80 rounded-lg p-2.5 text-center text-stone-100 font-tajawal text-sm sm:text-base break-words select-all">
                  {generated}
                </div>
              </div>

              <div className="flex items-center gap-1.5 justify-end pt-1 border-t border-stone-800/50">
                <button
                  onClick={() => handleApply(generated)}
                  className="px-2 py-1 text-[11px] text-stone-300 hover:text-amber-300 hover:bg-stone-800 rounded transition-colors flex items-center gap-1"
                  title="تطبيق في المحرر"
                >
                  <ArrowRightLeft className="w-3 h-3" />
                  <span>تطبيق</span>
                </button>
                <button
                  onClick={() => handleCopy(idx, generated)}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-600/30 rounded transition-all flex items-center gap-1"
                  title="نسخ"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>تم!</span>
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
    </div>
  );
};
