import React, {useState} from 'react'

export function useSwitch(){

    const [activeItem, setActiveItem] = useState<number>(0);
    const handleItemClick = (index: number) => { setActiveItem(index) }
    const activeItemPosition = activeItem * 100;
    return{
        handleItemClick,
        activeItemPosition,
        activeItem
    }
}