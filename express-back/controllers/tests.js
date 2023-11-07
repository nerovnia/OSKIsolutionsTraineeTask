const getAllowedTests = async (req, res, next) => {
  try {
    res.status(200).json(new ContactsReqDTO(result.email, result.address));
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getContacts, updateContacts };
