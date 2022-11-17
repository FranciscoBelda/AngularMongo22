import { Injectable } from '@angular/core';
import {Movie} from "../common/movie";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseURL = 'http://localhost:3000/api/movies';
// Inyectamos el Cliente Http que nos
// permitirá reealizar peticiones Http a la API REST
  constructor(private http: HttpClient) { }
// Creamos la función que nos devolverá
// el array de Películas
  getMovieList(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseURL);
  }

  // Función para actualizar una película
  updateMovie(id: string, movie: Movie): Observable<any> {
    return this.http.put(this.baseURL+'/'+id,movie);
  }

  // Función para cargar los géneros de la base de datos
  getGenres(): Observable<string[]> {
    return this.http.get<string[]>(this.baseURL+'/genres');
  }

  // Función para añadir una nueva película
  newMovie(movie: Movie): Observable<any> {
    return this.http.post(this.baseURL,movie);
  }

  removeMovie(id: string): Observable<any> {
    return this.http.delete(this.baseURL+'/'+id);
  }
}
