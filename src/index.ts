import { Hono } from 'hono';
import { html } from 'hono/html';
import { DurableDonation } from './DurableDonation';

type Bindings = {
	DONATIONS: DurableObjectNamespace<DurableDonation>;
};

const formatCount = (count: number) => {
	const formatter = new Intl.NumberFormat('en-US');
	return formatter.format(count);
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
	const id = c.env.DONATIONS.idFromName('donation');
	const donation = c.env.DONATIONS.get(id);

	const total = await donation.balance();

	return c.html(
		html`<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta name="color-scheme" content="light dark">
			<title>FreeCaraxes.org</title>

			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.red.min.css"
			>
			<script src="https://unpkg.com/htmx.org@2.0.2"
							integrity="sha384-Y7hw+L/jvKeWIRRkqWYfPcvVxHzVzn5REgzbawhxAuQGwX1XWe70vji+VSeHOThJ"
							crossorigin="anonymous"></script>

		</head>
		<body>
		<header class="container">
			<nav>
				<ul>
					<li><h1>Free Caraxes</h1></li>
				</ul>
				<ul>
					<a href="https://x.com/@Cole_MacKenzie">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x"
								 viewBox="0 0 16 16">
							<path
								d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
						</svg>
					</a>
				</ul>
			</nav>
		</header>
		<main class="container">
			<p>Help free Caraxes!</p>
			<p>Every dragon deserves a second chance.</p>

			<h2>Donations</h2>
			<p>
				We are currently at <span id="counter">${formatCount(total)} 🪙</span> of our goal of 10,000,000 🪙 to free
				Caraxes.
			</p>

			<progress value="${total}" max="10000000"></progress>

			<button hx-post="/donate" hx-target="#counter" hx-swap="innerHTML">
				Donate 🪙
			</button>

			<button hx-post="/steal" hx-target="#counter" hx-swap="innerHTML" class="secondary">
				Steal money 😈
			</button>

			<blockquote class="twitter-tweet"><p lang="en" dir="ltr">&quot;Call 1-800-FREE-CARAXES&quot; to save a dragon
				--
				<a
					href="https://twitter.com/hashtag/HOTD?src=hash&amp;ref_src=twsrc%5Etfw">#HOTD</a> <a
					href="https://twitter.com/hashtag/SarahMcLachlan?src=hash&amp;ref_src=twsrc%5Etfw">#SarahMcLachlan</a> <a
					href="https://twitter.com/hashtag/whereisdaemon?src=hash&amp;ref_src=twsrc%5Etfw">#whereisdaemon</a> <a
					href="https://t.co/EHkbxgpumw">pic.twitter.com/EHkbxgpumw</a></p>&mdash; OBCrack (@OBcrack) <a
				href="https://twitter.com/OBcrack/status/1823122995910476137?ref_src=twsrc%5Etfw">August 12, 2024</a>
			</blockquote>
			<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
		</main>
		<footer class="container">
			<i>This website is purely for entertainment purposes. Enjoy the fun, but don't take anything here too
				seriously!</i>
		</footer>
		</body>
		</html>
		`);
});

app.get('/donate', async (c) => {
	const id = c.env.DONATIONS.idFromName('donation');
	const donation = c.env.DONATIONS.get(id);

	const total = await donation.balance();

	return c.html(`<span id="counter">${formatCount(total)} 🪙</span>`);
});

app.post('/donate', async (c) => {
	const id = c.env.DONATIONS.idFromName('donation');
	const donation = c.env.DONATIONS.get(id);

	const total = await donation.increment();

	return c.html(`<span id="counter">${formatCount(total)} 🪙</span>`);
});

app.post('/steal', async (c) => {
	const id = c.env.DONATIONS.idFromName('donation');
	const donation = c.env.DONATIONS.get(id);

	const total = await donation.decrement();

	return c.html(`<span id="counter">${formatCount(total)} 🪙</span>`);
});

export { DurableDonation } from './DurableDonation';
export default app;
