import { Navigate, useRoutes } from "react-router-dom"
import { MainLayout } from "../layouts/main"
import { Box, CircularProgress } from "@mui/material"
import { Suspense, lazy } from "react"
import { WalletLayout } from "../layouts/wallet"

const LoadingScreen = () => {
    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <CircularProgress variant="indeterminate" />
        </Box>
    )
}

const Loadable = (Component) => (props) => {
    return (
        <Suspense fallback={<LoadingScreen /> }>
            <Component {...props} />
        </Suspense>
    )
}


export const Router = () => {
    return useRoutes([
        {
            path: '/',
            element: (
                <MainLayout />
            ),
            children: [
                { index: true, element: <Main /> },
                { path: 'home', element: <Home /> },
                { path: 'kvk', element: <KvK /> },
                { path: 'notaris', element: <Notaris /> },
                { path: 'akte', element: <Akte /> },
                { path: 'goedkeuring', element: <Navigate to="/wallet" />},
                { path: 'bank', element: <Bank /> }
            ]
        },
        {
            path: '/wallet',
            element: (
                <WalletLayout />
            ),
            children: [
                { index: true, element: <Wallet />}
            ]
        }
    ])
}

const Main = Loadable(lazy(() => import('../pages/main')))
const Home = Loadable(lazy(() => import('../pages/main/home')))
const KvK = Loadable(lazy(() => import('../pages/main/kvk')))
const Notaris = Loadable(lazy(() => import('../pages/main/notaris')))
const Wallet = Loadable(lazy(() => import('../pages/wallet')))
const Akte = Loadable(lazy(() => import('../pages/main/akte')))
const Bank = Loadable(lazy(() => import('../pages/main/bank')))