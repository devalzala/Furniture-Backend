const Address = require("../models/address");
const User = require("../models/userSchema");
const { status, messages } = require("../utils/index");

// Create Address
exports.createAddress = async (req, res) => {
  try {
    const { userId, firstName, email, addressLine, phone } = req.body;

    if (!userId || !firstName || !email || !addressLine || !phone) {
      return res.status(status.BadRequest).json({ message: "userId, firstName, email, addressLine, and phone are required" });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(status.BadRequest).json({ message: "Invalid userId: User does not exist" });
    }

    const address = new Address(req.body);
    await address.save();

    res.status(status.OK).json({
      message: messages.ADDRESS_CREATED_SUCCESSFULLY,
      address
    });
  } catch (err) {
    console.error("Create Address Error:", err);
    res.status(status.InternalServerError).json({ message: "Server error", error: err.message });
  }
};

// READ - Get all addresses
exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find().sort({ createdAt: -1 });

    res.status(status.OK).json({
      message: messages.ADDRESSES_FETCHED_SUCCESSFULLY,
      count: addresses.length,
      addresses
    });
  } catch (err) {
    console.error("Get All Addresses Error:", err);
    res.status(status.InternalServerError).json({ message: "Server error", error: err.message });
  }
};

// READ - Get address by User ID
exports.getAddressesByUserId = async (req, res) => {
  try {
    const { id: userId } = req.query;

    if (!userId) {
      return res.status(status.BadRequest).json({ message: "userId is required" });
    }

    const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

    if (!addresses || addresses.length === 0) {
      return res.status(status.NotFound).json({ message: messages.ADDRESS_NOT_FOUND });
    }

    res.status(status.OK).json({
      message: messages.ADDRESSES_FETCHED_SUCCESSFULLY,
      count: addresses.length,
      addresses
    });
  } catch (err) {
    console.error("Get Addresses by User Error:", err);
    res.status(status.InternalServerError).json({ message: "Server error", error: err.message });
  }
};

// UPDATE - Update address by ID
exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, firstName, lastName, email, company, addressLine, city, country, postalCode, phone } = req.body;

    if (!userId) {
      return res.status(status.BadRequest).json({ message: "userId is required" });
    }

    const address = await Address.findById(id);
    if (!address) {
      return res.status(status.NotFound).json({ message: messages.ADDRESS_NOT_FOUND });
    }

    // Ensure the address belongs to the user
    if (address.userId !== userId) {
      return res.status(status.Unauthorized).json({ message: "Unauthorized to update this address" });
    }

    // Update fields explicitly
    address.firstName = firstName || address.firstName;
    address.lastName = lastName || address.lastName;
    address.email = email || address.email;
    address.company = company || address.company;
    address.addressLine = addressLine || address.addressLine;
    address.city = city || address.city;
    address.country = country || address.country;
    address.postalCode = postalCode || address.postalCode;
    address.phone = phone || address.phone;

    await address.save();

    res.status(status.OK).json({
      message: messages.ADDRESS_UPDATED_SUCCESSFULLY,
      address
    });
  } catch (err) {
    console.error("Update Address Error:", err);
    res.status(status.InternalServerError).json({ message: "Server error", error: err.message });
  }
};

// DELETE - Delete address by ID
exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findByIdAndDelete(id);
    if (!address) {
      return res.status(status.NotFound).json({ message: messages.ADDRESS_NOT_FOUND });
    }

    res.status(status.OK).json({
      message: messages.ADDRESS_DELETED_SUCCESSFULLY
    });
  } catch (err) {
    console.error("Delete Address Error:", err);
    res.status(status.InternalServerError).json({ message: "Server error", error: err.message });
  }
};
