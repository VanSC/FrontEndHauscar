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
    displayName: 'Estadistica',
    iconName: 'layout-dashboard',
    route: '/page/estadisticas',
  },
  {
    navCap: 'ACCIONES',
  },
  {
    displayName: 'Registro',
    iconName: 'layout-dashboard',
    route: '/page/regitroVehiculo',
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
];
