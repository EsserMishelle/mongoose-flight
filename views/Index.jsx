const React = require("react");
const DefaultLayout = require("./layout/Default");
// require("../public/styles.css");

const localFormatDate = (dateString) => {
  return dateString
    ? new Date(dateString).toISOString().slice(0, 16).replace("T", " ")
    : "N/A";
};

const { formatDate } = require("./dateUtils");

class Index extends React.Component {
  // handleDescSort = (event, sortOrder) => {
  //   event.preventDefault();
  //   this.props.history.push(`/flights/DescDateIndex?sort=${sortOrder}`);
  // };

  render() {
    const { flights } = this.props;

    return (
      <div style={{ backgroundColor: "lightgray" }}>
        <nav className="nav">
          <a href="/flights/new">
            {" "}
            <button>Create a New Flight </button>
          </a>{" "}
          {/* sorting attemps */}
          {/* <a href="/flights/Asc">
            {" "}
            <button>Departure Date Ascending Order </button>
          </a>{" "}
          <a href="/flights/Desc">
            <button>Departure Date Descending Order </button>{" "}
          </a> */}
          {/* <a href="/flights/Asc">
            {" "}
            <button>Departure Date Ascending Order </button>
          </a>{" "}
          <a href="/flights/Desc">
            <button onClick={(e) => this.handleDescSort(e, "desc")}>
              Departure Date Descending Order{" "}
            </button>
          </a> */}
        </nav>
        <h1 className="all-flights">All Flights</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th>Airline</th>
                <th>Flight#</th>
                <th>From</th>
                <th>Departs</th>
                <th>To</th>
                <th>Arrives</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* Inserting a line between thead and tbody */}
              <tr>
                <td colSpan="8">
                  <hr className="table-line" />
                </td>
              </tr>
              {flights.map((flight) => (
                <tr key={flight._id}>
                  <td className="airline" style={{ width: "75px" }}>
                    {flight.airline}
                  </td>
                  <td className="flightNo" style={{ width: "50px" }}>
                    {flight.flightNo}
                  </td>

                  <td className="depart_airport" style={{ width: "40px" }}>
                    {flight.depart_airport}
                  </td>

                  <td className="depart_dateTime" style={{ width: "220px" }}>
                    {/* {flight.depart_dateTime &&
                      formatDate(flight.depart_dateTime)} */}

                    {flight.depart_dateTime &&
                      (() => {
                        console.log(
                          "Original depart_dateTime:",
                          flight.depart_dateTime
                        );
                        const formattedDateTime = formatDate(
                          flight.depart_dateTime
                        );
                        console.log(
                          "Formatted depart_dateTime:",
                          formattedDateTime
                        );
                        return formattedDateTime;
                      })()}
                  </td>

                  <td className="arrive_airport" style={{ width: "40px" }}>
                    {flight.destinations && flight.destinations.length > 0
                      ? flight.destinations[0].arrive_airport
                      : "N/A"}
                  </td>

                  <td className="arrive_dateTime" style={{ width: "220px" }}>
                    {flight.destinations && flight.destinations.length > 0
                      ? flight.destinations[0].arrive_dateTime
                        ? formatDate(flight.destinations[0].arrive_dateTime)
                        : "N/A"
                      : "N/A"}
                  </td>
                  <td>
                    <a href={`/flights/${flight._id}`}>
                      <button
                        style={{ backgroundColor: "blue", color: "white" }}
                      >
                        Details
                      </button>
                    </a>
                    <a href={`/flights/${flight._id}/edit`}>
                      <button
                        style={{ backgroundColor: "green", color: "white" }}
                      >
                        Edit This Flight
                      </button>
                    </a>
                    <form
                      action={`/flights/${flight._id}?_method=DELETE`}
                      method="POST"
                    >
                      <button
                        type="submit"
                        value="DELETE"
                        style={{ backgroundColor: "red", color: "white" }}
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

// Export the component
module.exports = Index;
