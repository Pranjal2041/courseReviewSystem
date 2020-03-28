import React, {useContext, useEffect, useReducer, useState} from 'react';
import './App.css';
import getAllCourses from "./serverConnection/getData";
import TextField from "@material-ui/core/TextField/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import getAllProfsList from "./serverConnection/getAllProfsList";
import auth0Client from "./Auth"
//import checkIfUserNameExists from "./serverConnection/checkIfUserNameExists";
// import addUser from "./serverConnection/addUser";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import ProfReviewItem from "./components/profReviewItem";
import ReviewItem from "./components/reviewItem";








function App() {


  // const [selection,changeSelection] = useState("Courses");
  const [courses,setCourses]= useState([""]);
  const [courseSelected,changeCourseSelected] = useState("");
  const [profs,setProfs]= useState([""]);
  const [profSelected,changeProfSelected] = useState("");
  const [whichReview,setWhichReview]=useState(-1);
  const [allProfReviews,setAllProfReviews] = useState(null);
  const [allCourseReviews,setAllCourseReviews] = useState("");


  const [courseDialogOpen,setCourseDialogOpen] =useState(false);
  const [profDialogOpen,setProfDialogOpen] =useState(false);

  const [userToBeBanned,setUserTobBanned] = useState("");
  const [userBanDialogOpen,setUserBanDialogOpen] =useState(false);

  const [canContinue,setCanContinue] = useState(false);

  const [values,setValues]=useState("");

  const signOut = () => {
    auth0Client.signOut();
    this.props.history.replace('/');
  };

  const signIn = () => {
    if (!auth0Client.isAuthenticated()) {
      auth0Client.signIn();
    }
  };




  function getCourses() {
    const callback = result => {
      const temp=result.map((jsObj => jsObj.name));
      setCourses(temp);
    };

    getAllCourses(callback)


  }

  function getProfList() {
    const callback = result => {
      console.log("I am going to print the professors");
      console.log(result);
      const temp=result.map((jsObj => jsObj.name));
      setProfs(temp);
    };

    getAllProfsList(callback)


  }

  function showParticularCourseReviews(){

    const getReviewsOfCourse = (callback,course_name) => {
      axios.get('/api/get/courseReview', {params: {name: course_name}})
          .then(res => callback(res.data))
    };

    const callback = result => {
      setWhichReview(3);
      setAllCourseReviews(result)

    };

    getReviewsOfCourse(callback,courseSelected)


  }

  function showParticularProfReviews(){


    const getReviewsOfProf = (callback,course_name) => {
      axios.get('/api/get/profReview', {params: {name: course_name}})
          .then(res => callback(res.data))
    };

    const callback = result => {
      setWhichReview(2);
      setAllProfReviews(result)

    };

    getReviewsOfProf(callback,courseSelected)


  }

  function showAllProfReviews(){

    const getAllProfReviews = (callback) => {
      axios.get('/api/get/admin/profRevList')
          .then(res => callback(res.data))
    };

    const callback = result => {
      setWhichReview(0);
        setAllProfReviews(result)
    };



    getAllProfReviews(callback)



  }

  function showAllCourseReviews() {

    const getAllCourseReviews = (callback) => {
      axios.get('/api/get/admin/courseRevList')
          .then(res => callback(res.data))
    };

    const callback = result => {
      setAllCourseReviews(result);
      setWhichReview(1);
    };

    getAllCourseReviews(callback)
  }


  const handleProfDialogClose = () => {
    setProfDialogOpen(false);
  };

  const handleProfDialogOpen = () => {
    setProfDialogOpen(true)
  };

  const handleNewProfInputChange = e => {
    const {id, value} = e.target;
    setValues({...values, [id]: value})
  };

  const handleNewProfSubmit =e => {

    const addProf = (data) => {
      let url='/api/post/addProf';
      axios.post(url,data )
          .then(res => console.log(res.data))
    };
    if(!checkIfProfExists(values.prof_name)) {
      addProf({name: values.prof_name});
    }
    else
      alert("add different Professor name");
    handleProfDialogClose();
  };

  function checkIfProfExists(name){
    let flag=false;
    profs.map(msg => {
      if(msg===name){

        flag=true;
      }

    });
    return flag;
  }



  const handleCourseDialogClose = () => {
    setCourseDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setCourseDialogOpen(true)
  };

  const handleNewCourseInputChange = e => {
    const {id, value} = e.target;
    setValues({...values, [id]: value})
  };

  const handleNewCourseSubmit =e => {

    const addCourse = (data) => {
      let url='/api/post/addCourse';
      axios.post(url,data )
          .then(res => console.log(res.data))
    };
    if(!checkIfCourseExists(values.course_name)) {
      addCourse({name: values.course_name});
    }
    else
      alert("add different course name");
    handleCourseDialogClose();
  };

  function checkIfCourseExists(name){
    let flag=false;
    courses.map(msg => {
      if(msg===name){

        flag=true;
      }

    });
    return flag;
  }

  function handleProfRevDelete(msg) {
    let url='/api/delete/admin/delProfRev';
    const data={data: {rid: msg.rid}};
    axios.delete(url,data )
        .then(res => console.log(res.data))
  }

  function handleCourseRevDelete(msg) {
    let url='/api/delete/admin/delCourseRev';
    const data={data: {rid: msg.rid}};
    axios.delete(url,data )
        .then(res => console.log(res.data))
  }

  function handleUserBan(msg) {
      setUserBanDialogOpen(true);
      setUserTobBanned(msg)
  }

  function handleUserBanDialogClose(msg) {
    setUserBanDialogOpen(false);
  }

  const handleNewUserBanInputChange = e => {
    const {id, value} = e.target;
    setValues({...values, [id]: value})
  };

  const handleNewUserBanSubmit =e => {

    const addProf = (data) => {
      let url='/api/put/admin/banUser';
      axios.put(url,data )
          .then(res => console.log(res.data))
    };
    alert(parseInt(values.ban_time));
    addProf({uid: userToBeBanned.uid,time:  parseInt(values.ban_time)});

    handleProfDialogClose();
  };


  function reloadData(){
    getCourses();
    getProfList();
  }

  useEffect(() => {
    reloadData();
    if(auth0Client.isAuthenticated())
    {
      if(auth0Client.getProfile().name==='pranjal2041+admin@gmail.com'){
        setCanContinue(true)
      }
      else{
        alert("You need to login from admin account to use this app")
        signOut();
      }
    }

  }, []);

  return(
      <div>
      {((auth0Client.isAuthenticated() && canContinue)) ?

          <div>

            <Autocomplete
                id="combo-box-demo2"
                options={courses.sort()}
                groupBy={option => option[0].toUpperCase()}
                onChange={(event, value) => changeCourseSelected(value)}
                getOptionLabel={option => option}
                style={{width: 300}}
                renderInput={params => <TextField {...params} label="Courses" variant="outlined"/>}
            />
            {
              courses.includes(courseSelected) ?
                  <button onClick={showParticularCourseReviews}>Submit</button>
                  : null
            }
            <br/>
            <button onClick={handleDialogOpen}>Add a course</button>
            <br/>
            <br/>
            <br/>

            <Autocomplete
                id="combo-box-demo"
                options={profs.sort()}
                groupBy={option => option[0].toUpperCase()}
                onChange={(event, value) => changeProfSelected(value)}
                getOptionLabel={option => option}
                style={{width: 300}}
                renderInput={params => <TextField {...params} label="Professors" variant="outlined"/>}
            />
            {
              profs.includes(profSelected) ?
                  <button onClick={showParticularProfReviews}>Submit</button>
                  : null
            }

            <button onClick={handleProfDialogOpen}>Add a Professor</button>


            {
              auth0Client.isAuthenticated() ?
                  <div>
                    <br/>

                    <button onClick={signOut}>Sign Out</button>
                  </div>
                  :
                  <div>
                    <button onClick={signIn}>Sign In</button>
                  </div>
            }

            <button onClick={showAllProfReviews}>See all professor's reviews</button>
            <button onClick={showAllCourseReviews}>See all course's reviews</button>

            <br/>
            <br/>
            <br/>
            <br/>

            <h3>Reviews</h3>
            <h1>{whichReview}</h1>

            {
              () => {
                return (
                    <div>
                      <button>Hi</button>
                    </div>
                )
              }

            }

            <Table>
              <TableBody>
                {
                  (allProfReviews) ?
                      allProfReviews.map(message => (whichReview === 0 || whichReview === 2) ?
                          <div><ProfReviewItem prof_name={message.pid} level={message.level} prof={message.course_names}
                                               author={message.uid} review={message.review} rating={message.rating}
                                               likes={message.likes}/>
                            <button onClick={() => handleProfRevDelete(message)}>Delete</button>
                            <button onClick={() => handleUserBan(message)}>Ban this user</button>
                          </div> : null
                      ) : null
                }

                {
                  (allCourseReviews) ?
                      allCourseReviews.map(message => (whichReview === 1 || whichReview === 3) ?
                          <div><ReviewItem course_name={message.cid} level={message.level} prof={message.prof_names}
                                           author={message.uid} review={message.review} rating={message.rating}
                                           likes={message.likes}/>
                            <button onClick={() => handleCourseRevDelete(message)}>Delete</button>
                            <button onClick={() => handleUserBan(message)}>Ban this user</button>
                          </div> : null
                      ) : null
                }

              </TableBody>
            </Table>

            <br/>
            <br/>
            <br/>


            <Dialog open={courseDialogOpen} onClose={handleCourseDialogClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter course name
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="course_name"
                    label="review"
                    type="text"
                    onChange={handleNewCourseInputChange}
                    fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCourseDialogClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleNewCourseSubmit} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>


            <Dialog open={profDialogOpen} onClose={handleProfDialogClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter Professor name
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="prof_name"
                    label="Name"
                    type="text"
                    onChange={handleNewProfInputChange}
                    fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleProfDialogClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleNewProfSubmit} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog open={userBanDialogOpen} onClose={handleUserBanDialogClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  For how many days you want to ban user
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="ban_time"
                    label="Name"
                    type="number"
                    defaultValue={7}
                    onChange={handleNewUserBanInputChange}
                    fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleUserBanDialogClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleNewUserBanSubmit} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>


          </div>:<div>
            <button onClick={signIn}>Sign In </button>
          </div>
      }
      </div>

  )

}

export default App;
