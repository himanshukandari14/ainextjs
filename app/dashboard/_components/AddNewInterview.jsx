"use client"
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAImodel'
import { Loader2, Loader2Icon, LoaderCircle, LoaderPinwheel, LoaderPinwheelIcon } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { db } from '@/utils/db';
import { useRouter } from 'next/navigation';



const AddNewInterview = () => {
    const [openDialogue,setOpenDialogue]=useState(false)
    const [jobPosition,setJobposition]=useState('')
    const [jobDescription,setJobDescription]=useState('')
    const [jobExperience,setJobExperience]=useState('')
    const [loading,setLoading]=useState(false);
    const router=useRouter();
    const {user}=useUser(); //to get logged in user

    // jsom ai response
    const [jsonResponse,setJsonResponse]=useState([]);

    // prompt to go in gemini ai
  

    const onSubmit = async (e) => {
      setLoading(true);
  e.preventDefault(); // Prevent default form submission
  console.log(jobDescription, jobExperience, jobPosition);
  

    const InputPromt="job position:"+jobPosition+", job description:"+jobDescription+" yearsofexperince:"+jobExperience+", depends on this all data give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT+" interview questions along with answer in json format only"


    const result = await chatSession.sendMessage(InputPromt);
    
      const mockResponse=(result.response.text()).replace('```json','').replace('```','')
    console.log(JSON.parse(mockResponse));
    setJsonResponse(mockResponse);

    // record in db

   if (mockResponse) { // Check if mockResponse has a value before inserting
    const res = await db.insert(MockInterview)
      .values({
        mockId: uuidv4(),
        jsonMockResp: mockResponse,
        jobPosition: jobPosition,
        jobDescription: jobDescription,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy'),
      })
      .returning({ mockId: MockInterview.mockId });
    console.log('inserted id', res);
    if(res){
      setOpenDialogue(false)
      router.push('/dashboard/interview/'+res[0]?.mockId);
      
      
    }
  } else {
    console.log('Error: No interview questions received from AI');
  }

  setLoading(false);
};

  return (
    <div >
    

      <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow cursor-pointer transition-all' onClick={()=>setOpenDialogue(true)}>
        <h2 className='font-bold text-lg text-center'>+ Add New </h2>
      </div>

      <Dialog open={openDialogue}>
 
  <DialogContent className='max-w-2xl'>
    <DialogHeader>
      <DialogTitle className='font-bold text-2xl'>Tell us more about interviewing</DialogTitle>
      <DialogDescription>

      <form onSubmit={onSubmit} action="">
         <div>
       <h2>Add details about your position/role, job description</h2>

       <div className='mt-7 my-2 gap-2 flex flex-col'>
        <label htmlFor="">Job Role/Job Position </label>
        <Input onChange={(e)=>setJobposition(e.target.value)}  placeholder= "Ex.Full Stack Developer" required />

     
       </div>
        {/* job description */}
        <div className='mt-7 my-2 gap-2 flex flex-col'>
        <label htmlFor="">Job Description/ Tech Stack (In Short)</label>
        <Textarea onChange={(e)=>setJobDescription(e.target.value)} placeholder="Ex. React, Angular,Remix" required />

      
       </div>
       {/*  */}
        <div className='mt-7 my-2 gap-2 flex flex-col'>
        <label htmlFor=""> Years of Experience</label>
        <Input onChange={(e)=>setJobExperience(e.target.value)} max="100" placeholder= "Ex.5" type="number" required />

     
       </div> 
       
       
      </div>
       <div className='flex justify-between mt-7'>
    <Button type="button" onClick={() => setOpenDialogue(false)} variant="ghost">Cancel</Button>
    <Button type="submit" disable={loading}>{loading?(
      <>
       <LoaderCircle className='animate-spin mr-2' /> Generating with AI 🚀
      </>):('Start Interview')}</Button>
</div>
      </form>
     
      
       

        
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>

    
  )
}

export default AddNewInterview
