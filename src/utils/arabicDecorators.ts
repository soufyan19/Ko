import { DecorationStyle } from '../types/keyboard';

// Diacritics regex range
const TASHKEEL_REGEX = /[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g;

// Characters that do not connect to the following letter in Arabic
const NON_CONNECTING_AFTER = new Set(['ا', 'أ', 'إ', 'آ', 'ء', 'د', 'ذ', 'ر', 'ز', 'و', 'ؤ', 'ة', ' ']);

/**
 * Remove all Tashkeel / Harakat from Arabic text
 */
export function stripTashkeel(text: string): string {
  return text.replace(TASHKEEL_REGEX, '');
}

/**
 * Add Kashida (Tatweel ـ) between Arabic connecting letters for royal elongated effect
 */
export function addKashida(text: string, count: number = 2): string {
  const clean = stripTashkeel(text);
  let result = '';
  const tatweel = 'ـ'.repeat(Math.max(1, count));

  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    const nextChar = clean[i + 1];
    result += char;

    if (
      nextChar &&
      !NON_CONNECTING_AFTER.has(char) &&
      !NON_CONNECTING_AFTER.has(nextChar) &&
      /[\u0600-\u06FF]/.test(char) &&
      /[\u0600-\u06FF]/.test(nextChar)
    ) {
      result += tatweel;
    }
  }
  return result;
}

/**
 * Letter map for dotted / stylized Arabic characters
 */
const DOTTED_MAP: Record<string, string> = {
  'ا': 'ٱ',
  'أ': 'ٵ',
  'إ': 'ٳ',
  'ب': 'بُـ‘ـُ',
  'ت': 'تُـ‘ـُ',
  'ث': 'ثُـ‘ـُ',
  'ج': 'جُـ‘ـُ',
  'ح': 'حُـ‘ـُ',
  'خ': 'خُـ‘ـُ',
  'د': 'دٍ',
  'ذ': 'ذٍ',
  'ر': 'رٍ',
  'ز': 'زٍ',
  'س': 'سُـ‘ـُ',
  'ش': 'شُـ‘ـُ',
  'ص': 'صُـ‘ـُ',
  'ض': 'ضُـ‘ـُ',
  'ط': 'طُـ‘ـُ',
  'ظ': 'ظُـ‘ـُ',
  'ع': 'عُـ‘ـُ',
  'غ': 'غُـ‘ـُ',
  'ف': 'فُـ‘ـُ',
  'ق': 'قُـ‘ـُ',
  'ك': 'كُـ‘ـُ',
  'ل': 'لُـ‘ـُ',
  'م': 'مُـ‘ـُ',
  'ن': 'نُـ‘ـُ',
  'ه': 'هـ',
  'و': 'ۆ',
  'ي': 'يُـ‘ـُ',
  'ى': 'ۍ',
  'ة': 'ةّ'
};

/**
 * Ornate sukun and haa decorator
 */
function ornateHaa(text: string): string {
  const clean = stripTashkeel(text);
  return clean
    .split('')
    .map((c) => (c === ' ' ? '   ' : /[\u0600-\u06FF]/.test(c) ? `${c}ـْـﮩـْ` : c))
    .join('');
}

/**
 * Rich tashkeel auto-applicator for decorative feeling
 */
function ornateTashkeel(text: string): string {
  const clean = stripTashkeel(text);
  const harakat = ['َ', 'ُ', 'ِ', 'ْ', 'ّ', 'ً', 'ٌ', 'ٍ', 'ٰ'];
  let res = '';
  for (let i = 0; i < clean.length; i++) {
    const c = clean[i];
    res += c;
    if (/[\u0600-\u06FF]/.test(c) && c !== ' ') {
      const h = harakat[i % harakat.length];
      res += h;
      if (i % 2 === 0 && !NON_CONNECTING_AFTER.has(c)) {
        res += 'ـ';
      }
    }
  }
  return res;
}

/**
 * Wide spaced calligraphy with middle dots
 */
function spacedCalligraphy(text: string): string {
  const clean = stripTashkeel(text);
  return clean.split('').join(' . ');
}

/**
 * Overline and underline decorative marks
 */
function markedArabic(text: string): string {
  const clean = stripTashkeel(text);
  return clean
    .split('')
    .map((c) => (c === ' ' ? '  ' : `${c}ـَ`))
    .join('ّ');
}

/**
 * All decorative styles available in the keyboard
 */
export const DECORATION_STYLES: DecorationStyle[] = [
  {
    id: 'savage-wings',
    name: 'Savage Wings',
    nameAr: 'أجنحة الفخامة والهيبة',
    category: 'frames',
    transform: (t) => `𓆩 ${stripTashkeel(t)} 𓆪`,
    preview: '𓆩 مثال 𓆪'
  },
  {
    id: 'eagle-glory',
    name: 'Eagle Majesty',
    nameAr: 'نسر الهيبة الملكي',
    category: 'frames',
    transform: (t) => `𓄂 ${stripTashkeel(t)} 𓆃`,
    preview: '𓄂 مثال 𓆃'
  },
  {
    id: 'quranic-brackets',
    name: 'Quranic Brackets',
    nameAr: 'الأقواس القرآنية الفاخرة',
    category: 'calligraphy',
    transform: (t) => `﴿ ${ornateTashkeel(t)} ﴾`,
    preview: '﴿ مِثَالٌ ﴾'
  },
  {
    id: 'royal-kashida',
    name: 'Royal Elongated',
    nameAr: 'المد الملكي العريض (الكشيدة)',
    category: 'calligraphy',
    transform: (t) => addKashida(t, 3),
    preview: 'مــــــثــــــال'
  },
  {
    id: 'ornate-haa',
    name: 'Ornate Haa Flow',
    nameAr: 'زخرفة الهاء والعوارض',
    category: 'ornate',
    transform: ornateHaa,
    preview: 'مـْـﮩـْثـْـﮩـْاْ'
  },
  {
    id: 'dotted-circle',
    name: 'Dotted Arabic',
    nameAr: 'الزخرفة المنقطة الدائرية',
    category: 'ornate',
    transform: (t) =>
      stripTashkeel(t)
        .split('')
        .map((c) => DOTTED_MAP[c] || c)
        .join(''),
    preview: 'مُـ‘ـُثُـ‘ـُٱلُـ‘ـُ'
  },
  {
    id: 'full-tashkeel',
    name: 'Full Tashkeel',
    nameAr: 'تشكيل الحركات الكامل',
    category: 'calligraphy',
    transform: ornateTashkeel,
    preview: 'مَـثُـالٍ'
  },
  {
    id: 'gaming-crown',
    name: 'Gaming Crown',
    nameAr: 'تاج الألعاب والبطولات',
    category: 'symbolic',
    transform: (t) => `亗 ${stripTashkeel(t)} 亗`,
    preview: '亗 مثال 亗'
  },
  {
    id: 'aesthetic-hearts',
    name: 'Aesthetic Hearts',
    nameAr: 'قلوب رومانسية فخمة',
    category: 'symbolic',
    transform: (t) => `𓆩♡𓆪 ${stripTashkeel(t)} 𓆩♡𓆪`,
    preview: '𓆩♡𓆪 مثال 𓆩♡𓆪'
  },
  {
    id: 'japanese-brackets',
    name: 'Japanese Brackets',
    nameAr: 'أقواس التمييز اليابانية',
    category: 'symbolic',
    transform: (t) => `【 ${stripTashkeel(t)} 】`,
    preview: '【 مثال 】'
  },
  {
    id: 'star-sparkles',
    name: 'Star Sparkles',
    nameAr: 'بريق النجوم والشهب',
    category: 'symbolic',
    transform: (t) => `★彡 ${stripTashkeel(t)} 彡★`,
    preview: '★彡 مثال 彡★'
  },
  {
    id: 'cosmic-stars',
    name: 'Cosmic Stars',
    nameAr: 'نجوم السماء الكونية',
    category: 'symbolic',
    transform: (t) => `✧ ${stripTashkeel(t)} ✧`,
    preview: '✧ مثال ✧'
  },
  {
    id: 'nature-flowers',
    name: 'Aesthetic Flowers',
    nameAr: 'زهور وجماليات الطبيعة',
    category: 'symbolic',
    transform: (t) => `✿ ${stripTashkeel(t)} ✿`,
    preview: '✿ مثال ✿'
  },
  {
    id: 'royal-sword',
    name: 'Royal Swords',
    nameAr: 'سيوف وفرسان الهيبة',
    category: 'frames',
    transform: (t) => `⚔️ ༒ ${stripTashkeel(t)} ༒ ⚔️`,
    preview: '⚔️ ༒ مثال ༒ ⚔️'
  },
  {
    id: 'spaced-dots',
    name: 'Spaced Dots',
    nameAr: 'التباعد النقطي الأنيق',
    category: 'ornate',
    transform: spacedCalligraphy,
    preview: 'م . ث . ا . ل'
  },
  {
    id: 'marked-strokes',
    name: 'Marked Strokes',
    nameAr: 'الضربات والخطوط العلوية',
    category: 'ornate',
    transform: markedArabic,
    preview: 'مـَّثـَّا'
  }
];
