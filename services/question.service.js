var config = require('config.json');
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('questions');

var service = {};

service.getAll = getAll;
service.create = create;

module.exports = service;

function create(questionParam){
    var deferred = Q.defer();

    db.questions.insert(
        questionParam,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });
    
        return deferred.promise;

}

function getAll(){
    var deferred = Q.defer();
    db.questions.find().toArray(function (err, questions) {
        if (err) deferred.reject(err.description + ': ' + err.message);

        if (questions) {
            deferred.resolve(questions);
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
}