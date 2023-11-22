const notFound = (req, res) => res.status(404).send("The URL does not exist");

module.exports = notFound;
