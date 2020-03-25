import axios from "axios";

const addLikeToList = (data) => {
    // const data= {name: course_name }
    axios.put('/api/put/courseRevLikeToList',data)
        .then(res => console.log(res.data))

};

export default addLikeToList
