const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nomUtilisateur: {
    type: String,
    required: true, 
    unique: true, 
    trim: true,
  },
  password: {
    type: String,
    required: true, 
    minlength: 6, 
  },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

UserSchema.methods.verifyPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Users', UserSchema);
