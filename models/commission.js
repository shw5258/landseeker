const mongoose = require('mongoose')

const commissionSchema = new mongoose.Schema({
	title: String,
	contents: String,
	email: String,
	phone: String,
	person: String,
	comments: [
		{
			type: mongoose.Schema.Types .ObjectId,
			ref: "Comment"
		}
	]
})

module.exports = mongoose.model("Commission", commissionSchema)