import Image from 'next/image'
import React from 'react'
import { IoLogoReact } from 'react-icons/io5'
import { SidebarMenuItem } from './SidebarMenuItem'
import { sidebarLinks } from '@/src/lib/constants'

export const Sidebar = () => {
 return (
  <div id="menu" style={{ width: '400px' }} className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 left-0 h-screen overflow-y-scroll">
   <div id="logo" className="my-4 px-6">
    <h1 className="flex items-center text-lg md:text-2xl font-bold text-white">
     <IoLogoReact className='mr-2' />
     Barbería
     <span className="text-blue-500 ml-2">Hunters</span>.</h1>
    <p className="text-slate-500 text-sm">Maneja tus citas, clientes y barberos de forma eficiente</p>
   </div>
   <div id="profile" className="px-6 py-10">
    <p className="text-slate-500">Bienvenido de nuevo,</p>
    <a href="#" className="inline-flex space-x-2 items-center">
     <span>
      <Image className="rounded-full w-8 h-8" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c" alt="User" width={50} height={50} />
     </span>
     <span className="text-sm md:text-base font-bold">
      Antonio Viña
     </span>
    </a>
   </div>

   <div id="nav" className="w-full px-6">

    {
     sidebarLinks.map(item => (
      <SidebarMenuItem key={item.path} {...item} />
     ))
    }

   </div>
  </div>

 )
}