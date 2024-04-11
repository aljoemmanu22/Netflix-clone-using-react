import React, { useEffect, useState } from 'react';
import './RowPost.css';
import { imageUrl, API_KEY } from '../../constants/constants';
import axios from '../../axios';
import Youtube from 'react-youtube';

function RowPost(props) {
    const [movies, setMovies] = useState([]);
    const [urlId, setUrlId] = useState('');

    useEffect(() => {
        axios.get(props.url)
            .then(response => {
                console.log(response.data);
                setMovies(response.data.results);
            })
            .catch(err => {
                console.error('Network Error:', err);
            });
    }, [props.url]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    const handleMovie = (id) => {
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
            .then(response => {
                const videos = response.data.results;
                const trailer = videos.find(video => video.type === 'Trailer');
                if (trailer) {
                    setUrlId(trailer.key);
                } else {
                    console.log('No trailer found for this movie.');
                }
            })
            .catch(error => {
                console.error('Error fetching trailer:', error);
            });
    };

    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {movies.map((obj) =>
                    <img
                        key={obj.id}
                        onClick={() => handleMovie(obj.id)}
                        className={props.isSmall ? 'smallPoster' : 'poster'}
                        src={`${imageUrl + obj.backdrop_path}`}
                        alt="poster"
                    />
                )}
            </div>
            {urlId && <Youtube opts={opts} videoId={urlId} />}
        </div>
    );
}

export default RowPost;
