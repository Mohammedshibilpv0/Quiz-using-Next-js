import useQuiz from "@/app/store";


const Button = () => {

    let {addStatus}=useQuiz()
    let handleSubmit=(value:string)=>{
        addStatus(value)
    }

    return (
        <div>
            <button onClick={()=>handleSubmit('start')} type="button" className="py-4 px-10 ms-11 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Start quiz now</button>
        </div>
    );
}

export default Button;
