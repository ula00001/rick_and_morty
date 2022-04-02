import { useState, useCallback } from "react";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import { styled } from "@mui/material/styles";

const MainPage = () => {

  const [charId, setCharId] = useState(null);

  const onCharSelected = useCallback((id) => {
    console.log(id);
    setCharId(id);
  }, [])

  const CharContent = styled('div')`
    margin-top: 50px;
    display: grid;
    grid-template-columns: 650px 425px;
    column-gap: 25px;
    align-items: start;
  `

  return (
    <>
    <CharContent>
      <CharList onCharSelected={onCharSelected}/>
      <CharInfo charId={charId}/>
    </CharContent>
    </>
  )
}

export default MainPage;