# users

{% swagger method="post" path="/users/signin" baseUrl="https://happydeving.com" summary="signin" %}
{% swagger-description %}
signin 성공 시 기입한 id, pw 일치하는 user 정보 찾아서 돌려주기
{% endswagger-description %}

{% swagger-parameter in="body" name="email" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="code*" %}
authorization code
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    data:{
        userInfo:{
            "id": 1,
            "username": "nikki"
            "email": "nikki@gmail.com",
            "createdAt": "2019-02-24T16:17:47.000Z",
            "updatedAt": "2019-02-24T16:17:47.000Z"
        },
         
    }
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}
```javascript
{}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}
```javascript
{}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="" %}
```javascript
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/users/signup" baseUrl="https://happydeving.com" summary="signup" %}
{% swagger-description %}
Nodemailer 사용
{% endswagger-description %}

{% swagger-parameter in="body" name="id" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="email" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="username" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="201: Created" description="" %}
```javascript
{
    data : {
        "id": 1,
        "username": "nikki"
        "email": "nikki@gmail.com",
        "createdAt": "2019-02-24T16:17:47.000Z",
        "updatedAt": "2019-02-24T16:17:47.000Z"
    }
}
```
{% endswagger-response %}

{% swagger-response status="409: Conflict" description="" %}
```
{ 
  message: {
    "user already exists"
  }
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="" %}
```javascript
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/users/signout" baseUrl="https://happydeving.com" summary="signout" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="signout" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="" %}
```javascript
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/users/login/github" baseUrl="https://happydeving.com" summary="github social login" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="code*" %}
authorization code
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    data:{
        userInfo:{
            "id": 1,
            "username": "nikki"
            "createdAt": "2019-02-24T16:17:47.000Z",
            "updatedAt": "2019-02-24T16:17:47.000Z"
            "loginMethod": 1
        },
        cookie: {
            accessToken:asdfasdfasdfas,
            refreshToken:asdfasdfasdfas,
        }       
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

{% swagger method="post" path="/users/login/google" baseUrl="https://happydeving.com" summary="google social login" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="code*" %}
authorization code
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    data:{
        userInfo:{
            "id": 1,
            "username": "nikki"
            "createdAt": "2019-02-24T16:17:47.000Z",
            "updatedAt": "2019-02-24T16:17:47.000Z"
            "loginMethod": 2
        },
         
    }
    
    res.cookie(
        {
            accessToken:asdfasdfasdfas,
            refreshToken:asdfasdfasdfas,
        }
    )
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

{% swagger method="delete" path="/users/withdrawal" baseUrl="https://happydeving.com" summary="google social login" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="loginMethod" type="Int" required="true" %}
0.normal 1.github 2.google
{% endswagger-parameter %}

{% swagger-parameter in="query" name="user" type="Int" required="true" %}
userId
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{}
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
