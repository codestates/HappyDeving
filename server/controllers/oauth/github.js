module.exports = {
  post: (req, res) => {
    try {
      res.send("users github post ok");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
