import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const [loaded, setLoaded] = useState(false) 
  const [autorizado, setAutorizado] = useState(false) 
  const [countdown, setCountdown] = useState(3)
  const [token, setToken] = useState('')
  const [data, setData] = useState({patente:'', propietario: ''})

  const loadData = async (authorizationToken) => {
    console.log("Enviando peticion con token: "+authorizationToken)
    const res = await fetch('/api/ws?action=data', {
      method: 'GET',
      headers: {              
        'Authorization': 'Bearer '+authorizationToken              
      }
    })
    if( res.status != 200 ) {
      router.push('/login')
    }
    const dj = await res.json()              
    setData(dj)
  }

  useEffect( () => {
    // revisa que existe localStorage
    if( !localStorage ) {
      return 
    }

    // si no existe token
    // o no es válido
    if( loaded && !autorizado ) {
      if(countdown == 0) {
        router.push('/login')
      } else {
        setTimeout( () => setCountdown( countdown - 1 ), 1000 )        
      }
    }

    if( !loaded ) {
      const tokenFromStorage = localStorage.getItem('token')
      setToken( tokenFromStorage )
      if( tokenFromStorage?.length > 0) {        
        loadData(tokenFromStorage)
        setAutorizado(true)
      }
      setLoaded(true)
    }

    return function cleanup(){
      setCountdown( countdown - 1 )
    }
  }) 

  return (
    <Layout>

      <Head>
        <title>Dashboard - NextJS JWT Login</title>
        <meta name="description" content="Ejemplo de login usando JWT y bcryptjs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      { /* Acceso NO Autorizado */
        !autorizado && 
        <>
          <h1 className="mb-3">No autorizado</h1>  
          <p>Se redireccion en {countdown} segundos</p>
        </>
      }

      { /* Acceso Autorizado */
        autorizado && 
        <>
          <h1 className="mb-3">Data</h1>  
          
          <p>Patente: {data?.patente}</p>
          <p>Propietario: {data?.propietario}</p>

          <button className="btn btn-primary" onClick={() => {loadData(token)}}>Try again</button>
        </>
      }

      


      
    </Layout>
  )
}
