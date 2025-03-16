import { Service } from '@/types/user';

const services: Service[] = [
  { id: "1", icon: <SomeIcon />, name: "Luxury Catering", description: "Enjoy gourmet meals on board." },
  { id: "2", icon: <AnotherIcon />, name: "Professional Crew", description: "Experienced crew for your journey." },
  { id: "3", icon: <ThirdIcon />, name: "Water Sports", description: "Jetskis, snorkeling, and more." },
];

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
          {services.map((service) => (
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
