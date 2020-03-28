import React from "react";


function ProfReviewItem(props) {
    try{
    return(
    <div>
        <h3>{"Prof Name:- "+props.prof_name}</h3>
        <p> {props.author + " \t "}</p>
        <p> {"Rating:- "+props.rating+"\t"+"Difficulty:-"+props.level[0]+"\t"+"Speed:-"+props.level[1]+"\t"+"value:- "+props.level[2]}</p>
        <p>{"Course taught"+props.prof+"\t"+"Course Rating:-"+props.level[3]}</p>
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

export default ProfReviewItem
