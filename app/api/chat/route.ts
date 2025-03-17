import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 30;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Verificar que 'messages' es un array y no está vacío
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "El cuerpo de la solicitud debe contener un array 'messages' no vacío." }),
        { status: 400 }
      );
    }

    const customPrompt = `
Eres un vendedor especializado en alquileres de yates de lujo en Miami.
Comienza con una breve introducción y luego realiza preguntas de manera natural y conversacional, limitando tus respuestas a un máximo de 10 palabras.
Si el usuario saluda o hace una pregunta general, responde con un saludo apropiado.
Pero si el usuario realiza una solicitud específica, como "quiero un yate", responde directamente a la solicitud sin repetir el saludo.

1. ¿Qué tipo de evento planeas? (e.g., celebración, reunión de negocios, evento social)
2. ¿Cuántas personas asistirán? (Máximo 15 invitados)
3. ¿Qué fecha y hora prefieres para tu alquiler?
4. ¿Te interesa agregar servicios adicionales, como chef a bordo, DJ, o actividades acuáticas?
5. ¿Tienes alguna preferencia en cuanto al tipo de yate?
6. ¿Necesitas transporte desde o hacia un lugar específico en Miami?
7. ¿Hay alguna solicitud especial o requerimiento que debamos tener en cuenta para tu experiencia?
8. **Si el usuario hace una pregunta general o saluda**, responde con:
   "¡Hola! Bienvenido a Miami Yates! ¿En qué puedo ayudarte?"
9. ¿Si te piden algun presupuesto o precio o costo?
    "Los precios varían según el yate y los servicios por lo general valen 4 horas por 600$."

Para más información o para realizar una reserva, puedes contactarnos a través de:

- WhatsApp
- Teléfono: (305) 555-1234
- Correo electrónico: info@luxyachtsmiami.com
- Dirección: 123 Marina Way, Miami Beach, FL 33139
`;

    // El primer mensaje debe tener el rol 'user'
    const history = [
      {
        role: 'user',
        parts: [{ text: customPrompt }],
      },
      ...messages.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : msg.role,
        parts: [{ text: msg.content }],
      })),
    ];

    // Verificar que cada mensaje en el historial tiene la estructura correcta
    for (const message of history) {
      if (
        !message.role ||
        !['user', 'model', 'function', 'system'].includes(message.role) ||
        !message.parts ||
        !Array.isArray(message.parts) ||
        message.parts.length === 0 ||
        !message.parts[0].text
      ) {
        return new Response(
          JSON.stringify({ error: "La estructura de uno o más mensajes en el historial es inválida." }),
          { status: 400 }
        );
      }
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-thinking-exp-01-21' });
    const chat = model.startChat({ history });

    // Obtener la última entrada del usuario
    const userMessage = messages[messages.length - 1].content;

    // Enviar la última entrada del usuario al modelo
    const result = await chat.sendMessage(userMessage);
    const response = await result.response.text();

    return new Response(JSON.stringify({ content: response }), { status: 200 });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return new Response(
      JSON.stringify({ error: "Ocurrió un error al procesar la solicitud." }),
      { status: 500 }
    );
  }
}
