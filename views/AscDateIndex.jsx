const React = require("react");
const DefaultLayout = require("../layout/Default");

class AscDateIndex extends React.Component {
  render() {
    const { flights } = this.props;

    return (
      <DefaultLayout title={"Flight Dates in Ascending Order"}>
        <nav className="nav">
          <button>
            <a href="/flights/new">Create a New Flight</a>
          </button>
          <button>
            {" "}
            <a href="/flights/AscDateIndex">Departure Date Ascending Order </a>
          </button>
          <button>
            {" "}
            <a href="/flights/DescDateIndex">
              Departure Date Descending Order{" "}
            </a>
          </button>
        </nav>
        <ul>
          {flights.map((flight, i) => (
            <li key={flight._id}>
              Airline: <a href={`/flights/${flight._id}`}>{flight.airline}</a>
              <br />
              Flight#: {flight.flightNo} <br />
              {/* Departure Date/Time: {flight.depart_dateTime.toISOString().split("T")[0]} */}
              Departure Date/Time:{" "}
              <h4>
                {flight.depart_dateTime
                  ? flight.depart_dateTime
                      .toISOString()
                      .slice(0, 16)
                      .split("T")
                      .join(" ")
                  : "N/A"}
              </h4>
              <form
                action={`/flights/${flight._id}?_method=DELETE`}
                method="POST"
              >
                <br />
                <button type="submit" value="DELETE">
                  Delete
                </button>
              </form>
              <button>
                <a href={`/flights/${flight._id}/edit`}>Edit This Flight</a>
              </button>
              <br />
              <br />
            </li>
          ))}
        </ul>
      </DefaultLayout>
    );
  }
}
module.exports = AscDateIndex;
