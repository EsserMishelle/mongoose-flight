const React = require("react");
// As you can see we are using the app layout
const DefaultLayout = require("./layout/Default.jsx");

const { formatDate } = require("./dateUtils.jsx");

class Edit extends React.Component {
  render() {
    const flight = this.props.flight;

    return (
      <DefaultLayout title="Edit Page">
        {/* See the Layout takes in a prop called Title and we pass Edit Page to it  note: comments can't go first or last in  jsx return*/}
        {/* form is not complete we will do that below*/}
        <form action={`/flights/${flight._id}?_method=PUT`} method="POST">
          <input type="hidden" name="_method" value="PUT" />
          Airline:{" "}
          <input type="text" name="airline" defaultValue={flight.airline} />
          <br />
          Flight#:{" "}
          <input type="Number" name="flightNo" defaultValue={flight.flightNo} />
          <br />
          Departure Airport: <label htmlFor="depart_airport"></label>
          <select
            name="depart_airport"
            id="depart_airport"
            defaultValue={flight.depart_airport}
          >
            {/* <option value="----">"----"</option> */}
            <option value="AUS">AUS</option>
            <option value="DAL">DAL</option>
            <option value="LAX">LAX</option>
            <option value="SAN">SAN</option>
            <option value="SEA">SEA</option>
            <option value="DCA">DCA</option>
            <option value="ATL">ATL</option>
            <option value="FRA">FRA</option>
            <option value="JFK">JFK</option>
          </select>
          <br />
          Departure Date and Time:
          <input
            type="datetime-local"
            id="depart-datetime"
            name="depart_dateTime"
            defaultValue={
              flight.depart_dateTime
                ? formatDate(flight.depart_dateTime) // Use formatDate function
                : ""
            }
          />
          <br />
          Arrival Airport:{" "}
          <select
            name="destinations[0][arrive_airport]"
            id="arrive_airport"
            defaultValue={flight.destinations[0].arrive_airport}
            // defaultValue={destinations[0][arrive_airport]}
          >
            <option value="AUS">AUS</option>
            <option value="DAL">DAL</option>
            <option value="LAX">LAX</option>
            <option value="SAN">SAN</option>
            <option value="SEA">SEA</option>
            <option value="DCA">DCA</option>
            <option value="ATL">ATL</option>
            <option value="FRA">FRA</option>
            <option value="JFK">JFK</option>
          </select>
          <br />
          Arrival Date and Time:{" "}
          <input
            type="datetime-local"
            id="arrive-dateTime"
            name="destinations[0][arrive_dateTime]"
            defaultValue={
              flight.destinations && flight.destinations.length > 0
                ? formatDate(flight.destinations[0].arrive_dateTime) // Use formatDate function
                : ""
            }
          />
          <br />
          <input type="submit" value="Submit Changes" />
        </form>
        <nav>
          <a href="/flights">Back to Index</a>
        </nav>
      </DefaultLayout>
    );
  }
}
module.exports = Edit;
