export class UserDetails {
    public id: string;
    public email: string;
    public role: string | null;

    constructor(
        id: string,
        email: string,
        
    ) {
        this.id = id;
        this.email = email;
        
    }
}
