module.exports = {
  post: (req, res) => {
    try {
      axios.get(
        "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}"
      );

      if (!code) {
        return res.status(400).json();
      }
      res.send("users kakao post ok");
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
