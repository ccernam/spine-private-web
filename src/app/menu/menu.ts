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
    title: 'Commons',
    type: 'collapsible',
    icon: 'list',
    children: [
      {
        id: 'category',
        title: 'Categories',
        type: 'item',
        icon: 'check-circle',
        url: 'commons/categories'
      },
      {
        id: 'branch',
        title: 'Branches',
        type: 'item',
        icon: 'check-circle',
        url: 'commons/branches'
      },
      {
        id: 'warehouse',
        title: 'Warehouses',
        type: 'item',
        icon: 'check-circle',
        url: 'commons/warehouses'
      },
    ]
  },
]
