import React, { useEffect, useRef, useState } from 'react';
import { FormControl, FormLabel, Typography } from '@mui/joy';
import { Avatar, Checkbox, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

import Spinner from '../Spinner/Spinner';
import SearchBar from '../UIs/SearchBar/SearchBar';
import InputFormControl from '../UIs/InputFormControl/InputFormControl';
import TextAreaFormControl from '../UIs/TextAreaFormControl/TextAreaFormControl';
import FormButton from '../UIs/FormButton/FormButton';
import SelectFormControl from '../UIs/SelectFormControl/SelectFormControl';

const CreateCollectionForm = (props) => {
    const formRef = useRef();
    const [ titleInitialValue, setTitleInitialValue ] = useState(props.initialCollection ? props.initialCollection.title : '');
    const [text, setText] = useState(props.initialCollection ? props.initialCollection.description : '');
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        if(props.initialStuff && props.initialStuff.length > 0) {
            setChecked(props.initialStuff);
        }
    }, [props.initialStuff]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const clearForm = () => {
        formRef.current.reset();
        setTitleInitialValue('___CLEAR___');
        setText('');
        setChecked([]);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const formElements = event.currentTarget.elements;

        const data = {
            title: formElements.title.value,
            description: formElements.description.value,
            stuff: checked
        };

        props.onSubmit({
            data: data,
            clearForm: clearForm
        });
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            ref={formRef}
        >
            <InputFormControl 
                isRequired={true}
                label="Title" 
                placeholder="Enter a title..." 
                type="text" 
                name="title"
                initialValue={titleInitialValue}
            />
            <TextAreaFormControl 
                label="Description" 
                placeholder="Type something here…" 
                name="description" 
                text={text} 
                onChange={(event) => setText(event.target.value)} 
            />
            <FormControl style={{ marginBottom: 30 }}>
                <FormLabel>Stuff</FormLabel>
                <Grid container>
                    <Grid item xs={12} md={8} lg={9} style={{ padding: 5 }}>
                        <SearchBar onSearch={props.onSearchStuff}/>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3} style={{ padding: 5 }}>
                        <SelectFormControl
                            options={props.categories}
                            placeholder="Select category…"
                            name="category"
                            initialValue={"All"}
                            onChange={props.categoriesOnChange}
                        />
                    </Grid>
                </Grid>
                { props.collectionStuff ? (
                    <>
                        { props.collectionStuff.stuff.length > 0 ? (
                                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                    {
                                        props.collectionStuff.stuff.map((stuff) => {
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
                            ) : (
                                <Typography level="body1"
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100%',
                                        width: '100%',
                                        minHeight: 200,
                                        color: 'text.secondary'
                                    }}
                                >
                                    No stuff found
                                </Typography>
                            )
                        }
                        { props.isLoadingStuff && <Spinner />}
                        {!props.viewMore && 
                            <FormButton
                                variant="soft"
                                type="button"
                                text="View more"
                                isLoading={props.isLoadingStuff}
                                loadingPosition="start"
                                fullWidth={true}
                                startDecorator={<RemoveRedEyeRoundedIcon />}
                                onClick={props.onClickViewMore}
                            />    

                        }
                    </>
                ) : (
                    <Spinner />
                )}
            </FormControl>
            <FormButton
                text={`${props.initialStuff ? 'Update' : 'Create'} collection`}
                isLoading={props.isLoading}
                loadingPosition="end"
                fullWidth={true}
                endDecorator={<SendRoundedIcon />}
            />
        </form>
    );
};

export default CreateCollectionForm;