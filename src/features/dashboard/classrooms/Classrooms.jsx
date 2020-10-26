import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react';

const Classrooms = ({history}) => {
    const routeTo = '/paysheet';
    const sectionA = ['1A','2A','3A','4A','5A'];
    const sectionB = ['1B','2B','3B','4B','5B'];
    return(
        <>
            <Grid columns='equal'>
                <Grid.Row>
                    {sectionA.map((sec) => (
                        <Grid.Column key={sec}>
                            <Image src={`/assets/images/${sec}.png`} alt={`${sec}`} as={NavLink} to={`${routeTo}/${sec}`} />
                        </Grid.Column>
                    ))}
                </Grid.Row>

                <Grid.Row>
                    {sectionB.map((sec) => (
                        <Grid.Column key={sec}>
                            <Image src={`/assets/images/${sec}.png`} alt={`${sec}`} as={NavLink} to={`${routeTo}/${sec}`} />
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>
        </>
    );
}

export default Classrooms;
