import { Button, Flex, Tabs, TabList, Tab } from '@chakra-ui/react';

type PageTabOption = {
  isActive: boolean;
  label: string;
  onClick: () => void;
};

type PageActionOption = {
  label: string;
  onClick: () => void;
};

type PageToolbarProps = {
  title?: any;
  tabs?: PageTabOption[];
  actions?: PageActionOption[];
};

export const PageToolbar = (props: PageToolbarProps) => {
  const { title, tabs, actions } = props;

  return (
    <Flex
      height={'45px'}
      minHeight={'45px'}
      width={'100%'}
      borderBottom={'1px solid'}
      borderColor={'border'}
      alignItems={'center'}
      gap={10}
      px={4}
    >
      {title && <> {title} </>}

      {tabs && (
        <Tabs
          index={tabs.findIndex((t) => t.isActive)}
          colorScheme={'gray'}
          size={'sm'}
          height={'100%'}
          display={'flex'}
          alignItems={'flex-end'}
        >
          <TabList borderBottom={'0'}>
            {tabs.map((t) => (
              <Tab onClick={t.onClick} fontSize={12}>
                {t.label}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      )}

      {actions && (
        <Flex ml={'auto'}>
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={'ghost'}
              size={'sm'}
              fontWeight={'regular'}
              fontSize={12}
              colorScheme="gray"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </Flex>
      )}
    </Flex>
  );
};
