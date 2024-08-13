import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

let userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, "Please Provide First Name"],
    },
    lastName: {
      type: String,
      require: [true, "Please Provide Last Name"],
    },
    email: {
      type: String,
      require: [true, "Please Provide Email"],
      trim: true,
      lowerCase: true,
      validator: {
        validate: (value) => validator.isEmail(value),
        message: "Email is not valid",
      },
    },
    contactNo: {
      type: String,
      require: [true, "Please Provide Number"],
      trim: true,
      validator: {
        validate: (value) => validator.isMobilePhone(value),
        message: " Phone Number is not valid",
      },
    },
    password: {
      type: String,
      require: [true, "Please Provide Password"],
      validator: {
        validate: (value) => validator.isStrongPassword(value),
        message: " Password is not valid",
      },
    },
    DOB: {
      type: String,
      validator: {
        validate: (value) => {
          let isMatch = validator.isDate(value);
          return isMatch && gap > 18;
        },
        message: " DOB is not valid",
      },
    },
    // coordinates: {
    //     type: {
    //         type: ["Point"],
    //         require: true,
    //     },
    //     coordinates: {
    //         typr: [Number],
    //         require: true,
    //     }
    // },
    address: {
      line: String,
      city: String,
      state: String,
      country: String,
      pinCode: String,
    },
    followers: { type: Number, default: 0 },
    postCount: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    bio: String,
    code: String,
    isPrivate: { type: Boolean, default: false },
    userName: String,
  },
  { timestamp: true }
);

// userSchema.index({ coordinates: '2dsphere' })

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
  },
});

export const User = mongoose.model("user", userSchema);
