import {useState, useEffect} from "react";

export default function MovieForm(props) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [actors, setActors] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (props.movie) {
            setTitle(props.movie.title || '');
            setYear(props.movie.year || '');
            setActors(props.movie.actors || '');
            setDirector(props.movie.director || '');
            setDescription(props.movie.description || '');
        }
    }, [props.movie]);

    function addMovie(event) {
        event.preventDefault();
        if (title.length < 5) {
            return alert('Tytuł jest za krótki');
        }
        props.onMovieSubmit({title, year, actors, director, description});
        setTitle('');
        setYear('');
        setActors('');
        setDirector('');
        setDescription('');
    }

    return <form onSubmit={addMovie}>
        <h2>Add movie</h2>
        <div>
            <label>Tytuł</label>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
        </div>
        <div>
            <label>Year</label>
            <input type="text" value={year} onChange={(event) => setYear(event.target.value)}/>
        </div>
        <div>
            <label>Actors (oddziel przecinkami)</label>
            <input 
                type="text" 
                value={actors} 
                onChange={(event) => setActors(event.target.value)}
                placeholder="np. Tom Hanks, Morgan Freeman"
            />
        </div>
        <div>
            <label>Director</label>
            <input type="text" value={director} onChange={(event) => setDirector(event.target.value)}/>
        </div>
        <div>
            <label>Description</label>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)}/>
        </div>
        <button>{props.buttonLabel || 'Submit'}</button>
        {props.onCancel && <button type="button" onClick={props.onCancel}>Cancel</button>}
    </form>;
}
