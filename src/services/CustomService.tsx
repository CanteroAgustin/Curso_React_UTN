import { CustomAxios } from "./CustomAxios";
//https://rickandmortyapi.com/api/character
export const getCharacter = () => {
  return CustomAxios.get("character/");
};
//https://rickandmortyapi.com/api/character/:id
export const getSpecificCharacter = (id: string) => {
  return CustomAxios.get(`character/${id}`);
};

export const getPage = (page: number) => {
  return CustomAxios.get(`character?page=${page}`);
};