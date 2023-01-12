import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authAction";

const LoginPass = () => {
    const initialState = { account: "", password: "" };
    const [userLogin, setUserLogin] = useState(initialState);
    const { account, password } = userLogin;
    const [typePass, setTypePass] = useState(false);

    const dispatch = useDispatch();

    const handleChangeInput = (e) => {
        const { value, name } = e.target;
        setUserLogin({ ...userLogin, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(userLogin));
    };

    return (
        <form onSubmit={handleSubmit}>
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={account && password ? false : true}
                >
                    Log In
                </Button>
            </div>
        </form>
    );
};

export default LoginPass;
