import React, { useState, createContext, ReactNode } from 'react';



interface ActiveItemProviderProps{
    children: ReactNode
}
interface ActiveItemContextType {
    activeItem: number;
    handleItemClick: (index: number) => void;
    activeItemPosition: number;
  }
   
export const ActiveItemContext = createContext<ActiveItemContextType | null>(null);

export const ActiveItemProvider = ({ children }: ActiveItemProviderProps) => {
  const [activeItem, setActiveItem] = useState<number>(0);
  const handleItemClick = (index: number) => { setActiveItem(index) }
  const activeItemPosition = activeItem * 100;

  return (
    <ActiveItemContext.Provider value={{ activeItem, handleItemClick, activeItemPosition }}>
      {children}
    </ActiveItemContext.Provider>
  );
};