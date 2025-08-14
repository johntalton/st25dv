import { NDEFRecord } from './record.js'

export class NDEFMessage {
	#records

	constructor(options) { this.#records = options.records }

	get records() {
		return this.#records
	}

	static encode(message) {
		const encodedRecords = message.records.map((record, index) => {
			const start = index === 0
			const end = index === message.records.length
			return NDEFRecord.encode(record, { start, end })
		})

		// console.log('encoded Records', encodedRecords)
		const totalBytes = encodedRecords.reduce((acc, item) => acc += item.byteLength, 0)
		const buffer = new Uint8Array(totalBytes)

		// console.log('total', totalBytes)

		let offset = 0
		encodedRecords.forEach(item => {
			buffer.set(item, offset)
			offset += item.byteLength
		})

		return buffer
	}
}
