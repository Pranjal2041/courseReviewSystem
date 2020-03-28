import axios from "axios";

const addReview = (data,type) => {
    // const data= {name: course_name }
    let url;
    if(type===0)
        url='/api/post/coursePost';
    else
        url='/api/post/profPost';
    axios.post(url,data )
        .then(res => console.log(res.data))
};

export default addReview
