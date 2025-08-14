import { LENGTH_SINGLE_BYTE } from './defs.js'
import { DYNAMIC_REGISTERS, DYNAMIC_REGISTERS_BULK, MAILBOX_MEM_START, split16, USER_MEM_START } from './registers.js'

/**
 * @import { I2CAddressedBus } from '@johntalton/and-other-delights'
 */

export class CommonUser {
	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<ArrayBuffer|ArrayBufferView>}
	 * */
	static async getGPO(bus) {
		return bus.readI2cBlock(DYNAMIC_REGISTERS.GPO_CTRL, LENGTH_SINGLE_BYTE)
	}

	/** @returns {Promise<ArrayBuffer|ArrayBufferView>} */
	static async setGPO(bus, buffer) {
		return bus.writeI2cBlock(DYNAMIC_REGISTERS.GPO_CTRL, buffer)
	}

	/** @returns {Promise<ArrayBuffer|ArrayBufferView>} */
	static async getEnergyHarvestingControl(bus) {
		return bus.readI2cBlock(DYNAMIC_REGISTERS.EH_CTRL, LENGTH_SINGLE_BYTE)
	}

	/** @returns {Promise<ArrayBuffer|ArrayBufferView>} */
	static async setEnergyHarvestingControl(bus, buffer) {
		return bus.writeI2cBlock(DYNAMIC_REGISTERS, buffer)
	}

	/** @returns {Promise<ArrayBuffer|ArrayBufferView>} */
	static async getRFManagement(bus) {
		return bus.readI2cBlock(DYNAMIC_REGISTERS.RF_MGNT, LENGTH_SINGLE_BYTE)
	}

	/** @returns {Promise<ArrayBuffer|ArrayBufferView>} */
	static async setRFManagement(bus, buffer) {
		return bus.writeI2cBlock(DYNAMIC_REGISTERS.RF_MGNT, buffer)
	}

	/** @returns {Promise<ArrayBuffer|ArrayBufferView>} */
	static async getStatus(bus) {
		return bus.readI2cBlock(DYNAMIC_REGISTERS_BULK.STATUS.ADDRESS, DYNAMIC_REGISTERS_BULK.STATUS.LENGTH)
	}

	/** @returns {Promise<ArrayBuffer|ArrayBufferView>} */
	static async getI2CSecurityStatus(bus) {
		return bus.readI2cBlock(DYNAMIC_REGISTERS.I2C_SSO, LENGTH_SINGLE_BYTE)
	}

	/** @returns {Promise<ArrayBuffer|ArrayBufferView>} */
	static async getInterruptStatus(bus) {
		return bus.readI2cBlock(DYNAMIC_REGISTERS.IT_STS, LENGTH_SINGLE_BYTE)
	}

	/** @returns {Promise<ArrayBuffer|ArrayBufferView>} */
	static async getMailboxControl(bus) {
		return bus.readI2cBlock(DYNAMIC_REGISTERS.MB_CTRL, LENGTH_SINGLE_BYTE)
	}

	/** @returns {Promise<ArrayBuffer|ArrayBufferView>} */
	static async setMailboxControl(bus, buffer) {
		return bus.writeI2cBlock(DYNAMIC_REGISTERS.MB_CTRL, buffer)
	}

	/** @returns {Promise<ArrayBuffer|ArrayBufferView>} */
	static async getMailboxLength(bus) {
		return bus.readI2cBlock(DYNAMIC_REGISTERS.MB_LEN, LENGTH_SINGLE_BYTE)
	}

	/**
	 * @param {I2CAddressedBus} bus
	 * @returns {Promise<ArrayBuffer|ArrayBufferView>}
	 */
	static async readMemory(bus, address, length, into = undefined) {
		const address16 = split16(USER_MEM_START + address)
		return bus.readI2cBlock(address16, length)
	}

	/** */
	static async writeMemory(bus, address, buffer) {
		const address16 = split16(USER_MEM_START + address)
		return bus.writeI2cBlock(address16, buffer)
	}

	/**
	 * @returns {Promise<ArrayBuffer|ArrayBufferView>}
	 */
	static async readMailbox(bus, address, length, into = undefined) {
		const address16 = split16(MAILBOX_MEM_START + address)
		return bus.readI2cBlock(address16, length)
	}

	static async writeMailbox(bus, address, buffer) {
		const address16 = split16(MAILBOX_MEM_START + address)
		return bus.writeI2cBlock(address16, buffer)
	}
}