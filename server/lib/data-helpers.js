"use strict";
const ObjectId = require('mongodb').ObjectID

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
    return {

        // Saves a tweet to `db`
        saveTweet: function(newTweet, callback) {
            db.collection('tweets').insert(newTweet);
            callback(null, true);
        },

        // Get all tweets in `db`, sorted by newest first
        getTweets: function(callback) {
            const sortNewestFirst = (a, b) => a.created_at - b.created_at;
            db.collection('tweets').find().toArray((err, tweets) => {
                if (err) {
                    return callback(err);
                }
                callback(null, tweets.sort(sortNewestFirst));
            });
        },

        likeTweet: function(id, callback) {
            db.collection('tweets').update({ _id: ObjectId(id) }, { $set: { liked: 1 } });
            callback(null, true);
        },

        unlikeTweet: function(id, callback) {
            db.collection('tweets').update({ _id: ObjectId(id) }, { $set: { liked: 0 } });
            callback(null, true);
        },

        getLikes: function(id, callback) {
            db.collection('tweets').find({ _id: ObjectId(id) }, { liked: 1 }).toArray((err, arr) => {
                if (err) {
                    return callback(err);
                }
                callback(null, arr[0].liked);
            });
        }
    }
};