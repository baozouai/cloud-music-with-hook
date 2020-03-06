import React, { useState, useEffect, useRef, memo } from 'react';
import { CSSTransition } from 'react-transition-group';
import {
    Container,
} from './style';
function Singer(props) {
    const [showStatus, setShowStatus] = props;
    const artist = {
        picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
        name: "薛之谦",
        hotSongs: [
          {
            name: "我好像在哪见过你",
            ar: [{name: "薛之谦"}],
            al: {
              name: "薛之谦专辑"
            }
          },
          {
            name: "我好像在哪见过你",
            ar: [{name: "薛之谦"}],
            al: {
              name: "薛之谦专辑"
            }
          },
          // 省略 20 条
        ]
      }
    const transitionProps = {
        in: showStatus,
        timeout: 300,
        className: 'fly',
        appear: true,
        unMountOnExit: true,
        onExited: () => props.history.goBack(),
    }
    return (
        <CSSTransition {...transitionProps}>
            <Container>

            </Container>
        </CSSTransition>
    )
};
export default memo(Singer);
