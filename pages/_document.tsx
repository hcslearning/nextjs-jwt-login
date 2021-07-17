import Document, {Html, Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html>
                <Head>

                </Head>
                <body className="bg-dark">
                    <Main></Main>
                    <NextScript></NextScript>
                </body>
            </Html>
        )
    }

}