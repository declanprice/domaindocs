import { useNavigate, useParams } from '@solidjs/router'
import { createEffect } from 'solid-js'
import { selectedOrganisation } from '@services'
import { PageContainer, PageHeader } from '@components'
import { PageTabs } from '../../components/page/PageTabs.tsx'

export const OrganisationPage = () => {
    const params = useParams()

    const nav = useNavigate()

    createEffect(async () => {
        if (params.organisationId) {
            // await fetchOrganisation(params.organisationId)
        } else {
            nav(`/organisation/${selectedOrganisation()?.id}`)
        }
    })

    return (
        <>
            <PageHeader />

            <PageContainer>
                <PageTabs
                    items={[
                        {
                            label: 'Overview',
                            content: <>overview</>
                        },
                        {
                            label: 'Teams',
                            content: <>Teams</>
                        },
                        {
                            label: 'Domains',
                            content: <>Domains</>
                        }
                    ]}
                />
            </PageContainer>
        </>
    )
}
