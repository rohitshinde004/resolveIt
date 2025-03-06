import React from "react";
import styled from "styled-components";
// import buttonIcon from "../../../asset/svgs/projectBtn.svg";
import Button from "@mui/material/Button";

const StyledWrapper = styled.div`
  .cssbuttons-io-button {
    background: white;
    color: black;
    font-family: inherit;
    padding: 0.35em;
    font-size: 17px;
    font-weight: 500;
    border-radius: 8px;
    border: 2px solid #ffcaa5;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    height: 2.8em;
    cursor: pointer;
  }

  .cssbuttons-io-button .icon {
    background: #e27022;
    margin-left: 1em;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.2em;
    width: 2.2em;
    border-radius: 8px;
    right: 0.3em;
    transition: all 0.3s;
  }

  .cssbuttons-io-button:hover .icon {
    width: calc(100% - 0.6em);
  }

  .cssbuttons-io-button .icon svg {
    width: 1.1em;
    transition: transform 0.3s;
    color: #7b52b9;
  }

  .cssbuttons-io-button:hover .icon svg {
    transform: translateX(0.1em);
  }

  .cssbuttons-io-button:active .icon {
    transform: scale(0.95);
  }

  @media (max-width: 650px) {
    .cssbuttons-io-button {
      font-size: 14px;
    }
  }
`;

interface ProjectButtonProps {
  onClickCallBack: () => void;
  buttonLabel: string;
  className: string;
}

export const CommonButton = (props: ProjectButtonProps) => {
  const { onClickCallBack, buttonLabel, className } = props;
  return (
    <StyledWrapper>
      <Button
        className={`cssbuttons-io-button ${className}`}
        onClick={onClickCallBack}
        style={{
          // backgroundColor: "transparent",
          color: "black",
          border: "none",
          textTransform: "none",
          padding: "0.5em 1.5em",
        }}
      >
        {buttonLabel}
      </Button>
    </StyledWrapper>
  );
};
