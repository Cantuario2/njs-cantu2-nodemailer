const nodemailer = require('nodemailer');

export default function handler(req, res) {
  async function main() {

    var mailBody = req.body.msg;

    var mailer = {
      mailSender: String,
      mailPass: String,
      mailHost: String,
      mailPort: Number,
      mailService: String,
      mailSecure: Boolean
    }

    mailer.mailSender = process.env.mailSender;
    mailer.mailPass = process.env.mailPass;
    mailer.mailHost = process.env.mailHost;
    mailer.mailPort = parseInt(process.env.mailPort);
    mailer.mailService = process.env.mailService;
    mailer.mailSecure = !Boolean(process.env.mailSecure);

    let transporter = nodemailer.createTransport({
      host: mailer.mailHost,
      port: mailer.mailPort,
      service: mailer.mailService,
      secure: mailer.mailSecure,
      auth: {
        user: mailer.mailSender,
        pass: mailer.mailPass
      },
      debug: false,
      logger: true
    });

    let info = await transporter.sendMail({
      from: `"Cantuario Container 👻" <${mailer.mailSender}>`,
      to: mailBody.email,
      subject: "Teste de Mensagem Enviada Via Node.Js ✔",
      text: "Hello world?",
      html: `<!DOCTYPE html><html lang=pt-BR><head><title>E-mail Next.Js</title><meta content='text/html; charset=utf-8'http-equiv=Content-Type><meta content='width=device-width,initial-scale=1'name=viewport><meta content='IE=edge'http-equiv=X-UA-Compatible><script crossorigin=anonymous src=https://kit.fontawesome.com/a076d05399.js></script><style>body{background-color:#add8e6;font-family:'Segoe UI'}h1,i{color:#00f}p{color:#00008b}.card{background-color:#fff;border:1px solid #00008b;border-radius:15px;padding:15px;box-shadow:5px 5px #00f}</style></head><body><div class=card><i class='fa-5x fa-file fas'></i><h1>TESTE - E-MAIL NODE.JS</h1><p>Prezado ${mailBody.nome}:<br />${mailBody.corpo}</div></body>`,
    });

    console.info(info.to);
  }
  main()
    .then(() => { res.status(200).send('E-mail enviado com sucesso!') })
    .catch(() => { res.status(500).send(`Server error: ${console.error}`) });
}