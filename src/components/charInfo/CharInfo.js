import {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/useHttp';
import { fetchSingleharacters } from '../../actions';
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import useCharacterService from "../../hooks/services/useCharacterService";
import { useQuery } from 'react-query';
import './charInfo.scss';

const CharInfo = (props) => {
    // const [char, setChar] = useState(null);

    // const { loading, error, getCharacter, clearError } = useCharacterService();

    const { singleChar, singleCharId, charLoadingStatus } = useSelector(state => state.singleChar);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        if (!singleCharId) return;
            dispatch(fetchSingleharacters(request, singleCharId));
        }, [singleCharId])

    if (charLoadingStatus == 'error') {
        return <ErrorMessage />;
    } else if (charLoadingStatus == 'loading') {
        return <Spinner />;
    }
    // const updateChar = () => {
    //     if (!singleCharId) {
    //         return;
    //     }
    //     clearError();
    //     getCharacter(singleCharId)
    //         .then(onCharLoaded)
    // };

    // const onCharLoaded = (char) => {
    //     // console.log(char);
    //     setChar(char);
    // };
    const skeleton = !singleCharId ? <Skeleton />: null ;
    console.log(singleCharId);

    console.log(singleChar);
        const content = singleCharId && singleChar != null?
            <Info singleChar={singleChar} />
            : null;
        return (
            <div className="char__info">
                { content || skeleton }
            </div>
        );
}

const Info = (singleChar) => {
    console.log(singleChar.singleChar);
    const { image, origin, location, status, episode, name } = singleChar.singleChar;

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
            {episode.lenght > 0 ? null : 'There is no episodes'}
            {episode.map((item, i) => {
                return (
                    <li key={i} className="char__comics-item">
                        <NavLink to={item}>
                        {item}
                        </NavLink>
                    </li>
                );
            })}
        </ul>

    </>
    );
}

export default CharInfo;