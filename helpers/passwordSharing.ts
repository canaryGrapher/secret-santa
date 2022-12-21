import client from "../config/mail.config";

const intimateKeepers = async (props: {
    key_part: number,
    keeper: string,
    key: string
}) => {

    console.log("Sending mail");
    try {
        const message = await client.sendAsync({
            text: `Your password is ${props.key} and the part number is ${props.key_part}`,
            from: 'santa@yasharyan.com',
            to: `${props.keeper}`,
            subject: `Secret Santa Encryption password distribution`,
            attachment: [
                { data: `<html><h1>Secret Santa</h1><p>Your password is ${props.key} and the part number is ${props.key_part}</p></html>`, alternative: true }
            ]
        });
        console.log(message);
    } catch (err) {
        console.error(err);
    }
}

export default intimateKeepers;