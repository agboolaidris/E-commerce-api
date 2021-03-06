# Introduction

This is a minimal Ecommerce-api with some advance features developed using nodejs, typescript, expressjs and mongodb.
The API is available at https://ecommerce-api-subdomain.herokuapp.com/

# Authentication

## Admin Authentication

### POST api/auth/admin/register

### Only admin can register from this endpoint.

### The request body needs to be in JSON format and include the following properties:

#### username - String \*required unique min-length=2

#### email - String \*required unique

#### password - String \*required min-length=6

#### confirmpassword - String \*required

#### mobile - string not-required

### If register is successful response will be sent with a status 200.

### POST api/auth/admin/login

### Only admin can login from this endpoint.

### The request body needs to be in JSON format and include the following properties:

#### email - String \*required

#### password - String \*required

### If login is successful, response will contain authentication cookie with a status of 200.

### GET api/auth/admin/isme

### Only admin is authorize from this endpoint

### Requires authentication.

### The request body needs to be empty.

### The response return admin information with a status 200

### GET api/auth/admin/logout

### Only admin is authorize from this endpoint

### Requires authentication.

### The request body needs to be empty.

### The response status 200

## User Authentication

### POST api/auth/user/register

### Only user can register from this endpoint.

### The request body needs to be in JSON format and include the following properties:

#### username - String \*required unique min-length=2

#### email - String \*required unique

#### password - String \*required min-length=6

#### confirmpassword - String \*required

#### mobile - string not-required

### If register is successful response will be sent with a status 200.

### POST api/auth/user/login

### Only user can login from this endpoint.

### The request body needs to be in JSON format and include the following properties:

#### email - String \*required

#### password - String \*required

### If login is successful, response will contain authentication cookie with a status of 200.

### GET api/auth/user/isme

### Only user is authorize from this endpoint

### Requires authentication.

### The request body needs to be empty.

### The response return admin information with a status 200

### GET api/auth/user/logout

### Only user is authorize from this endpoint

### Requires authentication.

### The request body needs to be empty.

### The response status 200

# Category

## create category

### POST api/category

### Requires authentication and only admin is authorize.

### The request body needs to be in JSON format and include the following properties:

#### name - string - Required unique

#### parentId - string - not-Required

#### parentId is needed when you want to create a sub-category eg Television category under electronic category.

### The response return category data with a status 200

## get category

### GET api/category

### Allows you to get all the categories. authorization not required

### The request body needs to be empty

### The response return array of category with a status 200.

## update category

### PUT api/category/:categoryId

### Allows you to update category. Requires authentication and only admin is authorize.

### The request body needs to be in JSON format and include the following properties:

#### name - string - Required unique

#### parentId - string - not-Required

#### parentId is needed when you want to create a sub-category eg Television category under electronic category.

### The response return category data with a status 200

## Delete category

### Delete api/category/:categoryId

### Allows you to delete category. Requires authentication and only admin is authorize.

### only category that product doesn't attach to it can be delete.

### The request body needs to be empty

### The response return a status 200
