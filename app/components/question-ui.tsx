import { useState, useEffect } from "react";
import type { QuestionType } from "../types/question";
import { radio } from "../styles";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

interface QuestionProps {
  questionType: QuestionType;
  onAnswerSelected: (questionIndex: number, answerIndex: number) => void;
  showResult: boolean;
}

const Question = (props: QuestionProps) => {
  const { questionType, onAnswerSelected, showResult } = props;
  const [selected, setSelected] = useState<string>(
    questionType.selectedAnswerIndex !== undefined
      ? questionType.answers[questionType.selectedAnswerIndex].content
      : "",
  );

  useEffect(() => {
    if (questionType.selectedAnswerIndex !== undefined) {
      setSelected(
        questionType.answers[questionType.selectedAnswerIndex].content,
      );
    } else {
      setSelected("");
    }
  }, [questionType.selectedAnswerIndex, questionType.answers]);

  const isIncorrect =
    showResult &&
    questionType.selectedAnswerIndex !== undefined &&
    questionType.answers[questionType.selectedAnswerIndex].content !==
      questionType.correctAnswer;

  const handleValueChange = (value: string) => {
    setSelected(value);
    const selectedAnswerIndex = questionType.answers.findIndex(
      (answer) => answer.content === value,
    );
    if (selectedAnswerIndex !== -1) {
      onAnswerSelected(questionType.id, selectedAnswerIndex);
    }
  };

  return (
    <div>
      <div className="font-bold">
        Câu {questionType.id + 1}: {questionType.question}{" "}
        <span className="text-red-500">{isIncorrect && "(x)"} </span>
      </div>
      <RadioGroup
        className="flex flex-col flex-1"
        value={selected}
        onValueChange={handleValueChange}
      >
        {questionType.answers.map((answer, answerIndex) => (
          <div key={answer.id}>
            <RadioGroupItem
              value={answer.content}
              id={`answer-${questionType.id}-${answer.id}`}
              disabled={showResult}
              className="peer sr-only"
            />
            <label
              htmlFor={`answer-${questionType.id}-${answer.id}`}
              className={`group flex cursor-pointer rounded-xl border-2 border-gray-200 px-2 py-2 text-black shadow-lg transition
                peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2
                ${
                  answerIndex === questionType.selectedAnswerIndex
                    ? "font-medium"
                    : ""
                } ${
                  !showResult &&
                  answerIndex === questionType.selectedAnswerIndex
                    ? radio.selected
                    : ""
                } ${
                  showResult && answer.content === questionType.correctAnswer
                    ? radio.correct
                    : ""
                } ${
                  showResult &&
                  answerIndex === questionType.selectedAnswerIndex &&
                  answer.content !== questionType.correctAnswer
                    ? radio.incorrect
                    : ""
                } `}
            >
              <div>{answer.content}</div>
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export { Question };
