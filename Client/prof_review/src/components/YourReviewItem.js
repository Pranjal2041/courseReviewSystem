import React from "react";

function YourReviewItem(props) {

    function openReviewEditor() {

    }

    return(
        <div>
            <h4> Your Review</h4>
            <p> {props.review} </p>
            <p> {"Rating:- "+props.rating}</p>
            <p> {"Likes:- "+ props.likes}</p>

        </div>

    )
}

export default YourReviewItem
