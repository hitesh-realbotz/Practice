export class User {
    constructor(
        public email: string,
        public id: string,
        public role: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }


}