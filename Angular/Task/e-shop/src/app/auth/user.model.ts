export class User {
  public id: string;
  public email: string;
  public question: string | null;
  public answer: string | null;
  public password: string;
  public _token: string;
  public _tokenExpirationDate: Date;
  public role: string | null;

  constructor(
      id: string,
      email: string,
      password: string,
      token: string,
      tokenExpirationDate: Date,
      role?: string,
      question?: string,
      answer?: string,
  ) {
      this.id = id;
      this.email = email;
      this.password = password;
      this._token = token;
      this._tokenExpirationDate = tokenExpirationDate;
      this.role = role || 'buyer';
      this.question = question || '';
      this.answer = answer || '';
  }

  
}
