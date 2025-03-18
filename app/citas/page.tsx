"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, DollarSign, Search, Users } from "lucide-react";

export default function YachtSearchForm() {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("1-5"); // Default value
  const [duration, setDuration] = useState("half-day"); // Default value

  const handleSearch = () => {
    // Implement search functionality here
    console.log("Searching with:", { date, guests, duration });
  };

  return (
    <div className="rounded-xl bg-background p-6 shadow-lg mx-auto max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <div>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-0 p-0 focus-visible:ring-0"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Guests</label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue>{guests || "Number of guests"}</SelectValue>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">1-5 guests</SelectItem>
              <SelectItem value="6-10">6-10 guests</SelectItem>
              <SelectItem value="11-15">11-15 guests</SelectItem>
              <SelectItem value="16+">16+ guests</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Duration</label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue>{duration || "Rental duration"}</SelectValue>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="half-day">Half Day (4 hours)</SelectItem>
              <SelectItem value="full-day">Full Day (8 hours)</SelectItem>
              <SelectItem value="sunset">Sunset Cruise (2 hours)</SelectItem>
              <SelectItem value="weekend">Weekend (2 days)</SelectItem>
              <SelectItem value="week">Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSearch} className="mt-auto bg-blue-600">
          <Search className="mr-2 h-4 w-4" /> Search Yachts
        </Button>
      </div>
    </div>
  );
}
