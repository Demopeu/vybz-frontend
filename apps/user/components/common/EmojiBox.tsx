'use client';

import { useState, useEffect, useContext } from 'react';
import { ChatContext } from '@/context/ChatContext';
import { Button } from '@repo/ui/components/ui';
import { Clock4, TagDelete } from '@repo/ui/components/icons';

import { EmojiDataType } from '@/types/CommonType';

export default function EmojiBox({ emojiData }: { emojiData: EmojiDataType }) {
  const { showEmojibox, setComment } = useContext(ChatContext);
  const [activeCategory, setActiveCategory] = useState<string>('recent');
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
      activeCategory !== 'recent' &&
      !emojiData[activeCategory]
    ) {
      setActiveCategory('recent');
    }
  }, [emojiData, activeCategory]);

  const handleEmojiClick = (emoji: string) => {
    setComment((prev: string) => prev + emoji);
    setRecentEmojis((prevRecent: string[]) => {
      const newRecent = [
        emoji,
        ...prevRecent.filter((e: string) => e !== emoji),
      ];
      return newRecent.slice(0, 24);
    });
  };

  const categoryKeys = Object.keys(emojiData);

  if (!showEmojibox) return null;

  const filteredEmojis =
    activeCategory && emojiData[activeCategory]
      ? emojiData[activeCategory].emojis
      : [];

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
        <div className="flex gap-2 overflow-x-auto flex-1 overflow-hidden pb-1 text-white text-sm font-medium">
          <Button
            type="button"
            onClick={() => {
              console.log('Recent button clicked');
              setActiveCategory('recent');
            }}
            className={`flex-shrink-0 px-2 py-2 rounded bg-transparent border-none [&_svg]:size-7 text-white ${
              activeCategory === 'recent' ? 'bg-gray-700' : ''
            }`}
          >
            <Clock4 />
          </Button>
          {categoryKeys.map((categoryKey: string) => (
            <Button
              key={categoryKey}
              type="button"
              onClick={() => {
                console.log('Category clicked:', categoryKey);
                setActiveCategory(categoryKey);
              }}
              className={`flex-shrink-0 px-2 py-2 rounded bg-transparent border-none text-2xl text-white ${
                activeCategory === categoryKey ? 'bg-gray-700' : ''
              }`}
            >
              {emojiData[categoryKey]?.representativeEmoticon}
            </Button>
          ))}
        </div>

        <div className="ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setComment((prev: string) => {
                const chars = Array.from(prev);
                chars.pop();
                return chars.join('');
              })
            }
            className=" [&_svg]:size-8"
          >
            <TagDelete />
          </Button>
        </div>
      </div>

      <div className="px-6 pt-4">
        <h3 className="text-base text-white">
          {activeCategory === 'recent'
            ? '최근 사용한 이모티콘'
            : emojiData[activeCategory]?.name || activeCategory}
        </h3>
      </div>

      <div className="p-4 overflow-y-auto max-h-50 h-50">
        <div className="grid grid-cols-8 gap-1">
          {activeCategory === 'recent'
            ? recentEmojis.map((emoji: string, index: number) => (
                <Button
                  key={`recent-${emoji}-${index}`}
                  onClick={() => handleEmojiClick(emoji)}
                  className="w-12 h-12 text-3xl rounded transition-colors flex items-center justify-center border-none bg-transparent"
                >
                  {emoji}
                </Button>
              ))
            : filteredEmojis.map((emoji: string, index: number) => (
                <Button
                  key={`${activeCategory}-${emoji}-${index}`}
                  onClick={() => handleEmojiClick(emoji)}
                  className="w-12 h-12 text-3xl rounded transition-colors flex items-center justify-center border-none bg-transparent"
                >
                  {emoji}
                </Button>
              ))}
        </div>
      </div>
    </>
  );
}
