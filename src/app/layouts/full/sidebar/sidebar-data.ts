import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'GENERAL',
  },
  {
    displayName: 'Menu',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    displayName: 'Registro',
    iconName: 'layout-dashboard',
    route: '/regitroVehiculo',
  },
  {
    displayName: 'Busqueda',
    iconName: 'layout-dashboard',
    route: '/filtroRegistro',
  },
  {
    displayName: 'Estadistica',
    iconName: 'layout-dashboard',
    route: '/estadisticas',
  },
  {
    displayName: 'Reporte',
    iconName: 'layout-dashboard',
    route: '/reporteRegistro',
  },
  {
    displayName: 'Factura',
    iconName: 'poker-chip',
    route: '/facturaRegistro',
  }
];
