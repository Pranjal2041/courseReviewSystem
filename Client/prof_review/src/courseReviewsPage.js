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



function CourseReviewsPage(props) {


    const [state,changeState] = useState(null);
    const [dialogOpen,setDialogOpen] =useState(false);
    const [values,setValues] = useState({review: "",rating: "",likes: 0});
    const [rid,setRid]=useState(-1);
    const [reviewPresent,changeReviewPresent] =useState(false);



    function openCourse(txt) {
        const callback = result => {
            console.log(result[0]);
            changeState(result);
            if(result!=null) {
                result.map(message => {
                    if (message.uid === my_uid) {

                        setValues({review: message.review, rating: message.rating,likes:message.likes}

                        );
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


    const {title} = props.match.params;
    const my_uid =1;
    const my_username="Invincible";


    useEffect(() => {
        openCourse(title);
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
            likeReview(data);
            addLikeToList(data2);
            openCourse(title)
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
        console.log(values);
        if(reviewPresent){
            const data={
                rid: rid,
                review: values.review,
                rating: values.rating,
                likes: values.likes
            };
            editReview(data);
            openCourse(title);
            handleClose();

        }else{
        const data={
            cid: 1,
            uid: my_uid,
            review: values.review,
            rating: values.rating,
            likes: 0,
            level: {},
            name: title,
            user_name: my_username
        };
        addReview(data);
        openCourse(title);
        handleClose()}
    };

        const handleClose = () => {
        setDialogOpen(false);
    };

            return (
                <div>
                    <h1> {"Showing all reviews of course " + title} </h1>

                    <Prompt>

                    </Prompt>

                    <Table>
                        <TableBody>
                            {
                            }{
                                    checkIfReviewExists()
                                    ? state.map( message => (message.uid===my_uid )?
                                     <div> <YourReviewItem author={message.uid} review={message.review} rating={message.rating} likes={message.likes}
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
                                    <div><ReviewItem author={message.uid} review={message.review} rating={message.rating} likes={message.likes} />
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
