const express = require('express');
const router = express.Router();

const { Employee } = require('../models/Employee');
const { Nail } = require('../models/Shop');

// GET
router.get('/', async (req, res) => {
    try {
        res.json({message: 'success'});
    } catch(err) {
        console.log(err);
    }
});
// POST
router.post('/', async (req, res) => {
    try {
        let employee = await Employee.findOne({phone: req.body.phone});

        // exist
        if(employee) {
            return res.json({message: 'employee exist'});
        }

        employee = new Employee(req.body);

        if(nail) {
            await employee.save(async (err) => {
                if(!err) {
                    await Nail.update(
                        { _id: employee.nail }, 
                        { $push: { employees: employee._id }},
                        num => console.log(num)
                    );
                }
            });
            return res.json(employee);
        }
    } catch(err) {
        console.log(err);
    }
});
// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if(employee) {
            await employee.remove(async (err) => {
                if(!err) {
                    await Nail.update(
                        { _id: employee.nail }, 
                        { $pull: { employees: employee._id }},
                        num => console.log(num)
                    );
                }
            });
        } else {
            return res.json({message: 'not found'});
        }
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;