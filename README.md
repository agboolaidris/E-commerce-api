# Introduction
This is a minimal Ecommerce-api with some advance features developed using nodejs, typescript, expressjs and mongodb.
The API is available at https://ecommerce-api-subdomain.herokuapp.com/

##Authentication

##### Only admin can register from this endpoint.
##### The request body needs to be in JSON format and include the following properties:
  ###### username - String *required unique min-length=2
  ###### email - String *required unique
  ###### password - String *required min-length=6 
  ###### confirmpassword - String *required
  ###### mobile - string not-required
##### If register is successful response will be sent with a status 200.
