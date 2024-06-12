/* eslint-disable react/no-unescaped-entities */
"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Webcam from "react-webcam";

const InterviewPage = ({ params }) => {


  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    getInterviewDetails();
  }, []);

  // used to get interview details by mock id from db
  const getInterviewDetails = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    console.log(result);
    setInterviewData(result[0]);
  }

  return (
   <div className="flex flex-col h-full w-full gap-6 p-4">
  <div className="flex flex-col md:flex-row justify-evenly items-center gap-6">
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-lg">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col rounded-lg border gap-5 p-5">
          <h2 className="capitalize">
            <strong>Job description/Job position:</strong>
            {interviewData?.jobPosition}
          </h2>
          <h2 className="capitalize">
            <strong>Job Description:</strong>
            {interviewData?.jobDescription}
          </h2>
          <h2 className="capitalize">
            <strong>Years of experience:</strong>
            {interviewData?.jobExperience}
          </h2>
        </div>
        <div className="p-5 bg-yellow-200 rounded-lg flex items-center">
          <Lightbulb />
          <span>
            <strong className="text-yellow-600">Information</strong>
            <h2 className="mt-3 text-yellow-600">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </span>
        </div>
      </div>
    </div>

    <div className="w-full md:w-1/2 flex flex-col items-center">
      {webCamEnabled ? (
        <Webcam
          onUserMedia={() => setWebCamEnabled(true)}
          onUserMediaError={() => setWebCamEnabled(false)}
          mirrored={true}
          className="w-full max-w-md"
          style={{
            height: 'auto',
            width: '100%',
            maxHeight: '600px',
          }}
        />
      ) : (
        <div className="flex flex-col justify-center bg-secondary p-5 rounded-md w-full max-w-md">
          <WebcamIcon className="h-[200px] md:h-[400px] w-full" />
          <Button onClick={() => setWebCamEnabled(true)} className="mt-4">
            Enable web cam and microphone
          </Button>
        </div>
      )}
    </div>
  </div>

  <div className="w-full flex items-end justify-center">
  <Link href={ `/dashboard/interview/${params.interviewId}/start`}>
    <Button className="px-6 py-3 md:px-10 md:py-6">Start</Button>
  </Link>
    
  </div>
</div>

  );
};

export default InterviewPage;
