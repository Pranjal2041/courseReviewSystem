import React from "react";

function YourProfReviewItem(props) {

    function openReviewEditor() {

    }
    try{
    return(
        <div>
            <h4> Your Review</h4>
            <p> {"Rating:- "+props.rating+"\t"+"Difficulty:-"+props.level[0]+"\t"+"Speed:-"+props.level[1]+"\t"+"value:- "+props.level[2]}</p>
            <p>{"Course taught:- "+props.prof+"\t"+"Course Rating:-"+props.level[3]}</p>
            <p> {props.review} </p>
            <p> {"Likes:- "+ props.likes}</p>

        </div>

    )}catch (e) {
    }

}

export default YourProfReviewItem
