import { Service } from '@/types/user';
import { Star } from 'lucide-react';

// Array de productos (tal como lo tienes)
const products = [
  { id: 1, name: "Celebrate your baby shower", price: 600, image: "/2f.jpg", quantity: 1, location: "Miami Beach Marina", capacity: 15, rating: 4.5, description: "Celebrate your baby shower in style with our luxury yachts. Our yachts are perfect for any occasion, from birthdays to weddings.", pricePerHour: "600$ for 4 hour" },
  { id: 2, name: "Celebrate your birthday", price: 600, image: "/3f.jpg", quantity: 1, location: "Miami Beach Marina", capacity: 15, rating: 4.5, description: "Celebrate your birthday in style with our luxury yachts. Our yachts are perfect for any occasion, from birthdays to weddings.", pricePerHour: "600$ for 4 hour" },
  { id: 3, name: "Romantic date", price: 600, image: "/4f.jpg", quantity: 1, location: "Miami Beach Marina", capacity: 15, rating: 4.8, description: "Celebrate your romantic date in style with our luxury yachts. Our yachts are perfect for any occasion, from birthdays to weddings.", pricePerHour: "600$ for 4 hour" },
  { id: 4, name: "Business meeting", price: 600, image: "/5f.jpg", quantity: 1, location: "Miami Beach Marina", capacity: 15, rating: 5, description: "Host your next business meeting in an exclusive and sophisticated environment aboard our luxury yacht. Equipped with a spacious deck.", pricePerHour: "600$ for 4 hour" },
  { id: 5, name: "Marriage proposal", price: 600, image: "/6f.jpg", quantity: 1, location: "Miami Beach Marina", capacity: 15, rating: 4.5, description: "Make your marriage proposal unforgettable with our luxury yachts. Our yachts are perfect for any occasion, from birthdays to weddings.", pricePerHour: "600$ for 4 hour" },
  { id: 6, name: "Graduation party", price: 600, image: "/7f.jpg", quantity: 1, location: "Miami Beach Marina", capacity: 15, rating: 4.5, description: "Celebrate your graduation party in style with our luxury yachts. Our yachts are perfect for any occasion, from birthdays to weddings.", pricePerHour: "600$ for 4 hour" },
  { id: 7, name: "Celebrate your wedding", price: 600, image: "/8f.jpg", quantity: 1, location: "Miami Beach Marina", capacity: 15, rating: 4.5, description: "Celebrate your wedding in style with our luxury yachts. Our yachts are perfect for any occasion, from birthdays to weddings.", pricePerHour: "600$ for 4 hour" },
  { id: 8, name: "Let's party", price: 600, image: "/9f.jpg", quantity: 1, location: "Miami Beach Marina", capacity: 15, rating: 4.5, description: "Celebrate your party in style with our luxury yachts. Our yachts are perfect for any occasion, from birthdays to weddings.", pricePerHour: "600$ for 4 hour" },
  { id: 9, name: "A day of fishing", price: 600, image: "/10f.jpg", quantity: 1, location: "Miami Beach Marina", capacity: 15, rating: 4.5, description: "Enjoy a day of fishing in style with our luxury yachts. Our yachts are perfect for any occasion, from birthdays to weddings.", pricePerHour: "600$ for 4 hour" },
];

// Convertimos el array de productos a un array de Service
const services: Service[] = products.map(product => ({
  id: product.id.toString(), // La interfaz Service espera id como string
  icon: <Star className="h-4 w-4" />, // Icono de ejemplo; puedes reemplazarlo según necesites
  name: product.name,
  description: product.description ?? ""
}));

export default function ServicesPage() {
  return (
    <section id="services" className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Premium Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Enhance your yacht experience with our additional services
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <div key={service.id} className="rounded-xl border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                {service.icon}
              </div>
              <h3 className="mt-4 text-xl font-bold">{service.name}</h3>
              <p className="mt-2 text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
