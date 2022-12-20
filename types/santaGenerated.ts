export type UserDetails = {
    id: number;
    name: string;
    email: string;
    team: string;
    username: string;
}

export type santaDetails = {
    santa: UserDetails;
    receiver: UserDetails;
}