const express = require('express');
const router = express.Router();

const { Salon } = require('../models/Salon');

// GET
router.get('/', async (req, res) => {
    try {
        let { data, filter } = req.query;

        data = data ? JSON.parse(data) : {};
        filter = filter ? JSON.parse(filter) : {};

        const match = {...filter.match}, select = {...filter.select};

        const salon = await Salon.find(data).select(select.salon)
            .populate([
                {
                    path: 'owner'
                },
                { 
                    path:'shop'
                }
            ]);

        return res.json(shop);
    } catch(err) {
        console.log(err);
    }
});
// POST
router.post('/', async () => {
     try {
        
     } catch(err) {
        console.log(err);
     }
});

module.exports = router;