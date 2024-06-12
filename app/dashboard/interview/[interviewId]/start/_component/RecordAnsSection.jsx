"use client"
import React, { useEffect, useState } from 'react'
import 'regenerator-runtime/runtime';
import Webcam from 'react-webcam'
import webcampng from '@/public/webcam.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


import { Mic, Mic2 } from 'lucide-react'
const RecordAnsSection = () => {
   const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
    const [userAnswer,setUserAnswer]=useState('');

   
    useEffect(()=>{
      setUserAnswer(transcript)
    },[transcript])

    console.log(transcript)


 
  
  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center bg-secondary rounded-lg my-20 bg-black'>
    <Image src={webcampng} alt='webcam icon' width={300} height={300} className='absolute' />
      <Webcam
      mirrored={true}
      style={{
        height:500,
        width:500,
        zIndex:10,
        
      }}
       />
    </div>
    
      <div>
      <p>Microphone: {listening ? (<>
        <Mic></Mic>
        <p className='text-red-500'>Listening....</p>
      </>) : 'off'}</p>
      <Button onClick={SpeechRecognition.startListening}>Start</Button>
      <Button onClick={SpeechRecognition.stopListening}>Stop</Button>
      <Button onClick={resetTranscript}>Reset</Button>
      <p className='max-w-[200px]'>{transcript}</p>
    </div>
    </div>
    
  )
}

export default RecordAnsSection