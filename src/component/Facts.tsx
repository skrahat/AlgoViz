import image from '../styling/factsImage.jpeg';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard() {
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
                        Bubble sort
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Bubble sort is like lining up bubbles of different
                        sizes.
                    </Typography>
                    <br />
                    <Typography variant="body2" color="text.secondary">
                        The biggest bubble rises to the top, while smaller ones
                        sink. Repeat until they're all in order. It's slow, but
                        it gets the job done!
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
}
