const status = {
    OK: 200,
    NotModified: 304,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404,
    NotAcceptable: 406,
    Conflict: 409,
    InternalServerError: 500,
};
const messages = {
    
    // Login
    EMAIL_AND_PASSWORD_REQUIRE: 'Email and password are required',
    INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
    LOGIN_SUCCESSFUL: 'Login successful',

    // Registration
    USER_ALREADY_EXISTS: 'User already exists',
    USER_REGISTERED_SUCCESSFULLY: 'User registered successfully',

    // Products
    PRODUCT_CREATED_SUCCESSFULLY:'Product created successfully',
    PRODUCT_FATCHED_SUCCESSFULLY:'Products fetched successfully',
    PRODUCT_UPDATED_SUCCESSFULLY:'Product updated successfully',
    PRODUCT_DELETED_SUCCESSFULLY:'Product deleted Succefully',
    
};

module.exports = {
    messages,
    status,
};
