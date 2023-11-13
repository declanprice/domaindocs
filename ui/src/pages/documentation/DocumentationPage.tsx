import { useSearchParams } from '@solidjs/router'

type DocumentationPageProps = {}

export const DocumentationPage = (props: DocumentationPageProps) => {
    const [searchParams] = useSearchParams()

    console.log('search params', searchParams)

    return <>docs page</>
}
