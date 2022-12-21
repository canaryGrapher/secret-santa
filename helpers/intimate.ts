import email from "./emailProvider"
import client from "../config/mail.config";

const sendMailer = async (props: {
    santaName: string,
    receiverName: string,
    santaUsername: string,
    santaEmail: string,
    receiverEmail: string,
    receiverUsername: string,
    receiverDepartment: string
}) => {

    const emailTemplate = email({
        sender_name: props.santaName,
        to_name: props.receiverName,
        from_username: props.santaUsername,
        to_email: props.receiverEmail,
        to_department: props.receiverDepartment,
        password_part: 3,
        password_substring: "23423",
    });

    console.log("Sending mail");
    try {
        const message = await client.sendAsync({
            text: `Secret Santa is onnn!!`,
            from: 'santa@yasharyan.com',
            to: `${props.santaEmail}`,
            subject: `Secret Santa | ${props.santaUsername}`,
            attachment: [
                { data: `${emailTemplate}`, alternative: true }
            ]
        });
        console.log(message);
    } catch (err) {
        console.error(err);
    }
}

export default sendMailer;