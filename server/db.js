const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/project_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
