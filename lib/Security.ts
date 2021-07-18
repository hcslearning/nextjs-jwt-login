import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { usuarios } from '../data/usuarios'

export class TokenInvalidException {
    message:string = 'Token inválido.'

    constructor(message:string) {
        this.message = message
    }
}

export class Security {

    saltLength = 15 // usar como variables de ambiente privadas
    encryptKey = 'abcdefgijklmnzyxwvuts2021' // usar como variables de ambiente privadas

    setEncryptkey(s:string) {
        this.encryptKey += s 
    }

    findUser(user:string, password:string) {
        for(let i = 0; i < usuarios.length; i++) {
            if( bcrypt.compareSync(password, usuarios[i].passwordEncoded) ) {
                return usuarios[i]
            }
        }
        return null 
    }

    encryptPassword(password:string) {
        return bcrypt.hashSync(password, this.saltLength)
    }

    generateToken(payload:any) {
        return jwt.sign(payload, this.encryptKey, {expiresIn: '3h'})
    }

    verifyToken(token:string) {
        try {
            return jwt.verify(token, this.encryptKey)
        } catch(err) {
            throw new TokenInvalidException('Token inválido.')
        }
        
    }


}