import { KeyboardTheme } from '../types/keyboard';

export interface ThemeConfig {
  id: KeyboardTheme;
  nameAr: string;
  badge: string;
  bgClass: string;
  surfaceClass: string;
  borderClass: string;
  keyBgClass: string;
  keyTextClass: string;
  keyActiveBg: string;
  accentBg: string;
  accentText: string;
  glowColor: string;
}

export const KEYBOARD_THEMES: Record<KeyboardTheme, ThemeConfig> = {
  'emerald-gold': {
    id: 'emerald-gold',
    nameAr: 'الملكي الزمردي والذهب',
    badge: '👑 فاخر',
    bgClass: 'bg-[#0a120e]',
    surfaceClass: 'bg-[#101d16] border-emerald-800/40',
    borderClass: 'border-emerald-600/30',
    keyBgClass: 'bg-[#14261d] text-emerald-100 hover:bg-[#1a3226] border-emerald-700/40 shadow-sm shadow-emerald-950/50',
    keyTextClass: 'text-emerald-100',
    keyActiveBg: 'active:bg-amber-600 active:text-white',
    accentBg: 'bg-amber-500 hover:bg-amber-400 text-stone-950',
    accentText: 'text-amber-400',
    glowColor: 'rgba(16, 185, 129, 0.2)'
  },
  'midnight-cyan': {
    id: 'midnight-cyan',
    nameAr: 'الليلي السيان السيبراني',
    badge: '🌙 ليلي',
    bgClass: 'bg-[#070b14]',
    surfaceClass: 'bg-[#0f172a] border-cyan-800/40',
    borderClass: 'border-cyan-600/30',
    keyBgClass: 'bg-[#131f38] text-cyan-100 hover:bg-[#1b2b4d] border-cyan-700/40 shadow-sm shadow-cyan-950/50',
    keyTextClass: 'text-cyan-100',
    keyActiveBg: 'active:bg-cyan-500 active:text-slate-950',
    accentBg: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950',
    accentText: 'text-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.2)'
  },
  'desert-amber': {
    id: 'desert-amber',
    nameAr: 'الصحراوي البرونزي',
    badge: '🏜️ أصيل',
    bgClass: 'bg-[#140e0a]',
    surfaceClass: 'bg-[#211611] border-amber-800/40',
    borderClass: 'border-amber-600/30',
    keyBgClass: 'bg-[#2d1e16] text-amber-100 hover:bg-[#3b281e] border-amber-700/40 shadow-sm shadow-amber-950/50',
    keyTextClass: 'text-amber-100',
    keyActiveBg: 'active:bg-amber-600 active:text-white',
    accentBg: 'bg-amber-600 hover:bg-amber-500 text-white',
    accentText: 'text-amber-400',
    glowColor: 'rgba(217, 119, 6, 0.2)'
  },
  'royal-indigo': {
    id: 'royal-indigo',
    nameAr: 'الأندلسي النيلي',
    badge: '✨ أندلسي',
    bgClass: 'bg-[#0e0a1a]',
    surfaceClass: 'bg-[#18112c] border-purple-800/40',
    borderClass: 'border-purple-600/30',
    keyBgClass: 'bg-[#22183e] text-purple-100 hover:bg-[#2d2052] border-purple-700/40 shadow-sm shadow-purple-950/50',
    keyTextClass: 'text-purple-100',
    keyActiveBg: 'active:bg-purple-500 active:text-white',
    accentBg: 'bg-purple-600 hover:bg-purple-500 text-white',
    accentText: 'text-purple-400',
    glowColor: 'rgba(168, 85, 247, 0.2)'
  },
  'clean-slate': {
    id: 'clean-slate',
    nameAr: 'العصري الغرافيتي',
    badge: '⚡ تقني',
    bgClass: 'bg-[#0d0f12]',
    surfaceClass: 'bg-[#161a20] border-zinc-700/50',
    borderClass: 'border-zinc-700/40',
    keyBgClass: 'bg-[#1f242c] text-zinc-100 hover:bg-[#29303a] border-zinc-700/60 shadow-sm shadow-zinc-950/50',
    keyTextClass: 'text-zinc-100',
    keyActiveBg: 'active:bg-zinc-200 active:text-zinc-950',
    accentBg: 'bg-zinc-100 hover:bg-white text-zinc-900',
    accentText: 'text-zinc-200',
    glowColor: 'rgba(255, 255, 255, 0.15)'
  }
};
