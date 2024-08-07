"use client";

import React, { useEffect } from "react";

const Button = ({ children, onClick }: { children: string; onClick?: () => void }) => {
  return (
    <div
      onClick={onClick}
      className=' h-8 bg-[#60be92] text-white font-bold text-sm border-[1px] border-[#60be92] rounded-lg px-4 py-[3px] flex items-center justify-center hover:scale-[1.04] cursor-pointer transition-all'>
      <p className='pointer-events-none z-20'>{children}</p>
    </div>
  );
};

export default Button;
