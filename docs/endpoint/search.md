# **<code>GET</code> api/v1/users/:id**

## Description
get account information.

## Parameters

- **id** [String] _(M)_ — Account identifier.

## Response

- **success**

## Errors

- **400**:Invalid or Missing Parameter
- **408**:Request timeout
- **503**: Service Unavailable

## Example

**Request**

```
GET api/v1/users/:id HTTP/1.1
Content-Type: application/json
```
**Return**

``` json
{
  "email" : <email>,
  "min" : <min>
}
``` 

## Implementation notes

