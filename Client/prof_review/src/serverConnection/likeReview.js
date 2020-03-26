import axios from "axios";

const likeReview = (data,type) => {
    // const data= {name: course_name }
    let url;
    if(type===0)
        url='/api/put/courseRevLike';
    else
        url='/api/put/profRevLike';
    axios.put(url,data)
        .then(res => console.log(res.data))

};

export default likeReview
