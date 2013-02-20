# **<code>PUT</code> api/v1/users/:id**

## Description
Update profile information.

## Parameters

- **email** [String] _(M)_ — Account valid email address.
- **password** [String] _(M)_ — Account preferred password.
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
PUT api/v1/users/:id HTTP/1.1
Content-Type: application/json
```
``` json
{ 
  "email" : <email>, 
  "password" : <pasword>, 
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
