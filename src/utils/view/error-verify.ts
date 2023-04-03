export const ERROR_VERIFY = (message: string) => `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Error Verify Account</title>
		<style>
			.section {
				background-color: #f8f9fa;
				justify-content: center;
				align-items: center;
				display: flex;
				width: 100%;
				height: auto;
				bottom: 0;
				top: 0;
				left: 0;
				position: absolute;
				flex-direction: column;
			}
			p {
				font-size: 20px;
				font-family: Menlo, Monaco, fixed-width;
			}
			.error-banmark {
				width: 80px;
				height: 115px;
				margin: 0 auto;
			}
			.error-banmark .ban-icon {
				width: 80px;
				height: 80px;
				position: relative;
				border-radius: 50%;
				box-sizing: content-box;
				border: 4px solid #af4c4c;
			}
			.error-banmark .ban-icon::before {
				top: 3px;
				left: -2px;
				width: 30px;
				transform-origin: 100% 50%;
				border-radius: 100px 0 0 100px;
			}
			.error-banmark .ban-icon::after {
				top: 0;
				left: 30px;
				width: 60px;
				transform-origin: 0 50%;
				border-radius: 0 100px 100px 0;
				animation: rotate-circle 4.25s ease-in;
			}
			.error-banmark .ban-icon::before, .error-banmark .ban-icon::after {
				content: '';
				height: 100px;
				position: absolute;
				background: rgba(255, 255, 255, 0);
				transform: rotate(-45deg);
			}
			.error-banmark .ban-icon .icon-line {
				height: 5px;
				background-color: #af4c4c;
				display: block;
				border-radius: 2px;
				position: absolute;
				z-index: 10;
			}
			.error-banmark .ban-icon .icon-line.line-long-invert {
				top: 39px;
				left: 8px;
				width: 60px;
				transform: rotate(45deg);
				animation: icon-line-long 0.75s;
			}
			.error-banmark .ban-icon .icon-line.line-long {
				top: 39px;
				left: 8px;
				width: 60px;
				transform: rotate(-45deg);
				animation: icon-line-long 0.85s;
			}
			.error-banmark .ban-icon .icon-circle {
				top: -4px;
				left: -4px;
				z-index: 10;
				width: 80px;
				height: 80px;
				border-radius: 50%;
				position: absolute;
				box-sizing: content-box;
				border: 4px solid rgba(175, 76, 76, 0.5);
			}
			.error-banmark .ban-icon .icon-fix {
				top: 8px;
				width: 5px;
				left: 26px;
				z-index: 1;
				height: 85px;
				position: absolute;
				transform: rotate(-45deg);
				background-color: rgba(255, 255, 255, 0);
			}
		</style>
	</head>
	<body>
		<div class="section">
			<div class="error-banmark">
				<div class="ban-icon">
					<span class="icon-line line-long-invert"></span>
					<span class="icon-line line-long"></span>
					<div class="icon-circle"></div>
					<div class="icon-fix"></div>
				</div>
			</div>
			<p>${message}</p>
		</div>
	</body>
	</html>
`
