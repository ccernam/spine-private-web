import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  {
    id: 'security',
    title: 'Security',
    type: 'collapsible',
    icon: 'shield',
    children: [
      {
        id: 'role',
        title: 'Roles',
        type: 'item',
        icon: 'bookmark',
        url: 'security/roles'
      },
      {
        id: 'user',
        title: 'Users',
        type: 'item',
        icon: 'user',
        url: 'security/users'
      },
    ]
  },
  {
    id: 'common',
    title: 'Comunes',
    type: 'collapsible',
    icon: 'list',
    children: [
      {
        id: 'currency',
        title: 'Monedas',
        type: 'item',
        icon: 'check-circle',
        url: 'commons/currencies'
      },
      {
        id: 'branch',
        title: 'Sucursales',
        type: 'item',
        icon: 'check-circle',
        url: 'commons/branches'
      },
      {
        id: 'warehouse',
        title: 'Almacénes',
        type: 'item',
        icon: 'check-circle',
        url: 'commons/warehouses'
      },

      {
        id: 'category',
        title: 'Categorías',
        type: 'item',
        icon: 'check-circle',
        url: 'commons/categories'
      },
      {
        id: 'measurement-unit',
        title: 'Unidades de Medida',
        type: 'item',
        icon: 'check-circle',
        url: 'commons/measurement-units'
      },
      {
        id: 'person',
        title: 'Persona',
        type: 'item',
        icon: 'users',
        url: 'commons/person'
      },
      {
        id: 'product',
        title: 'Productos',
        type: 'item',
        icon: 'check-circle',
        url: 'commons/products'
      },
    ]
  },
  {
    id: 'logistics',
    title: 'Logistica',
    type: 'collapsible',
    icon : 'edit',
    children: [
      {
        id: 'product-movement',
        title: 'Movimiento Almacén',
        type: 'item',
        icon: 'list',
        url: 'logistics/product-movement'
      },
    ]
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    type: 'collapsible',
    icon : 'award',
    children: [
      {
        id: 'meal',
        title: 'Platos',
        type: 'item',
        icon: 'book-open',
        url: 'restaurant/meal'
      },
    ]
  },
]
