import { FaHouse, FaUsers, FaCalendarDays, FaScissors, FaUserTie, FaTags } from 'react-icons/fa6';
export const sidebarLinks = [
  {
    path: '/dashboard',
    icon: <FaHouse size={20} />,
    title: 'Dashboard',
    subTitle: 'Panel de control'
  },
  {
    path: '/clients',
    icon: <FaUsers size={20} />,
    title: 'Clientes',
    subTitle: 'Historial y datos de clientes'
  },
  {
    path: '/appointments',
    icon: <FaCalendarDays size={20} />,
    title: 'Citas',
    subTitle: 'Agenda y horarios'
  },
  {
    path: '/services',
    icon: <FaScissors size={20} />,
    title: 'Servicios',
    subTitle: 'Catálogo y precios'
  },
  {
    path: '/barbers',
    icon: <FaUserTie size={20} />,
    title: 'Barberos',
    subTitle: 'Gestiona tu equipo de barberos'
  },
  {
    path: '/promotions',
    icon: <FaTags size={20} />,
    title: 'Promociones',
    subTitle: 'Descuentos y ofertas'
  }
];

export const topCategoryStyles = {
  'Food and Drink': {
    bg: 'bg-blue-25',
    circleBg: 'bg-blue-100',
    text: {
      main: 'text-blue-900',
      count: 'text-blue-700',
    },
    progress: {
      bg: 'bg-blue-100',
      indicator: 'bg-blue-700',
    },
    icon: '/icons/monitor.svg',
  },
  Travel: {
    bg: 'bg-success-25',
    circleBg: 'bg-success-100',
    text: {
      main: 'text-success-900',
      count: 'text-success-700',
    },
    progress: {
      bg: 'bg-success-100',
      indicator: 'bg-success-700',
    },
    icon: '/icons/coins.svg',
  },
  default: {
    bg: 'bg-pink-25',
    circleBg: 'bg-pink-100',
    text: {
      main: 'text-pink-900',
      count: 'text-pink-700',
    },
    progress: {
      bg: 'bg-pink-100',
      indicator: 'bg-pink-700',
    },
    icon: '/icons/shopping-bag.svg',
  },
}

export const transactionCategoryStyles = {
  'Food and Drink': {
    borderColor: 'border-pink-600',
    backgroundColor: 'bg-pink-500',
    textColor: 'text-pink-700',
    chipBackgroundColor: 'bg-inherit',
  },
  Payment: {
    borderColor: 'border-success-600',
    backgroundColor: 'bg-green-600',
    textColor: 'text-success-700',
    chipBackgroundColor: 'bg-inherit',
  },
  'Bank Fees': {
    borderColor: 'border-success-600',
    backgroundColor: 'bg-green-600',
    textColor: 'text-success-700',
    chipBackgroundColor: 'bg-inherit',
  },
  Transfer: {
    borderColor: 'border-red-700',
    backgroundColor: 'bg-red-700',
    textColor: 'text-red-700',
    chipBackgroundColor: 'bg-inherit',
  },
  Processing: {
    borderColor: 'border-[#F2F4F7]',
    backgroundColor: 'bg-gray-500',
    textColor: 'text-[#344054]',
    chipBackgroundColor: 'bg-[#F2F4F7]',
  },
  Success: {
    borderColor: 'border-[#12B76A]',
    backgroundColor: 'bg-[#12B76A]',
    textColor: 'text-[#027A48]',
    chipBackgroundColor: 'bg-[#ECFDF3]',
  },
  default: {
    borderColor: undefined,
    backgroundColor: 'bg-blue-500',
    textColor: 'text-blue-700',
    chipBackgroundColor: 'bg-inherit',
  },
}
