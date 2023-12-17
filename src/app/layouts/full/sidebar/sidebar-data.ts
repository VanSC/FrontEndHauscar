import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'GENERAL',
  },
  {
    displayName: 'Menu',
    iconName: 'layout-dashboard',
    route: '/page/dashboard',
  },
  {
    displayName: 'Registro',
    iconName: 'layout-dashboard',
    route: '/page/regitroVehiculo',
  },
  {
    displayName: 'Estadistica',
    iconName: 'layout-dashboard',
    route: '/page/estadisticas',
  },
  {
    displayName: 'Reporte',
    iconName: 'layout-dashboard',
    route: '/page/reporteRegistro',
  },
  {
    displayName: 'Factura',
    iconName: 'poker-chip',
    route: '/page/facturaRegistro',
  },
  {
    navCap: 'Ui Components',
  },
  {
    displayName: 'Badge',
    iconName: 'rosette',
    route: '/page/ui-components/badge',
  },
  {
    displayName: 'Chips',
    iconName: 'poker-chip',
    route: '/page/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'list',
    route: '/page/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'layout-navbar-expand',
    route: '/page/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'tooltip',
    route: '/page/ui-components/tooltips',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/page/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/page/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/page/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'aperture',
    route: '/page/extra/sample-page',
  },
];
