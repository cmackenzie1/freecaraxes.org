import { DurableObject } from 'cloudflare:workers';

export class DurableDonation extends DurableObject {
	async balance(): Promise<number> {
		const value: number | undefined = await this.ctx.storage.get('total');
		return value ?? 0;
	}

	async increment(amount = 1): Promise<number> {
		// Increment our stored value and return it.
		let value: number = (await this.ctx.storage.get('total')) ?? 0;
		value += amount;
		await this.ctx.storage.put('total', value);
		return value;
	}

	async decrement(amount = 1): Promise<number> {
		let value: number = (await this.ctx.storage.get('total')) ?? 0;
		value -= amount;
		await this.ctx.storage.put('total', value);
		return value;
	}
}
