import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Header from '../../baseUI/header';
import { Container } from './style';

function Album(props) {
    const [showStatus, setShowStatus] = useState(true);
    const cssTransitionProps = {
        in: showStatus,
        timeout: 300,
        classNames: 'fly',
        appear: true,
        unmountOnExit: true,
        onExited: props.history.goBack,
    };
    const handleBack = () => {
        setShowStatus(false);
    }
    return (
        <CSSTransition {...cssTransitionProps}>
            <Container>
                <Header title={'返回'} handleClick={handleBack} />
            </Container>
        </CSSTransition>
    )
}

export default React.memo(Album);