# Test Me 
### By: Hadia Shafique 

A Full MERN Stack quiz app. This idea was inspired by quizlet, I wanted to create something I could use even after I graduate from my PerScholas bootcamp as a study tool to help myself and any one else prepare for things like Interview Questions as well as other different categories of the Software World.

### Live Link
[TEST-ME](https://quiz-app-ui.onrender.com)

### Github 

[Front-End](https://github.com/hadiashafique97/quizapp-frontend.git)

[Back-End](https://github.com/hadiashafique97/quizapp-backend.git)

## Access 

You can fork and or clone the repo by copy and pasting the following in your terminal. You will also need to install the dependencies displayed below to correctly get the app to work 

![dependencies](dependencies.jpg.png)

Backend

`git clone https://github.com/hadiashafique97/quizapp-backend.git`

Frontend

`git clone https://github.com/hadiashafique97/quizapp-frontend.git`

## The App / How To

When you first click on the live link the User is pointed to a login page as shown below : 
![loginpg](Loginpg.jpg.png) The user if returning can Login or if a New User can click on the New User? option underneath the login button to be directed to the register new user page to create an account. 

Also as shown in the picture if accidentally gone to the create new user page, user can click on the Existing User link underneath the Create User button to navigate back to the login page. 


![newuser](newuser.jpg.png)
 Once login has been created the user will be redirected to the login page and a message of successfully creating the account will display as also shown below. If an email already exists the user will get an error message stating that the account already exists like shown below.
![logincreated](logincreated.jpg.png)
![loginexists](loginexists.jpg.png)

The quiz app accepts two types of users. One is a regular user where as the other is admin. The admin access has been present by me and cannot be changed in the app itself only in the backend database via MongoDb. 

With the pictures displayed below this differentiates between users and is able to let the user know whether they have admin access or not. This is displayed on the home page on top of the header once the user signs in.

![admin](admin.jpg.png)
![user](user.jpg.png)




## User
Once logged in the User will see this as their Home Page: 
![user-homepg](user-homepg.jpg.png) 

As you can see the User does not have the Tests tab and they can either stay on the home tab and click on Attempt Test to start a Test or Results to view their own results the user can also click on Logout to logout and navigate to the main login page. 

Under the Results 




## Admin
Where as the Admin will see :
![admin-homepg](admin-homepg.jpg.png)

As you can see the admin has the Tests tab which allows the admin to create new Tests, edit existing Test fields like test details and even the test questions. 

![admintestpg](admin-testspage.jpg.png)

If the Admin chooses to create Test a form pops up with the alotted data that is needed to be accepted in the Test field. IF the user chooses to click on the pencil it will then navigate the admin to the Edit page where there will be two different tabs test-info to edit test details and or Questions? to edit questions. The Delete bin simply deletes the test

The Results tab for the Admin allows the admin to view All user Results and have the ability to search by user or test using the fields up top and the Search button which will search the table for the specific requirements. The clear button will clear out the fields and the specific search pool. 

![admin-resultspg](admin-results.jpg.png)
