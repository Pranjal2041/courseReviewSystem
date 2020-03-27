import axios from "axios";

const checkIfUserNameExists = (callback,name) => {
    axios.get('/api/get/checkUserName',{params: {name: name}})
        .then(res => res.data)
        .then(res => callback(res))
};


export default checkIfUserNameExists
