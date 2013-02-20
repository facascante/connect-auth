# **<code>POST</code> api/v1/users/snlink**

## Description
Register new account information via social network.

## Parameters

- **token** [String] _(M)_ — Account valid facebook token with email acsess.
- **min** [String] _(M)_ — Account valid mobile identification number.
- **puk1** [String] _(M)_ — Account valid puk 1 number.

## Response

- **success**

## Errors

- **400**:Invalid or Missing Parameter
- **408**:Request timeout
- **503**: Service Unavailable

## Example

**Request**

```
POST api/v1/users/snlink HTTP/1.1
Content-Type: application/json
```
``` json
{ 
  "token" : <token>, 
  "min" : <min>, 
  "puk1" : <puk1>
}
``` 

**Return**

``` json
{
  "success" : "ok"
}
``` 

## Implementation notes

- puk1 reference is not yet clear and might change to pin but still subject for clarification
- mobile number is unique
- email address is unique
- puk1 should exist in puk list and should match with mobile number
