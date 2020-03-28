import axios from "axios";

const addUser = (data) => {
    // const data= {name: course_name }
    let url='/api/post/addUser';
    axios.post(url,data )
        .then(res => console.log(res.data))
};

export default addUser
