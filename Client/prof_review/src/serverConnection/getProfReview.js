import axios from "axios";

const getReviewsOfProf = (callback,course_name) => {
    // const data= {name: course_name }
    axios.get('/api/get/profReview', {params: {name: course_name}})
        .then(res => callback(res.data))
};

export default getReviewsOfProf
