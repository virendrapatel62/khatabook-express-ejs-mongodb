const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Number, String, Array, ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const khatabookSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);
const customerSchema = new Schema(
  {
    khatabook: {
      type: ObjectId,
      ref: "Khatabook",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);
const entrySchema = new Schema(
  {
    customer: {
      type: ObjectId,
      ref: "Customer",
      required: true,
    },
    youGave: {
      type: Number,
      default: 0,
    },
    youGot: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const User = mongoose.model("User", userSchema);
const Khatabook = mongoose.model("Khatabook", khatabookSchema);
const Customer = mongoose.model("Customer", customerSchema);
const Entry = mongoose.model("Entry", entrySchema);

const PAYMENT_METHODS = [
  "Cash",
  "Upi",
  "Google Pay",
  "Phone Pay",
  "Amazon Pay",
  "Bank Transfer",
  "Cheque",
];

module.exports = {
  User,
  Khatabook,
  Customer,
  Entry,
  PAYMENT_METHODS,
};
