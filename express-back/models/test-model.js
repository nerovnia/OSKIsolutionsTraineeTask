const { Schema, model } = require("mongoose");

const TestSchema = new Schema({
  name: { type: String, required: true },
  abr: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      answers: [{ type: String, required: true }],
    },
  ],
});

module.exports = model("Test", TestSchema);
