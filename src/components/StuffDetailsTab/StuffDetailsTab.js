import React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { TabPanel } from '@mui/joy';
import RatingCommentsList from '../RatingCommentsList/RatingCommentsList';
import QuestionsCommentsList from '../QuestionsCommentsList/QuestionsCommentsList';

const StuffDetailsTab = (props) => {

    return (
        <>
            <Tabs aria-label="tabs" defaultValue={0}>
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
                    <Tab>Rating Comments</Tab>
                    <Tab>Questions Comments</Tab>
                </TabList>
                <TabPanel value={0} style={{ padding: 20 }}>
                    <RatingCommentsList 
                        onClickSubmit={props.onClickRatingCommentsSubmit} 
                        stuff={props.stuff}
                    />
                </TabPanel>
                <TabPanel value={1} style={{ padding: 20 }}>
                    <QuestionsCommentsList 
                        onClickFormSubmit={props.onClickQuestionsCommentsSubmit} 
                        onClickAnswerSubmit={props.onClickQuestionAnswerSubmit} 
                        stuff={props.stuff}
                    />
                </TabPanel>
            </Tabs>
        </>
    )
};

export default StuffDetailsTab;