import './App.css';
import {useState, useEffect} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";

function App() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`/movies`);
            if (response.ok) {
                const movies = await response.json();
                setMovies(movies);
            }
        };
        fetchMovies();
    }, []);

    async function handleAddMovie(movie) {
        const response = await fetch('/movies', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const addedMovie = await response.json();
            setMovies([...movies, addedMovie]);
            setAddingMovie(false);
        }
    }


    async function handleDeleteMovie(movie) {
    const response = await fetch(`/movies/${movie.id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const nextMovies = movies.filter(m => m !== movie);
        setMovies(nextMovies);
    }
}

    async function handleUpdateMovie(updatedMovie) {
        const response = await fetch(`/movies/${editingMovie.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedMovie),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const nextMovies = movies.map(m => 
                m.id === editingMovie.id ? {...editingMovie, ...updatedMovie} : m
            );
            setMovies(nextMovies);
            setEditingMovie(null);
        }
    }

    return (
        <div className="container">
            <h1>My favourite movies to watch</h1>
            {movies.length === 0
                ? <p>No movies yet. Maybe add something?</p>
                : <MoviesList movies={movies}
                              onDeleteMovie={handleDeleteMovie}
                              onEditMovie={(movie) => setEditingMovie(movie)}
                />}
            {editingMovie && (
                <div>
                    <MovieForm 
                        movie={editingMovie}
                        onMovieSubmit={handleUpdateMovie}
                        buttonLabel="Update movie"
                        onCancel={() => setEditingMovie(null)}
                    />
                </div>
            )}
            {addingMovie
                ? <MovieForm 
                    onMovieSubmit={handleAddMovie}
                    buttonLabel="Add a movie"
                    onCancel={() => setAddingMovie(false)}
                />
                : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}
        </div>
    );
}

export default App;
