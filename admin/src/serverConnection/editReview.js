import axios from "axios";

const editReview = (data,type) => {
    // const data= {name: course_name }
    let url;
    if(type===0)
        url='/api/put/courseRevEdit';
    else
        url='/api/put/profRevEdit';
    axios.put(url,data )
        .then(res => console.log(res.data))
};

export default editReview
