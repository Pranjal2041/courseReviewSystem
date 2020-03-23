import React from "react";

function reviewItem(props) {
    return(
    <div>
        <button>Wow</button>
        <p> {props.author + " \t "}</p>
        <br/>
        <p> {"Rating:- "+props.rating}</p>
        <h6> Review</h6>
        <p> {props.review} </p>


    </div>

)
}

export default reviewItem
