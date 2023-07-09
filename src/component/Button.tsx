import Button, { ButtonProps } from '@mui/material/Button';
import { colours } from '../styling/colours';

interface CustomButtonProps extends ButtonProps {
    id: string;
    children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    id,
    children,
    ...props
}) => {
    return (
        <Button
            id={id}
            sx={{
                my: 2,
                color: 'white',
                display: 'block',
                '&:hover': {
                    backgroundColor: colours.accent
                },
                ...props.sx
            }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default CustomButton;
