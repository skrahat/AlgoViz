import { AppBar, makeStyles, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    // const useStyles = makeStyles(() => ({
    //     container: {
    //         backgroundColor: '#400CCC'
    //     }
    // }));
    // const classes = useStyles();
    //const navigate = useNavigate();

    //data for links to pages from dashboard
    const headerData = [
        {
            label: 'Home',
            href: '/home'
        },
        {
            label: 'Evaluate',
            href: '/evaluate'
        },
        {
            label: 'Info',
            href: '/info'
        }
    ];
    //buttons to be used as navigator
    const menuButtons = () => {
        return headerData.map(({ label, href }) => {
            return (
                <button
                    onClick={() => {
                        // navigate(`${href}`);
                    }}
                >
                    {label}
                </button>
            );
        });
    };

    const dashBoardHeader = () => {
        return <Toolbar>Dashboard {menuButtons()}</Toolbar>;
    };

    return (
        <header>
            <AppBar>{dashBoardHeader()}</AppBar>
        </header>
    );
}
