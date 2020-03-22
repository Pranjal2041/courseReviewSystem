import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';



function App() {

    useEffect(() => {
        axios.get('/api/hello')
            .then(res => setState(res.data))
    }, []);

    const [state, setState] = useState('');

    return(
        <div>
        {state}
        </div>

    )

}

export default App;
