import { CommonSystem } from './common_system.js'

export class ST25DVUser {
	#bus

	constructor(bus) { this.#bus = bus }
}

export class ST25DVSystem {
	#bus

	constructor(bus) { this.#bus = bus }



	async getUID() { return CommonSystem.getUID(this.#bus) }
}

export class ST25DV {
	#user
	#system

	constructor(userBus, systemBus) {
		this.#user = userBus
		this.#system = systemBus
	}

	get user() { return this.#user }

	get system() { return this.#system }
}