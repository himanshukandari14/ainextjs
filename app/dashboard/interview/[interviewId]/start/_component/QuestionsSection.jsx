import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionsSection = ({mockInterviewQuestion,activeQuestionIndex}) => {


  const textToSpeach=(text)=>{
    if('speechSynthesis' in window){
      const speech= new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    }else{
      alert('sorry browser does not support text to speech')
    }
  }



  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg w-[40%] '>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion && mockInterviewQuestion.map((question,index)=>(

            <h2 key={index} className={`p-2 rounded-full text-xl bg-secondary md:text-sm text-center cursor-pointer ${activeQuestionIndex == index && 'bg-[#bca2f5] text-white'}`}>Question #{index+1}</h2>
        ))}
       
    </div>
     
     <h2 className='my-5 text-sm md:text-lg font-semibold'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
     <Volume2 onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}></Volume2>
      <div className='border-lg p-5 bg-blue-100 rounded-lg mt-20'>
     
        <h2 className='flex text-blue-500 gap-2 items-center text-primary'>
            <Lightbulb />
            <strong>Note:{process.env.NEXT_PUBLIC_INFORMATION}</strong>
        </h2>
      </div>
    </div>
  )
}

export default QuestionsSection
