var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var schedulesSchema = Schema({

    url: String,
    title: String,
    description: String,
    brand: String,
    product: String,
    start: Date,
    end: Date,
    schedule:[{
    scheType: {type String, enum:['none', 'daily', 'weekly', 'monthly', 'yearly']},
        scheStart: Date,
        scheEnd: Date,
        scheDaily: Number,
        scheWeekly: Number,
        scheMonthly: Number,
        scheYearly: Number,
    	scheDate: Date,
    }]
    });

schedulesSchema.pre('save', function(next){
    this.start = new Date(this.start);
    this.end = new Date(this.end);
    this.scheStart = new Date(this.scheStart);
    this.scheEnd = new Date(this.scheEnd);
    next();

})
module.exports = mongoose.model('schedules',schedulesSchema);
