"use client";
import { pointsCoordinatesDelta } from "@/model/metrics";
import Canvas from "@/shared/components/Canvas";
import DependensiencePanel from "@/shared/components/DependensiencePanel";
import SongDescription from "@/shared/components/SongDescription";
import { useState } from "react";
import { getToken } from "@/api/apiController";
import Player from "@/shared/components/Player";
import About from "@/shared/components/About";

const HomePage = () => {
  getToken();

  const [depType, setDepType] = useState("");
  const [doesDescriptionExist, setDoesDescriptionExist] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState({
    ISRC: "",
    track: "",
    artist: "",
    releaseYear: "",
  });

  function renderDescription(pointDescription: {
    ISRC: string;
    track: string;
    artist: string;
    releaseYear: string;
  }) {
    setDoesDescriptionExist(true);
    setSelectedPoint(pointDescription);
  }

  function handleClick() {
    if (depType === "") {
      setDepType("releaseDate");
    }
    if (depType === "releaseDate") {
      setDepType("artist");
    }
    if (depType === "artist") {
      setDepType("");
    }
  }

  return (
    <div className='w-screen h-screen relative'>
      <Canvas
        dependensienceState={depType}
        renderDescription={renderDescription}
        data={pointsCoordinatesDelta}
      />
      <SongDescription
        className={`${
          doesDescriptionExist ? "h-16 transition-all translate-y-8" : "translate-y--8 -scale-y-0"
        }`}
        ISRC={selectedPoint.ISRC}
        track={selectedPoint.track}
        artist={selectedPoint.artist}
        releaseYear={selectedPoint.releaseYear}
      />
      <DependensiencePanel clickHandler={handleClick} />
      <About />
    </div>
  );
};

export default HomePage;
