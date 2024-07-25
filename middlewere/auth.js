import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "not logged In Login again",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRETE);

    if (!decodedToken) {
      return res.json({
        success: false,
        message: "not authorised! Login again",
      });
    }

    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

export { authMiddleware };
