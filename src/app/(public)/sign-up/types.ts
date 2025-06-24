// =========================
// Types
// =========================
/**
 * BarbershopForm: Form data structure for barbershop and owner registration
 */
export type BarbershopForm = {
  barbershop: {
    name: string
    address: string
  }
  owner: {
    email: string
    password: string
    name: string
    phoneNumber: string
    avatarUrl: string
  }
} 