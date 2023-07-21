import image from '../styling/factsImage.jpeg';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
interface cardType {
    title: string;
    description1: string;
    description2: string;
}

const FactCard: React.FC<cardType> = ({
    title,
    description1,
    description2,
    ...props
}) => {
    return (
        <Card sx={{ maxWidth: '15rem', maxHeight: '15rem' }}>
            <CardActionArea>
                {/* <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                    sx={{ maxHeight: '5rem' }}
                /> */}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description1}
                    </Typography>
                    <br />
                    <Typography variant="body2" color="text.secondary">
                        {description2}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    ...Read More
                </Button>
            </CardActions>
        </Card>
    );
};
export default FactCard;
