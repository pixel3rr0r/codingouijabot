'use strict';

// ------------- includes ------------------
const snoowrap = require('snoowrap');
require('dotenv').config();

/* -------------- config -------------------

Replaced yours with the original one, which is more correct because the token is already dealt out.

User-Agent is supposed to be very specific according to Reddit's API rules. (https://github.com/reddit-archive/reddit/wiki/API)

Refresh token can be generated following the instructions here, https://github.com/reddit-archive/reddit/wiki/OAuth2
There is also a great one written by the Snoowrap people, https://not-an-aardvark.github.io/reddit-oauth-helper/, only works on Chrome from my knowledge.

*/

const cfg = {
    userAgent: process.env.USER_AGENT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
};

const
	EOL = require('os').EOL,
	SUBREDDIT_NAME = 'codingouija';

var	r = new snoowrap(cfg);

// ------------- functions -----------------

function getTopReply(sid) {
    var submission = r.getSubmission(sid)
    submission.expandReplies({limit: Infinity, depth: Infinity}).then(comment => {
        console.log(getReplyChain(comment.comments[0]))
    })
}

function getReplyChain(c) {
    var replies = [c.body.trim()],
        currComment = c;

    while (currComment.replies.length != 0) {

        if (currComment.replies[0].body.includes(':wq')) { break }

        replies.push(currComment.replies[0].body.trim());
        currComment =  currComment.replies[0];
    }

    return replies
}

function isWq(s) {
    var submission = r.getSubmission(s)
    submission.expandReplies().then(comment => {
        comment.comments.some(c => {
            //if (getReplyChain(c).includes(':wq')) {return true}
            var replyChain = getReplyChain(c)
            if (replyChain.includes(':wq')) {
                return true
            }
            //console.log(found) // For some reason, found will log to be true, but not change the value
        })
    })
    return false
}

function runBot() {
    var hot = r.getSubreddit(SUBREDDIT_NAME).getHot().then(listing => {
        listing.forEach(submission => {
            if (["Meta", "Python", null].indexOf(submission.link_flair_text) == -1 && submission.num_comments > 2) {
            }
            console.log(isWq(submission))
        });

    })
}

runBot()

// RUN BOT
//setInterval(runBot, 1800000);
