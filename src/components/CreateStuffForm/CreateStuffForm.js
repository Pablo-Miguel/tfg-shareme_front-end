import React, { useRef, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Switch, Textarea, Typography } from "@mui/joy";
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Grid } from "@mui/material";

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
    const [hasOffer, setHasOffer] = useState(false);
    const [text, setText] = useState('');

    const clearForm = () => {
        formRef.current.reset();
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
            <FormControl required style={{ marginBottom: 30 }}>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Enter a title..." type="text" name="title" />
            </FormControl>
            <FormControl style={{ marginBottom: 30 }}>
                <FormLabel>Description</FormLabel>
                <Textarea
                    name="description"
                    placeholder="Type something here…"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    minRows={3}
                    endDecorator={
                        <Box
                            sx={{
                            display: 'flex',
                            gap: 'var(--Textarea-paddingBlock)',
                            pt: 'var(--Textarea-paddingBlock)',
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            flex: 'auto',
                            }}
                        >
                            <Typography level="body3">
                                {text.length} character(s)
                            </Typography>
                        </Box>
                    }
                    sx={{
                    minWidth: 300
                    }}
                />
            </FormControl>
            
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <FormControl required style={{ marginBottom: 30 }}>
                        <FormLabel>Category</FormLabel>
                        <Select
                            name="category"
                            placeholder="Select category…"
                            indicator={<KeyboardArrowDown />}
                            defaultValue=''
                            sx={{
                            [`& .${selectClasses.indicator}`]: {
                                transition: '0.2s',
                                [`&.${selectClasses.expanded}`]: {
                                transform: 'rotate(-180deg)',
                                },
                            },
                            }}
                        >
                            {categories.map((category) => (
                                <Option value={category} key={category}>
                                    {category}
                                </Option>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={8}>
                    <FormControl required style={{ marginBottom: 30 }}>
                        <FormLabel>Price (€)</FormLabel>
                        <Input placeholder="Enter a price..." type="Number" name="price" />
                    </FormControl>
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
                        <FormControl required style={{ marginBottom: 30 }}>
                            <FormLabel>Offer price</FormLabel>
                            <Input placeholder="Enter an offer price..." type="Number" name="offerPrice" />
                        </FormControl>
                    </Grid>
                    )
                }
            </Grid>
            <FormControl required style={{ marginBottom: 30 }}>
                <FormLabel>Shopping link</FormLabel>
                <Input placeholder="Enter a shopping link..." type="text" name="shoppingLink" />
            </FormControl>

            <Button 
                type="submit" 
                loading={props.isLoading}
                loadingPosition="end"
                endDecorator={<SendRoundedIcon />}
                fullWidth 
                style={{ marginTop: 10, gap: 10 }}
            >
                Create stuff
            </Button>
        </form>
    );
};

export default CreateStuffForm;