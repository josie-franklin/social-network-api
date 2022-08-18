const { Thought, User } = require("../models");

const thoughtController = {
  //get all thought
  getAllThought(req, res) {
    Thought.find({})
      //   .populate({
      //     path: "thoughts",
      //     select: "-__v",
      //   })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  //get thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      //   .populate({
      //     path: "thoughts",
      //     select: "-__v",
      //   })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  //create thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  //update thought

  //delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //add rection

  //delete reaction
};

module.exports = thoughtController;
