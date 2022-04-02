import {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import useCharacterService from "../../hooks/services/useCharacterService";
import { useQuery } from 'react-query';
import './charInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useCharacterService();

  useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    };

    const onCharLoaded = (char) => {
        // console.log(char);
        setChar(char);
    };
    const skeleton = char || loading || error ? null : <Skeleton />;
    console.log(skeleton);
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? (
            <Info char={char} />
        ) : null;
        return (
            <div className="char__info">
                {errorMessage || spinner || content || skeleton}
            </div>
        );
}

const Info = (char) => {
    const { image, origin, location, status, episode, name } = char.char;

    return (
    <>
            <div className="char__basics">
                <img src={image} alt="abyss" />
                <div>

                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={location.url} className="button button__main">
                            <div className="inner">{location.name}</div>
                        </a>
                        <a href={origin.url} className="button button__secondary">
                            <div className="inner">{origin.name}</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">dfgvdfg</div>
            <div className="char__comics">Episode:</div>
            <ul className="char__comics-list">
                {/* {episode.lenght > 0 ? null : 'There is no episodes'}
                {episode.map((item, i) => {
                    return (
                        <li key={i} className="char__comics-item">
                            <NavLink to={item}>
                            {item}
                            </NavLink>
                        </li>
                    );
                })} */}
            </ul>

    </>
    );
}

export default CharInfo;