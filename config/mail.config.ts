import { SMTPClient } from 'emailjs';

const client = new SMTPClient({
    user: '2yash.aryan@gmail.com',
    password: 'djenagvxplrhnton',
    host: 'smtp.gmail.com',
    ssl: true,
});

export default client;