import axios from "axios";

const getAllCourses = callback => {
    axios.get('/api/get/courseList')
        .then(res => res.data)
        .then(res => callback(res))
};


export default getAllCourses
