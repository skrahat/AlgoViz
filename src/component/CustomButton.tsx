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
                height: '3rem',
                color: 'white',
                display: 'block',
                margin: '0rem 0.8rem',
                //border: `1px solid ${colours.accent}`,
                '&:hover': {
                    backgroundColor: colours.accent,
                    color: 'black'
                },
                '&.Mui-disabled': {
                    // Override disabled text color
                    color: colours.disable,
                    border: `1px solid ${colours.disable}`
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
