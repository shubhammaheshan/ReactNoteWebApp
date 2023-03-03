import * as Yup from "yup";

export const noteSchema = Yup.object({
    title: Yup.string().min(2).max(25).required("Please enter the Title"),
    content: Yup.string().required("Please enter the Description"),
    date: Yup.date().required("Please enter the Date")
})