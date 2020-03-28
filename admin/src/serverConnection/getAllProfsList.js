import axios from "axios";

const getAllProfsList = callback => {
    axios.get('/api/get/profList')
        .then(res => res.data)
        .then(res => callback(res))
};

export default getAllProfsList
