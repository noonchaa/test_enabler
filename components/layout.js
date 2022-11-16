import Head from "next/head"

const Layout = ({title, desc, children}) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-100">
            <Head>
                <title>{title?title:'Test Enablr'}</title>
                <meta name="description" content={desc?desc:'Test FrontEnd Enablr'} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {children}
        </div>
    )
}

export default Layout