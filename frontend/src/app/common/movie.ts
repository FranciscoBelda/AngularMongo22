export interface Movie {
  _id: string;
  title: string;
  year: number;
  director: string;
  plot: string;
  genres: string[];
  poster: string;
  imdb: {
    rating: number;
    votes: number;
  }
  seccion: [{
    nombre: string;
    avatar: string;
  }];
}
