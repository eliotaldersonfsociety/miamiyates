import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Anchor } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-50 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-primary">
              <Anchor className="h-6 w-6 text-blue-700" />
              <span className="text-blue-700">Miami Yates</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Luxury yacht rentals in Miami. Experience the beauty of Miami's coastline in style.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#yachts" className="text-muted-foreground hover:text-primary">
                  Yachts
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-muted-foreground hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-muted-foreground hover:text-primary">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for special offers and updates.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="max-w-[220px]" />
              <Button variant="outline">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Miami Yates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
