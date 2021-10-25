export interface CharacterList {
  info?: {
    count: number,
    pages: number,
    next: string,
    prev: string
  },
  results: Character[],
  page?: number
}

export interface Character {
  id: number;
  page?: number;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  origin?: {
    name: string,
    url: string
  };
  location?: {
    name: string,
    url: string
  };
  image?: string;
  episode?: string[];
  url?: string;
  created?: string;
  like?: boolean;
}