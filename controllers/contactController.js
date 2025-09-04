const Contact = require("../models/contactSchema");
const { status, messages } = require('../utils/index');

// CREATE Contact
exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res.status(status.BadRequest).json({
        message: messages.CONTACT_ALREADY_EXISTS,
      });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(status.OK).json({
      message: messages.CONTACT_SAVED_SUCCESSFULLY,
    });
  } catch (err) {
    console.error("Create contact error:", err);
    res.status(status.InternalServerError).json({
      error: "Server error (Create Contact): " + err.message,
      contact: [],
    });
  }
};

// GET All Contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    const count = contacts.length;

    res.status(status.OK).json({
      message: count > 0 ? messages.CONTACTS_FETCHED_SUCCESSFULLY : messages.NO_CONTACTS_FOUND,
      count,
      contacts,
    });
  } catch (err) {
    console.error("Get contacts error:", err);
    res.status(status.InternalServerError).json({
      error: "Server error (Get Contacts): " + err.message,
      contacts: [],
    });
  }
};
