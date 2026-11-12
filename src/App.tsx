import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { EditorArea } from './components/EditorArea';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { RareEmojisGrid } from './components/RareEmojisGrid';
import { FontStylesStudio } from './components/FontStylesStudio';
import { BioFramesStudio } from './components/BioFramesStudio';
import { SoundAndThemeControls } from './components/SoundAndThemeControls';
import { SoundType, KeyboardTheme } from './types/keyboard';
import { KEYBOARD_THEMES } from './data/themes';
import { keyboardAudio } from './utils/audio';
import { 
  Keyboard as KeyboardIcon, 
  Smile, 
  Sparkles, 
  UserCheck, 
  Sliders, 
  Check, 
  Copy,
  Info
} from 'lucide-react';

export default function App() {
  const [text, setTextState] = useState<string>(
    'أهلاً بك في كيبورد الخطوط والزخارف العربية والإيموجيات النادرة ✧'
  );
  const [history, setHistory] = useState<string[]>([
    'أهلاً بك في كيبورد الخطوط والزخارف العربية والإيموجيات النادرة ✧'
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [selectedFontId, setSelectedFontId] = useState<string>('cairo');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [activeTab, setActiveTab] = useState<string>('keyboard');
  const [soundType, setSoundType] = useState<SoundType>('mechanical');
  const [currentTheme, setCurrentTheme] = useState<KeyboardTheme>('emerald-gold');
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Sync text changes with history
  const setText = useCallback((newText: string) => {
    setTextState(newText);
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndex + 1);
      return [...trimmed, newText];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIdx = historyIndex - 1;
      setHistoryIndex(newIdx);
      setTextState(history[newIdx]);
      keyboardAudio.playKeySound();
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIdx = historyIndex + 1;
      setHistoryIndex(newIdx);
      setTextState(history[newIdx]);
      keyboardAudio.playKeySound();
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  // Copy to clipboard with celebratory confetti
  const handleCopyText = (customText?: string) => {
    const toCopy = customText !== undefined ? customText : text;
    if (!toCopy.trim()) return;

    navigator.clipboard.writeText(toCopy).then(() => {
      setCopied(true);
      triggerToast('تم النسخ إلى الحافظة بنجاح!');
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#f59e0b', '#10b981', '#06b6d4', '#e11d48']
        });
      } catch {
        // Fallback
      }
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Insert character or emoji at cursor position
  const handleInsertAtCursor = (inserted: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setText(text + inserted);
      return;
    }

    const start = textarea.selectionStart ?? text.length;
    const end = textarea.selectionEnd ?? text.length;

    const newText = text.substring(0, start) + inserted + text.substring(end);
    setText(newText);

    // Reposition cursor right after inserted text
    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(start + inserted.length, start + inserted.length);
      }
    }, 10);
  };

  // Backspace at cursor position
  const handleBackspaceAtCursor = () => {
    const textarea = textareaRef.current;
    if (!textarea || text.length === 0) return;

    const start = textarea.selectionStart ?? text.length;
    const end = textarea.selectionEnd ?? text.length;

    if (start === end) {
      if (start > 0) {
        // Check if previous character is high/low surrogate for emojis
        const charCode = text.charCodeAt(start - 1);
        const isSurrogate = charCode >= 0xDC00 && charCode <= 0xDFFF;
        const deleteCount = isSurrogate && start >= 2 ? 2 : 1;

        const newText = text.substring(0, start - deleteCount) + text.substring(end);
        setText(newText);
        setTimeout(() => {
          if (textarea) {
            textarea.focus();
            textarea.setSelectionRange(start - deleteCount, start - deleteCount);
          }
        }, 10);
      }
    } else {
      const newText = text.substring(0, start) + text.substring(end);
      setText(newText);
      setTimeout(() => {
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(start, start);
        }
      }, 10);
    }
  };

  const handleSpace = () => handleInsertAtCursor(' ');
  const handleEnter = () => handleInsertAtCursor('\n');

  const themeConfig = KEYBOARD_THEMES[currentTheme];

  return (
    <div className={`min-h-screen ${themeConfig.bgClass} text-stone-100 flex flex-col font-cairo transition-colors duration-300`}>
      {/* Top Header */}
      <Header
        onCopyAll={() => handleCopyText()}
        copied={copied}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col gap-4">
        {/* Toast notification popup */}
        {toastMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-stone-950 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-2xl flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Editor Area (Text input, fonts, stats, sharing, quick brackets) */}
        <EditorArea
          text={text}
          setText={setText}
          selectedFontId={selectedFontId}
          setSelectedFontId={setSelectedFontId}
          fontSize={fontSize}
          setFontSize={setFontSize}
          onCopy={handleCopyText}
          copied={copied}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          textareaRef={textareaRef}
          onInsertText={handleInsertAtCursor}
        />

        {/* Mode Navigation Tabs (Segmented Control) */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-stone-900/90 border border-stone-800 rounded-2xl no-scrollbar">
          <button
            onClick={() => {
              keyboardAudio.playKeySound();
              setActiveTab('keyboard');
            }}
            className={`flex-1 min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'keyboard'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/80'
            }`}
          >
            <KeyboardIcon className="w-4 h-4" />
            <span>لوحة الحروف والتشكيل</span>
          </button>

          <button
            onClick={() => {
              keyboardAudio.playKeySound();
              setActiveTab('emojis');
            }}
            className={`flex-1 min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'emojis'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/80'
            }`}
          >
            <Smile className="w-4 h-4" />
            <span>الإيموجيات النادرة</span>
          </button>

          <button
            onClick={() => {
              keyboardAudio.playKeySound();
              setActiveTab('styles');
            }}
            className={`flex-1 min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'styles'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/80'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>محول الخطوط والزخارف</span>
          </button>

          <button
            onClick={() => {
              keyboardAudio.playKeySound();
              setActiveTab('frames');
            }}
            className={`flex-1 min-h-[44px] px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'frames'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/80'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>إطارات الأسماء والبايو</span>
          </button>

          <button
            onClick={() => {
              keyboardAudio.playKeySound();
              setActiveTab('settings');
            }}
            className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/80'
            }`}
            title="إعدادات الصوت والمظهر"
          >
            <Sliders className="w-4 h-4" />
            <span className="hidden sm:inline">المظهر والصوت</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="w-full">
          {activeTab === 'keyboard' && (
            <VirtualKeyboard
              onKeyPress={handleInsertAtCursor}
              onBackspace={handleBackspaceAtCursor}
              onEnter={handleEnter}
              onSpace={handleSpace}
              currentTheme={currentTheme}
              soundType={soundType}
              setSoundType={setSoundType}
              setCurrentTheme={setCurrentTheme}
              onOpenEmojis={() => setActiveTab('emojis')}
              onOpenStyles={() => setActiveTab('styles')}
            />
          )}

          {activeTab === 'emojis' && (
            <RareEmojisGrid
              onInsertEmoji={handleInsertAtCursor}
              onCopyEmoji={(emoji) => handleCopyText(emoji)}
            />
          )}

          {activeTab === 'styles' && (
            <FontStylesStudio
              currentText={text}
              onApplyStyle={(transformed) => setText(transformed)}
              onApplyFont={(fontId) => setSelectedFontId(fontId)}
              onCopyStyle={(styledText) => handleCopyText(styledText)}
              selectedFontId={selectedFontId}
            />
          )}

          {activeTab === 'frames' && (
            <BioFramesStudio
              currentText={text}
              onApplyPreset={(frameText) => setText(frameText)}
              onCopyPreset={(frameText) => handleCopyText(frameText)}
            />
          )}

          {activeTab === 'settings' && (
            <SoundAndThemeControls
              soundType={soundType}
              setSoundType={setSoundType}
              currentTheme={currentTheme}
              setCurrentTheme={setCurrentTheme}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-800/80 py-4 px-6 text-center text-xs text-stone-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>كيبورد الخطوط والزخارف العربية والإيموجيات النادرة · مصمم للكتابة الاحترافية والنسخ المباشر</p>
          <div className="flex items-center gap-3 text-stone-400">
            <span>جميع الخطوط العربية</span>
            <span aria-hidden="true">·</span>
            <span>تشكيل الحركات</span>
            <span aria-hidden="true">·</span>
            <span>إيموجيات نادرة</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
