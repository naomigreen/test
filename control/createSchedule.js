var createSchedule = require('../models/schedule')

var scheduleControl = {
	schedule: function(req, res){
		createSchedule.findOne({userId: req.params.userId}, function(err, doc){
		res.render('schedule', {user: req.user, userId: require.user._id})
		})
	},


	submit: function(req, res){
		var newSchedule = new createSchedule({
			newSchedule.userId = userId;
			newSchedule.description = req.params('description');
			newSchedule.brand = req.params('brand');
			newSchedule.product = req.params('product');
			
		});
		newSchedule.save(function(err,doc){
			if(err){
				console.log('Error submitting', err)
			}else{
				res.redirect('/')
			}
		})
	},
	details: function(req, res){
		console.log('submited')
		createSchedule.findOne({userId: req.params.userId}, function(err,user){
			var details = {
				start: req.body.start,
				end: req.body.end,
				date: req.body.date,
			};
			console.log('list of details' details)
			user.save(function(err, details){
				if (err){
					console.log('details Error', err)
				}else{
					res.redirect((''))
				}
			})
		})

	}
}