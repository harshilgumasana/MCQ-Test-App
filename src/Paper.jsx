import { useState } from 'react';
import './Paper.css';
import Questions from './Questions.jsx';

export const Paper = () => {
    const [selectOptions, setSelectOptions] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [unansweredCount, setUnansweredCount] = useState(0);

    const handleSubmit = () => {
        let correct = 0;
        let wrong = 0;
        let unanswered = 0;

        Questions.forEach((question, qIndex) => {
            const selectedId = selectOptions[qIndex];
            const correctOption = question.options.find(opt => opt.isCorrect);

            if (selectedId === undefined) {
                unanswered++;
                return;
            }

            if (selectedId === correctOption.id) {
                correct++;
            } else {
                wrong++;
            }
        });

        setCorrectCount(correct);
        setWrongCount(wrong);
        setUnansweredCount(unanswered);
        setIsSubmitted(true);
    };

    const handleReset = () => {
        setSelectOptions({});
        setCorrectCount(0);
        setWrongCount(0);
        setUnansweredCount(0);
        setIsSubmitted(false);
    };

    return (
        <>
            <div className="test-container">
                {Questions.map((question, qIndex) => (
                    <div key={qIndex} className="question-block">
                        <h3>{question.questionText}</h3>
                        {question.options.map(option => (
                            <label key={option.id} className="option">
                                <input
                                    type="radio"
                                    name={`question-${qIndex}`}
                                    checked={selectOptions[qIndex] === option.id}
                                    onChange={() =>
                                        setSelectOptions({ ...selectOptions, [qIndex]: option.id })
                                    }
                                    disabled={isSubmitted}
                                />
                                {option.text}
                            </label>
                        ))}
                    </div>
                ))}
            </div>

            <div className="footer">
                <button id="submitBtn" onClick={handleSubmit} disabled={isSubmitted}>
                    Submit
                </button>

                <button id="resetBtn" onClick={handleReset} >
                    Reset
                </button>

                <h2>
                    Correct: {correctCount} | Wrong: {wrongCount} | Unanswered:{' '}
                    {unansweredCount}
                </h2>
            </div>
        </>
    );
};
