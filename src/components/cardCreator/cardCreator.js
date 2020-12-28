import React from 'react';
import { cardArr } from '../../components/upoloadHandler/fileHandler.js';

const CardCreator = () => (
    <ul className="listWrapper__wrapper">
        {cardArr.map((item) => (
            <ListItem
                image={item.imageUrl}
            />
        ))}
    </ul>
);

export default CardCreator;