import Head from 'next/head'

export default function Login(){
    return (
        <div className="container-fluid bg-dark vh-100 m-0 p-0">
            
            <Head>
                <title>NextJS JWT Login</title>
                <meta name="description" content="Ejemplo de login usando JWT y bcryptjs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="row justify-content-center">

                <div className="py-5 col-md-5 col-lg-3 col-sm-10">

                    <form method="post" action="/api/ws?action=login" className="py-5 px-5 mb-5 bg-light rounded-3">
                        <h1 className="fs-3 mb-5 text-center">Login Form</h1>
                        <div>
                            <input name="email" id="inputEmail" type="email" className="form-control form-control-lg" placeholder="Email" />
                            <label htmlFor="inputEmail"></label>
                        </div>
                        <div>
                            <input name="password" id="inputPassword" type="password" className="form-control form-control-lg" placeholder="Contraseña" />
                            <label htmlFor="inputPassword"></label>
                        </div>

                        <button type="submit" className="btn btn-lg btn-primary w-100 text-uppercase mt-3 mb-5">Ingresar</button>
                    </form>

                </div>{/* .col */}
            </div>{/* .row */}
        </div>
    )
}