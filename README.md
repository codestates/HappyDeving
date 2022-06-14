# 프로젝트 소개 (HappyDeving Project)
*Read this in [English](https://github.com/codestates/HappyDeving/blob/dev3/README_en.md).*
<br/>


# HappyDeving Project
## 😈 Logo
![happylogo3](https://user-images.githubusercontent.com/87491901/164157863-13772940-0652-4407-ba95-04406613b21e.png)

## ✏️ About
### 해피데빙은 위치 정보와 스터디 시작일, 학습할 언어를 지정해 검색해 가까운 곳의 스터디에 참여할 수 있도록 하는 웹서비스입니다.
#### Kick 1) 주변에서 일어나고 있는 놀라운 프로젝트를 알 수 있습니다.
#### Kick 2) 마음에 드는 스터디를 찜목록에 저장해 관리할 수 있습니다.
#### Kick 3) 스터디장 소개글과 소셜 네트워크 연동으로 다양한 개발자들과 관계를 맺고 소통할 수 있습니다.

<br/>
<br/>

## 배포 주소
### :link:[배포주소](https://happydeving.com/)

<br/>
<br/>

## ✨ Feature
- 위치, 개발 언어, 스터디 시작일로 스터디를 검색할 수 있습니다.
- 검색 결과에서 스터디 모임 마커를 클릭하면 모달창으로 간략한 정보를 볼 수 있습니다.
- 스터디의 하트를 눌러 내 찜목록에 추가하고 찜을 해제할 수 있습니다.
- 참여하기 버튼을 누르면 카카오 링크로 연결돼 스터디장과 연락할 수 있습니다.
- 댓글과 대댓글로 소통하며 스터디장의 SNS에 들어가 볼 수 있습니다.
- 내가 쓴 모든 글은 마이페이지에서 관리할 수 있습니다.

<br/>
<br/>

## ✨ Feature and Functionality
- Email Verification using Nodemailer
- Login using Kakao, Google, Naver, GitHub (JWT, Google OAuth2 Authentication and bcrypt)
- Search study groups and projects based on an address, date, and computer languages using Kakao map API
- Create a new post
- Add comments and replies on a post
- Share posts
- Like posts
- Edit profile photos, nickname, biography, blog addresses
- Realtime update likes, posts, comments and profiles
- Auto authenticate the user on refresh
- Sign Out
- Delete Account and revoke permissions




### :link:[Deployed domain: happydeving.com](https://happydeving.com/)

## 🔧 Tech Stack
![Happy Deving Stack](https://user-images.githubusercontent.com/79065544/168771710-45857bd1-a9ef-4c48-8454-2e4e0e367473.png)

## 🌟 Final App View

<details>
<summary>Responsive Landing Page</summary>
<div markdown="1">
  
![반응형](https://user-images.githubusercontent.com/75279575/168737275-18ccc135-4416-4b80-96f6-ae655d9b0750.gif)
  
</div>
</details>


<details>
<summary>Login/Disconnect Account</summary>
<div markdown="1">

![로그인_소](https://user-images.githubusercontent.com/75279575/168737270-1ca152ee-a219-4576-b990-0008892b2346.gif)
![로그인요청_소](https://user-images.githubusercontent.com/75279575/168737274-da7847f7-1f27-4f27-8d20-fad457736231.gif)
![회원탈퇴_소](https://user-images.githubusercontent.com/75279575/168737304-65f18a36-9b85-473e-b387-7ab5f6de4256.gif)

</div>
</details>

<details>
<summary>Email Verification</summary>
<div markdown="1">

![이메일인증_소](https://user-images.githubusercontent.com/75279575/168737295-188d9e40-9419-4ac8-b34d-d196883eaee1.gif)

</div>

</details>

<details>
<summary>Validation Check</summary>
<div markdown="1">
  
![유효성검사_소](https://user-images.githubusercontent.com/75279575/168737294-17a26a05-3349-4012-bed0-6a5f38b30fb7.gif)
  
</div>

</details>


<details>
<summary>Search Projects</summary>
<div markdown="1">

![스터디검색_소](https://user-images.githubusercontent.com/75279575/168737279-390858fd-d146-405c-8817-2677df5c84f6.gif)

</div>
</details>



<details>
<summary>No Results</summary>
<div markdown="1">

![검색결과없음_소](https://user-images.githubusercontent.com/75279575/168737239-ca70375f-bf96-4aca-8be0-fc2a179cfc7d.gif)

</div>
</details>


<details>
<summary>Click Marker and Modal</summary>
<div markdown="1">

![스터디모달클릭_소](https://user-images.githubusercontent.com/75279575/168737288-542d64f0-772d-41fc-825f-38f336f8f1af.gif)
![스터디모바일_소](https://user-images.githubusercontent.com/75279575/168737289-b832ba26-b2e5-476c-845b-885e15b3eca2.gif)
  
</div>

</details>



<details>
<summary>Post (CRUD)</summary>
<div markdown="1">
  
![스터디글작성_소](https://user-images.githubusercontent.com/75279575/168737287-1bbe40c6-6df0-417e-a4f1-08beff91ea3d.gif)
![스터디글수정_소](https://user-images.githubusercontent.com/75279575/168737286-bdd0a0d0-1307-4d26-89b8-39b1f31db030.gif)
![스터디글삭제_소](https://user-images.githubusercontent.com/75279575/168737282-c8b1a13a-2846-44b4-aa00-28dbd3bbcfb9.gif)



</div>
</details>


<details>
<summary>Share</summary>
<div markdown="1">

![공유트위터_소](https://user-images.githubusercontent.com/75279575/168737261-2f544cea-b2ea-464d-8559-2c70602204a0.gif)
![공유페북_소](https://user-images.githubusercontent.com/75279575/168737262-d0f45119-94df-4fe0-be2e-3a504dcb1e4d.gif)

</div>
</details>

<details>
<summary>Comment (CRUD)</summary>
<div markdown="1">

![댓글달기_소](https://user-images.githubusercontent.com/75279575/168737265-f36e4a39-512f-49e5-8e8e-30bdd7f780ac.gif)
![댓글삭제_소](https://user-images.githubusercontent.com/75279575/168737267-4946c9ed-72c6-4cc0-bb7a-32455b827126.gif)
![댓글수정_소](https://user-images.githubusercontent.com/75279575/168737269-3c519ba1-2d85-4aee-bd86-1f256915a83a.gif)

</div>
</details>



<details>
<summary>Like/Unlike</summary>
<div markdown="1">
  
![찜하기_소](https://user-images.githubusercontent.com/75279575/168737297-61c6781b-8d91-437a-97be-32802aeb9a46.gif)
![찜해제_소](https://user-images.githubusercontent.com/75279575/168737298-376e8037-b153-4132-be83-f8dd1739457a.gif)
  
</div>

</details>


<details>
<summary>Profile (CRUD)</summary>
<div markdown="1">
  
![프로필수정_소](https://user-images.githubusercontent.com/75279575/168737301-cf2c3ea9-9aa0-468c-bd6a-b7aa3fde20f3.gif)
  
</div>

</details>


## Flowcharts
✨ [Happy Deving Flowcharts](https://www.figma.com/file/rgpYkg2kNQDUqIaTpRUD7b/HappyDeving-Flowcharts?node-id=0%3A1)

## DB Schema 
✨ [Happy Deving DBdiagram](https://dbdiagram.io/d/622ab22961d06e6eade12938)
<img width="1283" alt="image" src="https://user-images.githubusercontent.com/75279575/168463115-d21242c6-bc79-499a-a332-1b9bb53d4c5e.png">



## 👩‍💻👨‍💻 Contributors
## Somi Jeon
> **Role** : Team Member
>
> **Position** : FE(Front-End)


> **Stack**
>  
> <img src="https://img.shields.io/badge/axios-2A1659?style=for-the-badge&logo= Query&logoColor=blue"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"><img src="https://img.shields.io/badge/REDUX Toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white"><img src="https://img.shields.io/badge/styled components-hotpink?style=for-the-badge&logo=styled-components&logoColor=white"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"><img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"><img src="https://img.shields.io/badge/oauth0.2-black?style=for-the-badge&logo=Auth0&logoColor=white">

<details>
<summary>Worklog</summary>
<div markdown="1">

- Google login (Google OAuth2 API)
- Nodemailer email verification (Google OAuth2 API)
- Signup validation check
- StudyCard component
- Like/unlike
- Profile edit page
- Comments and replies
- Dialog modals
- Responsive landing page
- Routing

</div>
</details>
<br />
<br />

## 곽나경
> **Role** : Team Member
>
> **Position** :  FE(Front-End)

> **Stack**
>  
> <img src="https://img.shields.io/badge/axios-2A1659?style=for-the-badge&logo= Query&logoColor=blue"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"><img src="https://img.shields.io/badge/REDUX Toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white"><img src="https://img.shields.io/badge/styled components-hotpink?style=for-the-badge&logo=styled-components&logoColor=white"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">


<details>
<summary>Worklog</summary>
<div markdown="1">

- 검색 결과 지도페이지 : 커스텀 마커, 모달 생성
- 랜딩페이지 검색 필터 : 위치, 시작일, 언어 
- 스터디 상세페이지, 글쓰기 페이지, 수정 페이지

</div>
</details>
<br />
<br />
## 이희영 
> **Role** : Team Member
>
> **Position** : BE(Back-End)

> **Stack**
>  
> <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white"><img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"><img src="https://img.shields.io/badge/Express-black?style=for-the-badge&logo=Express&logoColor=white"><img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"><img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"><img src="https://img.shields.io/badge/oauth0.2-black?style=for-the-badge&logo=Auth0&logoColor=white">



## 
<details>
<summary>Worklog</summary>
<div markdown="1">

- 로그인 : 소셜 (깃허브, 카카오, 네이버), jwt
- api
- 데이터베이스, 
- 노드메일러
- 배포 : 데이버베이스(RDS), 서버(EC2), 클라이언트(S3)

</div>
</details>
<br />
<br />


## 지영서
> **Role** : Team Leader
>
> **Position** : FE(Front-End)


> **Stack** 
>
> <img src="https://img.shields.io/badge/axios-2A1659?style=for-the-badge&logo= Query&logoColor=blue"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"><img src="https://img.shields.io/badge/REDUX Toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white"><img src="https://img.shields.io/badge/styled components-hotpink?style=for-the-badge&logo=styled-components&logoColor=white"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">



## 
<details>
<summary>Worklog</summary>
<div markdown="1">

- 카카오,페이스북 소셜에 페이지 공유
- 로그인, 회원가입 페이지 
- 마이페이지 - 찜 스터디 목록, 작성한 스터디 목록, 프로필
- 검색 필터 : 캘린더 api

</div>
</details>












