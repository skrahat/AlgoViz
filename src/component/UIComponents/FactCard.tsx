import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';
interface textType {
    text: string;
    animation: boolean;
}
interface cardType {
    title: textType;
    description1: textType;
    description2: textType;
    style?: React.CSSProperties;
}

const FactCard: React.FC<cardType> = ({
    title,
    description1,
    description2,
    style,
    ...props
}) => {
    return (
        <Card sx={{ minWidth: '15rem', maxHeight: '15rem', ...style }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title.animation ? (
                            <TypeAnimation
                                sequence={[title.text]}
                                speed={50}
                                cursor={false}
                            />
                        ) : (
                            title.text
                        )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description1.animation ? (
                            <TypeAnimation
                                sequence={[2000, description1.text]}
                                speed={40}
                                cursor={false}
                            />
                        ) : (
                            description1.text
                        )}
                    </Typography>
                    <br />
                    <Typography variant="body2" color="text.secondary">
                        {description2.animation ? (
                            <TypeAnimation
                                sequence={[6000, description2.text]}
                                speed={40}
                                cursor={false}
                            />
                        ) : (
                            description2.text
                        )}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {/* <Button size="small" color="primary">
                    ...Read More
                </Button> */}
            </CardActions>
        </Card>
    );
};
export default FactCard;
