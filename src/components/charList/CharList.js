import { useEffect, useRef, useCallback, useState } from 'react';
import { useHttp } from '../../hooks/useHttp';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import { useQuery } from 'react-query'
import Char from './CharList.styled';
import { styled } from "@mui/material/styles";
import { fetchAllCharacters, fetchSingleharacters } from '../../actions';
import { singleCharId } from '../../components/charInfo/charInfoSlice';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../../style/style.scss';

const CharGrid = styled('ul')`
      display: grid;
      grid-template-columns: repeat(3, 200px);
      column-gap: 25px;
      row-gap: 30px;
      list-style-type: none;
      padding: 0;
      margin: 0;
    `

const CharList = () => {
  const itemRefs = useRef([]);
  let navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page'));

  const {charList, charListLoadingStatus} = useSelector(state => state.charList);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchAllCharacters(request, page));
    navigate(`/character?page=${1}`);
  }, []);

  const focusOnItem = useCallback((id) => {
    console.log('das');
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  }, [])

  if (charListLoadingStatus === 'error') {
    return <ErrorMessage />;
  } else if (charListLoadingStatus === 'loading') {
    return <Spinner />;
  }
  const onCharSelected = (id) => {
    dispatch(singleCharId(id));
  }
  const onChangePage = (e, pageNum) => {
    dispatch(fetchAllCharacters(request, pageNum));
    navigate(`/character?page=${pageNum}`);
  }

  function renderItems(items) {
       const item = items && items.map((item, i) => {

            return (
                <li
                key={item.id}
                ref={(el) => itemRefs.current[i] = el}
                tabIndex={0}
                onClick={() => {
                  onCharSelected(item.id);
                  focusOnItem(i)
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

    return (
      <CharGrid>{item}</CharGrid>
    );

  }

  const pagesInfo = charList && charList.info;
  const items = renderItems(charList.results);
  console.log(charList);
  return (
    <>
      <div className="char__list">
        {items}
        <Stack spacing={2} sx={{ margin: '25px 0px'}}>
        <Pagination
          variant="outlined"
          count={pagesInfo && pagesInfo.pages}
          color="primary"
          onChange={ onChangePage}
          page={page}
        />

      </Stack>
      </div>

    </>
  )
}

export default CharList;