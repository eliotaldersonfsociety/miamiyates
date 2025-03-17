"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: string; role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Ocultar la notificación después de 5 segundos
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowNotification(false); // Ocultar la notificación al abrir el chat
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { id: crypto.randomUUID(), role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: data.content }]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Notificación flotante */}
      {showNotification && !isOpen && (
        <div className="absolute bottom-16 right-2 bg-white shadow-lg rounded-lg p-3 flex items-center gap-3 border border-gray-200 animate-fade-in">
          <Image src="/2c.jpg" alt="Asistente" width={32} height={32} className="rounded-full object-cover" />
          <span className="text-sm font-medium">¿Quieres hablar con el capitán?</span>
          <button onClick={() => setShowNotification(false)} className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {isOpen ? (
        <Card className="w-80 sm:w-96 shadow-lg flex flex-col h-[450px] max-h-[80vh]">
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <Image
                src="/2c.jpg"
                alt="Chat Asistente Avatar"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <CardTitle className="text-sm font-medium">Chat con el Capitan</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                Envía un mensaje para comenzar
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role !== "user" && (
                    <div className="relative">
                      <Image
                        src="/2c.jpg"
                        alt="Asistente"
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-3 text-sm rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-700 rounded-bl-none"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <div className="relative">
                      <Image
                        src="/1c.jpg"
                        alt="Usuario"
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Indicador de escritura */}
            {isLoading && (
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-400 animate-pulse"></div>
                <span className="text-sm text-gray-600">El capitán está escribiendo...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="border-t p-3">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 h-8 text-sm"
                disabled={isLoading}
              />
              <Button className="bg-blue-700" type="submit" size="sm" disabled={isLoading || !input.trim()}>
                <Send className="h-3 w-3" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button onClick={toggleChat} className="rounded-full h-12 w-12 shadow-lg" size="icon">
          <Image src="/2c.jpg" alt="Chat" width={48} height={48} className="rounded-full object-cover" />
        </Button>
      )}
    </div>
  );
}
