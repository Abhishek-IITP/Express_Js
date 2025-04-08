const { verifyJWT } = require("../Utils/generateTokens");

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({
      success: false,
      message: "Authorization header is missing. Please sign in.",
    });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token is missing. Please sign in.",
    });
  }
  try {
    let user = await verifyJWT(token);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token. Please sign in.",
      });
    }
    req.user = user.id;
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Tokken missing",
    });
  }
};
module.exports = verifyUser;
