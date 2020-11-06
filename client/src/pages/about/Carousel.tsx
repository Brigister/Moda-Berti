import React, { useState } from 'react'
import { Grid, Grow, Fab } from '@material-ui/core'
import { ArrowForwardIosRounded, ArrowBackIosRounded } from '@material-ui/icons';
const images = [
    { path: 'images/products/1600709420275-116157726_1700886903408610_3823687581131242377_o.jpg' },
    { path: 'images/products/1603185788555-Luxory.jpeg' },
    { path: 'images/products/1604080595251-UomoFashion.jpeg' },
    { path: 'images/products/1604083086400-1.JPG' },

]
export const Carousel: React.FC = () => {
    const [index, setIndex] = useState(0);
    const [change, setChange] = useState(true);
    const [slideDirection, setSlideDirection] = useState<string>("down");
    console.log(images[index].path)

    const onArrowClick = (direction: string) => {
        const increment = direction === "left" ? -1 : 1;
        const newIndex = (index + increment + images.length) % images.length;
        const oppDirection = direction == "left" ? "right" : "left";

        setSlideDirection(direction);

        setChange(false);

        setTimeout(() => {
            setIndex(newIndex);
            setChange(true)
        }, 367)


    }

    return (
        <Grid item container alignItems="center">
            <Grid item>
                <Fab style={{ marginRight: 10 }}>
                    <ArrowBackIosRounded
                        fontSize="large"
                        onClick={() => onArrowClick('left')}
                    />
                </Fab>
            </Grid>
            <Grid item>
                <Grow in={change}>
                    <img
                        style={{ height: 550, width: 550, borderRadius: 10 }}

                        src={`http://localhost:4000/${images[index].path}`}
                    />
                </Grow>
            </Grid>
            <Grid>
                <Fab style={{ marginLeft: 10 }}>
                    <ArrowForwardIosRounded
                        fontSize="large"
                        onClick={() => onArrowClick('right')}
                    />
                </Fab>
            </Grid>
        </Grid>
    )
}
