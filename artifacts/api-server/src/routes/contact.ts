
import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";

const router: IRouter = Router();

const allowedProducts = new Set([
  "Charging sockets",
  "AC chargers",
  "DC chargers",
  "Charging support",
  "Other query",
]);

function cleanString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

router.post("/contact", async (req, res) => {
  const name = cleanString(req.body?.name, 100);
  const phone = cleanString(req.body?.phone, 20);
  const email = cleanString(req.body?.email, 254);
  const product = cleanString(req.body?.product, 100);
  const city = cleanString(req.body?.city, 100);

  if (!name || !phone || !email || !product || !city) {
    return res.status(400).json({
      message: "Please complete all required fields.",
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address.",
    });
  }

  if (!/^[+()\d\s.-]{7,20}$/.test(phone)) {
    return res.status(400).json({
      message: "Please enter a valid phone number.",
    });
  }

  if (!allowedProducts.has(product)) {
    return res.status(400).json({
      message: "Please select a valid product or service.",
    });
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL,
  } = process.env;

  if (
    !SMTP_HOST ||
    !SMTP_PORT ||
    !SMTP_USER ||
    !SMTP_PASS ||
    !CONTACT_FROM_EMAIL
  ) {
    console.error("Contact form SMTP environment variables are missing.");
    return res.status(503).json({
      message: "The enquiry service is temporarily unavailable. Please email sales@vjratechnologies.com.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL || "sales@vjratechnologies.com",
      replyTo: { name, address: email },
      subject: `Website enquiry: ${product} — ${name}`,
      text: [
        "New enquiry received from eviz.in",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Product / Service: ${product}`,
        `City: ${city}`,
      ].join("\n"),
    });

    return res.status(200).json({
      message: "Your enquiry has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact form email delivery failed:", error);
    return res.status(500).json({
      message: "We couldn't send your enquiry right now. Please try again or email sales@vjratechnologies.com.",
    });
  }
});

export default router;
