const getAllowedTests = async (req, res, next) => {
  try {
    console.log("-----------------------------------");
    res.status(200).json({});
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getAllowedTests };
