module.exports = {
  accessTokenAliveTimeTxt: "15m",
  refreshTokenAliveTimeTxt: "3d",
  accessTokenAliveTime: 15 * 60 * 1000,
  refreshTokenAliveTime: 3 * 24 * 60 * 60 * 1000,
  MongoDB: {
    selectionTimeout: 30 * 1000,
    restartSec: 5 * 1000,
  },
  authentication: {
    password: {
      min: 4,
      max: 15,
    },
  },
};
