import axios from "axios";

const getReviewsOfCourse = (callback,course_name) => {
    // const data= {name: course_name }
    axios.get('/api/get/courseReview', {params: {name: course_name}})
        .then(res => callback(res.data))
};

export default getReviewsOfCourse
