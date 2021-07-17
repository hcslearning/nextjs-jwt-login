import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const [loaded, setLoaded] = useState(false) 
  const [autorizado, setAutorizado] = useState(false) 
  const [countdown, setCountdown] = useState(3)

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
          <h1 className="mb-3">Dashboard</h1>  
        </>
      }

      


      
    </Layout>
  )
}
