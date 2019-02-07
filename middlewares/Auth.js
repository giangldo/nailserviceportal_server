const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //const token = req.get('Authorization').split(' ')[1];
    // browser: verify req.user
    // mobile:  verify req.headers [jwt token]

    /*
    const token = req.get('Authorization').split(' ')[1];
    
    if(token !== null) {
        try {
            const currentUser = jwt.verify(token, 'secretkey')
            
            req.currentUser = currentUser

            console.log(currentUser)
        } catch(err) {
            err.statusCode = 500;
            throw err;
        }
    }

    next()
    */

    console.log(req.session.user);

    if(req.session.user) {
        return next();
    }

    return res.status(401).json({
        success: false, 
        errors: ['Invalid login credentials']
    });  
}