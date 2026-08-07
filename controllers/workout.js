const Workout = require('../models/Workout');
const auth = require('../auth');
console.log(auth);

module.exports.addWorkout = (req, res) => {
	if (req.user.isAdmin){
		return res.status(403).send({
			message: "Admin is not authorized to execute this action"
		})
	}

	let newWorkout = new Workout({
		userId: req.user.id,
		name: req.body.name,
		duration: req.body.duration
	})

	return newWorkout.save()
	.then(workout => {
		return res.status(201).send(workout);
	})
	.catch(error => errorHandler(error, req, res));
}

module.exports.getMyWorkouts = (req, res) => {
	if (req.user.isAdmin){
		return res.status(403).send({
			message: "Admin is not authorized to execute this action"
		})
	}

	return Workout.find({userId: req.user.id})
	.then(workouts => {
		if (workouts.length > 0){
			return res.status(200).send({workouts});
		}
		return res.status(404).send({
			message: "Workouts is empty or not found"
		})
		
	})
	.catch(error => errorHandler(error, req, res));
}