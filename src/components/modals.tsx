import React, { useState } from "react";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onAddQuestion: (question: string, options: string[], type: 'checkbox' | 'radio') => void; 
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, onAddQuestion }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([""]);
  const [type, setType] = useState<'checkbox' | 'radio' | ''>(''); 

  if (!visible) return null;

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as 'checkbox' | 'radio'; // Приведение типа
    setType(value);
  };

  const handleSubmit = () => {
    // Проверяем, что type является корректным значением перед вызовом onAddQuestion
    if (type === 'checkbox' || type === 'radio') {
      onAddQuestion(question, options, type); // Передаем вопрос и варианты в родительский компонент
    } else {
      console.error('Тип вопроса должен быть "checkbox" или "radio".');
      return; // Прерываем выполнение функции, если type некорректен
    }
    setQuestion(''); // Сбрасываем поле вопроса
    setOptions(['']); // Сбрасываем варианты
    setType(''); // Сбрасываем тип
    onClose(); // Закрываем модалку
  };

  return (
    <>
      <div className="fixed w-full h-full bg-opacity-30 bg-black flex items-center justify-center" onClick={onClose}>
        <div className="flex bg-white rounded-2xl px-8 py-8 flex-col gap-3" onClick={(e) => e.stopPropagation()}>
          <label className="w-full">
            <input
              type="text"
              className="outline outline-2 outline-offset-2 rounded-sm py-1 px-2 placeholder-gray-800 text-black w-full"
              placeholder="Введите вопрос"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </label>
          {options.map((option, index) => (
            <label key={index} className="w-full">
              <input
                type="text"
                className="outline outline-2 w-full outline-offset-2 rounded-sm py-1 px-2 placeholder-gray-800 text-black"
                placeholder="Вариант ответа"
                value={option}
                onChange={(event) => handleOptionChange(event, index)}
              />
            </label>
          ))}
          <div className="flex">
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="type-question" 
                value="radio" 
                checked={type === "radio"} 
                onChange={handleTypeChange} 
              />
              <div className="info">Один ответ</div>
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="radio" 
                name="type-question" 
                value="checkbox" 
                checked={type === "checkbox"} 
                onChange={handleTypeChange} 
              />
              <div className="info">Много ответов</div>
            </label>
          </div>
          <div
            className="cursor-pointer w-fit px-4 py-1 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            onClick={handleAddOption}
          >
            Добавить вариант ответа
          </div>
          <div
            className="cursor-pointer w-fit px-4 py-1 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            onClick={handleSubmit}
          >
            Добавить вопрос
          </div>
        </div>
      </div>
    </>
  );
}