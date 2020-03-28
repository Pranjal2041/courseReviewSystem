import React, {useEffect, useState} from "react";
import './App.css';
import getReviewsOfCourse from './serverConnection/getCourseReview'


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import ReviewItem from "./components/reviewItem";
import YourReviewItem from "./components/YourReviewItem";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import addReview from "./serverConnection/addReview";
import editReview from "./serverConnection/editReview";
import likeReview from "./serverConnection/likeReview";
import addLikeToList from "./serverConnection/addLikeToList";
import Rating from "@material-ui/lab/Rating/Rating";
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import getAllProfsList from "./serverConnection/getAllProfsList";
import getAllCourses from "./serverConnection/getData";
import getReviewsOfProf from "./serverConnection/getProfReview";
import ProfReviewItem from "./components/profReviewItem";
import axios from "axios";
import YourProfReviewItem from "./components/YourProfReviewItem";


function ProfReviewsPage(props) {


    const [state,changeState] = useState(null);
    const [dialogOpen,setDialogOpen] =useState(false);
    const [values,setValues] = useState({review: "",rating: 0,likes: 0});
    const [rid,setRid]=useState(-1);
    const [reviewPresent,changeReviewPresent] =useState(false);
    const [difficultyRating,setDifficultyRating] =useState(3);
    const [profSpeed,setProfSpeed] =useState(3);
    const [profValue,setProfValue] =useState(3);
    const [courseRating,setCourseRating] =useState(3);
    const [courseList,setCourseList] = useState([""]);
    const [courseSelected,setCourseSelected] = useState([""]);
    const [bannedTime,setBannedTime] =useState(true);

    const [overallReview,setOverAllReview] =useState(0);
    const [overallLevel,setOverallLevel] = useState([0,0,0,0]);


    const [my_uid,setMy_uid]= useState(-1);
    const [my_username,setMyUserName] =useState("");
    const [isAuth,setIsAuth] =useState(false);



    function getCourses() {
        const callback = result => {
            console.log("I am going to print the courses");
            console.log(result);
            const temp=result.map((jsObj => jsObj.name));
            setCourseList(temp);
        };

        getAllCourses(callback)


    }

    function openProf(txt) {
        const callback = result => {

            console.log("Now shall I print all reviews of Professors");
            console.log(result[0]);
            changeState(result);
            if(result!=null) {
                let totalRat=0;
                let n=0;
                let totalLev=[0,0,0,0];
                let nLev=[0,0,0,0];
                result.map(message => {
                    totalRat+=message.rating;
                    n++;
                    for (let i=0;i<4;i++) {
                        if (message.level[i] !== 0 && message.level[i]!==undefined)
                        {   totalLev[i] += message.level[i];
                            nLev[i] = nLev[i] + 1;}
                    }
                    if (message.uid === my_uid) {

                        setValues({review: message.review, rating: message.rating,likes:message.likes});
                        setDifficultyRating(message.level[0]);
                        setProfSpeed(message.level[1]);
                        setProfValue(message.level[2]);
                        setCourseRating(message.level[3]);

                        changeReviewPresent(true);
                        setRid(message.rid)
                    }
                });
                if(n!==0)
                    setOverAllReview(totalRat/n);
                for(let i=0;i<4;i++){
                    if(nLev[i]!==0)
                        totalLev[i]=totalLev[i]/nLev[i]
                }

                setOverallLevel(totalLev);
            }

        };
        console.log("I am trying to get reviews of particular prof");

        getReviewsOfProf(callback,txt);

    }

    function checkIfReviewExists(){
        if(state===null)
            return false;
        let flag=false;
        for(let i=0;i<state.length;i++){
            if(state[i].uid===my_uid) {
                flag = true;
                break;
            }
        }
        return flag
    }


    const {title} = props.match.params;


    function getMyBannedTime(uid){
        const callback = result =>{
            console.log("Watch this");

            setBannedTime(JSON.stringify(result[0]).indexOf("false") === -1);

            console.log(result);
        };

        const getTime = (callback) => {
            axios.get('/api/get/userTime',{params: {uid: uid}})
                .then(res => callback(res.data))
        };

        getTime(callback);

    }

    useEffect(() => {

        setMy_uid(parseInt(localStorage.getItem("user_id")));
        setMyUserName(localStorage.getItem("user_name"));
        setIsAuth(localStorage.getItem("isAuth")==='true');

        openProf(title);
        getCourses();
        getMyBannedTime(my_uid)
    }, []);

    const handleClickOpen = () => {
        if(!bannedTime)
        {
            alert("You have been banned by the administrator");
            return;
        }
        if(!isAuth){
            alert("Please login to continue");
            return;
        }
        setDialogOpen(true);
    };


    const handleInputChange = e => {
        const {id, value} = e.target;
        setValues({...values, [id]: value})
    };

    function likeRev(msg) {
        if(!bannedTime)
        {
            alert("You have been banned by the administrator");
            return;
        }
        if(!isAuth){
            alert("Please login to continue");
            return;
        }
        const data={rid: msg.rid};
        const data2={rid:msg.rid,
        uid: my_uid};
        if(checkIfLikePoss(msg)){
            likeReview(data,1);
            addLikeToList(data2,1);
            openProf(title)
        }
        else
            alert("Already liked")


    }

    function checkIfLikePoss(msg) {
        const temp= msg.like_user_ids;
        let flag=true;
        for (let i=0; i< temp.length;i++){
            if(temp[i]===my_uid)
            {   flag=false;
                break
        }}
        return flag;
    }

    const handleSubmit = (event) => {
        console.log("So we are adding review");

        let anonymous=false;
        if(event===1)
            anonymous=true;

        console.log(values);
        const arr=[difficultyRating,profSpeed,profValue,courseRating];
        const temp="{"+arr.toString()+"}";
        console.log(arr);
        if(reviewPresent){
            const data={
                rid: rid,
                review: values.review,
                rating: values.rating,
                level: temp,
                course: courseSelected,
                anony: anonymous
            };
            editReview(data,1);
            // openCourse(title);
            handleClose();

        }else{
        const data={
            pid: 1,
            uid: my_uid,
            review: values.review,
            rating: values.rating,
            likes: 0,
            level: temp,
            name: title,
            user_name: my_username,
            courseRating: courseRating,
            course: courseSelected,
            anony: anonymous
        };
        addReview(data,1);
        openProf(title);
        handleClose()}
    };

        const handleClose = () => {
        setDialogOpen(false);
    };

            return (
                <div>
                    <h1> {"Showing all reviews of professor " + title} </h1>



                    <h4>{"Overall Rating:- "+overallReview}</h4>
                    <h3>{"Difficulty:- "+overallLevel[0]}</h3>
                    <h3>{"Speed:- "+overallLevel[1]}</h3>
                    <h3>{"Value:- "+overallLevel[2]}</h3>
                    <h3>{"Average Rating of course taken by prof:- "+overallLevel[3]}</h3>




                    <Table>
                        <TableBody>
                            {
                            }{
                                    checkIfReviewExists()
                                    ? state.map( message => (message.uid===my_uid )?
                                     <div> <YourProfReviewItem level={message.level} prof={message.course_names} author={message.uid} review={message.review} rating={message.rating} likes={message.likes}
                                     /> <button onClick={handleClickOpen}> Edit your review </button> <br/><br/></div>
                                     :null
                                    )
                                    : <div><button onClick={handleClickOpen}> Add a review </button> <br/> </div>
                                }

                        </TableBody>
                    </Table>

                    <Table>
                        <TableBody>
                            { state
                                ? state.map( message => (message.uid===my_uid )?
                                     null
                                    :
                                    <div><ProfReviewItem anony={message.anony} level={message.level} prof={message.course_names} author={message.uid} review={message.review} rating={message.rating} likes={message.likes} />
                                        <button onClick={() => likeRev(message)}>Like</button>
                                    </div>
                                )
                                : null
                            }
                        </TableBody>
                    </Table>


                    <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">{"Review of Professor:- "+title }</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Add your review
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="review"
                                    label="review"
                                    type="text"
                                    defaultValue={values.review}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="rating"
                                    label="rating"
                                    type="number"
                                    defaultValue={values.rating}

                                    onChange={handleInputChange}
                                    fullWidth
                                />


                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend">Professor Strictness</Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={difficultyRating}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setDifficultyRating(newValue);
                                        }}
                                    />
                                </Box>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend">Professor Speed</Typography>
                                    <Rating
                                        name="simple-controlled2"
                                        value={profSpeed}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setProfSpeed(newValue);
                                        }}
                                    />
                                </Box>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend">Professor Value</Typography>
                                    <Rating
                                        name="simple-controlled3"
                                        value={profValue}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setProfValue(newValue);
                                        }}
                                    />
                                </Box>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend">Course Rating</Typography>
                                    <Rating
                                        name="simple-controlled4"
                                        value={courseRating}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setCourseRating(newValue);
                                        }}
                                    />
                                    <Autocomplete
                                        id="courseSelectedInProf"
                                        options={courseList.sort()}
                                        groupBy={option => option[0].toUpperCase()}
                                        onChange={(event, value) => setCourseSelected(value)}
                                        getOptionLabel={option => option}
                                        style={{ width: 300 }}
                                        renderInput={params => <TextField {...params} label="Combo box" variant="outlined" />}
                                    />
                                </Box>

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit} color="primary">
                                    Submit
                                </Button>
                                <Button onClick={() => handleSubmit(1)}>
                                    Post Anonymously
                                </Button>
                            </DialogActions>
                        </Dialog>




                </div>

            )



}



export default ProfReviewsPage;
