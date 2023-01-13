import React, { useEffect, useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { checkImage, imageUpload } from "../../utils/ImageUpload";
import { useDispatch } from "react-redux";
import { ALERT } from "../../redux/types/alertType";

const Quill = ({ setBody }) => {
    const dispatch = useDispatch();
    const quillRef = useRef(null);

    const modules = {
        toolbar: { container },
    };

    const handleChangeImage = useCallback(() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.click();
        input.onchange = async () => {
            const files = input.files;
            if (!files)
                return dispatch({
                    type: ALERT,
                    payload: {
                        errors: "File does not exist.",
                    },
                });
            const file = files[0];
            const check = checkImage(file);
            if (check)
                return dispatch({
                    type: ALERT,
                    payload: {
                        errors: check,
                    },
                });
            dispatch({
                type: ALERT,
                payload: {
                    loading: true,
                },
            });
            const photo = await imageUpload(file);
            console.log(photo);
            const quill = quillRef.current;
            const range = quill?.getEditor().getSelection()?.index;
            if (range !== undefined) {
                quill?.getEditor().insertEmbed(range, "image", `${photo.url}`);
            }
            dispatch({
                type: ALERT,
                payload: {
                    loading: false,
                },
            });
        };
    }, [dispatch]);

    // Customize photos
    useEffect(() => {
        const quill = quillRef.current;
        if (!quill) return;

        let toolbar = quill.getEditor().getModule("toolbar");
        toolbar.addHandler("image", handleChangeImage);
    }, [handleChangeImage]);

    return (
        <div>
            <ReactQuill
                theme="snow"
                modules={modules}
                placeholder="Write something"
                onChange={(e) => {
                    setBody(e);
                }}
                ref={quillRef}
            ></ReactQuill>
        </div>
    );
};

let container = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["link", "image"],

    ["clean"], // remove formatting button
];

export default Quill;
