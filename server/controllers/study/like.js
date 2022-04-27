module.exports = {
  post: (req, res) => {
    try {
      res.send("like post ok");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
  delete: (req, res) => {
    try {
      res.send("like delete ok");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
