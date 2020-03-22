import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import f from './posts/trialFile'



function App() {

    const [list,setList] = useState("");
    var temp;
    useEffect(() => {
        axios.get('/api/get/profList')
            .then(res => temp=res.data)

    }, []);

    function printer() {
        console.log(temp)
    }
    /*function getPosts() {
        axios.get('/api/get/profList')
            .then(res => res.data.length !== 0
                ? setList(res.data)
                : null )
            .catch((err) => console.log(err))

    }*/


    return(
        <div>
            <p>
                {list}
            </p>
                <button onClick={printer}>
                    Click me
                </button>
        </div>

    )

}

export default App;
