import Image from "next/image"
import { useEffect, useState } from "react"
import Card from "../components/card"
import Layout from "../components/layout"
import { UserData } from "../components/userData"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { createWorker } from "tesseract.js"
import { useRouter } from "next/router"

const Photo = () => {
    const user = UserData()
    const [foto, setFoto] = useState()
    const [preview, setPreview] = useState()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const worker = createWorker({
        logger:m => console.log(m.status)
    })

    const convertImageToText = async () => {
      if (!preview) return;
      setLoading(true)
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(preview);
      let indexNik = text.indexOf('NIK')
      let nik = text.slice(indexNik+6,indexNik+22)
      if ( isNaN(parseInt(nik))) {
        alert('Mohon pilih foto yg tidak buram')
      } else {
        user.setUser({...user,nik})
        router.push('/detail')
      }
      setLoading(false)
    };

    useEffect(() => {
        if (!foto) {
            setPreview(undefined);
            return
        }
        const objectUrl = URL.createObjectURL(foto)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [foto])

    const submit = (e) => {
        e.preventDefault()
        convertImageToText()
    }

    return (
        <Layout>
            <Card>
                <div className='px-6 py-4 flex justify-start items-center border-b bg-slate-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>

                    <p className='ml-4'>Upload Foto</p>
                </div>
                <div className='px-6 py-4'>
                    <form onSubmit={submit}>
                        <div className="relative flex items-center">
                            <span className="absolute left-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </span>

                            <input type="file" id='foto' accept="image/png, image/jpeg" className="block w-full py-3 text-gray-700 bg-white border rounded-md pl-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Foto KTP" required onChange={(e) => setFoto(e.target.files[0])} />
                        </div>

                        <div className="mt-6">
                            {foto ?
                                <Zoom>
                                    <img src={preview} className="object-contain" alt="foto" />
                                </Zoom>
                                : ''
                            }
                        </div>

                        <div className='mt-8 flex justify-end items-center'>
                            <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                                {loading ? 'Scaning Foto':'Next'}
                            </button>
                        </div>

                    </form>
                </div>
            </Card>
        </Layout>

    )
}

export default Photo