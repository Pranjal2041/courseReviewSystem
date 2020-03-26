import React, {useEffect, useState} from 'react';
import './App.css';
import getAllCourses from "./serverConnection/getData";
import TextField from "@material-ui/core/TextField/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import getAllProfsList from "./serverConnection/getAllProfsList";




function App() {

     // const [selection,changeSelection] = useState("Courses");
     const [courses,setCourses]= useState([""]);
     const [courseSelected,changeCourseSelected] = useState("");
     const [profs,setProfs]= useState([""]);
     const [profSelected,changeProfSelected] = useState("");

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
            setCourses(temp);
        };

        getAllCourses(callback)


    }

    function getProfList() {
        const callback = result => {
            console.log("I am going to print the professors");
            console.log(result);
            const temp=result.map((jsObj => jsObj.name));
            setProfs(temp);
        };

        getAllProfsList(callback)


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
            getCourses();
            getProfList()
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
                renderInput={params => <TextField {...params} label="Courses" variant="outlined" />}
            />
            {
                courses.includes(courseSelected)?
                <a href={"/courses/"+courseSelected}>Submit</a>
                    :null
            }

            <br/>
            <br/>
            <br/>

            <Autocomplete
                id="combo-box-demo"
                options={profs.sort()}
                groupBy={option => option[0].toUpperCase()}
                onChange={(event, value) => changeProfSelected(value)}
                getOptionLabel={option => option}
                style={{ width: 300 }}
                renderInput={params => <TextField {...params} label="Professors" variant="outlined" />}
            />
            {
                profs.includes(profSelected)?
                    <a href={"/professors/"+profSelected}>Submit</a>
                    :null
            }

        </div>

    )

}

export default App;
