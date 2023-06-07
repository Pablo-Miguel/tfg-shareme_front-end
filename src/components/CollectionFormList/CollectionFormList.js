import React from 'react';

import { Avatar, Checkbox, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';

const CollectionFormList = ({ collectionStuff, handleToggle, checked }) => {

    return (
        <List>
            {
                collectionStuff.stuff.map((stuff) => {
                    const labelId = `checkbox-list-secondary-label-${stuff._id}`;
                    return (
                        <ListItem
                            key={stuff._id}
                            onClick={handleToggle(stuff._id)}
                            secondaryAction={
                                <Checkbox
                                    edge="end"
                                    checked={checked.indexOf(stuff._id) !== -1}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            }
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={stuff.title}
                                        src={stuff.image}
                                    />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={stuff.title} secondary={stuff.category} />
                            </ListItemButton>
                        </ListItem>
                    );
                })
            }
        </List>
    )
};

export default CollectionFormList;