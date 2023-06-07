import React, { useEffect, useRef, useState } from 'react';

import { FormControl, FormLabel, Typography } from '@mui/joy';
import { Grid } from '@mui/material';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

import Spinner from '../Spinner/Spinner';
import SearchBar from '../UIs/SearchBar/SearchBar';
import InputFormControl from '../UIs/InputFormControl/InputFormControl';
import TextAreaFormControl from '../UIs/TextAreaFormControl/TextAreaFormControl';
import FormButton from '../UIs/FormButton/FormButton';
import SelectFormControl from '../UIs/SelectFormControl/SelectFormControl';
import CollectionFormList from '../CollectionFormList/CollectionFormList';

import classes from './CreateCollectionForm.module.css';

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
            <FormControl>
                <FormLabel>Stuff</FormLabel>
                <Grid container>
                    <Grid item xs={12} md={8} lg={9} className={classes.content}>
                        <SearchBar onSearch={props.onSearchStuff}/>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3} className={classes.content}>
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
                                <CollectionFormList 
                                    collectionStuff={props.collectionStuff}
                                    handleToggle={handleToggle}
                                    checked={checked}
                                />
                            ) : (
                                <Typography level="body1"
                                    className={classes.noStuffFoundContent}
                                >
                                    No stuff found!
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