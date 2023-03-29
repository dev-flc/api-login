export const templateSendMail = (userName: string, token: string) => {
  const { HOST_FRONTEND } = process.env

  return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	<body>
		<center>
			<h2>Hola, ${userName}</h2>
			<br/>
			<b>
				Gracias por suscribirte al API LOGIN. Haga clic en el siguiente enlace para verificar su cuenta:
			</b>
			<br/>
			<br/>
			<a href="${HOST_FRONTEND}/${token}">Confirm account</a>
			<br/>
			<br/>
			<b>
				Este enlace caducará en 24 horas. Si no se registró para obtener una cuenta de API LOGIN, puede ignorar este correo electrónico de manera segura.
			</b>
		</center>
	</body>
	</html>`
}
