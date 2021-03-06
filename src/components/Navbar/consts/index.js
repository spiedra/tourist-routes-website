import React from 'react'

import { AirlineStops, Map, Info, Email } from '@mui/icons-material'

export const navbarItems = [
  {
    id: 0,
    icon: <AirlineStops />,
    label: 'Zonas Turísticas',
    route: 'tourist-routes'
  },
  {
    id: 1,
    icon: <Map />,
    label: 'Mapa del sitio',
    route: 'site-map'
  },
  {
    id: 2,
    icon: <Info />,
    label: 'Acerca de nosotros',
    route: 'about-us'
  },
  {
    id: 3,
    icon: <Email />,
    label: 'Contáctanos',
    route: 'contact-us'
  }
]
