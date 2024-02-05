/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");

const morgan = require("morgan");
const path = require("path");
// const flights = require("./models/flights.js");
const Flight = require("./models/Flight.js");
const methodOverride = require("method-override");
/////////////////////////////////////////////
// Create our express app Object Bine express-react-views templating engine
/////////////////////////////////////////////
const app = express();
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function

mongoose.connect(process.env.MONGO_URI);
// mongoose.connection.once("open", () => {
//   console.log("connected to mongo!");
// });    ////---less detailed
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////

app.use(morgan("tiny")); //logging
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
// app.use(express.static("public")); // serve files from public statically

// app.use((req, res, next) => {
//   console.log("I run for all routes");
//   next();
// });

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("your server is running... better catch it.");
});

////Seed route -- doesn;t work yet with flights

// app.get("/flights/seed", (req, res) => {
//   const startFlights = [
//     { name: "Orange", color: "orange", readyToEat: false },
//     { name: "Grape", color: "purple", readyToEat: false },
//     { name: "Banana", color: "orange", readyToEat: false },
//     { name: "Strawberry", color: "red", readyToEat: false },
//     { name: "Coconut", color: "brown", readyToEat: false },
//   ];

//   Flight.deleteMany({})
//     .then((data) => {
//       Flight.insertMany(startFlights)
//         .then((createdFlight) => res.redirect("/flights"))
//         .catch((err) => {
//           console.error(err);
//           res.status(400).json({ error });
//         });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(400).json({ error });
//     });
// });

// app.get("/flights/seed", (req, res) => {
//   Flight.insertMany([
//     {
//       name: "grapeflight",
//       color: "pink",
//       readyToEat: true,
//     },
//     {
//       name: "grape",
//       color: "purple",
//       readyToEat: false,
//     },
//     {
//       name: "avocado",
//       color: "green",
//       readyToEat: true,
//     },
//   ])
//     .then((createdFlights) => res.redirect("/flights"))
//     .catch((err) => console.error(err));
// });

////SORT --ascending
// Assuming you have a Flight model

// Handle route
// app.get("/flights/DescDateIndex", async (req, res) => {
//   const sortOrder = req.query.sortOrder || "asc";

//   try {
//     const flights = await Flight.find()
//       .sort({ depart_dateTime: sortOrder })
//       .exec();
//     res.render("flights/DescDateIndex", { flights });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// SORT  departure date in asc order////---my simple sort function
// SORT --ascending
app.get("/flights/Asc", async (req, res) => {
  try {
    const flights = await Flight.find().sort({ depart_dateTime: 1 }).exec();
    res.render("Index", { flights });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/flights/Desc", async (req, res) => {
  try {
    const flights = await Flight.find().sort({ depart_dateTime: -1 }).exec();
    res.render("Index", { flights });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// INDUCES

// Index

app.get("/flights", async (req, res) => {
  try {
    // find all the flights
    const flights = await Flight.find().populate("destinations");

    // render a template after they are found

    res.render("Index", { flights });

    // send error as json if they aren't
  } catch (error) {
    console.error(err);
    res.status(500).send(`Internal Server Error`);
  }
});

//old --without populate
// app.get("/flights", (req, res) => {
//   // find all the flights
//   Flight.find({})
//     // render a template after they are found
//     .then((flights) => {
//       res.render("Index", { flights });
//     })
//     // send error as json if they aren't
//     .catch((err) => {
//       console.error(err);
//       res.status(400).json({ err });
//     });
// });

// New

// app.get("/flights/new", (req, res) => {
//   Flight.find({})
//     .then((flights) => {
//       if (flights.length === 0) {
//         return res.render("No Flights Available");
//       }

//       res.render("New");
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     });
// });

////without checking to see if there's any exisitn flights
app.get("/flights/new", (req, res) => {
  res.render("New");
});

app.post("/flights", async (req, res) => {
  const { airline, depart_airport, flightNo, depart_dateTime, destinations } =
    req.body;
  try {
    const newFlight = await Flight.create({
      airline,
      depart_airport,
      flightNo,
      depart_dateTime,
      destinations, // Assuming destinations is an array of objects with arrive_airport and arrive_dateTime
    });
    res.redirect(`/flights/${newFlight._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

////without populate
// app.get("/flights/new", (req, res) => {
//   res.render("New");
// });

// Delete
app.delete("/flights/:id", (req, res) => {
  Flight.deleteOne({ _id: req.params.id })
    .then((deleteInfo) => {
      console.log(deleteInfo);
      res.redirect("/flights");
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ err });
    });
});

// Update
app.put("/flights/:id", (req, res) => {
  //lesson code

  Flight.updateOne({ _id: req.params.id }, req.body, { new: true })
    .then((updateInfo) => {
      console.log(updateInfo); // Fix typo here
      res.redirect(`/flights/${req.params.id}`);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ err });
    });
});

// Create
app.post("/flights", async (req, res) => {
  const { airline, depart_airport, flightNo, depart_dateTime, destinations } =
    req.body;

  try {
    // Ensure destinations is an array with correct structure
    const newDestinations = destinations.map((dest) => ({
      arrive_airport: dest.arrive_airport,
      arrive_dateTime: dest.arrive_dateTime,
    }));

    const newFlight = await Flight.create({
      airline,
      depart_airport,
      flightNo,
      depart_dateTime,
      destinations: newDestinations,
    });

    res.redirect(`/flights/${newFlight._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Edit

// app.get("/flights/:id/edit", (req, res) => {
//   Flight.findOne({ _id: req.params.id })
//     .then((foundFlight) =>
//       res.render("Edit", {
//         flight: foundFlight,
//       })
//     )
//     .catch((error) => {
//       console.log(error);
//       res.json({ error });
//     });
// });

app.get("/flights/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    const flight = await Flight.findById(id).populate("destinations");
    res.render("Edit", { flight });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Show

app.get("/flights/:id", (req, res) => {
  Flight.findOne({ _id: req.params.id })
    .then((foundFlight) => {
      res.render("Show", {
        flight: foundFlight,
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
