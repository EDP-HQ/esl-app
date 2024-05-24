/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">         
            2022-2024 <span className="font-smaller ml-2">@EDP Team (SEA HQ)</span>
        </div>
    );
};

export default AppFooter;
