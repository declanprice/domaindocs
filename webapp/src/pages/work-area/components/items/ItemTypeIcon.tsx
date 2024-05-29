import { WorkItemType } from '@domaindocs/types';
import { PiBooksThin } from 'react-icons/pi';
import { LiaBookSolid } from 'react-icons/lia';
import { BiTask } from 'react-icons/bi';
import { IoBugOutline } from 'react-icons/io5';
import { TbSubtask } from 'react-icons/tb';

export type ItemTypeIconProps = {
    type: WorkItemType;
};

export const ItemTypeIcon = (props: ItemTypeIconProps) => {
    const { type } = props;

    const renderIcon = () => {
        switch (type) {
            case WorkItemType.EPIC:
                return <PiBooksThin fontSize={18}></PiBooksThin>;
            case WorkItemType.STORY:
                return <LiaBookSolid fontSize={18}></LiaBookSolid>;
            case WorkItemType.TASK:
                return <BiTask fontSize={18}></BiTask>;
            case WorkItemType.BUG:
                return <IoBugOutline fontSize={18}></IoBugOutline>;
            case WorkItemType.SUB_TASK:
                return <TbSubtask fontSize={18}></TbSubtask>;
        }
    };

    return <>{renderIcon()}</>;
};
