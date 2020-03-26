import React from "react";

function YourReviewItem(props) {

    function openReviewEditor() {

    }

    return(
        <div>
            <h4> Your Review</h4>
            <p> {"Rating:- "+props.rating+"\t"+"Difficulty:-"+props.level[0]+"\t"+"Speed:-"+props.level[1]+"\t"+"value:- "+props.level[2]}</p>
            <p>{"Professor who taught:- "+props.prof+"\t"+"Prof Rating:-"+props.level[3]}</p>
            <p> {props.review} </p>
            <p> {"Likes:- "+ props.likes}</p>

        </div>

    )
}

export default YourReviewItem
