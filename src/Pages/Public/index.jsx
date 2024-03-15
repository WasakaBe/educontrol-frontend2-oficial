import React from 'react'
import {AcercaPublic, Activities, Carrusel, Footer, Inscription, Navbar, SchoolActivities, Special, Welcome,InfoAreas, Contact} from '../../Components/Public'
import {TextActivities,Breadcrumbs} from '../../Constants'
export default function IndexPublic() {
  return (
    <div>
     <Navbar/> 
     <div className='flex container mx-auto justify-center'>
        <Breadcrumbs path={''} />
      </div>
      <Carrusel/>
      <Welcome/>
      <TextActivities/>
      <Activities/>
      <Inscription/>
      <SchoolActivities/>
      <AcercaPublic/>
      <Special/>
      <InfoAreas/>
      <Contact/>
      <Footer/>
    </div>
  )
}
