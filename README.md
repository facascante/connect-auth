connect-auth
============

Version 1 of the API is limited to Connect Authentication and Registration functionality.
The API is [REST API](http://en.wikipedia.org/wiki/Representational_State_Transfer "RESTful").
Currently, return format for all endpoints is [JSON](http://json.org/ "JSON").

## Checklist

* Familiarize yourself with API functionality
* Read the AS API Terms of Use
* Contact Voyager to get access to the API
* Hack away

## Mechanics

#### Connection handling

- Connections are over HTTP/S
- Any HTTP response other than "200 OK" is an error
- All "200 OK" responses have a JSON document in the body describing the actual result of the request

#### Error response

Errors in the API have an error object in the response

- For validation errors with specific field mapping
```json
{
  "error": [
    {
         "code": <error code>,
         "message": <error message>,
         "param" : <field that cause error>,
         "value" : <submitted value>
    },
    ...
    
  ],
}
```

- For other errors
```json
{
  "error": {
       "code": <error code>,
       "message": <error message>
   },
   ...
}
```

## Endpoints

#### Resources
| Resource                                  | Description     | Status | Notes | 
| ------------------------------------------| -----------| ------| --------|
| **[<code>POST</code> api/v1/users/register (https://github.com/facascante/connect-auth/blob/master/docs/endpoint/register.md)**| Registration|||



