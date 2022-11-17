const mongoose = require('mongoose');

const URI = 'mongodb+srv://root:root@sandbox.gr32b.mongodb.net/movies2022?retryWrites=true&w=majority';

mongoose.connect(URI)
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));

module.exports = mongoose;
