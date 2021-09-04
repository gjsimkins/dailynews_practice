import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../store/actions';
import { showToast } from '../utils/tools';


const Contact = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: { email: '', firstname: '', lastname: '', message: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Sorry the email is required')
                .email('This is not a valid email'),
            firstname: Yup.string()
                .required('Sorry the name is required'),
            lastname: Yup.string()
                .required('Sorry the lastname is required'),
            message: Yup.string()
                .required('Sorry a message is required')
                .max(500, 'Sorry your message is too long')
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(sendMessage(values)).then((payload) => {
                if (payload) {
                    showToast('SUCCESS', 'Thank you')
                } else {
                    showToast('ERROR', 'Sorry something happened, try again')
                }
            });
            console.log(values);
        }
    })
    return (
        <>
            <h1>Contact Us</h1>
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="email@example.com"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email && formik.touched.email ?
                        <Alert variant="danger">
                            {formik.errors.email}
                        </Alert>
                        : null}
                </div>
                <div className="form-group">
                    <label htmlFor="firstname">Firstname</label>
                    <input
                        type="firstname"
                        className="form-control"
                        name="firstname"
                        {...formik.getFieldProps('firstname')}
                    />
                    {formik.errors.firstname && formik.touched.firstname ?
                        <Alert variant="danger">
                            {formik.errors.firstname}
                        </Alert>
                        : null}
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Lastname</label>
                    <input
                        type="lastname"
                        className="form-control"
                        name="lastname"
                        {...formik.getFieldProps('lastname')}
                    />
                    {formik.errors.lastname && formik.touched.lastname ?
                        <Alert variant="danger">
                            {formik.errors.lastname}
                        </Alert>
                        : null}
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        type="message"
                        className="form-control"
                        name="message"
                        rows="3"
                        {...formik.getFieldProps('message')}
                    />
                    {formik.errors.message && formik.touched.message ?
                        <Alert variant="danger">
                            {formik.errors.message}
                        </Alert>
                        : null}
                </div>




                <button type="submit" className="btn btn-primary mt-2">Send message</button>
            </form>
        </>
    )
}

export default Contact
