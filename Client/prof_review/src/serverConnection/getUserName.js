import axios from "axios";

const getUserName = (callback,id) => {
    // const data= {name: course_name }
    axios.get('/api/get/userName', {params: {id: id}})
        .then(res => callback(res.data))
};

export default getUserName()
