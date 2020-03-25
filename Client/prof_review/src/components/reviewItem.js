import React from "react";

function ReviewItem(props) {
    return(
    <div>
        <p> {props.author + " \t "}</p>
        <p> {"Rating:- "+props.rating}</p>
        <h6> Review</h6>
        <p> {props.review} </p>
        <button>UpVote</button>
        <button>DownVote</button>
        <br/>
        <br/>



    </div>

)
}

export default ReviewItem
