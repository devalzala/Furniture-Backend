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
    VENDOR_ALREADY_EXISTS: 'Vendor already exists',
    VENDOR_REGISTERED_SUCCESSFULLY: 'Vendor registered successfully',

    // Forgot & Reset Password
    EMAIL_REQUIRE: 'Email is required',
    USER_NOT_FOUND: 'User not found',
    INVALID_TOKEN: 'Invalid or expired token',
    PASSWORD_RESET_SUCCESSFULL: 'Password reset successful',
   
    // Products
    PRODUCT_CREATED_SUCCESSFULLY:'Product created successfully',
    PRODUCT_FATCHED_SUCCESSFULLY:'Products fetched successfully',
    PRODUCT_UPDATED_SUCCESSFULLY:'Product updated successfully',
    PRODUCT_DELETED_SUCCESSFULLY:'Product deleted Succefully',

    // Contect Us
    CONTACT_ALREADY_EXISTS: "Contact already exists",
    CONTACT_SAVED_SUCCESSFULLY: "Contact saved successfully",
    CONTACTS_FETCHED_SUCCESSFULLY: "Contact details fetched successfully",
    NO_CONTACTS_FOUND: "No contact details found",
};

module.exports = {
    messages,
    status,
};
