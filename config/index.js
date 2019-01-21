if(process.env.NODE_ENV === 'production') {
    
    module.exports = {
        MONGO_URI: process.env.MONGO_URI,
        SESSION_SECRET: process.env.SESSION_SECRET,
        JWT_SECRET: process.env.JWT_SECRET,
    
        CORS_ORIGIN: '',
        COOKIE_SECURE: true
    };

} else {
    require('dotenv').config();

    module.exports = {
        MONGO_URI: process.env.MONGO_URI,
        SESSION_SECRET: process.env.SESSION_SECRET,
        JWT_SECRET: process.env.JWT_SECRET,
    
        CORS_ORIGIN: 'http://localhost:3000',
        COOKIE_SECURE: false
    };
}



