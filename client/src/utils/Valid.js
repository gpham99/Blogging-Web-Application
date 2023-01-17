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

export const validCreateBlog = ({ title, content, description, thumbnail }) => {
    const err = [];
    if (title.trim().length < 10) {
        err.push("Title must have at least 10 characters.");
    } else if (title.trim().length > 50) {
        err.push("Title can have at most 50 characters.");
    }

    if (content.trim().length < 2000) {
        err.push("Content must have at least 2000 characters.");
    }

    if (description.trim().length < 50) {
        err.push("Description must have at least 50 characters.");
    } else if (description.trim().length > 200) {
        err.push("Description can have at most 200 characters.");
    }

    if (!thumbnail) {
        err.push("Thumbnail cannot be blank.");
    }

    return {
        errMsg: err,
        errLength: err.length,
    };
};

// Shallow equality
export const shallowEqual = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (object1[key] !== object2[key]) {
            return false;
        }
    }

    return true;
};
