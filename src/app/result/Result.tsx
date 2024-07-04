import React, { useEffect, useState } from 'react';
import useQuiz from '../store';

const Result = () => {

  const Quiz=useQuiz((state)=>state.config)
  const {clearConfig}=useQuiz()
  const [isOpen, setIsOpen] = useState(false);
  const {addStatus}=useQuiz()  
    useEffect(()=>{
        setIsOpen(!isOpen);
    },[])

    const toggleModal=()=>{
        addStatus('')
        clearConfig()
    }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-x-hidden  overflow-y-auto bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-md p-4 m-5 max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModal}
              >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 m-4">
             

                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                  Result
                </h3>
                <h1 className="mb-6 text-gray-500 dark:text-gray-400">
                  <h1>Great Attempt</h1>
                </h1>
                    <div className='flex m-4'>
                    <h6 className='me-3'>Total Attempt:{Quiz.numberOFQuestion}</h6>
                    <h6 className='text-green-500 me-3'>Correct Answer:{Quiz.score}</h6>
                    <h6 className='text-red-500 me-3'>Incorrect Answer:{Quiz.numberOFQuestion-Quiz.score} </h6>
                    </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Result;
