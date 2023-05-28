import React, { useRef, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Switch, Textarea, Typography } from "@mui/joy";
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Grid } from "@mui/material";

import InputFormControl from "../UIs/InputFormControl/InputFormControl";
import TextAreaFormControl from "../UIs/TextAreaFormControl/TextAreaFormControl";
import SelectFormControl from "../UIs/SelectFormControl/SelectFormControl";
import FormButton from "../UIs/FormButton/FormButton";
import ImageFormControl from "../UIs/ImageFormControl/ImageFormControl";

const categories = [
    "Music",
    "Photography",
    "Technology",
    "Clothes",
    "Kitchen",
    "Sports",
    "Decoration",
    "Books",
    "Other",
];

const CreateStuffForm = (props) => {
    const formRef = useRef();
    const [file, setFile] = useState(null);
    const [hasOffer, setHasOffer] = useState(false);
    const [text, setText] = useState('');

    const clearForm = () => {
        formRef.current.reset();
        if(file) {
            file.clear();
        }
        setText('');
        setHasOffer(false);
    };

    const onChangeHandler = () => {
        setHasOffer((prevState) => !prevState);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const formElements = event.currentTarget.elements;

        const data = {
            title: formElements.title.value,
            description: formElements.description.value,
            price: formElements.price.value,
            category: formElements.category[1].value,
            shopping_link: formElements.shoppingLink.value,
            has_offer: hasOffer,
            offer_price: !hasOffer ? 0 : formElements.offerPrice.value,
            image: file ? { file: file.file, preview: file.preview } : null
        };

        props.onSubmit({
            data,
            clearForm
        });
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            ref={formRef}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <InputFormControl 
                        isRequired={true}
                        label="Title" 
                        placeholder="Enter a title..." 
                        type="text" 
                        name="title" 
                    />
                    <TextAreaFormControl 
                        label="Description" 
                        placeholder="Type something here…" 
                        name="description" 
                        text={text} 
                        onChange={(event) => setText(event.target.value)} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <ImageFormControl onChange={(file) => setFile(file)} />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <SelectFormControl
                        isRequired={true}
                        label="Category"
                        options={categories}
                        placeholder="Select category…"
                        name="category"
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <InputFormControl
                        isRequired={true}
                        label="Price (€)"
                        placeholder="Enter a price..."
                        type="Number"
                        name="price"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <FormControl style={{ marginBottom: 30 }}>
                        <FormLabel>Has offer</FormLabel>
                        <Switch
                            color={hasOffer ? 'success' : 'danger'}
                            startDecorator={
                                <RemoveShoppingCartRoundedIcon
                                    sx={{ color: hasOffer ? 'text.tertiary' : 'danger.600' }}
                            />
                            }
                            endDecorator={
                                <SellRoundedIcon sx={{ color: hasOffer ? 'success.500' : 'text.tertiary' }} />
                            }
                            checked={hasOffer}
                            onChange={onChangeHandler}
                        />
                    </FormControl>
                </Grid>
                {
                    hasOffer && (
                        <Grid item xs={8}>
                            <InputFormControl
                                isRequired={true}
                                label="Offer price (€)"
                                placeholder="Enter an offer price..."
                                type="Number"
                                name="offerPrice"
                            />
                        </Grid>
                    )
                }
            </Grid>
            <InputFormControl
                isRequired={true}
                label="Shopping link"
                placeholder="Enter a shopping link..."
                type="text"
                name="shoppingLink"
            />
            <FormButton
                text="Create stuff"
                isLoading={props.isLoading}
                loadingPosition="end"
                fullWidth={true}
                endDecorator={<SendRoundedIcon />}
            />
        </form>
    );
};

export default CreateStuffForm;