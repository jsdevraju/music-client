import Image from "next/image";
import React, { FC } from "react";
import { IMusic } from "../../utils";

interface IProps {
  music: IMusic;
}

const Card: FC<IProps> = ({ music }) => {
  return (
    <div className="shadow-lg rounded-lg p-8 w-[100%] sm:w-[50%] md:w-[30%] lg:w-[15%] text-center">
      <Image
        src={music.imageUrl}
        width={120}
        height={120}
        className="object-cover"
        alt="Razu islam"
      />
      <h3 className="text-gray-800 font-semibold text-lg">{music.name}</h3>
      <span className="text">{music.artist.name}</span>
    </div>
  );
};

export default Card;
