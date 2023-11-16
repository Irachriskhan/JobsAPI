const getAllJobs = async (req, res) => {
  res.send("Get All Jobs");
};

const getJob = async (req, res) => {
  res.send("Get a Single Job");
};

const createJob = async (req, res) => {
  res.send("One Job is created");
};

const updateJob = async (req, res) => {
  res.send("One Job is updated");
};

const deleteJob = async (req, res) => {
  res.send("One Job is deleted");
};
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
