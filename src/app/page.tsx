'use client';

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
// import RejectionChatComponent from '@/components/rejectionChat';
// import { useChat } from "ai/react";
import lmsgs from "@/data";

export default function Home() {

  const [yesLove, setYesLove] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const rejectionNote = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  // const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat();

  useEffect(() => {
    // check if screen size is for mobile
    if (window.innerWidth <= 640) {
      setIsMobile(true);
    }
  }, []);
  
  const handleNo = (event: any) => {
    setCount((prevCount) => prevCount + 1);

    setCurrentIndex((prevIndex) => (prevIndex + 1) % lmsgs.length);

    // handleInputChange({ target: { value: 'Write a funny text message to convice a girl to accept a valentines invitation. 10 words maximum.' } });
    // handleSubmit(event);
    // Get the button element
    const button = event.target;

    // Get the button's dimensions
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    // Generate random coordinates, taking into account the button's size
    let x, y;
    if(!isMobile) {
      x = Math.floor(Math.random() * (window.innerWidth - 600 - (buttonWidth * 3)));
      y = Math.floor(Math.random() * (window.innerHeight - 300 - (buttonHeight * 3)));
    } else {
      x = Math.floor(Math.random() * (window.innerWidth - (buttonWidth * 3)));
      y = Math.floor(Math.random() * (window.innerHeight - (buttonHeight * 3)));
    }

    // Set the button's position
    button.style.position = 'absolute';
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    // generate random coordinates for the rejection note, opposite of the button

    if(rejectionNote.current) {

    const rejectionNoteWidth = rejectionNote.current.offsetWidth;
    const rejectionNoteHeight = rejectionNote.current.offsetHeight;

    let x2, y2;
    if(!isMobile) {
      x2 = Math.floor(Math.random() * (window.innerWidth - 600 - rejectionNoteWidth));
      y2 = Math.floor(Math.random() * (window.innerHeight - 300 - rejectionNoteHeight));
    } else {
      x2 = Math.floor(Math.random() * (window.innerWidth - rejectionNoteWidth));
      y2 = Math.floor(Math.random() * (window.innerHeight - rejectionNoteHeight));
    }

    // Set the rejection note's position
    
      rejectionNote.current.style.position = 'absolute';
      rejectionNote.current.style.left = `${x2}px`;
      rejectionNote.current.style.top = `${y2}px`;
    }

  }

  const handleYes = () => {
    setYesLove(true);
  }

  return (
    <main className="relative flex h-screen flex-col items-center justify-between p-4 md:p-12 2xl:p-24">
      <div className="relative z-20 2xl:max-w-5xl max-w-3xl w-full h-full">
        {/* use framer motion animate presence of this 2 divs */}
        <AnimatePresence mode='wait'>
          {yesLove ? (
            <motion.div
              key="yes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:relative flex-col items-center justify-end flex"
            >
              <div>
                <button
                  onClick={() => setYesLove(false)} 
                  className="bg-rose-800 text-3xl px-4">
                  changed my mind
                </button>
              </div>

              <Image
                className="opacity-50 rounded-xl"
                src="/images/inner-bg.webp"
                alt="valentines theme"
                width={1920}
                height={1024}
                priority
              />

              <div className="absolute inset-0 p-6 mt-9">
                <iframe className="rounded-xl" src="https://open.spotify.com/embed/playlist/5tNp8pMjbiPuMSt8k7Iu2u?utm_source=generator" width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
              </div>

              <div className="absolute bottom-0 md:-bottom-9 2xl:bottom-0 bg-rose-100/75 px-6 py-2">
                <p className="font-poppins text-sm text-rose-950 font-bold">Babe, don&apos;t worry, don&apos;t cry today - I know you might. I&apos;ll be back soon and I have a big surprise for you. I can&apos;t wait for our date in March too, almost five years in and coming home to you still & always feels... There&apos;s no one like you. I love you girl. You are my world.</p>
              </div>

            </motion.div>
          ) : (
            <motion.div
              key="no"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-col items-center justify-center font-mono text-sm flex p-10"
            >
              <div className="bg-rose-200/30 px-6 py-3">
                <p className="text-rose-900 text-xl md:text-3xl font-bold uppercase font-poppins">Tiffah, will you be</p>
              </div>
              <p className="text-[9rem] 2xl:text-[12rem] leading-none text-rose-950">my</p>
              <p className="text-[10rem] 2xl:text-[14rem] leading-none text-rose-950 -mt-10">valentine</p>
              <div className="mt-10 2xl:mt-32 text-3xl font-bold flex justify-center items-center">
                <button
                  onClick={handleYes} 
                  className={`z-50 bg-rose-950 text-white px-6 py-3 rounded-lg mt-10 shadow-md ${count > 1 && 'animate-bounce'} transition ease-in-out duration-75 hover:bg-rose-900`}>Yes, I will</button>
                <button
                  onClick={handleNo}
                  className="z-50 bg-rose-100 hover:bg-rose-300 text-rose-950 px-6 py-3 rounded-lg mt-10 ml-5 shadow-md">No</button>
              </div>
            </motion.div>          
          )}
        </AnimatePresence>
      </div>
      {!yesLove && count > 0 &&(
        // <RejectionChatComponent messages={messages} />
        <div 
          ref={rejectionNote}
          className="text-rose-950 text-4xl font-bold z-10 bg-rose-200/50 px-6 py-3">
          {lmsgs[currentIndex]}
        </div>
      )}

      {
        isMobile ? (
          <Image
            className=""
            src="/images/mobile2-bg.webp"
            alt="valentines theme"
            fill
            priority
          />
        ) : (
          <Image
            className=""
            src="/images/tiffahbemyvalentines.webp"
            alt="valentines theme"
            fill
            priority
          />
        )
      }
    </main>
  );
}