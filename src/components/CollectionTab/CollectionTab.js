import React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { TabPanel } from '@mui/joy';
import CollectionList from '../CollectionList/CollectionList';
import LikedCollectionsList from '../LikedCollectionsList/LikedCollectionsList';

const CollectionTab = ({ frontUser, isMe, user_id, setFrontUser }) => {

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
                <Tab>My collections</Tab>
                <Tab>Liked collections</Tab>
            </TabList>
            <TabPanel value={0}>
                <CollectionList
                    collections={frontUser.collections}
                    total={frontUser.total_collections}
                    isMe={isMe}
                    user_id={user_id}
                    setFrontUser={setFrontUser}
                />
            </TabPanel>
            <TabPanel value={1}>
                <LikedCollectionsList likedCollections={frontUser.likedCollections} />
            </TabPanel>
        </Tabs>
    );
};

export default CollectionTab;