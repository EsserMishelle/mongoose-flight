const mongoose = require("mongoose");
const model = mongoose.model;

const destinationSchema = new mongoose.Schema({
  arrive_airport: {
    type: String,
    enum: ["AUS", "DAL", "LAX", "SAN", "SEA", "DCA", "ATL", "FRA", "JFK"],
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

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: [
      "American",
      "Southwest",
      "United",
      "Delta",
      "Ryanair",
      "Alaska",
      "JetBlue",
    ],
  },
  depart_airport: {
    type: String,
    enum: ["AUS", "DAL", "LAX", "SAN", "SEA", "DCA", "ATL", "FRA", "JFK"],
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    required: true,
  },

  depart_dateTime: {
    type: Date,
    required: true,
    default: () => {
      const oneYearLater = new Date();
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
      return oneYearLater;
    },
    // default: () => Date.now() + 365 * 24 * 60 * 60000,
  }, ////365*24 hours * 60 min * 60 sec * 1000 miliisecond

  destinations: [
    {
      arrive_airport: String,
      arrive_dateTime: Date,
    },
  ],
});

const Flight = model("Flight", flightSchema);
module.exports = Flight;
