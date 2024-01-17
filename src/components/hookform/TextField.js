import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

/**
 * RHFTextField Component
 * A custom component for handling a text field input with react-hook-form.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the text field in the form.
 * @returns {JSX.Element} The rendered RHFTextField component.
 */
export const RHFTextField = ({ name, ...other }) => {
  const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
                    error={!!error}
                    helperText={error?.message}
                    {...other}
                />
            )}
        />
    );
}