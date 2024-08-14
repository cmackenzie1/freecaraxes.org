/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const html = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="color-scheme" content="light dark">
	<title>FreeCaraxes.org</title>

	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css">
</head>
<body>
<main class="container">
	<h1>FreeCaraxes</h1>

	<p>Help free Caraxes!</p>

	<p>Every dragon deserves a second chance.</p>

	<style>
      .box {
          display: flex;
          align-items: center;
          justify-content: center;
      }

      .box div {
          width: 100px;
          height: 100px;
      }
	</style>

	<div class="box">
		<video controls autoplay loop>
			<source src="https://cdn.freecaraxes.org/freecaraxes.mp4" type="video/mp4">
			<source src="https://cdn.freecaraxes.org/freecaraxes.ogg" type="video/ogg">
			<source src="https://cdn.freecaraxes.org/freecaraxes.webm" type="video/webm">
			Your browser does not support the video tag.
		</video>

	</div>

	<br>
	<div class="box">

		<script async
						src="https://js.stripe.com/v3/buy-button.js">
		</script>

		<stripe-buy-button
			buy-button-id="buy_btn_1PnZ98D7AUAR93s0mCZEWxTo"
			publishable-key="pk_live_51PnYacD7AUAR93s000huFrlOLZj2hoVwxD0ugQMncHoEGzh6VsSLweQhYc9hRoemS9RexX39CVrrPvWqry7tTnjr00ZX6hlKZo"
		>
		</stripe-buy-button>
	</div>

</main>
<footer class="container">
	<p>#whereisdaemon</p>
	<p>All credit goes to <a href="https://x.com/OBcrack/status/1823122995910476137">@OBcrack</a> for the original video.
	</p>
	<i>This website is purely for entertainment purposes. Enjoy the fun, but don't take anything here too seriously!. Any
		donations go towards buying me a Coffee :)</i>
</footer>
</body>
</html>
`;

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response(html, { headers: { "content-type": "text/html" } });
	},
} satisfies ExportedHandler<Env>;
