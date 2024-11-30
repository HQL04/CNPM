# CNPM_HCMUT_SSPS
Welcome to our HCMUT_SSPS.

## Overview
HCMUT_SSPS is a smart printing service for HCMUT students to use the printing facilities in HCMUT more efficiently. The students can use this system to pre-order their printing needs without having to wait in a line in traditional method. The system also provides a feature of storing your printing information, such as the metadata of the document, amount, date, time, location... of each of your order. Students can then view all the details of their system usage in the history.

The system is managed by the Student Printing Service Officer (SPSO). They are responsible for configuring the system, managing the printers and viewing the statistics and performance of the HCMUT_SSPS. SPSO can also view users' printing history.

## Technology Stack
- Front-end: ReactJS, Bootstrap, and other additional libraries provided by npm.
- Back-end: NodeJS (v20), ExpressJS.
- Database: MySQL.

```
  cd server
  npm install
```
```
  cd client
  npm install
```
You have installed all the dependencies.

### Set up a database server

You are ready now. Let's start the application.

### Run the application
There are two ways to start the application.

#### Start each folder separately
Start two terminal instances in the **CNPM_HCMUT_SSPS** directory. For the first instance, run these commands:
```
  cd server
  npm start
```

For the second one, run these commands:
```
  cd client
  npm start
```

The application should be starting. The ReactJS application will run on http://localhost:3000 and the Express application will run on http://localhost:8080.

To log in as a student:
* Email: `john.doe@hcmut.edu.vn`
* Password: `123456`

To log in as an admin:
* Username: `adminqc`
* Password: `23571113`


#### Start both folders concurrently in dev mode
Run `npm install` in the root folder (do this for the first time only), this will install the [concurrently](https://www.npmjs.com/package/concurrently) package. Besides, [nodemon](https://www.npmjs.com/package/nodemon) has also been added to the *server* before.

Now, to start the project in dev mode, run this command in root folder:
```
  npm run dev
```

