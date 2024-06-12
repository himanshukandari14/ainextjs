"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_component/QuestionsSection';
import RecordAnsSection from './_component/RecordAnsSection';

const StartInterview = ({params}) => {
    const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex,setActiveQuestionIndex]=useState(0)



    useEffect(()=>{
        getInterviewDetails();
    },[]);

   

    // used to get interview details by mock id from db
  const getInterviewDetails = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp=JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp)
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0])
  }
  return (
    <section className='flex px-6'>
    
     {/* questions */}
     <QuestionsSection activeQuestionIndex={activeQuestionIndex} mockInterviewQuestion={mockInterviewQuestion} />
     {/* video/audio recording */}
     <section className='w-[60%]  flex justify-end '>
        <RecordAnsSection />
     </section>
    
    </section>
  )
}

export default StartInterview
