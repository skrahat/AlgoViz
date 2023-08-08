import { createTheme } from '@mui/material';
import { colours } from '../styling/colours';

export const algorithmList = ['bubble', 'insertion', 'merge'];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: '4rem'
        }
    }
};
// Define the MUI theme
export const theme = createTheme({
    palette: {
        primary: {
            main: colours.primary
        },
        secondary: {
            main: colours.secondary
        },
        text: {
            primary: colours.accent,
            secondary: colours.primary
        }
    }
});
