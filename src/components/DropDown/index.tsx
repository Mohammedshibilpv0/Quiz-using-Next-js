'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import useQuiz from "@/app/store";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { ChevronDown } from "lucide-react"
 type categoryType={
    id:number,
    name:string
}

const Level=['easy','medium','hard']
const Type=['boolean','multiple']

const Index = () => {

    const {addLevel,addCategory,addType}=useQuiz()
    const currentCatgory=useQuiz((state)=>state.config.category)
    const currentLevel=useQuiz((state)=>state.config.level)
    const currentType=useQuiz((state)=>state.config.type)
    const [categories,setCategories]=useState<categoryType[]>([])
    

    useEffect(()=>{
       async function fetchingData(){
            const data=await axios.get('https://opentdb.com/api_category.php').then((response)=>{
                setCategories(response.data.trivia_categories)
                
                
            })
        }

        fetchingData()
    },[])


    let handleCategory=(category:categoryType):void=>{
        addCategory(category.id,category.name)          
    }

    let handleType=(type:string):void=>{
      console.log(type);
        addType(type)
    }

    let handleLevel=(level:string):void=>{
      
        addLevel(level)
    }

    return (
        <section className='flex flex-col md:flex-row justify-evenly items-center py-5 w-full'>
        <div className='px-7 py-4 w-full md:w-1/3 mx-4'>
          <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full shadow-lg hover:bg-blue-600 hover:text-gray-100 px-10 py-3">
           {currentCatgory.name==''?'select category':currentCatgory.name}<ChevronDown /> 
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border rounded shadow-lg mt-2 w-full">
              <DropdownMenuLabel className="px-4 py-2 text-gray-700">select category</DropdownMenuLabel>
              <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />
        
        {categories.map((category)=>{
            return(
                <DropdownMenuItem onClick={()=>handleCategory(category)} key={category.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{category.name}</DropdownMenuItem>
            )
        })}
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
  
        <div className='px-7 py-4 w-full md:w-1/3 mx-4'>
          <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full shadow-lg hover:bg-blue-600 hover:text-gray-100 px-10 py-3">
             {currentLevel==''? 'SELECT LEVEL':currentLevel}<ChevronDown /> 
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border rounded shadow-lg mt-2 w-full">
              <DropdownMenuLabel className="px-4 py-2 text-gray-700">select level</DropdownMenuLabel>
              <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />
            
            {Level.map((level,index)=>{
                return(
                    <DropdownMenuItem key={index} onClick={()=>handleLevel(level)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{level}</DropdownMenuItem>
                )
            })}
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
  
        <div className='px-7 py-4 w-full md:w-1/3 mx-4'>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex outline-none justify-between w-full shadow-lg hover:bg-blue-600 hover:text-gray-100 px-10 py-3">
             {currentType==''? 'SELECT TYPE':currentType}<ChevronDown /> 
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border rounded shadow-lg mt-2 w-full">
              <DropdownMenuLabel className="px-4 py-2 text-gray-700">select type</DropdownMenuLabel>
              <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />
                
                {Type.map((type,index)=>{
                    return(
                        <DropdownMenuItem  key={index} onClick={()=>handleType(type)} className="px-4 py-2  hover:bg-gray-100 cursor-pointer">{type}</DropdownMenuItem>
                    )
                })}
                 
            </DropdownMenuContent>
          </DropdownMenu> 
        </div>
      </section>
    );
}

export default Index;
