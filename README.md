# Description 

This api have functionalities mentioned in the Assignment
1.Rate & Review Mentor 
2.Get mentor details 
3.Recommend student by mentor 

### It has **Four Tables** as specified
>1.User
>2.Mentor
>3.Review
>4.RecommendStudent

==Details can be found in schema.js in `db\schema.js`==

#### Routes are claasified into 3 major routes 

```js

app.use(loginRouter) //login and register
app.use(reviewRouter) //review and rating 
app.use(recommendstudentRouter) //recommend student by mentor

```
## Tables 

1.UserTable 

    | Field               | Type             | Description        |
    |---------------------|------------------|--------------------|
    | user_id             | varchar(36)      | Unique user ID.    |
    | mentor_id           | varchar(36)      | Unique mentor ID.  |
    | rating              | varchar          | Rating of the user.|
    | review              | text (<= 50)     | Review text, limited to 50 characters. |


2.MentorTable

    |       id         | username   | password | rating |
    |----------------- |------------|----------|--------|
    |   varchar(36)    | varchar    | varchar  | varchar|
    |   `uuid()`       | `someone`  | `4781`   | 5      |
    |   `uuid()`       | `musk`     | `6587`   | 2      |



3.ReviewTable

    | Field             | Type             | Description                   |
    |-------------------|------------------|-------------------------------|
    | user_id           | varchar(36)      | Unique user ID.               |
    | mentor_id         | varchar(36)      | Unique mentor ID.             |
    | rating            | varchar          | Rating of the interaction.    |
    | review            | text (<= 50)     | Review text, limited to 50 characters. |



4.RecommendStudentTable

    | Field             | Type             | Description                   |
    |-------------------|------------------|-------------------------------|
    | user_id           | varchar(36)      | Unique user ID.               |
    | mentor_id         | varchar(36)      | Unique mentor ID.             |
    | link              | varchar          | Link associated with the interaction. |


 
### From `request.http` u an get all the links the api is exposed for testing purposes (*u can use postman as well*)


# Setting Up Node.js Backend Application
This guide will walk you through the steps to set up a Node.js backend application.

### Step 1: Clone the Repository
Clone the repository to your local machine using Git:
```bash
git clone <repository-url>
cd <repository-name>
```

### Step 2: Install Dependencies
Navigate to the backend directory and install the required dependencies using `npm`
```bash
npm install 
```
### Step 3: Configure Environment Variables
Set up environment variables for your application. Create a .env file in the backend directory and define the required variables:
```
host = "localhost"
user = "root"
password = "Your mysql password"
database = "assignment"
PORT = 3500
```
Replace the values with your actual configuration.

### Step 4: Start the Server
Start the backend server:
```bash
npm run start
```
**For development purpose**
```bash
npm run devstart
```
### Step 5: Test the Endpoints (This test suitable if its hosted)
Your backend server should now be running. Test the endpoints using tools like Postman or curl to ensure everything is functioning correctly.

Example:

-GET http://localhost:3500 HTTP/1.1

-POST <http://localhost:3500/register> (Json Payload)

-POST <http://localhost:3500/login> (get id , used for rating and manymore)

-POST <http://localhost:3500/review/==user_id==> (refer requests.http for type of json payload)

-GET <http://localhost:3500/review?rating=(1||2||3||4||5)> (gives all the mentors whose rating>=`specified in query`)

-POST <http://localhost:3500/recommend/==mentor_id==> (to update / set link for the reccomended student)
