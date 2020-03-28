import axios from "axios";

const addRepOfAuthor = (data,type) => {
    // const data= {name: course_name }
    let url='/api/put/addRep';
    axios.put(url,data)
        .then(res => console.log(res.data))

};

export default addRepOfAuthor
