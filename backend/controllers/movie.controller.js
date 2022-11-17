const Movie = require('../models/movie.model');

const movieCtrl = {
};

// Función que devuelve todas las películas
movieCtrl.getMovies = async (req, res) => {
    const movies = await Movie.find()
        .then((data) => res.json(data))
        .catch((err) => console.error(err));
};

// Función que devuelve una película dada un id
movieCtrl.getMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id)
        .then((data) =>
        {
            if(data!=null) res.json(data)
            else res.json({status: 'Movie doesnt exist'})
        })        .catch(err => console.log(err));
}

// Añadir una nueva película a nuestra base de datos
movieCtrl.addMovie = async (req,res) => {
    const myMovie = new Movie(req.body);
    await myMovie.save()
        .then(() =>
            res.json({status: 'Movie Successfully Inserted '}))
        .catch(err => res.send(err.message));
}

// Función para actualizar una película con el id y la película
movieCtrl.updateMovie = async (req, res) => {
    const movie = req.body;
    await Movie.findByIdAndUpdate(
        req.params.id,
        {$set: movie},
        {new: true})
        .then((data) =>
        {
            if(data!=null) res.json({status: 'Movie Successfully Updated',data})
            else res.json({status: 'Movie doesnt exist'})
        })
        .catch(err => res.send(err.message));
}

// Función para borrar una película dada un id
movieCtrl.deleteMovie = async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id)
        .then((data) =>
        {
            if(data!=null) res.json({status: 'Movie Successfully Deleted'})
            else res.json({status: 'Movie doesnt exist'})
        })
        .catch(err => res.send(err.message));
}

// Función para obtener los diferentes géneros de la DB
movieCtrl.getGenres = async (req,res) => {
    await Movie.find().distinct('genres')
        .then((data) => res.json(data))
        .catch((err) => console.error(err));
}

// Función para obtener las pelis de un género de la DB
movieCtrl.getMoviesSeccion = async (req,res) => {
    await Movie.find({'seccion.nombre': req.params.seccion})
        .then((data) => res.json(data))
        .catch((err) => console.error(err));
}

module.exports = movieCtrl;
