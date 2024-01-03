import Rating from  '@mui/material/Rating/index.js';
import { render, useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
function RecipeRating(props) {
    const [avgRating, setAvgRating] = useState(props.avgRating);
    const [permission, setPermission] = useState(props.loggedIn);

    /*useEffect(() => {
        if(props.ratingCount) {
            setPermission(false)
        }
    }, []); //if I want to disable rate editing*/

    return (
        <Rating
            value={avgRating}
            precicion={0.5}
            onChange={async (event, rating) => {
                if(!permission) {
                    return alert('You may need to log in.');
                }

                //setPermission(false);

                const response = await apiFetch({
                    path: 'up/v1/rate',
                    method: 'POST',
                    data: {
                        postID: props.postID,
                        rating
                    }
                })

                if(response.status == 2) {
                    setAvgRating(response.rating);
                }
            }}
        />
    )
}

document.addEventListener('DOMContentLoaded', () => {
    const block = document.querySelector('#recipe-rating');
    const postID = parseInt(block.dataset.postId);
    const avgRating = parseFloat(block.dataset.avgRating);
    const loggedIn = !!block.dataset.loggedIn;
    const ratingCount = !!parseInt(block.dataset.ratingCount)

    render(<RecipeRating
        postID={postID}
        avgRating={avgRating}
        loggedIn={loggedIn}
        ratingCount={ratingCount}
    />, block)
});