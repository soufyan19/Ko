import { KeyboardKey } from '../types/keyboard';

export const TASHKEEL_KEYS: KeyboardKey[] = [
  { label: 'َ', shiftLabel: 'فتحة', type: 'tashkeel' },
  { label: 'ً', shiftLabel: 'تنوين فتح', type: 'tashkeel' },
  { label: 'ُ', shiftLabel: 'ضمة', type: 'tashkeel' },
  { label: 'ٌ', shiftLabel: 'تنوين ضم', type: 'tashkeel' },
  { label: 'ِ', shiftLabel: 'كسرة', type: 'tashkeel' },
  { label: 'ٍ', shiftLabel: 'تنوين كسر', type: 'tashkeel' },
  { label: 'ْ', shiftLabel: 'سكون', type: 'tashkeel' },
  { label: 'ّ', shiftLabel: 'شدة', type: 'tashkeel' },
  { label: 'ٰ', shiftLabel: 'ألف خنجرية', type: 'tashkeel' },
  { label: 'ـ', shiftLabel: 'تطويل كشيدة', type: 'char' },
  { label: 'لا', shiftLabel: 'لأ', type: 'char' },
  { label: 'لإ', shiftLabel: 'لآ', type: 'char' }
];

export const ARABIC_ROW_NUMBERS: KeyboardKey[] = [
  { label: '١', shiftLabel: '1' },
  { label: '٢', shiftLabel: '2' },
  { label: '٣', shiftLabel: '3' },
  { label: '٤', shiftLabel: '4' },
  { label: '٥', shiftLabel: '5' },
  { label: '٦', shiftLabel: '6' },
  { label: '٧', shiftLabel: '7' },
  { label: '٨', shiftLabel: '8' },
  { label: '٩', shiftLabel: '9' },
  { label: '٠', shiftLabel: '0' }
];

export const ARABIC_ROW_1: KeyboardKey[] = [
  { label: 'ض', shiftLabel: 'َ' },
  { label: 'ص', shiftLabel: 'ً' },
  { label: 'ث', shiftLabel: 'ُ' },
  { label: 'ق', shiftLabel: 'ٌ' },
  { label: 'ف', shiftLabel: 'لإ' },
  { label: 'غ', shiftLabel: 'إ' },
  { label: 'ع', shiftLabel: '‘' },
  { label: 'ه', shiftLabel: '÷' },
  { label: 'خ', shiftLabel: '×' },
  { label: 'ح', shiftLabel: '؛' },
  { label: 'ج', shiftLabel: '<' },
  { label: 'د', shiftLabel: '>' }
];

export const ARABIC_ROW_2: KeyboardKey[] = [
  { label: 'ش', shiftLabel: 'ِ' },
  { label: 'س', shiftLabel: 'ٍ' },
  { label: 'ي', shiftLabel: ']' },
  { label: 'ب', shiftLabel: '[' },
  { label: 'ل', shiftLabel: 'لأ' },
  { label: 'ا', shiftLabel: 'أ' },
  { label: 'ت', shiftLabel: 'ـ' },
  { label: 'ن', shiftLabel: '،' },
  { label: 'م', shiftLabel: '/' },
  { label: 'ك', shiftLabel: ':' },
  { label: 'ط', shiftLabel: '"' }
];

export const ARABIC_ROW_3: KeyboardKey[] = [
  { label: 'ئ', shiftLabel: '~' },
  { label: 'ء', shiftLabel: 'ْ' },
  { label: 'ؤ', shiftLabel: '}' },
  { label: 'ر', shiftLabel: '{' },
  { label: 'ى', shiftLabel: 'آ' },
  { label: 'ة', shiftLabel: 'ّ' },
  { label: 'و', shiftLabel: ',' },
  { label: 'ز', shiftLabel: '.' },
  { label: 'ظ', shiftLabel: '؟' }
];
