import { PageToolbar } from '@components/page/PageToolbar.tsx'
import { useQuery } from '@tanstack/react-query'
import { Subdomain, subdomainsApi } from '@state/api/subdomains-api.ts'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SubdomainSelectMenu } from './components/SubdomainSelectMenu.tsx'
import { SubdomainPageParams } from './types/SubdomainPageParams.ts'

export const SubdomainPageToolbar = () => {
    const { domainId, subdomainId } = useParams() as SubdomainPageParams

    const navigate = useNavigate()

    const {
        data: subdomains,
        isLoading,
        refetch,
    } = useQuery<Subdomain[]>({
        enabled: false,
        queryKey: ['searchSubdomains', { domainId }],
        queryFn: () => subdomainsApi.searchSubdomains(domainId),
    })

    const [activeSubdomain, setActiveSubdomain] = useState<Subdomain | null>()

    useEffect(() => {
        refetch()
    }, [])

    useEffect(() => {
        if (!subdomains || isLoading) return

        const subdomainFromSlug = subdomains.find(
            (s) => s.subdomainId === subdomainId
        )

        if (!subdomainFromSlug) {
            return navigate(`/page-not-found`)
        }

        setActiveSubdomain(subdomainFromSlug)
    }, [subdomains, isLoading])

    if (isLoading || !subdomains || !activeSubdomain) return null

    return (
        <PageToolbar
            title={
                subdomains.length && (
                    <SubdomainSelectMenu
                        options={subdomains}
                        onSelect={(option) => {
                            setActiveSubdomain(option)
                            navigate(
                                `/${domainId}/sd/${option.subdomainId}/overview`
                            )
                        }}
                        value={activeSubdomain}
                    />
                )
            }
            tabs={[
                {
                    label: 'Overview',
                    isActive: location.pathname.includes(
                        `/${domainId}/sd/${activeSubdomain.subdomainId}/overview`
                    ),
                    onClick: () => {
                        navigate(
                            `/${domainId}/sd/${activeSubdomain.subdomainId}/overview`
                        )
                    },
                },
                {
                    label: 'People',
                    isActive: location.pathname.includes(
                        `/${domainId}/sd/${activeSubdomain.subdomainId}/people`
                    ),
                    onClick: () => {
                        navigate(
                            `/${domainId}/sd/${activeSubdomain.subdomainId}/people`
                        )
                    },
                },
                {
                    label: 'Teams',
                    isActive: location.pathname.includes(
                        `/${domainId}/sd/${activeSubdomain.subdomainId}/teams`
                    ),
                    onClick: () => {
                        navigate(
                            `/${domainId}/sd/${activeSubdomain.subdomainId}/teams`
                        )
                    },
                },
                {
                    label: 'Projects',
                    isActive: location.pathname.includes(
                        `/${domainId}/sd/${activeSubdomain.subdomainId}/projects`
                    ),
                    onClick: () => {
                        navigate(
                            `/${domainId}/sd/${activeSubdomain.subdomainId}/projects`
                        )
                    },
                },
            ]}
            actions={[
                {
                    label: 'New Subdomain',
                    onClick: () => {
                        navigate(`/${domainId}/sd-create`)
                    },
                },
            ]}
        />
    )
}
