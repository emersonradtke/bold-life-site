import nodemailer from "npm:nodemailer@6.9.14";

Deno.serve(async (req) => {
  try {
    const { name, email, department, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: Deno.env.get("SMTP_HOST"),
      port: parseInt(Deno.env.get("SMTP_PORT")),
      secure: false,
      auth: {
        user: Deno.env.get("SMTP_EMAIL"),
        pass: Deno.env.get("SMTP_PASSWORD"),
      },
    });

    const mailOptions = {
      from: Deno.env.get("SMTP_EMAIL"),
      to: email,
      cc: Deno.env.get("SMTP_EMAIL"),
      subject: `[${department}] Contato de ${name}`,
      html: `
        <h2>Confirmação de Mensagem Recebida</h2>
        <p>Olá <strong>${name}</strong>,</p>
        <p>Recebemos sua mensagem e entraremos em contato em breve.</p>
        <hr />
        <h3>Dados da Mensagem:</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Departamento:</strong> ${department}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});