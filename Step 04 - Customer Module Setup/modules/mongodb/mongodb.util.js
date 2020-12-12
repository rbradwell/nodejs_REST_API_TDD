(function () {
    'use strict';

    module.exports = {
        init: init
    };

    var mongoose = require('mongoose');

    var mongodbConfig = require('../../config/mongodb/mongodb-config').mongodb;

    function init() {
        var options = {
            promiseLibrary: require('bluebird'),
            useNewUrlParser: true
        };

        var connectionString = prepareConnectionString(mongodbConfig);

        mongoose.connect(connectionString, options)
            .then(function (result) {
                console.log("MongoDB connection successful. DB: " + connectionString);
            })
            .catch(function (error) {
                console.log(error.message);
                console.log("Error occurred while connecting to DB: : " + connectionString);
            });
    }

    function prepareConnectionString(config) {
        var connectionString = 'mongodb://';

        if (config.user) {
            console.log("here1");
            connectionString += config.user + ':' + config.password + '@';
        }
 
        connectionString += config.server  + '/' + config.database;
        
 //       console.log("original connection string:" + connectionString);

//        connectionString = "mongodb://localhost:27017/customer_db_dev";

        return connectionString;
    }
    
})();