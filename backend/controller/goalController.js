
const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModels')

// @desc GET goals
// @route GET/api/goals
// @access private

const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

// @desc SET goal
// @route POST/api/goal/
// @access private

const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error("please add a text field")
    }
    const goal = await Goal.create( {
            text: req.body.text,
            user: req.user.id,
        }
    )

    res.status(200).json(goal)
})

// @desc Update goal
// @route PUT/api/goals/:id
// @access private

const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user){
        res.status(401)
        throw new Error(' User not Found')
    }

    // Make sure that, loggedin user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, 
        req.body,{
            new: true
        })

    res.status(200).json({message: `update Goal by -->  ${req.params.id}`})
})

// @desc Delete goal
// @route DELETE/api/goals/:id
// @access private

const deleteGoal = asyncHandler(async(req, res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user){
        res.status(401)
        throw new Error(' User not Found')
    }
    // Make sure that, loggedin user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    
    await goal.remove()
    res.status(200).json({id:req.params.id})
})

module.exports = { getGoals, setGoal,updateGoal,deleteGoal }