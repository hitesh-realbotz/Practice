export class User {
    public email: string;
    public id: string;
    public role: string | null;
    public question: string | null;
    public answer: string | null;
    private _token: string;
    private _tokenExpirationDate: Date;
  
    constructor(
      email: string,
      id: string,
      token: string,
      tokenExpirationDate: Date,
      role?: string,
      question?: string,
      answer?: string
    ) {
      this.email = email;
      this.id = id;
      this._token = token;
      this._tokenExpirationDate = tokenExpirationDate;
      this.role = role || 'buyer';
      this.question = question || '';
      this.answer = answer || '';
    }
  }
  