import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { usuarios } from '../../data/usuarios'

export default (req:NextApiRequest, res:NextApiResponse) => {
  const action = req.query?.action
  let jsonData = null
  const saltLength = 15
  const encryptKey1 = 'abcdefgijklmnzyxwvuts2021'
  const dummyData = {patente: 'RB8102', propietario: 'María Mercedes Rebolledo Rebolledo'}

  switch( action ) {
    case 'login':      
      // validaciones
      if( req.method.toUpperCase() != 'POST' ) {
        return res.status(405).json({error: 'Método no permitido.'})
      }
      const email:string = req.body?.email
      const password:string = req.body?.password
      let usuario = null 
      
      for(let i = 0; i < usuarios.length; i++) {
        if( bcrypt.compareSync(password, usuarios[i].passwordEncoded) ) {
          usuario = usuarios[i]
          const encryptKey2 = req.headers['user-agent']
          const privateKey = encryptKey1 + encryptKey2
          const userToken = jwt.sign(usuario, privateKey, {expiresIn: "3h"}) 
          jsonData = {
            usuario: usuario.email,
            token: userToken
          }
          break
        }
      }
      if( usuario == null){
        res.status(401).json({error: "Usuario no encontrado"})
      }

      break
    case 'verify':
      if( req.query?.token ) {
        const encryptKey2 = req.headers['user-agent']
        const privateKey = encryptKey1 + encryptKey2
        try {
          const obj = jwt.verify(req.query?.token?.toString(), privateKey)
          jsonData = obj  
        } catch (error) {
          return res.status(401).json({error: 'Usuario no autorizado.'})  
        }
      } else {
        return res.status(400).json({error: 'Debe especificar un token.'})
      }
      break
    case 'data':
      const browser = req.headers['user-agent']      
      jsonData = {accion: 'other', browser}
      break 
    default:      
      return res.status(400).json({error: 'Debe especificar una acción.'}) 
  }
  res.json( jsonData )
}
