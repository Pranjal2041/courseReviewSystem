import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import f from './posts/trialFile'
import getAllCourses from "./serverConnection/getData";
import getReviewsOfCourse from './serverConnection/getCourseReview'
import Link from '@material-ui/core/Link';



function App() {

     // const [selection,changeSelection] = useState("Courses");
     const [list,setList] = useState("");


    // function changeSelec() {
    //     if(selection==='Courses')
    //         changeSelection("Professor");
    //     else
    //         changeSelection("Courses")
    // }



    function getCourses() {
        const callback = result => {
            console.log("I am going to print the courses");
            console.log(result);
            const temp=result.map((jsObj => jsObj.name));
            setList(temp.map((txt) =>
                <Link href={'/courses/'+txt}>{txt+'\n'}</Link>
             ))
        };

        getAllCourses(callback)


    }

    useEffect(() => {

    }, []);

    // function getPosts() {
    //     const callback = result => {
    //         let temp="";
    //         for(let i=0;i<result.length;i++)
    //             temp+="\n"+result[i].name;
    //         setList(temp);
    //     };
    //
    //     f(callback)
    //
    // }


    return(
        <div>

            <button onClick={getCourses}>
                Courses
            </button>

            <button >
                Professor
            </button>
            <h4 style={{marginTop: "10px"}}> Courses </h4>
            <p>
                {list}
            </p>
            <li>{list}</li>
        </div>

    )

}

export default App;
