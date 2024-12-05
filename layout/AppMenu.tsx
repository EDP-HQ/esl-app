/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);

  const fullMenu = [
    {
      label: 'Home',
      items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
    },
    {
      label: 'ESL Tag',
      items: [
        { label: 'Esl Tag Registration', icon: 'pi pi-fw pi-pencil', to: '/esltag/eslregist' },
        { label: 'Esl Tag Bind Image', icon: 'pi pi-fw pi-chart-bar', to: '/esltag/eslbind' }
      ],
    }
 
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {fullMenu.map((item, i) => (
          item.items.length > 0 ? (
            <React.Fragment key={item.label}>
              <AppMenuitem item={item} root={true} index={i} />
              {i < fullMenu.length - 1 && <li className="menu-separator"></li>}
            </React.Fragment>
          ) : null
        ))}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
