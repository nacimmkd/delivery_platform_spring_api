import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Page from '@/shared/layouts/Page/Page.tsx'
import Header from '@/shared/layouts/header/Header.tsx'
import authStore from '@/features/auth/store/auth.store.ts'

function App() {
    const hydrate = authStore((s) => s.hydrate)

    useEffect(() => { hydrate() }, [hydrate])

    return (
        <Page>
            <Header />
            <Outlet />
        </Page>
    )
}

export default App