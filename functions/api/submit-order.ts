
interface Env {
  // Adicione suas variáveis de ambiente aqui (ex: chaves de API de email)
  // RESEND_API_KEY: string;
}

// FIX: Locally define PagesFunction as it is missing from the global scope in this environment.
type PagesFunction<T = any> = (context: {
  request: Request;
  env: T;
  params: Record<string, any>;
  waitUntil: (promise: Promise<any>) => void;
  passThroughOnException: () => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  data: Record<string, any>;
}) => Response | Promise<Response>;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    // A Cloudflare pode processar FormData ou JSON. 
    // O frontend envia x-www-form-urlencoded, que o context.request.formData() processa automaticamente.
    const formData = await context.request.formData();
    const data = Object.fromEntries(formData);

    // LOGICA DE BACKEND:
    // Na Cloudflare, os dados não são salvos automaticamente como no Netlify.
    // Aqui você deve integrar com um serviço de e-mail (Resend, SendGrid, MailChannels)
    // ou salvar em um banco de dados (Cloudflare D1, Supabase, etc).
    
    console.log("Novo Pedido Recebido (Logs Cloudflare):", data);

    // Simulação de sucesso para o Frontend
    return new Response(JSON.stringify({ 
      message: "Pedido recebido com sucesso!",
      details: "Em produção real, configure um serviço de email neste arquivo."
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Erro ao processar o pedido" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}