# study

{% swagger method="get" path="/search" baseUrl="https://happydeving.com" summary="스터디 검색 결과" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="guType" required="false" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="dongType" required="false" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="language" %}

{% endswagger-parameter %}

{% swagger-parameter in="query" name="date" %}
YYYY-MM-DD
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
                    "kakaoLink": "https://kakao.com",
                    "closed": false,
                    "location":  { lat: 33.450705, lng: 126.570677 },
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

### 스터디 상세페이지

{% swagger method="get" path="/study" baseUrl="https://happydeving.com" summary="스터디 상세 페이지" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="id (studyId)" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

```javascript
{
    data: {
            study :
                    {
                    "id": 1,
                    "username": "somi",
                    "content": "airbnb 클론 코딩 하신 분",
                    "title": "스터디 구함",
                    "kakaoLink": "https://kakao.com",
                    "closed": false,
                    "location":
                            {
                            lat: 33.450705,
                            lng: 126.570677,
                            place_name: "롯데월드"
                            },
                    "language": [
                            {
                            "id": 1,
                            "name": "javascript"
                            },
                            ...
                            ],
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

{% swagger-response status="500: Internal Server Error" description="" %}

```javascript

```

{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/study" baseUrl="https://happydeving.com" summary="스터디 글쓰기 페이지" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="id (userId)" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access token
{% endswagger-parameter %}

{% swagger-parameter in="body" name="id" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="username" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="title" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="content" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="kakaoLink" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="closed" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="location" type="Array" required="true" %}
latitude, longitude, guType, dongType, name
{% endswagger-parameter %}

{% swagger-parameter in="body" name="loginMethod" required="true" %}
0.normal 1.github 2.google
{% endswagger-parameter %}

{% swagger-parameter in="body" name="startDate" required="true" type="Date" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="language" required="true" type="Array" %}
\[{id: 1, name:'javascript'}]
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

{% swagger method="patch" path="/study" baseUrl="https://happydeving.com" summary="스터디 글 수정" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="id (studyId)" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access token
{% endswagger-parameter %}

{% swagger-parameter in="body" name="id" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="study_id" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="content" required="false" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="title" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="kakaoLink" required="false" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="closed" required="false" type="Boolean" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="location" type="Array" required="false" %}
latitude, longitude, guType, dongType,

name(장소이름)
{% endswagger-parameter %}

{% swagger-parameter in="body" name="startDate" type="Date" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="language" type="Array" %}
\[{id: 1, name:'javascript'}]
{% endswagger-parameter %}

{% swagger-parameter in="body" name="loginMethod" required="true" type="Int" %}
0.normal 1.github 2.google
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

```javascript
{
    data: {
            studies : [
                    {
                    "id": 1,
                    "username": "somi",
                    "content": "airbnb 클론 코딩 하신 분",
                    "title": "스터디 구함",
                    "kakaoLink": "https://kakao.com",
                    "closed": false,
                    "location": {
                            lat: 33.450705,
                            lng: 126.570677
                            },
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
            ]
    }
}
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

{% swagger method="delete" path="/study" baseUrl="https://happydeving.com" summary="스터디 글 삭제" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access token
{% endswagger-parameter %}

{% swagger-parameter in="body" name="study_id" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

```javascript
{
}
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

### 스터디 상세페이지 댓글

{% swagger method="post" path="/studies/comment" baseUrl="https://happydeving.com" summary="스터디 상세 페이지의 댓글 생성" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="user_id" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="study_id" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="content" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access token
{% endswagger-parameter %}

{% swagger-parameter in="body" name="parentId (study_comment)" type="Int" required="true" %}
(stu
{% endswagger-parameter %}

{% swagger-response status="201: Created" description="" %}

```javascript
{
    data: {
            comments:[
                    {
                    "id": 2,
                    "username": "somi",
                    "content": "참여하고싶어요",
                    "username": "somi"
                    "createdAt": "2019-02-24T16:17:47.000Z",
                    "updatedAt": "2019-02-24T16:17:47.000Z"
                    "parentId": null
                    }
            ],
            userInfo:{
                    "id": 1,
                    "username": "somi"
                    }
    }
}
```

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

```javascript
{
}
```

{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="" %}

```javascript
err;
```

{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/studies/comment" baseUrl="https://happydeving.com" summary="스터디 상세 페이지의 내 댓글 수정" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="study_commentId" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="content" type="String" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

```javascript
{
    data: {
            comments:[
                    {
                    "id": 3,
                    "username": "somi",
                    "content": "참여하고싶어요",
                    "username": "somi"
                    "createdAt": "2019-02-24T16:17:47.000Z",
                    "updatedAt": "2019-02-24T16:17:47.000Z"
                    "parentId": null
                    }
            ],
            userInfo:{
                    "id": 1,
                    "username": "somi"
                    }
    }
}
```

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

```javascript
{
}
```

{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="" %}

```javascript
err;
```

{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/studies/comment" baseUrl="https://happydeving.com" summary="스터디 상세 페이지의 내 댓글 삭제" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="user_id" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="study_commentId" type="Int" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="header" name="authorization" required="true" %}
access token
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

```javascript

```

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}

```javascript

```

{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="" %}

```javascript

```

{% endswagger-response %}
{% endswagger %}
