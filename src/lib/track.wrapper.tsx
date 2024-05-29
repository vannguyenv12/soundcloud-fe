"use client";

import React, { createContext, useContext, useState } from "react";

const TrackContext = createContext<ITrackContext | null>(null);

export const TrackContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialValue = {
    id: 0,
    title: "",
    description: "",
    category: "",
    imgUrl: "",
    trackUrl: "",
    countLike: 0,
    countPlay: 0,
    uploaderId: 0,
    user: {
      id: 0,
      email: "",
      name: "",
      password: "",
      address: "",
      role: "",
    },
    isPlaying: false,
  };

  const [currentTrack, setCurrentTrack] = useState<IShareTrack>(initialValue);

  return (
    <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrackContext = () => useContext(TrackContext);
