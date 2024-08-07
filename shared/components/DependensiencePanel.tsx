import React, { useState } from "react";
import { cn } from "@/utils/cn";

const DependensiencePanel = ({
  className,
  clickHandler,
}: {
  className?: string;
  clickHandler: Function;
}) => {
  const [depType, setDepType] = useState("");

  function switcher() {
    if (depType === "") {
      setDepType("releaseDate");
    }
    if (depType === "releaseDate") {
      setDepType("artist");
    }
    if (depType === "artist") {
      setDepType("");
    }
    clickHandler();
  }

  let borderStyle = "";
  let thumbStyle = "";

  if (depType === "") {
    borderStyle = "border-[#3d3d3d]";
    thumbStyle = "translate-x-[10px] bg-[#3d3d3d]";
  } else if (depType === "artist") {
    borderStyle = "border-[#60be92]";
    thumbStyle = "translate-x-[-2px] bg-[#60be92]";
  } else if (depType === "releaseDate") {
    borderStyle = "border-[#8ebfee]";
    thumbStyle = "translate-x-[22px] bg-[#8ebfee]";
  }

  return (
    <div
      className={cn(
        `fixed flex items-center justify-center w-[100px] h-fit top-[86vh] left-1/2 translate-x-[-50px]`,
        className
      )}>
      <p
        className={`absolute font-bold text-nowrap translate-x-[-75px] transition-all ${
          depType === "artist" ? "text-[#60be92]" : "text-[#3d3d3d]"
        }`}>
        Same artist
      </p>
      <div
        onClick={switcher}
        className={`flex items-center h-[30px] w-[50px] rounded-full bg-[#202020] border-[2px] transition-all ${borderStyle} `}>
        <div className={`h-[26px] w-[26px] rounded-full transition-all ${thumbStyle}`}></div>
      </div>
      <p
        className={`absolute text-nowrap font-bold translate-x-[109px] transition-all ${
          depType === "releaseDate" ? "text-[#8ebfee]" : "text-[#3d3d3d]"
        }`}>
        Same release year
      </p>
    </div>
  );
};

export default DependensiencePanel;
