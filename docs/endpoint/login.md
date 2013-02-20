# **<code>POST</code> api/v1/users/login**

## Description
Authenticate user

## Parameters

- **username** [String] _(M)_ — Account registered email address.
- **password** [String] _(M)_ — Account preferred password.

## Response

- **success**

## Errors

- **400**:Invalid or Missing Parameter
- **408**:Request timeout
- **503**: Service Unavailable

## Example

**Request**

```
POST api/v1/users/login HTTP/1.1
Content-Type: application/json
```
``` json
{ 
  "username" : <email>, 
  "password" : <pasword>, 
}
``` 

**Return**

``` json
{
  "s" : "<s-key>"
}
``` 

## Implementation notes

- 
