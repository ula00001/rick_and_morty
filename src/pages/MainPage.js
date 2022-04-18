import { useState, useCallback } from "react";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import RandomChar from "../components/randomChar/RandomChar";
import { styled } from "@mui/material/styles";

 const CharContent = styled('div')`
    margin-top: 50px;
    display: grid;
    grid-template-columns: 650px 425px;
    column-gap: 25px;
    align-items: start;
  `

const MainPage = () => {

  return (
    <>
      <RandomChar/>
      <CharContent>
        <CharList/>
        <CharInfo/>
      </CharContent>
    </>
  )
}

export default MainPage;