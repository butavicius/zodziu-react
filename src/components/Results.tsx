import React, { useState } from "react";
import Logo from "./Logo";
import arrowIcon from "../assets/arrow.svg";
import Countdown from "./Countdown";
import SocialStatus from "./SocialStatus";
import Row from "./Row";
import { loadState } from "../storage";
import generateSocialIcons from "../utils/generateSocialIcons";
import {
  isNavigatorShareAvailable,
  isNavigatorClipboardAvailable,
  isSharingBroken,
} from "../utils/systemInfo";

type Props = {
  targetWord: string;
  gameNumber: number;
  onTimeUp: () => void;
};

export default function Results({ targetWord, gameNumber, onTimeUp }: Props) {
  const endGameState = loadState(targetWord);
  const isWinner = endGameState[endGameState.length - 1] === targetWord;
  const [isResultCopiedToClipboard, setIsResultCopiedToClipboard] =
    useState<boolean>(false);

  const icons = generateSocialIcons(endGameState, targetWord);
  const socialText = `ŽÓDŽIU №${gameNumber}\n\n` + icons.join("\n");

  const handleSocialClick = () => {
    // If browser supports navigator.share, use it and return
    if (isNavigatorShareAvailable) {
      console.log("Using navigator.share to share game results");

      navigator
        .share({ text: socialText })
        .then(() => {
          console.log("navigator.share successful");
        })
        .catch((error) => {
          console.error("Error: could not share game results", error.message);
        });

      return;
    }

    // If browser supports navigator.clipboard.writeText, use it and return
    if (isNavigatorClipboardAvailable) {
      console.log("Using navigator.clipboard to share game results");
      navigator.clipboard
        .writeText(socialText)
        .then(() => {
          console.log("navigator.clipboard.writeText successful");
          setIsResultCopiedToClipboard(true);

          // Show "result copied" message only for 10 seconds
          // in case user wants to come back and copy it again later
          setTimeout(() => setIsResultCopiedToClipboard(false), 10000);
        })
        .catch((error) => {
          console.error("Error: could not share game results", error.message);
        });

      return;
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold tracking-widest my-2">
        <Logo />{" "}
        <span className="tracking-normal font-normal">
          №{gameNumber} {isWinner ? "pavarei!" : "nepaėjo."}
        </span>
      </h2>

      {/* ANSWER */}
      <div className="grid grid-cols-5 gap-1 my-4 pt-1">
        <Row guess={targetWord} targetWord={targetWord} squareSize={32} />
      </div>

      {/* SOCIAL */}
      {(isNavigatorShareAvailable || isNavigatorClipboardAvailable) &&
      !isSharingBroken ? (
        <div
          className="flex my-4 py-4 w-3/4 justify-center items-center border-yellow border-y-2 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleSocialClick();
          }}
        >
          <div className="flex-1 flex justify-center items-center cursor-pointer">
            <SocialStatus icons={icons} />
          </div>

          <div className="flex-1 flex flex-col justify-center items-start pl-4">
            <p id="share-text">
              {isResultCopiedToClipboard
                ? "Nukopijuota!"
                : "Dalinkis rezultatu"}
            </p>
            <p className="py-1"></p>
            <img
              src={arrowIcon}
              alt=""
              width="40"
              height="40"
              className="select-none"
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center py-4 mb-2">
          <SocialStatus icons={icons} />
        </div>
      )}

      {/* COUNTDOWN */}

      <div className="flex flex-col items-center my-2 select-none">
        <p className="uppercase text-sm tracking-wider">Kitas žodis už</p>
        <div className="flex py-2">
          <Countdown onTimeUp={onTimeUp} />
        </div>
      </div>
    </>
  );
}
