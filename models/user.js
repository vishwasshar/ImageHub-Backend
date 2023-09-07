const mongoose = require("mongoose");

const schema = mongoose.Schema;

const User = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  img: {
    items: [
      {
        imgId: {
          type: schema.Types.ObjectId,
          ref: "Img",
          required: true,
        },
      },
    ],
  },
});

User.methods.addImgItem = function (imgId) {
  const imgItem = this.img.items;

  imgItem.push({
    imgId,
  });
  this.img = { items: imgItem };
  return this.save();
};

module.exports = mongoose.model("User", User);
