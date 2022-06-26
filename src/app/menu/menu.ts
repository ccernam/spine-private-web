import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
   {
      id: 'home',
      title: 'Home',
      translate: 'MENU.HOME',
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
]
