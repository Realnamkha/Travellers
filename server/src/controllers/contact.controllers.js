import nodemailer from "nodemailer";

export const handleContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Setup Nodemailer transporter (using Gmail example)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: process.env.RECEIVER_EMAIL, // Your support email
      subject: `New contact form message from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    // Optionally save message to DB here

    return res
      .status(200)
      .json({ message: "Message received and email sent!" });
  } catch (error) {
    console.error("Error handling contact form:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
