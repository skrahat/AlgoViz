import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    Slider,
    FormControlLabel,
    SelectChangeEvent,
    OutlinedInput,
    FormControl,
    Select,
    MenuItem,
    Switch,
    Paper
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CustomButton from '../UIComponents/CustomButton';
import CustomAlert from '../UIComponents/Alert';
import Timer from '../UIComponents/Timer';
import { colours } from '../../styling/colours';
import { MenuProps, algorithmList, theme } from '../constants';

// Props interface
interface AppBarSectionProps {
    arraySize: number;
    sortInProgressArrayState: boolean[];
    selectedAlgorithm: string[];
    handleChange: (event: Event, value: number | number[]) => void;
    showAlert: boolean;
    stopSortingHandler: () => void;
    RemoveNumberFunction: () => void;
    showAlertHandler: () => void;
    algorithmHandleChange: (event: SelectChangeEvent<string[]>) => void;
    startSorting: () => void;
    languageValue: boolean;
    changeLanguageHandler: () => void;
    t: (key: string) => string;
}

// Arrow function component
const AppBarSection: React.FC<AppBarSectionProps> = ({
    arraySize,
    sortInProgressArrayState,
    selectedAlgorithm,
    handleChange,
    showAlert,
    showAlertHandler,
    stopSortingHandler,
    RemoveNumberFunction,
    algorithmHandleChange,
    startSorting,
    languageValue,
    changeLanguageHandler,
    t
}: AppBarSectionProps) => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar
                position="static"
                sx={{
                    minHeight: '4rem',
                    maxHeight: '6rem',
                    backgroundColor: theme.palette.text.secondary
                }}
            >
                <Container disableGutters={true}>
                    <Toolbar disableGutters>
                        {/* App Title */}
                        <Typography
                            sx={{
                                mr: 3,
                                display: { xs: 'flex', md: 'flex' },
                                color: theme.palette.text.primary,
                                fontSize: '1.5rem',
                                padding: '0 0 0 1.6rem'
                            }}
                        >
                            {t(`title.mainPage`)}
                        </Typography>

                        {/* Array Size Slider */}
                        <Box
                            sx={{
                                maxWidth: 125,
                                minWidth: 75
                            }}
                        >
                            <Slider
                                id="array-size-slider"
                                value={arraySize}
                                min={10}
                                step={1}
                                max={100}
                                color="secondary"
                                onChange={handleChange}
                                disabled={sortInProgressArrayState.every(
                                    Boolean
                                )}
                                valueLabelDisplay="auto"
                                aria-labelledby="array-size-slider"
                            />
                        </Box>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'flex' },
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <CustomButton
                                id="stop-button"
                                disabled={sortInProgressArrayState.every(
                                    (state: boolean) => state === false
                                )}
                                onClick={stopSortingHandler}
                                width="5rem"
                            >
                                {t('appbar.buttons.stop')}
                            </CustomButton>
                            <CustomButton
                                id="clear-numbers-button"
                                disabled={
                                    !sortInProgressArrayState.every(
                                        (value: boolean) => !Boolean(value)
                                    )
                                }
                                onClick={RemoveNumberFunction}
                            >
                                {t(`appbar.buttons.updateNumbers`)}
                            </CustomButton>
                            {showAlert && (
                                <CustomAlert
                                    message="You can't select more than 2 algorithms."
                                    open={showAlert}
                                    severity="warning"
                                    handleClose={showAlertHandler}
                                />
                            )}
                            <FormControl
                                sx={{
                                    width: 175,
                                    height: '3rem'
                                }}
                            >
                                <Select
                                    multiple
                                    displayEmpty
                                    disabled={sortInProgressArrayState.every(
                                        Boolean
                                    )}
                                    value={selectedAlgorithm}
                                    onChange={algorithmHandleChange}
                                    input={<OutlinedInput />}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return (
                                                <em>
                                                    {t(
                                                        `appbar.dropDown.pickAlgo`
                                                    )}
                                                </em>
                                            );
                                        }

                                        return selected.join(', ');
                                    }}
                                    MenuProps={MenuProps}
                                    inputProps={{
                                        'aria-label': 'Without label'
                                    }}
                                    sx={{
                                        color: colours.secondary
                                    }}
                                >
                                    <MenuItem disabled value="">
                                        <em></em>
                                    </MenuItem>
                                    {algorithmList.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={{
                                                color: colours.primary
                                            }}
                                        >
                                            {t(`appbar.buttons.${name}`)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <CustomButton
                                id="start-button"
                                disabled={
                                    sortInProgressArrayState.every(Boolean) ||
                                    selectedAlgorithm.length === 0
                                }
                                width="5rem"
                                onClick={startSorting}
                            >
                                {t('appbar.buttons.start')}
                            </CustomButton>
                            {/* Iterations Counter */}
                            <div
                                style={{
                                    marginRight: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.5rem',
                                    borderRadius: '4px'
                                }}
                            >
                                {t(`appbar.time`)}:
                                <Paper
                                    elevation={3}
                                    sx={{
                                        padding: '0.5rem',
                                        borderRadius: '4px',
                                        marginLeft: '0.5rem',
                                        color: colours.primary
                                    }}
                                >
                                    <Timer
                                        inProgress={sortInProgressArrayState[0]}
                                        showMilliseconds
                                    />
                                    {selectedAlgorithm.length === 2 ? (
                                        <Timer
                                            inProgress={
                                                sortInProgressArrayState[1]
                                            }
                                            showMilliseconds
                                        />
                                    ) : (
                                        ''
                                    )}
                                </Paper>
                            </div>
                            {/* Language Switch */}
                            <FormControlLabel
                                control={
                                    <Switch
                                        id="language-switch"
                                        disabled={false}
                                        checked={!languageValue}
                                        onChange={changeLanguageHandler}
                                        color="secondary"
                                    />
                                }
                                label={languageValue ? 'En' : 'Fr'}
                                labelPlacement="start"
                            />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default AppBarSection;
