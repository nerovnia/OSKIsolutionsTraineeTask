class UserController {
  async login(req, res, next) {
    try {
      res.status(200).json({});
    } catch (err) {
      res.status(500).json({ message: "Error on the server side." });
    }
  }

  async logout(req, res, next) {
    try {
      res.status(200).json({});
    } catch (err) {
      res.status(500).json({ message: "Error on the server side." });
    }
  }

  async refresh(req, res, next) {
    try {
      res.status(200).json({});
    } catch (err) {
      res.status(500).json({ message: "Error on the server side." });
    }
  }
}

module.exports = new UserController();
