import React, {useEffect, useState} from "react";
import './App.css';
import getReviewsOfCourse from './serverConnection/getCourseReview'
import reviewItem from "./components/reviewItem";

function CourseReviewsPage(props) {


    const [state,changeState] = useState({uid: 0,rating: -1,review: ""});

    function openCourse(txt) {
        const callback = result => {
            console.log(result[0]);
             changeState(result[0]);
        };

        console.log("I am trying to get reviews of particular course");

        getReviewsOfCourse(callback, txt);

    }
    const {title} = props.match.params;

    useEffect(() => {
        openCourse(title)
    }, []);


            return (
                <div>
                    <h1> {"Showing all reviews of course " + title +state.rating} </h1>
                    <reviewItem author={state.uid} rating={state.rating} review={state.review}/>

                    <button>Like</button>
                    <p> {state.uid + " \t "}</p>
                    <br/>
                    <p> {"Rating:- "+state.rating}</p>
                    <h6> Review</h6>
                    <p> {state.review} </p>


                </div>

            )



}



export default CourseReviewsPage;
