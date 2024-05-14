const mongoose = require('mongoose');

const URI = process.URL;

mongoose.connect(URI)
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));

module.exports = mongoose;
