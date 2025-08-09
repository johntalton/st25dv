import { SYSTEM_CONFIG_REGISTERS } from './defs.js'
import { splitRegister } from './util.js'

const LENGTH_UID = 8


export class CommonSystem {
	static async getUID(bus) {
		const cmd = splitRegister(SYSTEM_CONFIG_REGISTERS.UID)
		const length = LENGTH_UID
		// const into = new Uint8Array(length)
		const ab = await bus.readI2cBlock(cmd, length)

		const result = ArrayBuffer.isView(ab) ?
			new Uint8Array(ab.buffer, ab.byteOffset, LENGTH_UID) :
			new Uint8Array(ab, 0, LENGTH_UID)

		return result
	}
}