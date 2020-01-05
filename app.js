'use strict';

// ------------- includes ------------------
const snoowrap = require('snoowrap');
require('dotenv').config({path: __dirname + '/.env'})

// -------------- config -------------------
const cfg = {
	client_id: process.env.CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET,
	username: process.env.USER,
	password: process.env.PASSWORD,
	user_agent: 'CodingOuijaBot'
};

// console.log(cfg)

const
	EOL = require('os').EOL,
	SUBREDDIT_NAME = 'test'

var
	r = new snoowrap(cfg),
	submissionId = "eikhla"

r.getSubmission('eikhla').expandReplies({limit: Infinity, depth: Infinity}).then(c => {
    c.comments.forEach(x => {
        console.log(x.body)
		getAllReplies(x)
    })
})

function getAllReplies(c) {
	if (c.replies.length != 0) {
		c.replies.forEach(r => {
			console.log(r.body)
			getAllReplies(r)
		})
	}
}
