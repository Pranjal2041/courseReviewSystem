import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import f from './posts/trialFile'
import getAllCourses from "./serverConnection/getData";
import getReviewsOfCourse from './serverConnection/getCourseReview'
import Link from '@material-ui/core/Link';
import TextField from "@material-ui/core/TextField/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";




function App() {

     // const [selection,changeSelection] = useState("Courses");
     const [list,setList] = useState("");
     const [courses,setCourses]= useState([""]);
     const [courseSelected,changeCourseSelected] = useState("");


    // function changeSelec() {
    //     if(selection==='Courses')
    //         changeSelection("Professor");
    //     else
    //         changeSelection("Courses")
    // }



    let courseNames;

    function getCourses() {
        const callback = result => {
            console.log("I am going to print the courses");
            console.log(result);
            const temp=result.map((jsObj => jsObj.name));
            setCourses(temp);
            setList(temp.map((txt) =>
                <Link href={'/courses/'+txt}>{txt+"\n"}</Link>
             ))
        };

        getAllCourses(callback)


    }
    //
    // function handleSubmit(){
    //     if (!courses.contains(courseSelected)){
    //         alert("Select a valid course")
    //     }
    //     else {
    //
    //     }
    // }

    useEffect(() => {
            getCourses()
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

            <Autocomplete
                id="combo-box-demo"
                options={courses.sort()}
                groupBy={option => option[0].toUpperCase()}
                onChange={(event, value) => changeCourseSelected(value)}
                getOptionLabel={option => option}
                style={{ width: 300 }}
                renderInput={params => <TextField {...params} label="Combo box" variant="outlined" />}
            />
            {
                courses.includes(courseSelected)?
                <a href={"/courses/"+courseSelected}>Submit</a>
                    :null
            }
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
