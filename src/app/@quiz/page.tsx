'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useQuiz from '../store';
import { shuffle } from './sheffle';
import Loading from '@/components/Loading';
import Timer from '@/components/Timer';
import { useRouter } from 'next/navigation';

interface APIQuestion {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuizQuestion {
  question: string;
  answers: string[];
  correctAnswer: string;
}

const Quiz = () => {
  const { addScore, NoOfquestions,status } = useQuiz((state) => ({
    addScore: state.addScore,
    score: state.config.score,
    NoOfquestions: state.config.numberOFQuestion,
    status:state.addStatus
  }));
  const quizConfig = useQuiz((state) => state.config);
  const [selected, setSelected] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQnsNo, setCurrentQnsNo] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [currQns, setCurrQns] = useState<QuizQuestion | null>(null);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const [displayAnswer, setDisplayAnswer] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    async function fetchQuestions() {
      try {
        const response = await axios.get<{ results: APIQuestion[] }>(
          `https://opentdb.com/api.php?amount=${quizConfig.numberOFQuestion}&category=${quizConfig.category.id}&type=${quizConfig.type}&difficulty=${quizConfig.level}`
        );
        const fetchedQuestions: QuizQuestion[] = response.data.results.map((q: APIQuestion) => {
          const shuffledAnswers = shuffle([q.correct_answer, ...q.incorrect_answers]);
          return {
            question: q.question,
            answers: shuffledAnswers,
            correctAnswer: q.correct_answer,
          };
        });
        setQuestions(fetchedQuestions);
        setCurrQns(fetchedQuestions[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [quizConfig]);

  const handleNextQuestion = () => {
    setDisplayAnswer(true);
    let answer = false;
    if (currQns && selected !== undefined && currQns.correctAnswer === currQns.answers[selected]) {
      answer = true;
    }

    setTimeout(() => {
      if (answer) {
        addScore();
        setScore(score + 1);
      }

      if (currentQnsNo + 1 >= NoOfquestions) {
        status('result')
      } else {
        setCurrentQnsNo(currentQnsNo + 1);
        setCurrQns(questions[currentQnsNo + 1]);
        setSelected(undefined);
        setIsTimeUp(false);
        setDisplayAnswer(false);
      }
    }, 3000);
  };

  if (loading || !currQns) {
    return <Loading />;
  }

  return (
    <section className='flex flex-col justify-center items-center p-4'>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Question NO <span className="text-blue-600 dark:text-blue-500">#{currentQnsNo + 1}</span>.
      </h1>
      <p className='text-2xl mb-5'>Score: {score}</p>
      <Timer key={currentQnsNo} handle={handleNextQuestion} onTimeUp={() => setIsTimeUp(true)} />
      <section className='shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200'>
        <h4 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-600 dark:text-blue-500 md:text-3xl lg:text-3xl">
          {currentQnsNo + 1}.{currQns.question}
        </h4>
        <div className='flex justify-evenly items-center my-20 flex-wrap w-[90%]'>
          {currQns.answers.map((answer, index) => (
            !displayAnswer ? (
              <button
                key={index}
                type="button"
                onClick={() => !isTimeUp && setSelected(index)}
                className={selected === index
                  ? "w-[45%] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-green-500 rounded-lg border border-gray-200 hover:bg-green-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  : "w-[45%] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                }
                disabled={isTimeUp}
              >
                {answer}
              </button>
            ) : (
              <button
                key={index}
                type="button"
                className={answer === currQns.correctAnswer
                  ? "w-[45%] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-green-500 rounded-lg border border-gray-200 hover:bg-green-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  : "w-[45%] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white focus:outline-none bg-red-500 rounded-lg border border-gray-200 hover:bg-red-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                }
                disabled
              >
                {answer}
              </button>
            )
          ))}
        </div>
      </section>
    </section>
  );
};

export default Quiz;
