type Project = {
    name: string;
    description: string;
    encryptedPass: string;
    token?: string; 
    _id?: string;
}

type Participant = {
    _id: string;
}

export {Project}