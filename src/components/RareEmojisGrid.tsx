import React, { useState, useMemo } from 'react';
import { EMOJI_CATEGORIES } from '../data/emojisAndSymbols';
import { keyboardAudio } from '../utils/audio';
import { Search, Sparkles, Copy, Check } from 'lucide-react';

interface RareEmojisGridProps {
  onInsertEmoji: (emoji: string) => void;
  onCopyEmoji: (emoji: string) => void;
}

export const RareEmojisGrid: React.FC<RareEmojisGridProps> = ({
  onInsertEmoji,
  onCopyEmoji
}) => {
  const [selectedCatId, setSelectedCatId] = useState<string>('kaomoji-cute');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const activeCategory = useMemo(() => {
    return EMOJI_CATEGORIES.find((c) => c.id === selectedCatId) || EMOJI_CATEGORIES[0];
  }, [selectedCatId]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return activeCategory.items;
    }
    const q = searchQuery.toLowerCase().trim();
    // Search across all categories if query is provided
    const allMatches: string[] = [];
    EMOJI_CATEGORIES.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.toLowerCase().includes(q) && !allMatches.includes(item)) {
          allMatches.push(item);
        }
      });
    });
    return allMatches;
  }, [searchQuery, activeCategory]);

  const handleSelect = (item: string) => {
    keyboardAudio.playKeySound();
    onInsertEmoji(item);
  };

  const handleCopySingle = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    keyboardAudio.playKeySound();
    onCopyEmoji(item);
    setCopiedItem(item);
    setTimeout(() => {
      setCopiedItem(null);
    }, 1500);
  };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
        <div>
          <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
            <span className="text-amber-400">✧</span>
            <span>باقة الإيموجيات والرموز النادرة غير الموجودة في الكيبورد العادي</span>
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            انقر على أي رمز لإدراجه فوراً في النص، أو انقر أيقونة النسخ لنسخه منفرداً
          </p>
        </div>

        {/* Search input */}
        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في الرموز والإيموجي..."
            className="w-full bg-stone-950/80 border border-stone-700/60 rounded-lg pr-9 pl-3 py-1.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Category Tabs (Segmented Control) */}
      {!searchQuery && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar border-b border-stone-800/70">
          {EMOJI_CATEGORIES.map((cat) => {
            const isActive = cat.id === selectedCatId;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  keyboardAudio.playKeySound();
                  setSelectedCatId(cat.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'bg-stone-950/60 text-stone-300 hover:text-stone-100 hover:bg-stone-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameAr}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Grid of Emojis / Symbols */}
      <div className="pt-3">
        {filteredItems.length === 0 ? (
          <div className="py-12 text-center text-stone-400 text-xs">
            لا توجد رموز مطابقة لكلمة البحث
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-[360px] overflow-y-auto p-1">
            {filteredItems.map((item, idx) => {
              const isCopied = copiedItem === item;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="group relative bg-stone-950/70 hover:bg-stone-800/80 border border-stone-800 hover:border-amber-500/50 rounded-xl p-2.5 sm:p-3 flex items-center justify-between cursor-pointer transition-all key-press-effect hover:shadow-md"
                >
                  <span className="font-tajawal text-sm sm:text-base text-stone-100 group-hover:text-amber-300 transition-colors truncate max-w-[85%] select-all">
                    {item}
                  </span>
                  <button
                    onClick={(e) => handleCopySingle(e, item)}
                    className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-all shrink-0"
                    title="نسخ هذا الرمز فقط"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
