class Project {
    name: string;
    description: string;
    encryptedPassword: string;

    constructor(name, description, encryptedPassword) {
        this.name = name;
        this.description = description;
        this.encryptedPassword = encryptedPassword;
    }
}