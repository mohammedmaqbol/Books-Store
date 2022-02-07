const mongoose =  require('mongoose');
const authorSchemma  = new mongoose.Schema({
        name  : {
            type : String,
            required : true
        }
});
module.exports = mongoose.model('Author', authorSchemma)