// code reqd for sending emails related to account - sign up and delete
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kushbaheti@gmail.com',
        subject: "Thanks for joining Kush Baheti's Task App!",
        text: `Welcome to the Task App, ${name}. Feel free to reach out and shoot an email to kushbaheti@gmail.com in case of inquiries or suggestions.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "kushbaheti@gmail.com",
        subject: "We're sorry you're leaving :(",
        text: `We regret to see you go, ${name}. Would you mind telling us what went wrong?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}