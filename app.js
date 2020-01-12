'use strict';

// ------------- includes ------------------
const snoowrap = require('snoowrap');
require('dotenv').config(); //Path is useless if it is in the base directory, which it will be.

// -------------- config -------------------
/* 
Replaced yours with the original one, which is more correct because the token is already dealt out.

User-Agent is supposed to be very specific according to Reddit's API rules. (https://github.com/reddit-archive/reddit/wiki/API)

Refresh token can be generated following the instructions here, https://github.com/reddit-archive/reddit/wiki/OAuth2
There is also a great one written by the Snoowrap people, https://not-an-aardvark.github.io/reddit-oauth-helper/, only works on
Chrome from my knowledge.
*/
const cfg = {
    userAgent: process.env.USER_AGENT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
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
