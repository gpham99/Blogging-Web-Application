export const checkImage = (file) => {
    let err = "";
    if (!file) return (err = "File does not exist.");
    if (file.size > 1024 * 1024)
        err = "The largest image size allowed is 1 MB.";
    return err;
};

export const imageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pcmsctxt");
    formData.append("cloud_name", "dcgn7dkqb");

    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dcgn7dkqb/upload",
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await res.json();
    return { public_id: data.public_id, url: data.secure_url };
};
