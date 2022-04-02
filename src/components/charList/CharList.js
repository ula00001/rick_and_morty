import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import useCharacterService from "../../hooks/services/useCharacterService";
import { useQuery } from 'react-query'
import Char from './CharList.styled';
import Grid from '@mui/material/Grid';
import { styled } from "@mui/material/styles";

const CharList = ({ onCharSelected }) => {
  const { getAllCharacters } = useCharacterService();
  const [charList, setCharList] = useState([]);

  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  console.log('DATA');
  const {loading, data, error, isSuccess, isLoading, isError} = useQuery('data',getAllCharacters);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (data) {
      setCharList(data.results)
    }
  }, [data]);

  const focusOnItem = useCallback((id) => {
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  }, [])

  function renderItems(items) {
       const item = items.map((item, i) => {

            return (
                <li
                key={item.id}
                ref={(el) => itemRefs.current[i] = el}
                tabIndex={0}
                onClick={() => {
                  onCharSelected(item.id);
                  focusOnItem(i);
                }}
                >
                  {/* <NavLink to={`/movies/${item.id}`} className="poster-cards"> */}
                  <Char
                    className="char__item"
                    value={item} />
                  {/* </NavLink> */}
                </li>
            );
       })
    const CharGrid = styled('ul')`
      display: grid;
      grid-template-columns: repeat(3, 200px);
      column-gap: 25px;
      row-gap: 30px;
      list-style-type: none;
      padding: 0;
      margin: 0;
    `

    return (
      <CharGrid>{item}</CharGrid>
    );


  }

  const items = charList && renderItems(charList);
  const errorMessage = isError ? <ErrorMessage /> : null;
  const spinner = isLoading ? <Spinner /> : null;

  return (

    <div className="char__list">
      {errorMessage || spinner || items}
    </div>

  )
}

export default CharList;