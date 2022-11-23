

export interface FirestoreUser {email:string, nombre:string, uid:string}
export class Usuario {

    static fromFireStore( { email, nombre, uid }:FirestoreUser ){

        return new Usuario( email, nombre, uid )
    }
    
    constructor(
        public email: string,
        public nombre: string,
        public uid: string,
    ){}
}