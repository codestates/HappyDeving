# mypage

{% swagger method="get" path="/mypage" baseUrl="https://happydeving.com" summary="마이페이지" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorizaton" required="true" %}
accessToken
{% endswagger-parameter %}

{% swagger-parameter in="path" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    data:{
        userInfo:{
            "id": 1,
            "username": "nikki"
            "email": "nikki@gmail.com",
            "verified": true,
            "createdAt": "2019-02-24T16:17:47.000Z",
            "updatedAt": "2019-02-24T16:17:47.000Z"
        },   
        studies : [
                    {
                    "id": 1, 
                    "username": "nikki"
                    "content": 
                            {
                            "title": "스터디 구함",
                            "description": "airbnb 클론 코딩 하신 분"
                            },
                    "kakaoLink": "https://kakao.com", 
                    "closed": false, 
                    "location_id": 1,
                    "language": [
                            {
                            "id": 1,
                            "name": "javascript"
                            },
                            ...
                            ], 
                    "createdAt": "2019-02-24T16:17:47.000Z",
                    "updatedAt": "2019-02-24T16:17:47.000Z"
                    }
                    ...
            ],
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

{% swagger-parameter in="path" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="username" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    data:{
        userInfo:{
            "id": 1,
            "username": "nikki"
            "email": "nikki@gmail.com",
            "verified": true,
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

{% swagger method="delete" path="/mypage" baseUrl="https://happydeving.com" summary="회원정보 수정" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorizaton" required="true" %}
accessToken
{% endswagger-parameter %}

{% swagger-parameter in="path" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
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

