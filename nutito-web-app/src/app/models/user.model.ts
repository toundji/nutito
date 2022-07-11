export class User {

  constructor(
    public id?:	number,
    public firstname?:	string,
    public lastname?:	string,
    public gender?:	string,
    public email?:	string,
    public phone?:	string,
    public ifu?:	string,
    public birth_date?:	string,
    public birth_place?:	string,
    public address?:	string,
    public country?:	string,
    public city?:	string,
    public password?:	string,
    public user_type?:	string,
    public verification_token?:	string,
    public active?:	boolean,
    public profile_picture?:	any,
    public profile?:	any,
    public agents?:	any,
    public companies?: any,
    public created_at?:	string,
    public updated_at?:	string,
    public deleted_at?:	string,
    public creator_id?:	number,
    public updater_id?:	number,
    public slug?:	string
  ) {}

}
