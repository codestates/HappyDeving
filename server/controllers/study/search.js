module.exports = {
  get: (req, res) => {
    try {
      res.send("search get ok");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
