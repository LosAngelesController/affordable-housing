//import TableauEmbed from '../components/tableau'
//import BasicEmbed from '../components/basicembed'
//import Disclaimer from '../components/disclaimer'

//import NavTabs from '../components/tabs'

//import { Tab } from '@headlessui/react'

import Nav from '../components/nav'

import Head from 'next/head'

import React from 'react'
import dynamic from 'next/dynamic'

function Payroll() {
  return <div className='height100'>
    <Head>
      <title>FAQ</title>
      <meta property="og:type" content="website"/>
      <meta name="twitter:site" content="@kennethmejiala" />
        <meta name="twitter:creator" content="@kennethmejiala" />
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" key='twittertitle' content="Affordable Housing (AH) Covenants - 1985 to 2022 | FAQ"></meta>
      <meta name="twitter:description" key='twitterdesc' content="Browse and Search Affordable Housing in Los Angeles"></meta>
      <meta name="twitter:image:alt" content="Where is LA's Affordable Housing? | Kenneth Mejia for LA City Controller"/>
      <meta name="twitter:image" key='twitterimg' content="https://data.mejiaforcontroller.com/affordablehousingpic.png"></meta>
      <meta name="description" content="A Map of Affordable Housing in Los Angeles. Find Housing near you." />
      
      <link rel="icon" href="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-32x32.png" sizes="32x32"/>
<link rel="icon" href="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-192x192.png" sizes="192x192"/>
<link rel="apple-touch-icon" href="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-180x180.png"/> 
<meta name="msapplication-TileImage" content="https://mejiaforcontroller.com/wp-content/uploads/2020/12/cropped-favicon-1-270x270.png"/>


      <meta property="og:url"                content="https://housingcovenants.lacontroller.io/" />
<meta property="og:type"               content="website" />
<meta property="og:title"              content="Affordable Housing (AH) Covenants - 1985 to 2022 | FAQ" />
<meta property="og:description"        content="Browse and Search Affordable Housing in Los Angeles" />
<meta property="og:image"              content="https://data.mejiaforcontroller.com/affordablehousingpic.png" />
    </Head>
    <div suppressHydrationWarning={true} className='height100'>
      <React.StrictMode>
        <Nav/>

  </React.StrictMode>
  <div className='p-2' style={{ background: 'black', color: 'white' }}>
  <h1 style={{ fontSize: '36px' }}>FAQ(Frequently Asked Questions)</h1>
          <p>What is an Affordable housing covenant?</p>
          <strong> <p>An Affordable Housing covenant is an agreement between the City of LA and property owners for property owners to offer affordable housing. Property owners get incentives if they offer a specified number of affordable housing units.</p></strong>
          <br></br>
         <p>How much does an affordable housing unit cost?</p>
         <strong>  <p>The cost can vary from property to property. Affordable housing units have lower rents that are based on your income level.</p></strong>
          <br></br>
          <p>How do you know if you qualify for affordable housing?</p>
          <strong>  <p>When you apply for an affordable housing unit, the Housing Department will review your application and determine if you qualify based on your income.</p>
          <p>(Currently we’re not aware of a simple way to look up if you qualify before applying. The easiest way to find out may be to submit an application.)</p></strong>
          <br></br>
          <p>What does AH% mean?</p>
          <strong>  <p>The AH% filter on the map means Affordable Housing percent. It shows how many units out of all housing units in a building are affordable housing. You can use it to filter buildings that are majority affordable housing vs. buildings that are mostly mixed income.</p></strong>
          <br></br>
          <p>What does each dot on the map mean?</p>
          <strong>  <p>Each dot on the map represents 1 building.</p></strong>
          <br></br>
          <p>What does the size of a dot mean?</p>
          <strong>  <p>Bigger dots mean more units in a building.</p></strong>
          <br></br>
          <p>The instructions say to Google addresses. Can you explain more about this?</p>
          <strong>  <p>The purpose of the Affordable Housing Map is to show addresses of Affordable Housing Covenant buildings. After locating an address you’re interested in using the Affordable Housing Map, you should enter that address into Google to find the contact details for that property.</p></strong>
          <br></br>
          <p>The instructions say to “See if it’s built”. What does that mean?</p>
          <strong>  <p>Some addresses on the Affordable Housing Map are properties that have not yet completed construction. You should either use Google Street view, or visit the address in person, or contact the property in order to confirm that the property has finished construction and is available for rent.</p></strong>
          <br></br>
          <p>How do you get contact information?</p>
          <strong>   <p>Google the addresses you’re interested in to see if contact information is available for those properties. You may also want to try visiting the addresses in person to see if there are property managers on site, or if there are signs posted with contact information.</p></strong>
      
      
    
      </div>
      </div></div>
}

export default Payroll