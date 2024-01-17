import pt from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

/**
 * RHFSelect Component
 * A custom component for handling native select input with react-hook-form.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the select field in the form.
 * @param {React.ReactNode} props.children - The options to be rendered inside the select dropdown.
 * @returns {JSX.Element} The rendered RHFSelect component.
 */
export const RHFSelect = ({ name, children, ...other }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    select
                    fullWidth
                    SelectProps={{ native: false }}
                    error={!!error}
                    helperText={error?.message}
                    {...other}
                >
                    {children}
                </TextField>
            )}
        />
    );
}

RHFSelect.propTypes = {
    children: pt.node,
    name: pt.string,
};
