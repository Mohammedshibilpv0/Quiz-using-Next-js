'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import useQuiz from "./store";
import Result from "./result/Result";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
  quiz,
}: Readonly<{
  children: React.ReactNode;
  quiz: React.ReactNode;
}>) {
  const isStart = useQuiz((state) => state.config.status);
  let render
  if(isStart=='start'){
    render=quiz
  }else if(isStart=='result'){
    render=<Result/>
  }else{
    render=children
  }


  return (
    <html lang="en">
      <body className={inter.className}>{render}</body>
    </html>
  );
}
