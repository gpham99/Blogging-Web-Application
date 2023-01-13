export const validRegister = (userRegister) => {
    const { name, account, password, cf_password } = userRegister;
    const errors = [];

    if (!name) {
        errors.push("Please add your name.");
    } else if (name.length > 20) {
        errors.push("Your name is up to 20 chars long.");
    }

    if (!account) {
        errors.push("Please add your email.");
    } else if (!validateEmail(account)) {
        errors.push("Email format is incorrect.");
    }

    if (password.length < 6) {
        errors.push("Password must be at least 6 characters.");
    } else if (password !== cf_password) {
        errors.push("Confirm password did not match.");
    }

    const msg = checkPassword(password, cf_password);
    if (msg) {
        errors.push(msg);
    }
    return {
        errMsg: errors,
        errLength: errors.length,
    };
};

export const checkPassword = (password, cf_password) => {
    if (password.length < 6) {
        return "Password must be at least 6 characters.";
    } else if (password !== cf_password) {
        return "Confirm password did not match.";
    }
};

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
