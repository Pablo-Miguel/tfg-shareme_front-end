import React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { TabPanel } from '@mui/joy';
import StuffList from '../StuffList/StuffList';
import CollectionList from '../CollectionList/CollectionList';
import LikedStuffList from '../LikedStuffList/LikedStuffList';
import LikedCollectionsList from '../LikedCollectionsList/LikedCollectionsList';
import StuffTab from '../StuffTab/StuffTab';
import CollectionTab from '../CollectionTab/CollectionTab';

const ProfileTab = ({ 
    frontUser, 
    isMe,
    user_id,
    setFrontUser
}) => {

    return (
        <Tabs aria-label="tabs" defaultValue={0}
            style={{ width: '100%' }}
        >
            <TabList
                variant="plain"
                sx={{
                '--List-padding': '0px',
                '--List-radius': '0px',
                '--ListItem-minHeight': '48px',
                [`& .${tabClasses.root}`]: {
                    boxShadow: 'none',
                    fontWeight: 'md',
                    [`&.${tabClasses.selected}::before`]: {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    left: 'var(--ListItem-paddingLeft)', // change to `0` to stretch to the edge.
                    right: 'var(--ListItem-paddingRight)', // change to `0` to stretch to the edge.
                    bottom: 0,
                    height: 3,
                    bgcolor: 'primary.400',
                    },
                },
                }}
            >
                <Tab>Stuff</Tab>
                <Tab>Collections</Tab>
            </TabList>
            <TabPanel value={0}>
                {
                    !isMe ? 
                        <StuffList
                            stuff={frontUser.stuff}
                            total={frontUser.total_stuff}
                            isMe={isMe}
                            user_id={user_id}
                            setFrontUser={setFrontUser}
                        />
                    : (
                        <StuffTab
                            frontUser={frontUser}
                            isMe={isMe}
                            user_id={user_id}
                            setFrontUser={setFrontUser}
                        />
                    )
                }
            </TabPanel>
            <TabPanel value={1}>
                {
                    !isMe ?
                        <CollectionList
                            collections={frontUser.collections}
                            total={frontUser.total_collections}
                            isMe={isMe}
                            user_id={user_id}
                            setFrontUser={setFrontUser}
                        />
                    : (
                        <CollectionTab
                            frontUser={frontUser}
                            isMe={isMe}
                            user_id={user_id}
                            setFrontUser={setFrontUser}
                        />
                    )
                }
            </TabPanel>
        </Tabs>
    )
};

export default ProfileTab;