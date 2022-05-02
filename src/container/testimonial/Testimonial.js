import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from '../../components/buttons/buttons'
import { PageHeader } from '../../components/page-headers/page-headers'

const Testimonial = () => {

    const history = useHistory();
    const { path } = useRouteMatch();

    const reDirect = () => {
        history.push(`${path}/addtestimonial`);
    }

    return (
        <>
            <PageHeader
                ghost
                title="Testimonial"
                buttons={[
                    <div className="page-header-actions">
                        <Button onClick={reDirect} size="small" type="primary">
                            Add Testimonial
                        </Button>
                    </div>
                ]}
            />
            
        </>
    )
}

export default Testimonial