import React from 'react'
import { Card, CardMedia, Grid } from '@material-ui/core'

interface BrandCardProps {
    title: string;
    image: string;
    url?: string;
}

export const BrandCard: React.FC<BrandCardProps> = ({ title, image, url = '' }) => {
    return (
        <Grid item  >
            <Card raised style={{ width: 400 }}>
                <a href={url} target="_blank">
                    <CardMedia
                        style={{ height: 200, width: 300, margin: "auto" }}
                        title={title}
                        image={image}
                    />
                </a>
            </Card>
        </Grid>
    )
}
