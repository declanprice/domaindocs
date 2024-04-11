import {
    LoaderFunction,
    LoaderFunctionArgs,
    Outlet,
    useLoaderData,
} from 'react-router-dom'

export const subdomainGuardLoader: LoaderFunction = (
    args: LoaderFunctionArgs
) => {
    console.log(args.params)

    return []
}

export const SubdomainGuard = () => {
    const subdomains = useLoaderData()

    console.log('subdomains', subdomains)

    return <Outlet context={'subdomain'} />
}
