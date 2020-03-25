import axios from "axios";

const addReview = (data) => {
    // const data= {name: course_name }
    axios.post('/api/post/coursePost',data )
        .then(res => console.log(res.data))
};

export default addReview
