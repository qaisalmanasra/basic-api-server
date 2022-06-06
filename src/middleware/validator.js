'use strict'
// Checks the query string for a name property
// Sends the request through when valid, forces an error when not
function validator() {
    return (req, res, next) => {
        console.log(req.query.name);
        let regex= /^[A-Za-z]+$/;
        let regex1 = /^[0-9]/;
        (regex.test(req.query.name)) ? next() : 
        (regex1.test(req.query.name)) ? next("enter a string for the name") : 
        next("name empty : enter a name");
     }
    }


module.exports = validator;