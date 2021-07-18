import { NextApiRequest, NextApiResponse } from "next"
import { Security } from "../../lib/Security"

export default (req:NextApiRequest, res:NextApiResponse) => {
  let jsonData = null
  const action = req.query?.action
  const security = new Security()
  security.setEncryptkey( req.headers['user-agent'] )
  
  const dummyData = {patente: 'RB8102', propietario: 'María Mercedes Rebolledo Rebolledo'}
  
  const tokenNoValido = () => res.status(401).json({error: 'Token no autorizado'})

  switch( action ) {
    case 'login':      
      // validaciones
      if( req.method.toUpperCase() != 'POST' ) {
        return res.status(405).json({error: 'Método no permitido.'})
      }
      const email:string = req.body?.email
      const password:string = req.body?.password
      let usuario = security.findUser(email, password)            
      if( usuario == null){
        return res.status(401).json({error: "Usuario no encontrado"})
      }
      jsonData = {
        usuario: usuario.email
      }
      let token = security.generateToken( jsonData )
      jsonData.token = token 
      break
    case 'data':
      // metodo que necesita autenticacion vía token      
      const tokenHeader = req.headers['authorization']?.toString()?.replace('Bearer ', '')
      try {
        security.verifyToken( tokenHeader )
        jsonData = dummyData
      } catch(err) {
        return tokenNoValido()
      }
      break
    case 'browser':
      // metodo libre, sin necesidad de token
      jsonData = {accion: 'other', browser: req.headers['user-agent']}
      break 
    default:      
      return res.status(400).json({error: 'Debe especificar una acción.'}) 
  }
  res.json( jsonData )
}
