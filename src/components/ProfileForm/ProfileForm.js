import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import ImageFormControl from "../UIs/ImageFormControl/ImageFormControl";
import InputFormControl from "../UIs/InputFormControl/InputFormControl";
import useUser from "../../hooks/useUser";
import FormButton from "../UIs/FormButton/FormButton";
import CheckBoxFormControl from "../UIs/CheckBoxFormControl/CheckBoxFormControl";

const ProfileForm = ({onSubmit, isLoading}) => {
    const user = useUser();
    const [file, setFile] = useState(null);
    const [isVerified, setIsVerified] = useState(user.verified);


    const onSubmitHandler = (event) => {
        event.preventDefault();

        const formElements = event.currentTarget.elements;

        const data = {
            firstName: formElements.firstName.value,
            lastName: formElements.lastName.value,
            nickName: formElements.nickName.value,
            verified: isVerified,
            email: formElements.email.value,
            password: formElements.password.value,
            avatar: file ? file.file : null
        };

        onSubmit({
            data
        });
    };

    const onChangeCheckedHandler = (value) => {
        setIsVerified(value);
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            width="100%"
        >
            <Grid container spacing={2}>
                <Grid item xs={12} container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <InputFormControl 
                            isRequired={true}
                            label="First Name" 
                            placeholder="Enter your first name..." 
                            type="text" 
                            name="firstName"
                            initialValue={user.firstName}
                        />
                        <InputFormControl
                            isRequired={true}
                            label="Last Name"
                            placeholder="Enter your last name..."
                            type="text"
                            name="lastName"
                            initialValue={user.lastName}
                        />
                        <InputFormControl
                            isRequired={true}
                            label="NickName"
                            placeholder="Enter your NickName..."
                            type="text"
                            name="nickName"
                            initialValue={user.nickName}
                        />
                        <CheckBoxFormControl 
                            label="Verified"
                            checked={isVerified}
                            onChange={onChangeCheckedHandler}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <ImageFormControl onChange={(file) => setFile(file)} initialValue={user.avatar} />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <InputFormControl
                        isRequired={true}
                        label="Email"
                        placeholder="Enter your email..."
                        type="email"
                        name="email"
                        initialValue={user.email}
                    />
                    <InputFormControl
                        label="Password"
                        placeholder="Enter your new password..."
                        type="password"
                        name="password"
                    />
                    <FormButton
                        text="Edit profile"
                        isLoading={isLoading}
                        loadingPosition="end"
                        fullWidth={true}
                        endDecorator={<EditRoundedIcon />}
                    />
                </Grid>
            </Grid>
        </form>
    );
};

export default ProfileForm;