import { charsFetching, charsFetched, charsFetchingError } from '../components/charList/charListSlice';
import { singleCharFetching, singleCharFetched, singleCharFetchingError } from '../components/charInfo/charInfoSlice';
import { randomCharFetched, randomCharFetching, randomCharFetchingError } from '../components/randomChar/randomCharSlice';

const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
};
const _api = 'https://rickandmortyapi.com/api';

export const fetchAllCharacters = (request, pageNum = 1) => (dispatch) => {
    dispatch(charsFetching());
    request(`${_api}/character?page=${pageNum}`, options)
        .then(data => dispatch(charsFetched(data)))
        .catch(() => dispatch(charsFetchingError()))
}

export const fetchSingleharacters = (request, id) => (dispatch) => {
    dispatch(singleCharFetching());
    request(`${_api}/character/${id}`, options)
        .then(data => {
            // console.log(data);
            dispatch(singleCharFetched(data))
        })
        .catch(() => dispatch(singleCharFetchingError()))
}

export const fetchRandomcharacters = (request, id) => (dispatch) => {
    dispatch(randomCharFetching());
    request(`${_api}/character/${id}`, options)
        .then(data => {
            console.log(data);
            dispatch(randomCharFetched(data))
        })
        .catch(() => dispatch(randomCharFetchingError()))
}