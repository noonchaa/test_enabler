import UserContextComp from '../components/userData'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserContextComp>
      <Component {...pageProps} />
    </UserContextComp>
  )
}

export default MyApp
