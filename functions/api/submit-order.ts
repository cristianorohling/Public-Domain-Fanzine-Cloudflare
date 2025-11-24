
interface Env {
  RESEND_API_KEY: string;
}

// Definição local de PagesFunction caso não esteja disponível no escopo global
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
    // 1. Verificar se a chave existe antes de qualquer coisa
    if (!context.env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ 
        error: "CONFIGURAÇÃO PENDENTE: A variável RESEND_API_KEY não foi encontrada no Cloudflare Pages. Adicione-a em Settings > Environment Variables." 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const formData = await context.request.formData();
    const data = Object.fromEntries(formData);
    
    // Montar o corpo do HTML do e-mail
    const emailHtml = `
      <div style="font-family: sans-serif; color: #333;">
        <h1>Novo Pedido Recebido!</h1>
        <p><strong>Cliente:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
        
        <hr />
        
        <h3>Endereço de Entrega:</h3>
        <p>
          ${data.address}, ${data.number} ${data.complement ? '- ' + data.complement : ''}<br />
          ${data.neighborhood} - ${data.city} / ${data.state}<br />
          CEP: ${data.zip}
        </p>

        <hr />

        <h3>Resumo do Pedido:</h3>
        <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px; font-family: monospace;">${data.pedido}</pre>
        
        <br />
        <p><em>Este e-mail foi enviado automaticamente pelo sistema do Public Domain Fanzine.</em></p>
      </div>
    `;

    // Chamada para a API do Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // IMPORTANTE: Use 'onboarding@resend.dev' até configurar seu domínio próprio no Resend
        from: "Public Domain Fanzine <onboarding@resend.dev>", 
        // IMPORTANTE: No modo gratuito/sandbox, este email DEVE ser o mesmo do cadastro do Resend
        to: ["misterquadrinho@gmail.com"], 
        subject: `Novo Pedido de ${data.name}`,
        html: emailHtml,
        reply_to: data.email as string
      }),
    });

    const responseData = await resendResponse.json() as any;

    if (!resendResponse.ok) {
      console.error("Erro Resend:", responseData);
      // Retorna o erro exato do Resend para o Frontend mostrar
      return new Response(JSON.stringify({ 
        error: `Erro do Resend: ${responseData.message || responseData.name || 'Erro desconhecido'}` 
      }), {
        status: 400, // Bad Request
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ 
      message: "Pedido recebido e e-mail enviado com sucesso!",
      id: responseData.id
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ 
      error: `Erro Interno: ${err.message}` 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
