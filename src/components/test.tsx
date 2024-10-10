import React, { useState, useEffect } from 'react';
import { Modal } from './modals';

interface Option {
  id: string;
  checked: boolean;
}

interface Question {
  question: string;
  options: string[];
  type: 'checkbox' | 'radio';
}

export function Test() {
  const [questionsWithOptions, setQuestionsWithOptions] = useState<Question[]>(() => {
    const savedState = sessionStorage.getItem('testState');
    if (savedState) {
      const { questionsWithOptions } = JSON.parse(savedState);
      return questionsWithOptions;
    }
    return [
      {
        question: "Что должен знать фронт разработчик?",
        options: ["HTML", "CSS", "JavaScript", "React"],
        type: "checkbox",
      },
      {
        question: "Какой язык используется для стилей?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        type: "radio",
      },
      {
        question: "Какой язык программирования используется для создания мобильных приложений?",
        options: ["Kotlin", "Java", "Swift", "C#"],
        type: "checkbox",
      },
    ];
  });

  const [checkedItems, setCheckedItems] = useState<Option[]>(() => {
    const savedState = sessionStorage.getItem('testState');
    if (savedState) {
      const { checkedItems } = JSON.parse(savedState);
      return checkedItems || [];
    }
    return questionsWithOptions.flatMap((q, index) =>
      q.options.map((option) => ({
        id: `${index}-${option.toLowerCase()}`,
        checked: false,
      }))
    );
  });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  const handleAddQuestion = (question: string, options: string[], type: 'checkbox' | 'radio') => {
    setQuestionsWithOptions(prevQuestions => {
      const updatedQuestions: Question[] = [
        ...prevQuestions,
        { question, options, type },
      ];
      const newCheckedItems: Option[] = updatedQuestions.flatMap((q, index) =>
        q.options.map((option) => ({
          id: `${index}-${option.toLowerCase()}`,
          checked: false,
        }))
      );
      setCheckedItems(newCheckedItems);
      return updatedQuestions;
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckedItems(prevState => 
      prevState.map(item => (item.id === name ? { ...item, checked } : item))
    );
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleAnswerClick = () => {
    setActiveIndex(activeIndex + 1);
  };

  const handleVisible = () => {
    setVisible(true);
  };
  
  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const savedState = sessionStorage.getItem('testState');
    if (savedState) {
      const { activeIndex, selectedOption, checkedItems, questionsWithOptions } = JSON.parse(savedState);
      setQuestionsWithOptions(questionsWithOptions);
      setActiveIndex(activeIndex);
      setSelectedOption(selectedOption);
      setCheckedItems(checkedItems || []);
    }
  }, []);

  useEffect(() => {
    const state = {
      questionsWithOptions,
      activeIndex,
      selectedOption,
      checkedItems,
    };
    sessionStorage.setItem('testState', JSON.stringify(state));
  }, [questionsWithOptions, activeIndex, selectedOption, checkedItems]);

  return (
    <>
      <div className="test">
        <div className="test_content">
          <div className="test_head flex gap-5 items-center mb-6">
            <div className="title text-3xl text-blue-500 font-bold">Тестирование</div>
            <div className="count text-red-500">20:00</div>
          </div>
          <div className="lines flex gap-1 items-center mb-4">
            {questionsWithOptions.map((question, index) => (
              <div key={index} className={`line ${index === activeIndex ? "bg-red-700" : index > activeIndex ? "bg-gray-200" : "bg-black"} w-10 h-1`}></div>
            ))}
          </div>
          <div className="questions">
            <div className="item">
              {questionsWithOptions[activeIndex] && (
                <div>
                  <div className="questions__title mb-4">
                    {questionsWithOptions[activeIndex].question}
                  </div>
                  <div className="questions__variants flex flex-col gap-3 mb-4">
                    {questionsWithOptions[activeIndex].options.map((option, optionIndex) => {
                      const inputName = `${activeIndex}-${option.toLowerCase()}`;
                      return questionsWithOptions[activeIndex].type === "checkbox" ? (
                        <label key={option.toLowerCase()} className="label_checkbox flex gap-4 cursor-pointer">
                          <input
                            type="checkbox"
                            name={inputName}
                            checked={checkedItems.find(item => item.id === inputName)?.checked}
                            onChange={handleCheckboxChange}
                          />
                          <span className="fakecheckbox"></span>
                          <div className="info">
                            <p>{option}</p>
                          </div>
                        </label>
                      ) : (
                        <label key={option.toLowerCase()} className="label_radio flex gap-4 cursor-pointer">
                          <input
                            type="radio"
                            name={`radio-${activeIndex}`}
                            value={option}
                            checked={selectedOption === option}
                            onChange={handleRadioChange}
                          />
                          <span className="fakeRadio"></span>
                          <div className="info">
                            <p>{option}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          {activeIndex < questionsWithOptions.length && (
            <div className="button cursor-pointer w-fit px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" onClick={handleAnswerClick}>
              Ответить
            </div>
          )}
          <div className="add mt-20 cursor-pointer w-fit px-4 py-1 text-red-600 rounded-full border border-black" onClick={handleVisible}>
            Добавить вопрос
          </div>
        </div>
      </div>
      <Modal visible={visible} onClose={handleClose} onAddQuestion={handleAddQuestion} />
    </>
  );
}
