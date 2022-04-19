import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomcharacters } from '../../actions/';
import { useHttp } from '../../hooks/useHttp';
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import mjolnir from '../../resources/mjolnir.png';
import { setRandomCharId } from '../randomChar/randomCharSlice';
import { styled } from "@mui/material/styles";
import './randomChar.scss';

const RandomChar = () => {
  const { randomChar, randomCharId, randomCharLoadingStatus } = useSelector(state => state.randomChar);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    if (!randomCharId) return;
    dispatch(fetchRandomcharacters(request, randomCharId));
  }, [randomCharId])

  const loading = randomCharLoadingStatus === 'loading' && <Spinner />;
  const error = randomCharLoadingStatus === 'error' && <ErrorMessage />
  const content = randomChar && <View randomChar={randomChar} />;

  const changeChar = () => {
    const id = Math.floor(1 + Math.random() * 40);
    dispatch(setRandomCharId(id));
  }

  return (
    <div className="randomchar">
      {loading || error || content}

      <div className="randomchar__static">
        <p className="randomchar__title">
            Random character for today!<br/>
            Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
            Or choose another one
        </p>
        <button
            className="button button__main"
            onClick={changeChar}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
      </div>
    </div>
  )
}

const View = ({randomChar}) => {
  console.log(randomChar);
  const { name, description, thumbnail, homepage, wiki, image, origin} = randomChar;
  let imgStyle = {'objectFit' : 'cover'};

  return (
    <div className="randomchar__block">
      <img
        src={image}
        style={imgStyle}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{origin.name}</p>
      </div>
    </div>
  );
}

export default RandomChar;
