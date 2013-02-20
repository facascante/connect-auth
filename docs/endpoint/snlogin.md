# **<code>POST</code> api/v1/users/snlogin**

## Description
Authenticate user via facebook

## Parameters

- **token** [String] _(M)_ — Account registered facebook token with email access.

## Response

- **success**

## Errors

- **400**:Invalid or Missing Parameter
- **408**:Request timeout
- **503**: Service Unavailable

## Example

**Request**

```
POST api/v1/users/snlogin HTTP/1.1
Content-Type: application/json
```
``` json
{ 
  "token" : <token>
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
