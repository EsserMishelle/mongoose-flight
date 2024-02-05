const React = require("react");
const DefaultLayout = require("./layout/Default");

class New extends React.Component {
  constructor(props) {
    super(props);

    // Get today's date
    const today = new Date();

    // Set default values for depart_dateTime and arrive_dateTime
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);

    this.state = {
      depart_dateTime: nextYear.toISOString().slice(0, 16),
      arrive_dateTime: nextYear.toISOString().slice(0, 16),
    };
  }

  addDestination = () => {
    // Clone the last destination div and update the index in the cloned div
    const lastDestination = document.querySelector(
      "#destinations .destination:last-child"
    );
    const newDestination = lastDestination.cloneNode(true);

    // Update the index in the cloned div
    const lastIndex = parseInt(
      newDestination.querySelector('[id^="arrive_airport_"]').id.split("_")[2]
    );
    const newIndex = lastIndex + 1;

    newDestination
      .querySelectorAll('[id^="arrive_airport_"]')
      .forEach((input) => {
        input.id = input.id.replace(`_${lastIndex}`, `_${newIndex}`);
        input.name = input.name.replace(`[${lastIndex}]`, `[${newIndex}]`);
      });

    document.querySelector("#destinations").appendChild(newDestination);
  };

  //formatting date from string to Date type
  formatDate = (dateString) => {
    const formattedDate = new Date(dateString).toISOString().slice(0, 16);
    return formattedDate;
  };

  handleDepartDateTimeChange = (event) => {
    this.setState({ depart_dateTime: event.target.value });
  };

  handleArriveDateTimeChange = (event) => {
    this.setState({ arrive_dateTime: event.target.value });
  };

  render() {
    const { depart_dateTime, arrive_dateTime } = this.state;

    return (
      <DefaultLayout title={"New Flight Page"}>
        <h1>Create a New Flight</h1>

        <div>
          <form action="/flights" method="POST">
            <label htmlFor="airline">Airline:</label>
            Airline: <input type="text" name="airline" />
            <br />
            <label htmlFor="flightNo">Flight#:</label>
            Flight#: <input type="number" name="flightNo" />
            <br />
            <label htmlFor="depart_airport">Depart Airport:</label>
            Departure Airport:{" "}
            <select name="depart_airport">
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
            <label htmlFor="depart_dateTime">Departure Date Time:</label>
            Departure Date and Time:{" "}
            <input
              type="datetime-local"
              name="depart_dateTime"
              value={depart_dateTime}
              onChange={this.handleDepartDateTimeChange}
            />
            <br />
            <label htmlFor="destinations">Destinations:</label>
            <div id="destinations">
              <div class="destination">
                <label htmlFor="arrive_airport_0">Arrival Airport:</label>

                <select name="destinations[0][arrive_airport]">
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

                <label htmlFor="arrive_dateTime_0">Arrival Date/Time:</label>
                <input
                  type="datetime-local"
                  id="arrive_dateTime_0"
                  name="destinations[0][arrive_dateTime]"
                  value={this.formatDate(arrive_dateTime)}
                  onChange={this.handleArriveDateTimeChange}
                  required
                />
              </div>
            </div>
            {/* <button type="button" onClick={this.addDestination}>
              Add Destination
            </button> */}
            <input type="submit" value="Create Flight" />
          </form>
        </div>
        <nav>
          <a href="/flights">Back to Index</a>
        </nav>
      </DefaultLayout>
    );
  }
}

module.exports = New;
