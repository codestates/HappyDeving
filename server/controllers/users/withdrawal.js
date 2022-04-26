module.exports = {
  delete: (req, res) => {
    try {
      res.send("users withdrawal delete ok");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
