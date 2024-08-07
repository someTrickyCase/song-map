"use client";

import React, { useState } from "react";
import Button from "../ui/Button";

const ZoomPanel = ({ handleClick }: { handleClick: Function }) => {
  const [zoom, setZoom] = useState(100);

  function toNormalScale() {
    setZoom(100);
    handleClick(1);
  }

  function increaseScale() {
    if (zoom === 1000) return;
    setZoom((prevState) => prevState + 10);
    handleClick(0.1);
  }

  function decreaseScale() {
    if (zoom === 10) return;
    setZoom((prevState) => prevState - 10);
    handleClick(-0.1);
  }

  return (
    <div className='bg-[#202020] border-[2px] border-[#60be92] p-2 rounded-lg z-10 items-center justify-center fixed flex gap-2 left-1/2 min-h-10 w-[180px]  translate-x-[-90px] top-[90vh]'>
      <Button onClick={decreaseScale}>{"-"}</Button>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        width='30'
        height='30'
        viewBox='0,0,256,256'>
        <g
          fill='#fff'
          fill-rule='nonzero'
          stroke='none'
          stroke-width='1'
          stroke-linecap='butt'
          stroke-linejoin='miter'
          stroke-miterlimit='10'
          stroke-dasharray=''
          stroke-dashoffset='0'
          font-family='none'
          font-weight='none'
          font-size='none'
          text-anchor='none'>
          <g transform='scale(2,2)'>
            <path d='M52.34961,14.40039c-9.725,0 -19.44961,3.69961 -26.84961,11.09961c-14.8,14.8 -14.8,38.89922 0,53.69922c7.4,7.4 17.10039,11.10156 26.90039,11.10156c9.8,0 19.50039,-3.70156 26.90039,-11.10156c14.7,-14.8 14.69844,-38.89922 -0.10156,-53.69922c-7.4,-7.4 -17.12461,-11.09961 -26.84961,-11.09961zM52.30078,20.30078c8.2,0 16.39961,3.09844 22.59961,9.39844c12.5,12.5 12.49961,32.80078 0.09961,45.30078c-12.5,12.5 -32.80078,12.5 -45.30078,0c-12.5,-12.5 -12.5,-32.80078 0,-45.30078c6.2,-6.2 14.40156,-9.39844 22.60156,-9.39844zM52.30078,26.30078c-6.9,0 -13.40078,2.69922 -18.30078,7.69922c-4.7,4.7 -7.29961,10.80039 -7.59961,17.40039c-0.1,1.7 1.20039,2.99961 2.90039,3.09961h0.09961c1.6,0 2.9,-1.30039 3,-2.90039c0.2,-5.1 2.29883,-9.80039 5.79883,-13.40039c3.8,-3.8 8.80156,-5.89844 14.10156,-5.89844c1.7,0 3,-1.3 3,-3c0,-1.7 -1.3,-3 -3,-3zM35,64c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3zM83.36328,80.5c-0.7625,0 -1.5125,0.30039 -2.0625,0.90039c-1.2,1.2 -1.2,3.09922 0,4.19922l2.5,2.5c-0.6,1.2 -0.90039,2.50039 -0.90039,3.90039c0,2.4 0.89961,4.70039 2.59961,6.40039l12.80078,12.59961c1.8,1.8 4.09844,2.69922 6.39844,2.69922c2.3,0 4.60039,-0.89961 6.40039,-2.59961c3.5,-3.5 3.5,-9.19922 0,-12.69922l-12.79883,-12.80078c-1.7,-1.7 -4.00039,-2.59961 -6.40039,-2.59961c-1.4,0 -2.70039,0.30039 -3.90039,0.90039l-2.5,-2.5c-0.6,-0.6 -1.37422,-0.90039 -2.13672,-0.90039zM91.90039,88.90039c0.8,0 1.59961,0.30039 2.09961,0.90039l12.69922,12.69922c1.2,1.2 1.2,3.09922 0,4.19922c-1.2,1.2 -3.09922,1.2 -4.19922,0l-12.69922,-12.59961c-0.6,-0.6 -0.90039,-1.39922 -0.90039,-2.19922c0,-0.8 0.30039,-1.59961 0.90039,-2.09961c0.6,-0.6 1.29961,-0.90039 2.09961,-0.90039z'></path>
          </g>
        </g>
      </svg>
      <span
        onClick={toNormalScale}
        className='ml-[-10px] text-white font-bold w-[42px] flex items-center justify-center cursor-pointer'>
        {`${zoom}%`}
      </span>
      <Button onClick={increaseScale}>{"+"}</Button>
    </div>
  );
};

export default ZoomPanel;
