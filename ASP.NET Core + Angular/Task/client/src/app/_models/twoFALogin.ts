export class TwoFALogin {
    public email: string;
    public code: string;
    
    constructor(email: string, code: string) {
        this.email = email;
        this.code = code;
    }
}