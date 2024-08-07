import React, { useRef, useState } from "react";
import { cn } from "@/utils/cn";

const Player = ({ previewURL, className }: { previewURL: string | null; className?: string }) => {
  const playerRef: React.RefObject<HTMLAudioElement> = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function play() {
    if (!isPlaying && playerRef.current && previewURL) {
      playerRef.current.play();
      setIsPlaying(true);
    }
  }

  function pause() {
    if (isPlaying && playerRef.current && previewURL) {
      playerRef.current.pause();
      setIsPlaying(false);
    }
  }

  return (
    <div className={cn("h-fit w-fit flex items-center gap-2", className)}>
      <audio ref={playerRef} src={previewURL ? previewURL : undefined}></audio>
      <div
        onClick={play}
        className={`transition-all group hover:border-[#c7ede6] w-[30px] h-[30px] rounded-full bg-transparent border-[2px] border-[#3d3d3d] flex items-center justify-center ${
          isPlaying ? "border-[#60be92]" : undefined
        }`}>
        <svg
          className={`transition-all group-hover:text-[#c7ede6] w-[30px] translate-x-[2px] ${
            isPlaying ? "text-[#60be92]" : "text-[#3d3d3d]"
          }`}
          xmlns='http://www.w3.org/2000/svg'
          fill={isPlaying ? "#60be92" : "none"}
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'>
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z'
          />
        </svg>
      </div>
      <div
        onClick={pause}
        className='transition-all group hover:border-[#c7ede6] w-[30px] h-[30px] rounded-full bg-transparent border-[2px] border-[#3d3d3d]  flex items-center justify-center'>
        <svg
          className='transition-all group-hover:text-[#c7ede6] w-[30px] text-[#3d3d3d]'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='2.5'
          stroke='currentColor'>
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M15.75 5.25v13.5m-7.5-13.5v13.5'
          />
        </svg>
      </div>
    </div>
  );
};

export default Player;
