import axios from "axios";

const likeReview = (data) => {
    // const data= {name: course_name }
    axios.put('/api/put/courseRevLike',data)
        .then(res => console.log(res.data))

};

export default likeReview
