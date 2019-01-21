const express = require('express');
const router = express.Router();

const { Shop } = require('../models/Shop');
const { User } = require('../models/User');
const { Employee } = require('../models/Employee');

// GET
router.get('/', async (req, res) => {
    try {
        let { data, filter } = req.query;

        data = data ? JSON.parse(data) : {};
        filter = filter ? JSON.parse(filter) : {};

        const match = {...filter.match}, select = {...filter.select};

        const shop = await Shop.find(data).select(select.shop)
            .populate([
                {
                    path: 'user'
                },
                { 
                    path:'employees',
                    match: { ...match.employee },
                    select: select.employee,
                    populate: { 
                        path: 'appointments',
                        match: { ...match.appointment },
                        select: select.appointment
                    }
                },
                { 
                    path:'services',
                    match: { ...match.service },
                    select: select.service
                }
            ]);

        return res.json(shop);

    } catch(err) {
        console.log(err);
    }
});
// POST
router.post('/', async (req, res) => {
    try {
        let shop = new Shop(req.body);
        let user = await User.findById(req.body.user);

        if(user) {
            // TODO: check owner role
            await shop.save(async (err) => {
                if(!err) {
                    user.shop.push(nail);
                    await user.save();
                }
            });
            return res.json(shop);
        }
    } catch(err) {
        console.log(err);
    }
});
// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id);

        if(shop) {
            await shop.remove(async (err) => {
                if(!err) {
                    await User.update(
                        {_id: shop.user},
                        {$pull: { shops: shop._id }}
                    );
                    await Employee.remove({_id: { $in: [...shop.employees] }});
                }
            });
            return res.json(shop);
        } else {
            return res.json({message: "not found"});
        }
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;