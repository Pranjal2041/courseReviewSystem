import axios from "axios";

const addLikeToList = (data,type) => {
    // const data= {name: course_name }
    let url;
    if(type===0)
        url='/api/put/courseRevLikeToList';
    else
        url='/api/put/profRevLikeToList';
    axios.put(url,data)
        .then(res => console.log(res.data))

};

export default addLikeToList
