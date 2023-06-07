import React, { useRef, useState } from "react";

import { FormControl, FormLabel, Switch } from "@mui/joy";
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Grid } from "@mui/material";

import InputFormControl from "../UIs/InputFormControl/InputFormControl";
import TextAreaFormControl from "../UIs/TextAreaFormControl/TextAreaFormControl";
import SelectFormControl from "../UIs/SelectFormControl/SelectFormControl";
import FormButton from "../UIs/FormButton/FormButton";
import ImageFormControl from "../UIs/ImageFormControl/ImageFormControl";

import classes from "./CreateStuffForm.module.css";


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
    const [ titleInitialValue, setTitleInitialValue ] = useState(props.initialStuff ? props.initialStuff.title : null);
    const [ priceInitialValue, setPriceInitialValue ] = useState(props.initialStuff ? props.initialStuff.price : null);
    const [ offerPriceInitialValue, setOfferPriceInitialValue ] = useState(props.initialStuff && props.initialStuff.has_offer ? props.initialStuff.offer_price : null);
    const [ shoppingLinkInitialValue, setShoppingLinkInitialValue ] = useState(props.initialStuff ? props.initialStuff.shopping_link : null);
    const [file, setFile] = useState(null);
    const [hasOffer, setHasOffer] = useState(props.initialStuff ? props.initialStuff.has_offer : false);
    const [description, setDescription] = useState(props.initialStuff ? props.initialStuff.description : '');

    const clearForm = () => {
        formRef.current.reset();
        if(file) {
            file.clear();
        }
        setDescription('');
        setHasOffer(false);
        setTitleInitialValue('___CLEAR___');
        setPriceInitialValue('___CLEAR___');
        setOfferPriceInitialValue('___CLEAR___');
        setShoppingLinkInitialValue('___CLEAR___');
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
            image: file ? file.file : null
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
                        initialValue={titleInitialValue}
                    />
                    <TextAreaFormControl 
                        label="Description" 
                        placeholder="Type something here…" 
                        name="description" 
                        text={description} 
                        onChange={(event) => setDescription(event.target.value)} 
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <ImageFormControl onChange={(file) => setFile(file)} initialValue={props.initialStuff ? props.initialStuff.image : null} />
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
                        initialValue={props.initialStuff ? props.initialStuff.category : null}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <InputFormControl
                        isRequired={true}
                        label="Price (€)"
                        placeholder="Enter a price..."
                        type="Number"
                        name="price"
                        initialValue={priceInitialValue}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <FormControl className={classes.hasOfferContent}>
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
                                initialValue={offerPriceInitialValue}
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
                initialValue={shoppingLinkInitialValue}
            />
            <FormButton
                text={`${props.initialStuff ? 'Update' : 'Create'} stuff`}
                isLoading={props.isLoading}
                loadingPosition="end"
                fullWidth={true}
                endDecorator={<SendRoundedIcon />}
            />
        </form>
    );
};

export default CreateStuffForm;