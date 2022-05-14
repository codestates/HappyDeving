module.exports = (name, url) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body
      width="100%"
      style="
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 30px 30px;
      "
    >
      <table
        width="400px"
        style="
          background-color: #fafafa;
          text-align: center;
          border-collapse: separate;
          border-radius: 10px;
        "
      >
        <tbody>
          <tr style="height: 70px">
            <td style="padding-top: 25px">
              <img
                src="https://user-images.githubusercontent.com/87491901/164157863-13772940-0652-4407-ba95-04406613b21e.png"
                alt="logo"
                style="width: 90px; object-fit: contain"
              />
            </td>
          </tr>
          <tr style="height: 60px; color: #424242; font-size: 0.9rem">
            <td style="padding-top: 20px">
              안녕하세요 ${name}님, 위치 기반 스터디 검색 서비스 해피데빙입니다.
            </td>
            
          </tr>
  
          <tr
            style="
              height: 50px;
              vertical-align: top;
              color: #424242;
              font-size: 0.9rem;
            "
          >
            <td>안전한 회원가입을 위해 이메일 인증을 진행해주세요.</td>
          </tr>
          <tr style="height: 70px">
            <td style="vertical-align: top; padding-top: 10px">
              <a
                href="${url}"
                style="
                  border-radius: 40px;
                  border: #d8e5f4;
                  background-color: #C593FE;
                  margin-top: 10px;
                  cursor: pointer;
                  color: #424242;
                  font-size: 0.8rem;
                  padding: 7px 15px;
                  text-decoration: none;
                "
              >
                인증하기
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
  `;
};
