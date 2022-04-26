module.exports = {
  post: async (req, res) => {
    try {
      // 쿠키 삭제
      res.cookie("accessToken", null, { maxAge: 0 });
      res.cookie("refreshToken", null, { maxAge: 0 });

      // 로그아웃 성공
      res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json();
    }
  },
};
