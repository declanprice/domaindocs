import {
    Card,
    CardBody,
    CardHeader,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/react'

type SummaryCardProps = {
    peopleCount?: number
    teamCount?: number
    projectCount?: number
    description: string
}

export const SummaryCard = (props: SummaryCardProps) => {
    const { peopleCount, projectCount, teamCount, description } = props

    return (
        <Card boxShadow="xs">
            <CardHeader pb={0} fontSize={16}>
                Summary
            </CardHeader>
            <CardBody>
                <Wrap>
                    {peopleCount !== undefined && (
                        <WrapItem fontSize={14}>{peopleCount} People</WrapItem>
                    )}
                    {teamCount !== undefined && (
                        <WrapItem fontSize={14}>{teamCount} Teams</WrapItem>
                    )}
                    {projectCount !== undefined && (
                        <WrapItem fontSize={14}>
                            {projectCount} Projects
                        </WrapItem>
                    )}
                </Wrap>

                <Text mt={2} fontSize={14}>
                    {description}
                </Text>
            </CardBody>
        </Card>
    )
}
