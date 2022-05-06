# mypage

{% swagger method="get" path="/mypage" baseUrl="https://happydeving.com" summary="마이페이지" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorizaton" required="true" %}
accessToken
{% endswagger-parameter %}

{% swagger-parameter in="path" type="Int" required="true" name="id (userid)" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    data:{
        userInfo:{
            "id": 1,
            "username": "nikki"
            "email": "nikki@gmail.com",
            "github": null,
            "blog": null,
            "bio": null, 
            "loginMethod" 0,
            "image": "https://i.ibb.co/nr4FYns/happydevil.png",
            "createdAt": "2019-02-24T16:17:47.000Z",
            "updatedAt": "2019-02-24T16:17:47.000Z"
        },   
        comments:[ 
                    {
                    "id": 1,
                    "content": "참여하고싶어요",
                    "username": "nikki"
                    "createdAt": "2019-02-24T16:17:47.000Z",
                    "updatedAt": "2019-02-24T16:17:47.000Z"
                    "parentId": null
                    }
                    ...
            ]  
    }
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}
```javascript
{
    "signin required"
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="" %}
```javascript
err
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/mypage" baseUrl="https://happydeving.com" summary="회원정보 수정" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorizaton" required="true" %}
accessToken
{% endswagger-parameter %}

{% swagger-parameter in="path" type="Int" required="true" name="id (userid)" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" required="true" name="id" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="username" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="github" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="blog" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="bio" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    data:{
        userInfo:{
            "id": 1,
            "username": "nikki"
            "email": "nikki@gmail.com",
            "github": "https://nikki.github.io",
            "blog": null,
            "bio": "grow everyday", 
            "loginMethod" 0,
            "createdAt": "2019-02-24T16:17:47.000Z",
            "updatedAt": "2019-02-24T16:17:47.000Z"
        }
    }
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}
```javascript
{
    "signin required"
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="" %}
```javascript
err
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/mypage/image" baseUrl="https://happydeving.com" summary="회원 프로필 이미지 수정" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorizaton" required="true" %}
accessToken
{% endswagger-parameter %}

{% swagger-parameter in="path" type="Int" required="true" name="id (userid)" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" required="true" name="id" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="image" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    data:{
        userInfo:{
            "id": 1,
            "image": "https://i.ibb.co/nr4FYns/happydevil.png",
            "createdAt": "2019-02-24T16:17:47.000Z",
            "updatedAt": "2019-02-24T16:17:47.000Z"
        }
    }
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}
```javascript
{
    "signin required"
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="" %}
```javascript
err
```
{% endswagger-response %}
{% endswagger %}

### 스터디 찜 목록&#x20;

{% swagger method="get" path="/mypage/:id/like" baseUrl="https://happydeving.com" summary="내가 찜한 스터디 목록 " %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="user_id" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
data: {
            studies : [
                    {
                    "id": 1, 
                    "content": "airbnb 클론 코딩 하신 분"
                    "title": "스터디 구함",
                    "language": [
                            {
                            "id": 1,
                            "name": "javascript"
                            },
                            ...
                            ], 
                    "startdate": "2019-03-11",
                    "createdAt": "2019-02-24T16:17:47.000Z",
                    "updatedAt": "2019-02-24T16:17:47.000Z"
                    }
            ...
            ]
    }
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="" %}
```javascript
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/mypage/:id/like" baseUrl="https://happydeving.com" summary="스터디 찜 목록 추가" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access token
{% endswagger-parameter %}

{% swagger-parameter in="body" name="study_id" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="201: Created" description="" %}
```javascript
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="" %}
```javascript
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/mypage/:id/like" baseUrl="https://happydeving.com" summary="스터디 찜 목록 해제" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access token
{% endswagger-parameter %}

{% swagger-parameter in="body" name="study_id" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="" %}
```javascript
```
{% endswagger-response %}
{% endswagger %}

### 내가 쓴 스터디 목록&#x20;

{% swagger method="get" path="/mypage/:id/write" baseUrl="https://happydeving.com" summary="내가 쓴 스터디 목록 " %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="user_id" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
data: {
            studies : [
                    {
                    "id": 1, 
                    "content": "airbnb 클론 코딩 하신 분"
                    "title": "스터디 구함",
                    "language": [
                            {
                            "id": 1,
                            "name": "javascript"
                            },
                            ...
                            ], 
                    "startdate": "2019-03-11",
                    "createdAt": "2019-02-24T16:17:47.000Z",
                    "updatedAt": "2019-02-24T16:17:47.000Z"
                    }
            ...
            ]
    }
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="" %}
```javascript
```
{% endswagger-response %}
{% endswagger %}
