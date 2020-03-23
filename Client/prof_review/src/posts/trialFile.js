import axios from 'axios';
const f = callback => {
    axios.get('/api/get/profList')
        .then(res => callback(res.data))
};
export default f;
