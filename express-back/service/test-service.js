const TestDBModel = require("../models/test-model");
const tests = require("../data/demo/tests");

class TestService {
  /***********************************************
   * Fill database tests if collection is empty
   **/
  async fillTests() {
    const result = await TestDBModel.findOne({}).exec();
    if (!result) {
      await tests.map(async (inTest) => {
        const test = await TestDBModel.create(inTest);
        test.save();
      });
    }
  }
}

module.exports = new TestService();
