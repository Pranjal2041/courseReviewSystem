import React, {useContext, useEffect, useReducer, useState} from 'react';
import './App.css';
import getAllCourses from "./serverConnection/getData";
import TextField from "@material-ui/core/TextField/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import getAllProfsList from "./serverConnection/getAllProfsList";
import auth0Client from "./Auth"
import checkIfUserNameExists from "./serverConnection/checkIfUserNameExists";
import addUser from "./serverConnection/addUser";
import AppContext from "./utils/context";
import testVar from "./utils/testVar";
import Store, {Context} from "./store";
import Reducer from "./reducer";







function App() {


     // const [selection,changeSelection] = useState("Courses");
     const [courses,setCourses]= useState([""]);
     const [courseSelected,changeCourseSelected] = useState("");
     const [profs,setProfs]= useState([""]);
     const [profSelected,changeProfSelected] = useState("");
    const [state,dispatch]=useReducer(Reducer);





    // function changeSelec() {
    //     if(selection==='Courses')
    //         changeSelection("Professor");
    //     else
    //         changeSelection("Courses")
    // }


    const signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
    };

    const signIn = () => {
        if (!auth0Client.isAuthenticated()) {
        auth0Client.signIn();
    }
    };




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

    function printThisShit() {
        console.log("So here I print the info u wished t o see");
        console.log(auth0Client.getProfile())
    }

    useEffect(() => {
            getCourses();
            getProfList();
            if(auth0Client.isAuthenticated())
            {
                const callback = result => {
                    console.log("I am checking if user ever existed in my database");
                    if(!result[0].exists){
                        addUser({name: auth0Client.getProfile().nickname})
                    }
                        // dispatch({type: "UPDATE", payload: auth0Client.getProfile().nickname})
                };
                checkIfUserNameExists(callback,auth0Client.getProfile().nickname)
            }

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
        <Store>
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

            {
                auth0Client.isAuthenticated() ?
                <div>
                    <h4>{auth0Client.getProfile().nickname}</h4>
                    <h4>{auth0Client.getProfile().name}</h4>
                    <br />

                    <button onClick={printThisShit}> Hi </button>

                    <button onClick={signOut}>Sign Out</button>
                </div>
                    :
                    <div>
                        <button onClick={signIn}>Sign In</button>
                    </div>
            }

            {/*<button>{state}</button>*/}



        </div>
        </Store>

    )

}

export default App;
