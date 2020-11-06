import React from 'react'
import { Card, CardMedia } from '@material-ui/core'
export const NoImage: React.FC = () => {
    return (
        <Card>
            <CardMedia
                style={{ height: 250, width: 250 }}
                title="Immagine non disponibile"
                image={require('../assets/noimage.jpg')}
            />
        </Card>

    )
}
