import {Component, OnInit} from '@angular/core';
import {Movie} from "../../common/movie";
import {MovieService} from "../../services/movie.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  formMovie: FormGroup = this.formBuilder.group({
    _id: [''],
    __v: [0],
    title: [''],
    year: [2022],
    director: [''],
    plot: [''],
    genres: [],
    poster: [''],
    imdb: this.formBuilder.group({
      rating: [0],
      votes: [0]
    })
  });
  // Creamos el input para añadir un nuevo género
  mynewGenre = new FormGroup({
    newGenre: new FormControl('')
  });
  // Creamos el array que guardara todos los géneros
  // que tenemos en la base de datos
  genres: string[] = [];
  // Creamos la variable editar para diferenciar
  // Editar de nueva película
  editar = false;
  // creamos el array donde guardaremos las películas
  // que traigamos de la API REST
  movies: Movie[] = [];

// inyectamos el servicio para poder utilizarlo
  // y el formBuilder para construir el formulario
  constructor(private movieService: MovieService,
              private formBuilder: FormBuilder) {
  }

// en el ngOnInit es donde se ponen las
// funciones que queremos ejecutar cuando se
// inicie este componente
// en nuestro caso queremos que se lean las películas
  ngOnInit(): void {
    this.listMovies();
  }

// Y definimos la función que carga los restaurantes
// que la hemos llamado desde el ngOnInit
  listMovies(): void {

// llamamos a la función del servicio que tiene
// las películas y nos subscribimos a ella
// Así nos mantiene la información actualizada
    this.movieService.getMovieList().subscribe(
// recogemos la respuesta de la subscripción
// en una variable llamada data
      (data: any) => {
// guardamos la respuesta en nuestro array de Movie
        this.movies = data;
      }
    );

    // Añadimos la función que nos devuelve los géneros
    this.movieService.getGenres().subscribe(
      data => {
        this.genres = data;
      }
    )
  }

  // Función para cuando guarden el formulario
  // que diferencia si están actualizando o añadiendo
  onSubmit() {
    // si estamos actualizando, llamamos a actualizar
    if (this.editar){
      const id = this.formMovie.getRawValue()._id;
      this.movieService.updateMovie(id, this.formMovie.getRawValue()).subscribe(
        data => {
          this.listMovies();
        }
      );
    }
    // si no, es que vamos a añadir una película nueva
    else{
      this.movieService.newMovie(this.formMovie.getRawValue()).subscribe(
        data => {
          console.log(data);
          this.listMovies();
        }
      )
    }

  }

  // Función para cargar la película que vamos a actualizar
  // Ponemos el boolean Editar a true
  loadMovie(movie: Movie) {
    this.formMovie.setValue(movie);
    this.editar = true;
  }

  // Función para borrar el formulario para añadir una
  // película nueva. Editar a falso
  newMovie() {
    this.formMovie.reset();
    this.editar = false;
  }

  // Función para añadir un nuevo género a la lista
  // Diferenciamos la lista de nueva película
  // De la de actualizar
  addNewGenre(newGenre: string) {
    let newGenres;
    // si es nueva película añadimos el género a nuestra
    // lista de géneros de la base de datos
    if(!this.editar)this.genres.push(newGenre)
      // si no entonces tenemos que añadir el género
      // a los géneros de la pelicula que estamos actualizando
    else {
      // Guardo el array de géneros
      newGenres = this.formMovie.getRawValue().genres;
      // Añado el nuevo género al array
      newGenres.push(newGenre);
      // Actualizo el array de géneros en el formulario
      this.formMovie.setControl(
        'genres',
        new FormControl(newGenres)
      );
    }
    // para terminar borramos el campo del nuevo género
    this.mynewGenre.reset();
  }

  // Función que borra una película
  removeMovie(movie: Movie) {
    if(confirm('Desea borrar '+movie.title+'?')) {
      this.movieService.removeMovie(movie._id).subscribe(
        data => {
          console.log(data);
          this.listMovies();
        }
      );
    }
  }
}
