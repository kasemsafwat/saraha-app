import userModel from "../../../DB/models/User.model.js";
import * as bcrypt from "bcrypt";
import nodemailer from "nodemailer";




const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


const sendConfirmationEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Welcome to Our App!",
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1>Welcome ${userName}!</h1>
        <p>Thank you for registering with our application.</p>
        <p>We're excited to have you on board!</p>
        <p>Best regards,<br>Your App Team</p>
      </div>
    `,
  };
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};



export const register = async (req, res) => {
  try {
      const { userName, email, password, confirmedPassword } = req.body;

      if (password != confirmedPassword) {
        return res
          .status(422)
          .json({
            message: "password and confirmedPAssword should be matched",
          });
      }

      if (await userModel.findOne({ email })) {
        return res.status(409).json({ message: "Email already Exist" });
      }


      const hashPassword = bcrypt.hashSync(
        password,
        parseInt(process.env.SALT_ROUND)
      );
      const user = await userModel.create({ userName, email , password: hashPassword });


      const objectUser = user.toObject();
      delete objectUser.password;
      res.status(200).json({ message: "Welcome to register page", objectUser });
    
  } catch (error) {
      res.status(500).json({ message: "Server Errore", error:error.message });
    
  }

};

export const login = async (req, res) => {
  try {
    const { userName, email, password } = req.body;


    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "Email Not Exist" });
    }

    const match = bcrypt.compareSync(password,user.password)

    if(!match){
    return  res.status(400).json({ message: "invalid PAssword"});
    
    }
    const obectUser = user.toObject();
    delete obectUser.password;
    res.status(200).json({ message: "Welcome to saraha app", obectUser });
  } catch (error) {
    res.status(500).json({ message: "Server Errore", error: error.message });
  }
};