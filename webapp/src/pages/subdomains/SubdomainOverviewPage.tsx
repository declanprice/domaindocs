import { useLoaderData } from 'react-router-dom'

export const SubdomainOverviewPage = () => {
    const data = useLoaderData()

    console.log('i am data', data)

    return <>subdomain overview</>
}
