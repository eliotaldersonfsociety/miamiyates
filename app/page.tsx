"use client";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Header } from "@/components/header/page";
import { Product } from "@/types/user";
import Hero from "@/app/hero/page";
import { Star, MapPin, Users } from "lucide-react";
import YachtSearchForm from "@/app/citas/page";
import Footer from "@/app/footer/page";
//import Services from "@/components/service/page";
import Contact from "@/app/contact/page";
import ChatWidget from "@/components/chat/page";

const products: Product[] = [
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

// Convertir productos en datos para el componente Services
const servicesData = products.map(product => ({
  id: product.id.toString(),
  icon: <Star className="h-4 w-4" />,
  name: product.name,
  description: product.description ?? ""
}));

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies(["cart"]);

  useEffect(() => {
    try {
      if (cookies.cart && typeof cookies.cart === "string") {
        const parsedCart = JSON.parse(cookies.cart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        } else {
          setCart([]);
        }
      }
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
      setCart([]);
    }
  }, [cookies.cart]);

  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    setCookie("cart", JSON.stringify(updatedCart), { path: "/" });
  };

  const clearCart = () => {
    setCart([]);
    removeCookie("cart", { path: "/" });
  };

  const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header cart={cart} clearCart={clearCart} addToCart={addToCart} totalPrice={totalPrice} />
      <Hero />
      <YachtSearchForm />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold text-center">Our Luxury Fleet</h1>
        <p className="mt-4 text-center">
          Choose from our selection of premium yachts for your perfect day on the water
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg">
              <div className="flex justify-end">
                <div className="relative bottom-2 right-2 bg-yellow-500 px-2 py-1 rounded-md text-sm text-white font-medium inline-block">
                  {product.pricePerHour}
                </div>
              </div>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
              <div className="flex items-center">
                {[...Array(Math.floor(product.rating ?? 0))].map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                {product.rating !== undefined && product.rating % 1 !== 0 && (
                  <Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 50% 0 0)" }} />
                )}
                {[...Array(5 - Math.ceil(product.rating ?? 0))].map((_, index) => (
                  <Star key={index + "empty"} className="h-4 w-4 text-gray-400" />
                ))}
              </div>
              <div className="flex items-center mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1 text-blue-700" />
                <span className="text-sm text-blue-700">{product.location}</span>
              </div>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                <span>Up to {product.capacity} guests</span>
              </div>
              <p className="font-semibold text-black-500 mt-2">${product.price.toFixed(2)}</p>
              <p className="mt-2 text-sm line-clamp-2">{product.description}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
      
      <ChatWidget />
      <Contact />
      <Footer />
    </div>
  );
}
