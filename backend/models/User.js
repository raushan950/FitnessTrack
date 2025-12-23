import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  goals: {
    type: String,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  }
}, { timestamps: true });

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);  //return true or false if the password matches
};

// Hash the password before saving the user. The code in this function runs before a user document is saved to the database.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();  //next is a function that you call to indicate that the middleware is done, and the next middleware (or the actual save operation) should continue.
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;