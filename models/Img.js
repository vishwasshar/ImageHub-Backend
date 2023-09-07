const mongoose = require("mongoose");
const schema = mongoose.Schema;

const submissionSchema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    img: {
      type: String,
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    userId: {
      type: schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Img", submissionSchema);
