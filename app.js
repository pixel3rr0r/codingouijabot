require('dotenv').config();

// Requires
const snoowrap = require('snoowrap');

// Config
const config = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    user_agent: 'CodeOuijaBot'
};

// Variables
const SUBREDDIT_NAME = "test",
      COMMENT_SCORE_THRESHOLD = process.env.THRESHOLD;

var r = new snoowrap(config),
    closingRegex = /^\:wq/gi
