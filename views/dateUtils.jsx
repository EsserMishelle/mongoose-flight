const formatDate = (dateString) => {
  return dateString
    ? new Date(dateString).toLocaleString("en-US", {
        timeZone: "EST",
        hour12: false,
      })
    : "N/A";
};

module.exports = {
  formatDate,
};
