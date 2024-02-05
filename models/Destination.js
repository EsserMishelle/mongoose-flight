const mongoose = require("mongoose");

const model = mongoose.model;

const destinationSchema = new mongoose.Schema({
  arrive_airport: {
    type: String,
    enum: ["AUS", "DAL", "LAX", "SAN", "SEA", "DCA", "ATL", "JFK", "FRA"],
  },

  arrive_dateTime: {
    type: Date,
    required: true,
    default: () => {
      const oneYearLater = new Date();
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
      return oneYearLater;
    },
  },
  // flight: { type: mongoose.Schema.Types.ObjectId, ref: "Flight" },
});

const Destination = model("Destination", destinationSchema);
module.exports = Destination;
