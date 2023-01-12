import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/authAction";

const RegisterForm = () => {
    const initialState = {
        name: "",
        account: "",
        password: "",
        cf_password: "",
    };
    const [userRegister, setUserRegister] = useState(initialState);
    const { name, account, password, cf_password } = userRegister;

    // type pass and type confirm pass are used to show the hidden passwords
    const [typePass, setTypePass] = useState(false);
    const [typeCfPass, setTypeCfPass] = useState(false);

    const dispatch = useDispatch();

    const handleChangeInput = (e) => {
        const { value, name } = e.target;
        setUserRegister({ ...userRegister, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(userRegister));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Name"
                    name="name"
                    value={name}
                    onChange={handleChangeInput}
                />
            </div>

            <div>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email"
                    name="account"
                    value={account}
                    onChange={handleChangeInput}
                />
            </div>

            <div>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    name="password"
                    value={password}
                    type={typePass ? "text" : "password"}
                    onChange={handleChangeInput}
                    InputProps={{
                        endAdornment: (
                            <Button>
                                <small
                                    onClick={() => {
                                        setTypePass(!typePass);
                                    }}
                                >
                                    {typePass ? "Hide" : "Show"}
                                </small>
                            </Button>
                        ),
                    }}
                />
            </div>

            <div>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Confirm Password"
                    name="cf_password"
                    value={cf_password}
                    type={typeCfPass ? "text" : "password"}
                    onChange={handleChangeInput}
                    InputProps={{
                        endAdornment: (
                            <Button>
                                <small
                                    onClick={() => {
                                        setTypeCfPass(!typeCfPass);
                                    }}
                                >
                                    {typeCfPass ? "Hide" : "Show"}
                                </small>
                            </Button>
                        ),
                    }}
                />
            </div>

            <div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    // disabled={
                    //     name && account && password && cf_password
                    //         ? false
                    //         : true
                    // }
                >
                    Register
                </Button>
            </div>
        </form>
    );
};

export default RegisterForm;
