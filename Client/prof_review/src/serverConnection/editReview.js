import axios from "axios";

const editReview = (data) => {
    // const data= {name: course_name }
    axios.put('/api/put/courseRevEdit',data )
        .then(res => console.log(res.data))
};

export default editReview
