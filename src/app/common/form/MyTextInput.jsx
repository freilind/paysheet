import React, {} from 'react';
import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ): null}
        </Form.Field>
    );
}

export default MyTextInput;
