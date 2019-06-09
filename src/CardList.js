import React from 'react';
import Card from './Card';

function CardList({ robots }) {
    return (
        <div>
            {
                robots.map(function(x) {
                    return (
                    <Card
                        key={x.id}
                        id={x.id}
                        name={x.name}
                        email={x.email}
                        />
                    );
                })
            }
        </div>
    );
}

export default CardList;