import Button from '@mui/material/Button';

interface CustomButtonProps {
    id: string;
    disabled?: boolean;
    onClick: () => void;
    sx?: React.CSSProperties;
    children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    id,
    disabled = false,
    onClick,
    sx,
    children
}) => {
    return (
        <Button
            id={id}
            disabled={disabled}
            sx={{
                my: 2,
                color: 'white',
                display: 'block',
                ...sx
            }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
export default CustomButton;
