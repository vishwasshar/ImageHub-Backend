const Img = require("../models/Img");
const User = require("../models/user");
const { v2 } = require("cloudinary");
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const imgSubmission = async (req, res) => {
  let imgPath;
  await v2.uploader.upload(req.files.img.tempFilePath, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      imgPath = result.url;
    }
  });
  const sub = new Img({
    title: req.body.title,
    description: req.body.description,
    img: imgPath,
    userId: req.body.userId,
  });

  sub
    .save()
    .then((data) => {
      User.findById(req.body.userId)
        .then((user) => {
          res.json(data);
          user.addImgItem(data._id);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const searchImg = async (req, res) => {
  var searchObj = {};
  if (req.body?.que) {
    searchObj = {
      $or: [
        { title: { $regex: req.body.que, $options: "i" } },
        { description: { $regex: req.body.que, $options: "i" } },
      ],
    };
  }
  const ImgData = await Img.find(searchObj).sort({ createdAt: -1 });
  const PopulatedData = await User.populate(ImgData, {
    path: "userId",
    select: "name",
  });
  res.send(PopulatedData);
};

const updateImgView = (req, res) => {
  const id = req.params.id;
  Img.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } })
    .select("_id")
    .then((updatedImg) => {
      res.send(updatedImg);
    });
};

module.exports = {
  imgSubmission,
  searchImg,
  updateImgView,
};
