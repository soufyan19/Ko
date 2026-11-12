export type SoundType = 'mechanical' | 'soft' | 'typewriter' | 'bubble' | 'mute';

export type KeyboardTheme = 'emerald-gold' | 'midnight-cyan' | 'desert-amber' | 'royal-indigo' | 'clean-slate';

export interface ArabicFont {
  id: string;
  name: string;
  nameAr: string;
  className: string;
  sample: string;
  description: string;
}

export interface DecorationStyle {
  id: string;
  name: string;
  nameAr: string;
  category: 'calligraphy' | 'ornate' | 'symbolic' | 'frames';
  transform: (text: string) => string;
  preview: string;
}

export interface EmojiCategory {
  id: string;
  nameAr: string;
  icon: string;
  items: string[];
}

export interface KeyboardKey {
  label: string;
  shiftLabel?: string;
  code?: string;
  type?: 'char' | 'tashkeel' | 'action' | 'space' | 'switch' | 'backspace' | 'enter';
  width?: string;
}
