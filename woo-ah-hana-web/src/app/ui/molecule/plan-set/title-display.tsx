// TitleDisplay.tsx
import React from "react";

interface TitleDisplayProps {
  mainTitle: string;
  subTitle: string;
}

const TitleDisplay = ({ mainTitle, subTitle }: TitleDisplayProps) => {
  return (
    <div className="my-10 text-xl text-gray-800">
      <h1 className="font-bold mb-1">{mainTitle}</h1>
      <p>{subTitle}</p>
    </div>
  );
};

export default TitleDisplay;
