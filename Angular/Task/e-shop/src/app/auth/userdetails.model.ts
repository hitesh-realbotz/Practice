export class UserDetails {
    public id: string;
    public email: string;
    public cart?: number[] | null;

    constructor(
        id: string,
        email: string,
        cart?: number[],
        
    ) {
        this.id = id;
        this.email = email;
        this.cart = cart || []; 
    }
}