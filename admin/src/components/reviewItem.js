import React from "react";


function ReviewItem(props) {
    try{
    return(
    <div>
        <h3>{"Course Name:- "+props.course_name}</h3>
        <p> {props.author + " \t "}</p>
        <p> {"Rating:- "+props.rating+"\t"+"Difficulty:-"+props.level[0]+"\t"+"Speed:-"+props.level[1]+"\t"+"value:- "+props.level[2]}</p>
        <p>{"Professor who taught"+props.prof+"\t"+"Prof Rating:-"+props.level[3]}</p>
        <h6> Review</h6>
        <p> {props.review} </p>
        <p> {"Likes:- "+props.likes}</p>
        <br/>
        <br/>



    </div>

)}catch (e) {

    }
    return null
}

export default ReviewItem
