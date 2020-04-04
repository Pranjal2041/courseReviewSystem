# CourseReviewSystem

## How to Install
* Before getting started make sure Postgresql is installed in your computer and configured.
* Create a new user with the command:-  CREATE ROLE my_user WITH LOGIN PASSWORD 'root';
         Use the same name and password as given in this command
* once the role is created type:- CREATE DATABSE reviewdb;
       to create the database.
* Now connect to database using command:-  \c reviewdb;
* Now go to /Server/main/schema.sql and copy the contents and paste it into the psql terminal.. All the tables will be created.
* This way database setup will be complete.
* Clone the repo in your computer or download and extract the zip
* First install all the dependencies by:- npm install
* Go to server folder and type the command:- npm run devstart
* To start the client app go to clientFolder/profReviews/ and open new terminal and type:- npm start
* Similarly for starting admin app go to admin folder and open new terminal and type:- npm start.(Run either of client and admin app at a time as they are both configured to run on same port)
* Admin UserName:- admin
  password:- Admin123
* Professor page can be added by first logging as admin in admin app, and creating a new course/professor page.

## About this App

This app basically allows to rate and review professors and courses based on different criteria's and display the results for user's assesment. It primarily uses express,nodeJS,postgresql and react for various purposes. Also auth0 hsa been used for login and registration.

## Features
  Currently the following features have been implemented
* Chosing a course or professor and rating and reviewing it
* rating can be done on various criteria such as difficulty, pace etc.
* Seeing other users rating and reviews and average of all parameters for all courses and professors.
* Posting anonymous comments(Name will be visible to administrator)
* Like other peoples reviews.
* Building up of reputation points of user based on likes his reviews recieve
* Admin can create a new page of any professor or course
* The admin may delete a comment because of its explicit content or it is off-topic
* the admin may ban a user for any amount of time, in which case the user will recieve a suitable message.
* admin can also see all reviews and list of all users.

## Features to be implemented
* Allow users to report a review making it easy for admin to moderate content. This would be an easy task and can be implemented similar to likes feature.
* Improve UI
* Allow sorting reviews based on different parameters
* Adding this on github pages

The drive link containing answers to other questions and demo video of the app:-
https://drive.google.com/open?id=1OpDboSyJOPQlMyURGtHrqoDUoZx8rike
