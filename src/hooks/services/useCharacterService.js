import { useHttp } from '../useHttp';
import { useCallback } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'


const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
};
const _api = 'https://rickandmortyapi.com/api';

const useCharacterService = () => {
  const { request, clearError, loading, error } = useHttp();


  const getAllCharacters = useCallback(async () => {
    const res = await request(`${_api}/character?page=2`, options);
    console.log(res);
    return res
  }, [request])

  const getCharacter = async (id) => {
    console.log('id', id);
    const res = await request(`${_api}/character/${id}`, options);
    console.log(res);
    return res
  }

  const getMovieQuery = async (text = 'all') => {
    console.log('term', text);
    const res = await request(`${_api}/search/movie?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU&page=1&include_adult=false&query=${text}`, options);
    return res
  }

  return { getAllCharacters, getCharacter, getMovieQuery, clearError, loading, error };
}

export default useCharacterService;
