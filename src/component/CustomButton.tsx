import Button, { ButtonProps } from '@mui/material/Button';
import { colours } from '../styling/colours';

interface CustomButtonProps extends ButtonProps {
    id: string;
    children: React.ReactNode;
    width?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    id,
    children,
    width,
    ...props
}) => {
    return (
        <Button
            id={id}
            sx={{
                width: width ? width : '10rem',
                height: '4rem',

                my: 2,
                color: 'white',
                display: 'block',
                border: `1px solid ${colours.accent}`,
                '&:hover': {
                    backgroundColor: colours.accent,
                    color: 'black'
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
