import React, { useState } from "react";
import { cn } from "@/utils/cn";

const About = ({ className }: { className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  function switcher() {
    setIsVisible(!isVisible);
  }

  return (
    <div
      onClick={switcher}
      className={cn(
        "transition-all group hover:bg-[#60be92] fixed top-[90vh] left-[5vw] min-h-12 min-w-[70px] p-2 flex items-center justify-center border-[2px] border-[#60be92] rounded-lg cursor-pointer",
        className
      )}>
      <p className=' transition-all group-hover:text-[#3d3d3d] font-bold text-[#60be92] '>
        {isVisible ? "Close" : "About"}
      </p>
      <div
        className={`fixed flex flex-col items-center transition-all top-[15vh] left-2  w-[400px] h-[70vh] border-[2px] border-[#60be92] rounded-lg bg-[#202020] text-white ${
          isVisible ? "scale-x-100 translate-x-[10px]" : "scale-x-0 translate-x-[-200px]"
        }`}>
        <h2 className='font-bold text-2xl mt-2 text-[#60be92]'>Hey there!🤪</h2>
        <p className='ml-[5px] mt-[40px] font-light'>
          This is a map of most streaming songs in 2024. Each point is a track, each line (you can
          enable it by toggeling "same artist" or "same release year") connects all points with same
          dependence (if you choose the point).
          <br /> On the X-axis, the points are located further from the center of the screen in the
          positive direction, the more, relative to the average values, they were listened on
          YouTube. The same for the Y-axis, only the platform is Tiktok.
          <br /> You can zoom view by tapping on "+" and "-" buttons, move view like regular map,
          listen a song preview (if it was provided by Spotify API), and visit song page on Spotify.
          <br /> And it doesn't work on mobile devices yet😒
        </p>
        <p className='mt-[60px] font-bold text-2xl text-[#60be92]'>All the best!!!</p>
        <p className='text-[#3d3d3d] text-sm font-light'>
          <a href='https://github.com/someTrickyCase'>😶‍🌫️😶‍🌫️ 😶‍🌫️ @someTrickyCase</a>
        </p>
      </div>
    </div>
  );
};

export default About;
