export interface User {
  id?: number;           // ID opcional, lo que podría incluirse en la respuesta del backend
  name: string;          // Nombre del usuario
  lastname: string;      // Apellido del usuario
  email: string;         // El correo electrónico del usuario
  password: string;      // Contraseña (solo se envía al registrar o autenticar)
  direction?: string;    // Dirección (solo al registrar, opcional)
  postalcode?: string;   // Código postal (solo al registrar, opcional)
  saldo?: number;        // Saldo del usuario, puede estar en la respuesta de login o al consultar
  isAdmin?: boolean;     // Indicar si el usuario es administrador, opcional
}

// types.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  location?: string;
  capacity?: number;
  rating?: number;
  description?: string;
  pricePerHour?: string;
}

export interface UserData {
  id: number;
  name: string;
  lastname: string;
  email: string;
  isAdmin: number;
}

export interface Purchase {
  id: string;
  created_at: string;
  item_name: string;
  price: number;
  status: "por enviar" | "enviado" | "entregado" | "pending";
  // Customer details
  name: string;
  lastname: string;
  direction: string;
  postalcode: string;
  phone: string;
  email: string;
  payment_method: string;
  quantity: number;
  user_id: number;
};

export interface Service {
  id: string;
  icon: React.ReactNode;
  name: string;
  description: string;
}

export interface ServicesProps {
  services: Service[];
}
