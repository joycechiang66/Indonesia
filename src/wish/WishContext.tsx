import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Wish {
  id: number;
  title: string;
  description: string;
  mood: string;
  image?: string;
}

export const mockMoods = [
    { label: '開心', value: 'happy', emoji: '😊' },
    { label: '平靜', value: 'peaceful', emoji: '😌' },
    { label: '感恩', value: 'grateful', emoji: '🙏' },
    { label: '希望', value: 'hopeful', emoji: '🙂' },
    { label: '奧悠', value: 'relaxed', emoji: '😌' },
    { label: '彩虹', value: 'rainbow', emoji: '🌈' },
];

const initialWishes: Wish[] = [
  {
    id: 1,
    title: '去旅行',
    description: '希望可以到世界各地旅行，體驗不同文化。',
    mood: 'rainbow',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 2,
    title: '讓我變得更健康',
    description: '多運動，吃得健康，保持身體健康。',
    mood: 'rainbow',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 3,
    title: '讓我變得更富有',
    description: '努力工作，聰明理財，實現財富自由。',
    mood: 'rainbow',
    image: 'https://images.unsplash.com/photo-1579621970795-87f54f5945c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  }
];

interface WishContextType {
  wishes: Wish[];
  addWish: (wish: Omit<Wish, 'id'>) => void;
  updateWish: (id: number, wish: Omit<Wish, 'id'>) => void;
  deleteWish: (id: number) => void;
}

const WishContext = createContext<WishContextType | undefined>(undefined);

export const useWish = () => {
  const ctx = useContext(WishContext);
  if (!ctx) throw new Error('useWish must be used within WishProvider');
  return ctx;
};

export const WishProvider = ({ children }: { children: ReactNode }) => {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);

  const addWish = (wish: Omit<Wish, 'id'>) => {
    setWishes(prev => [...prev, { ...wish, id: Date.now() }]);
  };
  const updateWish = (id: number, wish: Omit<Wish, 'id'>) => {
    setWishes(prev => prev.map(w => w.id === id ? { ...w, ...wish } : w));
  };
  const deleteWish = (id: number) => {
    setWishes(prev => prev.filter(w => w.id !== id));
  };

  return (
    <WishContext.Provider value={{ wishes, addWish, updateWish, deleteWish }}>
      {children}
    </WishContext.Provider>
  );
}; 