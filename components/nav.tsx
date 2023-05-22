import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'
import React, { Children } from 'react'

import ActiveLink from './ActiveLink'
const navigationPayroll = [
  {
    'name': "Map",
    'url': "/"
  },
  // {
  //   'name': "List",
  //   'url': "",
  //   'newtab': true
  // },
  {
    'name': "Los Angeles Controller",
    'url': "https://controller.lacity.gov",
    'newtab': true
  }
]



function Nav() {
  return <div className="z-50 bg-[#1a1a1a] flex flex-col">
    <nav className="z-50 flex flex-row  h-content">
      {navigationPayroll.map((item:any, itemIdx:any) =>
                     
              
                     <ActiveLink activeClassName="text-white py-3 px-6 block hover:text-green-300 focus:outline-none text-green-300 border-b-2 font-medium border-green-300" href={item.url}
                     key={itemIdx}
                     >
                     <a className="text-white py-3 px-3 md:px-6 text-sm block hover:text-green-300 focus:outline-none underline"
                          target={`${item.newtab === true ? "_blank" : ""}`}
                     >
                                                 {item.name}
                     </a>
                     </ActiveLink>
                     
                   )}
  </nav></div>
}

export default Nav