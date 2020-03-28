import axios from "axios";

const getUserId = (callback,name) => {
    axios.get('/api/get/UserID',{params: {name: name}})
        .then(res => res.data)
        .then(res => callback(res))
};


export default getUserId
