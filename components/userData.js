import { createContext, useContext, useState } from "react";

export const UserContext = createContext({
    nama: '',
    alamat: '',
    phone: '',
    gender: '',
    status: '',
    nik: '',
    setUser: () => {}
})

export default function UserContextComp({ children }) {
    const [user, setUser] = useState({
        nama: '',
        alamat: '',
        phone: '',
        gender: '',
        status: '',
        nik: ''
    })
    const value = {user, setUser}

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const UserData = () => useContext(UserContext)