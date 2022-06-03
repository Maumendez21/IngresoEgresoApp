export class User{

    static fromFirebase({email, uid, name}: any){
        return new User(uid, name, email);
    }
    
    constructor(
        public uid: string,
        public name: string,
        public email: string
    ) {}
}