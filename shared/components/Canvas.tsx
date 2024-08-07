"use client";

import { useState, useLayoutEffect, useMemo, useReducer } from "react";
import ZoomPanel from "./ZoomPanel";
import React from "react";

const Canvas = ({
  data,
  renderDescription,
  dependensienceState,
}: {
  data: {
    x: number;
    y: number;
    size: number;
    ISRC: string;
    track: string;
    artist: string;
    releaseYear: string;
  }[];
  renderDescription: Function;
  dependensienceState: string;
}) => {
  if (typeof window !== "object") return;

  const [isDragged, setIsDragged] = useState(false);
  const [scale, setScale] = useState(1);
  const [scaleOffset, setScaleOffset] = useState({ x: 0, y: 0 });
  const [startPanMousePosition, setStartPanMousePosition] = useState({ x: 0, y: 0 });
  const [update, forceUpdate] = useReducer((x) => x + 1, 0);
  const [canvasPosition, setCanvasPosition] = useState({
    canvasX: window.innerWidth / 2,
    canvasY: window.innerHeight / 2,
    mouseDeltaX: 0,
    mouseDeltaY: 0,
  });
  const [sameDependensience, setSameDependensience] = useState({
    artist: "",
    releaseYear: "",
  });

  // const [isPointHovered, setIsPointHovered] = useState(false);

  window.onresize = forceUpdate;

  const points = data;
  const depType = dependensienceState;

  useLayoutEffect(() => {
    const canvas = document.querySelector("canvas");
    const context = canvas?.getContext("2d") as any;

    let scaledWidth = undefined;
    let scaledHeight = undefined;
    let scaleOffsetX = undefined;
    let scaleOffsetY = undefined;

    if (canvas) {
      scaledWidth = canvas.width * scale;
      scaledHeight = canvas.height * scale;

      scaleOffsetX = (scaledWidth - canvas.width) / 2;
      scaleOffsetY = (scaledHeight - canvas.height) / 2;
      setScaleOffset({ x: scaleOffsetX, y: scaleOffsetY });

      context.clearRect(0, 0, canvas.width, canvas.height);

      context.save();
      context.translate(
        canvasPosition.canvasX * scale + canvasPosition.mouseDeltaX * scale - scaleOffsetX,
        canvasPosition.canvasY * scale + canvasPosition.mouseDeltaY * scale - scaleOffsetY
      );
      context.scale(scale, scale);

      // render lines
      if (depType === "artist") {
        for (let i = 0; i < points.length; i++) {
          for (let j = points.length - 1; j > i; j--) {
            if (
              points[i].artist === points[j].artist &&
              points[i].artist === sameDependensience.artist
            ) {
              context.beginPath();
              context.moveTo(points[i].x, points[i].y);
              context.lineTo(points[j].x, points[j].y);
              context.strokeStyle = "rgb(96, 190, 146, 0.2)";
              context.stroke();
            }
          }
        }
      } else if (depType === "releaseDate") {
        for (let i = 0; i < points.length; i++) {
          for (let j = points.length - 1; j > i; j--) {
            if (
              points[i].releaseYear === points[j].releaseYear &&
              points[i].releaseYear === sameDependensience.releaseYear
            ) {
              context.beginPath();
              context.moveTo(points[i].x, points[i].y);
              context.lineTo(points[j].x, points[j].y);
              context.strokeStyle = "rgb(142, 191, 238, 0.2)";
              context.stroke();
            }
          }
        }
      }

      // render Points
      points.forEach((point) => {
        context.fillStyle = "#fff";
        context.beginPath();
        context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        context.fill();
      });

      context.restore();
    }
  }, [scale, canvasPosition, update, depType]);

  // MOUSE DRAGGING
  function mouseMoveHandler(event: React.MouseEvent<HTMLCanvasElement>) {
    if (isDragged) {
      const deltaX = event.clientX - startPanMousePosition.x;
      const deltaY = event.clientY - startPanMousePosition.y;

      setCanvasPosition((prev) => ({
        ...prev,
        mouseDeltaX: deltaX / scale,
        mouseDeltaY: deltaY / scale,
      }));
    }

    // MOUSE Hover Point
    // if (!isDragged) {
    //   points.map((point) => {
    //     if (
    //       (point.x - point.size + canvasPosition.canvasX) * scale - scaleOffset.x < event.clientX &&
    //       (point.x + point.size + canvasPosition.canvasX) * scale - scaleOffset.x > event.clientX &&
    //       (point.y - point.size + canvasPosition.canvasY) * scale - scaleOffset.y < event.clientY &&
    //       (point.y + point.size + canvasPosition.canvasY) * scale - scaleOffset.y > event.clientY
    //     ) {
    //       setIsPointHovered(true);
    //     } else {
    //       setIsPointHovered(false);
    //     }
    //   });
    // }
    return;
  }

  function dragHandler(event: React.MouseEvent<HTMLCanvasElement>) {
    setIsDragged(!isDragged);
    if (event.type === "mousedown") {
      setStartPanMousePosition({ x: event.clientX, y: event.clientY });

      // Click on point
      points.map((point) => {
        if (
          (point.x - point.size + canvasPosition.canvasX) * scale - scaleOffset.x < event.clientX &&
          (point.x + point.size + canvasPosition.canvasX) * scale - scaleOffset.x > event.clientX &&
          (point.y - point.size + canvasPosition.canvasY) * scale - scaleOffset.y < event.clientY &&
          (point.y + point.size + canvasPosition.canvasY) * scale - scaleOffset.y > event.clientY
        ) {
          renderDescription({
            ISRC: point.ISRC,
            track: point.track,
            artist: point.artist,
            releaseYear: point.releaseYear,
          });
          setSameDependensience({
            artist: point.artist,
            releaseYear: point.releaseYear,
          });
        }
      });
    }
    if (event.type === "mouseup") {
      setCanvasPosition((prev) => ({
        canvasX: prev.canvasX + prev.mouseDeltaX,
        canvasY: prev.canvasY + prev.mouseDeltaY,
        mouseDeltaX: 0,
        mouseDeltaY: 0,
      }));
    }
  }

  function leaveHandler() {
    setIsDragged(false);
    return;
  }

  // ZOOM EFFECT
  const onZoom: Function = (delta: 0.1 | -0.1 | 1) => {
    if (delta === 1) {
      setScale(1);
    } else {
      setScale((prev) => prev + delta);
    }
  };

  return (
    <div>
      <ZoomPanel handleClick={onZoom} />
      <canvas
        id='canvas'
        className='bg-[#202020] absolute '
        onMouseLeave={leaveHandler}
        onMouseMove={mouseMoveHandler}
        onMouseDown={dragHandler}
        onMouseUp={dragHandler}
        width={window.innerWidth}
        height={window.innerHeight}></canvas>
    </div>
  );
};

export default Canvas;
