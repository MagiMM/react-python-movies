export default function MovieListItem(props) {
    return (
        <div style={{marginBottom: '20px'}}>
            <div>
                <strong>{props.movie.title}</strong>
                {' '}
                <span>({props.movie.year})</span>
                {props.movie.director && (
                    <>
                        {' - '}
                        <span>reżyser: {props.movie.director}</span>
                    </>
                )}
                {' '}
                <button onClick={props.onEdit} style={{cursor: 'pointer', marginRight: '5px'}}>Edit</button>
                <button onClick={props.onDelete} style={{cursor: 'pointer'}}>Delete</button>
            </div>
            {props.movie.actors && (
                <div style={{fontStyle: 'italic', fontSize: '0.9em'}}>
                    Aktorzy: {props.movie.actors}
                </div>
            )}
            {props.movie.description && (
                <div style={{marginTop: '5px'}}>
                    {props.movie.description}
                </div>
            )}
        </div>
    );
}
