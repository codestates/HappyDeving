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
            "image": "data:image/jpeg;base64,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", 
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
            "image": "data:image/jpeg;base64,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", 
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
