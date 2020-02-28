import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../application/Home/Home';
import Recommend from '../application/Recommend';
import Album from '../application/Album';
import Singers from '../application/Singers';
import Rank from '../application/Rank';

export default [
    {
        path: '/',
        component: Home,
        routes: [
            {
                path: '/',
                exact: true,
                render: () => (
                    <Redirect to={"/recommend"}/>
                ),
            },
            {
                path: '/recommend',
                component: Recommend,
                routes: [
                    {
                        path: '/recommend/:id',
                        component: Album,
                    }
                ]
            },
            {
                path: '/singers',
                component: Singers,
            },
            {
                path: '/rank',
                component: Rank,
            },
        ],
    },
]