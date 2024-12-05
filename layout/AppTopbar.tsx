import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import Link from 'next/link';
import { classNames } from 'primereact/utils';
import { LayoutContext } from './context/layoutcontext';
import { AppTopbarRef } from '../types/types';
import { setLogout } from '../app/api/kcvl'; 

interface AppTopbarProps {}

const AppTopbar = forwardRef<AppTopbarRef>((props: AppTopbarProps, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef<HTMLButtonElement>(null);
    const topbarmenuRef = useRef<HTMLDivElement>(null);
    const topbarmenubuttonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const handleLogout = () => {
        setLogout(); 
    };

    return (
        <div className="layout-topbar">
            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>
            <Link href="/">
                <span className="layout-topbar-logo">
                    ESL TAG
                </span>
            </Link>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>


            
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
