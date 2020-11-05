import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardMedia } from '@material-ui/core'

interface TypeCardProps {
    title: string;
    image: string;
}

export const TypeCard: React.FC<TypeCardProps> = ({ title, image }) => {
    return (
        <Card raised style={{ width: "70%", margin: "auto" }}>
            <Link to={{ pathname: "/shop/products", search: `?gender=${title}` }}>
                {/* <CardHeader
                    style={{ textAlign: "center" }}
                    title={title}
                /> */}
                <CardMedia style={{ height: 300 }}
                    title={title}
                    image={image}
                />
            </Link >
        </Card>
    )
}
