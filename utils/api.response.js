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
    INVALID_TOKEN: 'Invalid or expired token',
    PASSWORD_RESET_SUCCESSFULL: 'Password reset successful',
    EXISTING_EMAIL: 'User already exists with this email',
    
    // User
    USER_NOT_FOUND: 'User not found',
    USER_UPDATED_SUCCESSFULLY: 'User Updated Sucessfully',

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

    // Wishlist Messages
    WISHLIST_UPDATED_SUCCESSFULLY: "Wishlist updated successfully",
    WISHLIST_CLEARED_SUCCESSFULLY: "Wishlist cleared successfully",
    WISHLIST_FETCHED_SUCCESSFULLY: "Wishlist fetched successfully",
    WISHLIST_NOT_FOUND: "Wishlist not found",

    // Address
    ADDRESS_CREATED_SUCCESSFULLY: "Address created successfully",
    ADDRESSES_FETCHED_SUCCESSFULLY: "Addresses fetched successfully",
    ADDRESS_FETCHED_SUCCESSFULLY: "Address fetched successfully",
    ADDRESS_UPDATED_SUCCESSFULLY: "Address updated successfully",
    ADDRESS_DELETED_SUCCESSFULLY: "Address deleted successfully",
    ADDRESS_NOT_FOUND: "Address not found",

    // Blogs
    BLOG_CREATED_SUCCESSFULLY: "Blog created successfully",
    BLOGS_FETCHED_SUCCESSFULLY: "Blogs fetched successfully",
    BLOG_FETCHED_SUCCESSFULLY: "Blog fetched successfully",
    BLOG_UPDATED_SUCCESSFULLY: "Blog updated successfully",
    BLOG_DELETED_SUCCESSFULLY: "Blog deleted successfully",
    BLOG_NOT_FOUND: "Blog not found",

    // Category
    CATEGORY_CREATED_SUCCESSFULLY: "Category created successfully",
    CATEGORIES_FETCHED_SUCCESSFULLY: "Categories fetched successfully",
    CATEGORY_FETCHED_SUCCESSFULLY: "Category fetched successfully",
    CATEGORY_UPDATED_SUCCESSFULLY: "Category updated successfully",
    CATEGORY_DELETED_SUCCESSFULLY: "Category deleted successfully",
    CATEGORY_NOT_FOUND: "Category not found",

    // Sub-Categories
    SUBCATEGORY_CREATED_SUCCESSFULLY: "Subcategory created successfully",
    SUBCATEGORIES_FETCHED_SUCCESSFULLY: "Subcategories fetched successfully",
    SUBCATEGORY_FETCHED_SUCCESSFULLY: "Subcategory fetched successfully",
    SUBCATEGORY_UPDATED_SUCCESSFULLY: "Subcategory updated successfully",
    SUBCATEGORY_DELETED_SUCCESSFULLY: "Subcategory deleted successfully",
    SUBCATEGORY_NOT_FOUND: "Subcategory not found"
};

module.exports = {
    messages,
    status,
};
