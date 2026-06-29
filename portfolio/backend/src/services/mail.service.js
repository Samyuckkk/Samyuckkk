const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

async function sendContactMail({
    name,
    email,
    phone,
    message
}){

    const contact = email ? email : phone

    await transporter.sendMail({

        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,

        to: process.env.EMAIL_USER,

        subject: `🚀 New Portfolio Contact from ${name}`,

        html: `
            <div style="
                font-family:Arial,sans-serif;
                max-width:600px;
                margin:auto;
                border:1px solid #ddd;
                border-radius:12px;
                overflow:hidden;
            ">

                <div style="
                    background:#111;
                    color:#fff;
                    padding:20px;
                ">
                    <h2 style="margin:0;">
                        🚀 New Portfolio Contact
                    </h2>
                </div>

                <div style="padding:20px;">

                    <p>
                        <strong>Name:</strong><br>
                        ${name}
                    </p>

                    <p>
                        <strong>Contact:</strong><br>
                        ${contact}
                    </p>

                    <p>
                        <strong>Message:</strong>
                    </p>

                    <div
                        style="
                            background:#f5f5f5;
                            padding:15px;
                            border-radius:10px;
                            white-space:pre-wrap;
                        "
                    >
                        ${message}
                    </div>

                    <br>

                    <hr>

                    <p style="color:gray;">
                        Sent from Portfolio Contact Form
                    </p>

                </div>

            </div>
        `
    })

    if(email){

        await transporter.sendMail({

            from: `"Samyak Oholkar" <${process.env.EMAIL_USER}>`,

            to: email,

            subject: "Thanks for reaching out!",

            html: `
                <div style="
                    font-family:Arial,sans-serif;
                    max-width:600px;
                    margin:auto;
                ">

                    <h2>
                        Thanks for contacting me 👋
                    </h2>

                    <p>
                        Hi <b>${name}</b>,
                    </p>

                    <p>
                        I received your message and will get back to you as soon as possible.
                    </p>

                    <br>

                    <p>
                        Have a great day!
                    </p>

                    <br>

                    <b>
                        Samyak Oholkar
                    </b>

                </div>
            `
        })

    }

}

module.exports = {
    sendContactMail
}