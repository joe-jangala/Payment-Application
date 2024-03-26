# PAYMENT APPLICATION Using MongoDB, Express, React and Node.js
## Home Page
It is the starting page of the application, by clicking sigin button it takes to the signin page.
![homepage](https://github.com/joe-jangala/Payment-Application/blob/main/Output%20Images/Home.png)
## Signin Page
- If user already have an account he can use the credentials to signin into his account to use the application.
- New user can click on signup to create an account.
![Signinpage](https://github.com/joe-jangala/Payment-Application/blob/main/Output%20Images/signin.png)
## Signup Page
- User has to provide First Name, Last Name , Email and Password to create an account.
- Input Validation is done through zod library.
- After successful validation user gets a json web token and stored in applications local storage.
![Signuppage](https://github.com/joe-jangala/Payment-Application/blob/main/Output%20Images/signup.png)
## Dashboard
- After Successful signin/signup user is directed to the dashboard page.
- During the account creation user is assigned some random balance as we not deal with Bank APIs in this project.
- Here user can see the other users of the application or can use the search bar to search the target reciever.
- By clicking the send money user is directed to send money page.
![Dashboard](https://github.com/joe-jangala/Payment-Application/blob/main/Output%20Images/dashboard.png)
## Send Money
- In Send Page user can send the amount to the receiver.
- Balance Check, Receiver checks are performed before initiating a transfer.
- By Clicking on Intiate Transfer, funds transfered to the receiver and balance gets updated.
- After a Successful Transfer, user receives a alert of Transfer Success.
- If there any error user receives the alert.
![Send](https://github.com/joe-jangala/Payment-Application/blob/main/Output%20Images/send.png)
## Updated Dashboard
- After the Successful Funds Transfer user is directed to the updated dashboard
![UpdatedDash](https://github.com/joe-jangala/Payment-Application/blob/main/Output%20Images/updateddash.png)
## Database
Accounts
![Database](https://github.com/joe-jangala/Payment-Application/blob/main/Output%20Images/DB.png)
Users
![Database2](https://github.com/joe-jangala/Payment-Application/blob/main/Output%20Images/DB.png)

