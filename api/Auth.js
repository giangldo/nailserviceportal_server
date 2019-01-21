const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { User } = require('../models/User');
const { Salon } = require('../models/Salon');
const { Shop } = require('../models/Shop');
const { Employee } = require('../models/Employee');
const { Token } = require('../models/Token');

const auth = require('../middlewares/Auth');

// POST
router.post('/signup', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // find user
        let user = await User.findOne({ email });

        // exist user
        if(user) {
            return res.status(409).json({message: 'User already exist'});
        }

        // new user
        user = new User(req.body);

        // hash password
        user.password = user.hashPassword(password);

        // set role
        user.role = user.setRole(role);

        // save
        await user.save( async (err) => {
            if(!err) {
                const token = new Token({
                    user: user._id
                });

                await token.save();
                
                res.json({token: token._id});
            }
        });

    } catch(err) {
        console.log(err);
    }
});

router.post('/verify/:id', async (req, res) => {
    try {
        // TODO: validation salon register

        const id = /^[a-fA-F0-9]{24}$/.test(req.params.id) ? req.params.id : '000000000000000000000000';
        
        const token = await Token.findById(id);

        if(token) { 
            const user = await User.findById(token.user);
            if(user) {
                if(!user.active) {
                    let salon = await Salon.findOne({ owner: user._id });
                    let shop = new Shop();
                    let employee = new Employee();
                    /*
                    if(!salon) {
                        salon = new Salon(req.body);
                        salon.owner = user;
                        salon.shops.push(shop);

                        shop.name = salon.name;
                        shop.salon = salon;
                        shop.employees.push(employee);

                        employee.user = user;
                        employee.shops.push(shop);

                        await salon.save();
                        await shop.save();
                        await employee.save();
                    }
                    */
                    await user.updateOne(
                        {$set: { active: true, salon }}
                    );
                    
                    // set cookie session
                    req.session.user = {
                        id: user._id,
                        role: user.role
                    };
                    
                    res.setHeader('Set-Cookie', 'loggedIn=true');
                    //res.redirect('/');
                    return res.json({message: 'authenticate'});
                }
                return res.json({message: 'verified'});
            }
            return res.json({message: 'user not found'});
        } 
        return res.json({message: 'token not found'});
    } catch(err) {
        console.log(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, role, type } = req.body;

        // find user
        let user = await User.findOne({ email });

        // new user
        if(!user) {
            user = new User(req.body);
            user.first_name = '--';
            user.last_name = '--';
            user.password = '--';
            user.setRole(role);
            user.setType(type);
            await user.save();
        }

        const token = new Token({
            user: user._id,
            role: user.role,
            type: user.type,
            token: crypto.randomBytes(16).toString('hex')
        });

        token.save(() => {
            return res.json({message: 'invite send'});
        });
        
    } catch(err) {
        console.log(err);
    }
});

router.post('/confirm/:id', async (req, res) => {
    try {
        // TODO: validation register
        
        const id = /^[a-fA-F0-9]{24}$/.test(req.params.id) ? req.params.id : '';
        const token = await Token.findById(id);

        if(token) {
            // find user
            let user = await User.findById(token.user);

            if(user) {
                let employee = await Employee.findOne({ user });

                if(!employee) {
                    employee = new Employee();
                    employee.user = user;
                    employee.shops.push(token.shop);
                    await employee.save();
                }

                if(!user.active) {
                    await user.updateOne(
                        {$set: { 
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            password: user.hashPassword(req.body.password),
                            active: true 
                        }}
                    );
                }
                req.session.user = user;
                return res.json({message: 'authenticated'});
            }
            return res.json({message: 'registered'});
        }

        console.log(req.session.user);
        return res.json({message: 'token not found'});
    } catch(err) {
        console.log(err);
    }
});

router.post('/login', async (req, res) => {

});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({success: true});
});

router.post('/forgot', async (req, res) => {

});

module.exports = router;
