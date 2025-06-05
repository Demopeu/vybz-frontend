'use client';

import { useState, useEffect, useContext } from 'react';
import { ChatContext } from '@/context/ChatContext';
import { X } from '@repo/ui/components/icons';
import { Button } from '@repo/ui/components/ui';

export interface EmojiCategory {
  name: string;
  emojis: string[];
}

export interface EmojiData {
  [categoryKey: string]: EmojiCategory;
}

export interface EmojiBoxProps {
  emojiData: EmojiData;
}

export default function EmojiBox({ emojiData }: EmojiBoxProps) {
  const { showEmojibox, toggleShowEmojibox, setComment } =
    useContext(ChatContext);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);

  useEffect(() => {
    const storedRecent = localStorage.getItem('vybzRecentEmojis');
    if (storedRecent) {
      try {
        const parsedRecent = JSON.parse(storedRecent);
        if (Array.isArray(parsedRecent)) {
          setRecentEmojis(parsedRecent);
        }
      } catch (error) {
        console.error('Failed to parse recent emojis from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    if (
      recentEmojis.length > 0 ||
      localStorage.getItem('vybzRecentEmojis') !== null
    ) {
      localStorage.setItem('vybzRecentEmojis', JSON.stringify(recentEmojis));
    }
  }, [recentEmojis]);

  useEffect(() => {
    const categories = Object.keys(emojiData);
    if (
      categories.length > 0 &&
      (!activeCategory || !emojiData[activeCategory])
    ) {
      setActiveCategory(categories[0]!);
    }
  }, [emojiData, activeCategory]);

  const handleEmojiClick = (emoji: string) => {
    setComment((prev) => prev + emoji);
    setRecentEmojis((prevRecent) => {
      const newRecent = [emoji, ...prevRecent.filter((e) => e !== emoji)];
      return newRecent.slice(0, 24);
    });
  };

  const clearRecentEmojis = () => {
    setRecentEmojis([]);
    localStorage.removeItem('vybzRecentEmojis');
  };

  const categoryKeys = Object.keys(emojiData);

  if (!showEmojibox) return null;

  const filteredEmojis =
    activeCategory && emojiData[activeCategory]
      ? emojiData[activeCategory].emojis
      : [];

  return (
    <div className="bg-gray-900 text-white w-full h-[420px] absolute bottom-0 left-0 right-0 z-40 rounded-t-lg shadow-2xl overflow-hidden border-t border-gray-800 flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800 bg-gray-850">
        <div className="flex gap-2">
          <Button
            className={`w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm`}
            onClick={() => setActiveCategory('__recent')}
            title="최근"
          >
            ⏰
          </Button>
          {categoryKeys.map((key) => {
            if (!emojiData[key] || emojiData[key].emojis.length === 0)
              return null;
            const emojiIcon = emojiData[key].emojis[0] || '❓';
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 ${
                  activeCategory === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={emojiData[key].name}
              >
                {emojiIcon}
              </button>
            );
          })}
        </div>
        <Button
          onClick={toggleShowEmojibox}
          className="text-gray-400 hover:text-red-500"
          title="닫기"
        >
          <X width={18} height={18} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-850 p-2">
        {activeCategory === '__recent' ? (
          <>
            <div className="flex justify-between items-center px-1 mb-2">
              <span className="text-xs text-gray-400 uppercase">최근 사용</span>
              <button
                onClick={clearRecentEmojis}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                모두 지우기
              </button>
            </div>
            {recentEmojis.length > 0 ? (
              <div className="grid grid-cols-8 gap-1">
                {recentEmojis.map((emoji, idx) => (
                  <button
                    key={`recent-${emoji}-${idx}`}
                    onClick={() => handleEmojiClick(emoji)}
                    className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-700 rounded"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-sm text-center py-8">
                최근 사용한 이모지가 없습니다.
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-8 gap-1">
            {filteredEmojis.map((emoji, idx) => (
              <button
                key={`${emoji}-${idx}`}
                onClick={() => handleEmojiClick(emoji)}
                className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-700 rounded"
                title={emoji}
              >
                {emoji}
              </button>
            ))}
            {filteredEmojis.length === 0 && (
              <div className="text-gray-500 text-sm text-center py-8 col-span-8">
                이모지가 없습니다.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
