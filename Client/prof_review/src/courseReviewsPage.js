import React, {useEffect, useState} from "react";
import './App.css';
import getReviewsOfCourse from './serverConnection/getCourseReview'
import reviewItem from "./components/reviewItem";


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ReviewItem from "./components/reviewItem";
import YourReviewItem from "./components/YourReviewItem";
import Prompt from "react-router-dom/es/Prompt";
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
import Link from "@material-ui/core/Link";
import getAllProfsList from "./serverConnection/getAllProfsList";
import addRepOfAuthor from "./serverConnection/addRepOfAuthor";
import auth0Client from "./Auth";
import AppContext from "./utils/context";

const {useContext} = require("react");



function CourseReviewsPage(props) {


    const [state,changeState] = useState(null);
    const [dialogOpen,setDialogOpen] =useState(false);
    const [values,setValues] = useState({review: "",rating: 0,likes: 0});
    const [rid,setRid]=useState(-1);
    const [reviewPresent,changeReviewPresent] =useState(false);
    const [difficultyRating,setDifficultyRating] =useState(3);
    const [courseSpeed,setCourseSpeed] =useState(3);
    const [courseValue,setCourseValue] =useState(3);
    const [profRating,setProfRating] =useState(3);
    const [profList,setProfList] = useState([""]);
    const [profSelected,setProfSelected] = useState([""]);


    function getProfList() {
        const callback = result => {
            console.log("I am going to print the courses");
            console.log(result);
            const temp=result.map((jsObj => jsObj.name));
            setProfList(temp);
        };

        getAllProfsList(callback)


    }

    function openCourse(txt) {
        const callback = result => {
            console.log(result[0]);
            changeState(result);
            if(result!=null) {
                result.map(message => {
                    if (message.uid === my_uid) {

                        setValues({review: message.review, rating: message.rating,likes:message.likes});
                        setDifficultyRating(message.level[0]);
                        setCourseSpeed(message.level[1]);
                        setCourseValue(message.level[2]);
                        setProfRating(message.level[3]);

                        changeReviewPresent(true);
                        setRid(message.rid)
                    }
                });
            }

        };
        console.log("I am trying to get reviews of particular course");
        getReviewsOfCourse(callback, txt);


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

    const context = useContext(AppContext);


    const {title} = props.match.params;
    const my_uid =1;
    const my_username=context.name;


    useEffect(() => {
        openCourse(title);
        getProfList();
    }, []);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };


    const handleInputChange = e => {
        const {id, value} = e.target;
        setValues({...values, [id]: value})
    };

    function likeRev(msg) {
        const data={rid: msg.rid};
        const data2={rid:msg.rid,
        uid: my_uid};
        if(checkIfLikePoss(msg)){
            likeReview(data,0);
            addLikeToList(data2,0);
            addRepOfAuthor({name: msg.user_name});
            openCourse(title)
        }
        else
            alert("Already liked")


    }

    function checkIfLikePoss(msg) {
        let flag=true;
        const temp= msg.like_user_ids;
        for (let i=0; i< temp.length;i++){
            if(temp[i]===my_uid)
            {   flag=false;
                break
        }}
        return flag;
    }

    const handleSubmit = (event) => {
        console.log("So we are adding review");

        console.log(values);
        const arr=[difficultyRating,courseSpeed,courseValue,profRating];
        const temp="{"+arr.toString()+"}";
        console.log(arr);
        if(reviewPresent){
            const data={
                rid: rid,
                review: values.review,
                rating: values.rating,
                level: temp,
                prof: profSelected,
            };
            editReview(data,0);
            // openCourse(title);
            handleClose();

        }else{
        const data={
            cid: 1,
            uid: my_uid,
            review: values.review,
            rating: values.rating,
            likes: 0,
            level: temp,
            name: title,
            user_name: my_username,
            profRating: profRating,
            prof: profSelected
        };
        addReview(data,0);
        openCourse(title);
        handleClose()}
    };

        const handleClose = () => {
        setDialogOpen(false);
    };

            return (
                <div>
                    <button>{context.name}</button>
                    <h1> {"Showing all reviews of course " + title} </h1>

                    <Prompt>

                    </Prompt>

                    <Table>
                        <TableBody>
                            {
                            }{
                                    checkIfReviewExists()
                                    ? state.map( message => (message.uid===my_uid )?
                                     <div> <YourReviewItem level={message.level} prof={message.prof_names} author={message.uid} review={message.review} rating={message.rating} likes={message.likes}
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
                                    <div><ReviewItem level={message.level} prof={message.prof_names} author={message.uid} review={message.review} rating={message.rating} likes={message.likes} />
                                        <button onClick={() => likeRev(message)}>Like</button>
                                    </div>
                                )
                                : null
                            }
                        </TableBody>
                    </Table>


                    <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
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
                                    <Typography component="legend">Difficulty Level</Typography>
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
                                    <Typography component="legend">Course Speed</Typography>
                                    <Rating
                                        name="simple-controlled2"
                                        value={courseSpeed}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setCourseSpeed(newValue);
                                        }}
                                    />
                                </Box>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend">Course Value</Typography>
                                    <Rating
                                        name="simple-controlled3"
                                        value={courseValue}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setCourseValue(newValue);
                                        }}
                                    />
                                </Box>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend">Prof Rating</Typography>
                                    <Rating
                                        name="simple-controlled4"
                                        value={profRating}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setProfRating(newValue);
                                        }}
                                    />
                                    <Autocomplete
                                        id="profSelectInCourse"
                                        options={profList.sort()}
                                        groupBy={option => option[0].toUpperCase()}
                                        onChange={(event, value) => setProfSelected(value)}
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
                            </DialogActions>
                        </Dialog>




                </div>

            )



}



export default CourseReviewsPage;
