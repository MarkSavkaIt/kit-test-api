import express, { Response, Request, Router } from "express";
import User from "../../../schemas/User/user";
import jsonwebtoken from "jsonwebtoken";
import { checkAuth } from "../../../middlewares/checkAuth";
const jwt = jsonwebtoken;

const login: Router = express.Router();

login.use(express.json());

login.get("/", (req: Request, res: Response) => {
  res.status(200).send("Login get works");
});

login.post("/", async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!email) {
    res.send("Email is not defiden");
  } else if (user) {
    const token: any = jwt.sign(
      { user_id: user._id, email: user.email },
      "secret key",
      {
        expiresIn: "1h",
      }
    );
    await User.updateOne({ email }, { reg_token: token });
    res.send({ message: "Wellcome", token });
  } else {
    res.send({ message: "User is not defined" });
  }
});

export default login;
