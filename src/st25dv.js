import { CommonSystem } from './common_system.js'
import { CommonUser } from './common_user.js'
import { Converter } from './converter.js'

export class ST25DVUser {
	#bus

	constructor(bus) { this.#bus = bus }

	async getGPO() {
		const ab = await CommonUser.getGPO(this.#bus)
		return Converter.decodeGPO(ab)
	}

	async setGPO(value) {
		return CommonUser.setGPO(this.#bus, Converter.encodeGPO(value))
	}

	async getEnergyHarvestingControl() {
		const ab = await CommonUser.getEnergyHarvestingControl(this.#bus)
		return Converter.decodeEnergyHarvestingControl(ab)
	}

	async setEnergyHarvestingControl(control) {
		return CommonUser.setEnergyHarvestingControl(this.#bus, Converter.encodeEnergyHarvestingControl(control))
	}

	async getRFManagement() {
		const ab = await CommonUser.getRFManagement(this.#bus)
		return Converter.decodeRFManagement(ab)
	}

	async setRFManagement(value) {
		return CommonUser.setRFManagement(this.#bus, Converter.encodeRFManagement(value))
	}

	async getStatus() {
		const ab = await CommonUser.getStatus(this.#bus)
		return Converter.decodeStatus(ab)
	}

	async getI2CSecurityStatus() {
		const ab = await CommonUser.getI2CSecurityStatus(this.#bus)
		return Converter.decodeI2CSecurityStatus(ab)
	}

	async getInterruptStatus() {
		const ab = await CommonUser.getInterruptStatus(this.#bus)
		return Converter.decodeInterruptStatus(ab)
	}

	async getMailboxControl() {
		const ab = await CommonUser.getMailboxControl(this.#bus)
		return Converter.decodeMailboxControl(ab)
	}

	async setMailboxControl(value) {
		return CommonUser.setMailboxControl(this.#bus, Converter.encodeMailboxControl(value))
	}

	async getMailboxLength() {
		const ab = await CommonUser.getMailboxLength(this.#bus)
		return Converter.decodeMailboxLength(ab)
	}

	async readMemory(address, length, into = undefined) {
		return CommonUser.readMemory(this.#bus, address, length, into)
	}

	async writeMemory(address, buffer) {
		return CommonUser.writeMemory(this.#bus, address, buffer)
	}

	async readMailbox(address, length) {
		return CommonUser.readMailbox(this.#bus, address, length)
	}

	async writeMailbox(address, buffer) {
		return CommonUser.writeMailbox(this.#bus, address, buffer)
	}
}

export class ST25DVSystem {
	#bus

	constructor(bus) { this.#bus = bus }

	async getGPO() {
		const ab = await CommonSystem.getGPO(this.#bus)
		return Converter.decodeGPO(ab)
	}

	async setGPO(value) {
		return CommonSystem.setGPO(this.#bus, Converter.encodeGPO(value))
	}

	async getInterruptionTime() {
		const ab = await CommonSystem.getInterruptionTime(this.#bus)
		return Converter.decodeInterruptionTime(ab)
	}

	async setInterruptionTime(value) {
		return CommonSystem.setInterruptionTime(this.#bus, Converter.encodeInterruptionTime(value))
	}

	async getEnergyHarvestingMode() {
		const ab = await CommonSystem.getEnergyHarvestingMode(this.#bus)
		return Converter.decodeEnergyHarvestingMode(ab)
	}

	async setEnergyHarvestingMode(value) {
		return CommonSystem.setEnergyHarvestingMode(this.#bus, Converter.encodeEnergyHarvestingMode(value))
	}

	async getRFManagement() {
		const ab = await CommonSystem.getRFManagement(this.#bus)
		return Converter.decodeRFManagement(ab)
	}

	async setRFManagement(value) {
		return CommonSystem.setRFManagement(this.#bus, Converter.encodeRFManagement(value))
	}

	async getAreas() {
		const ab = await CommonSystem.getAreas(this.#bus)
		return Converter.decodeAreas(ab)
	}

	async getArea1RFAccess() {
		const ab = await CommonSystem.getArea1RFAccess(this.#bus)
		return Converter.decodeArea1RFAccess(ab)
	}

	async setArea1RFAccess(value) {
		return CommonSystem.setArea1RFAccess(this.#bus, Converter.encodeArea1RFAccess(value))
	}

	async getArea1End() {
		const ab = await CommonSystem.getArea1End(this.#bus)
		return Converter.decodeArea1End(ab)
	}

	async setArea1End(value) {
		return CommonSystem.setArea1End(this.#bus, Converter.encodeArea1End(value))
	}

	async getArea2RFAccess() {
		const ab = await CommonSystem.getArea2RFAccess(this.#bus)
		return Converter.decodeArea2RFAccess(ab)
	}

	async setArea2RFAccess(value) {
		return CommonSystem.setArea2RFAccess(this.#bus, Converter.encodeArea2RFAccess(value))
	}

	async getArea2End() {
		const ab = await CommonSystem.getArea2End(this.#bus)
		return Converter.decodeArea2End(ab)
	}

	async setArea2End(value) {
		return CommonSystem.setArea2End(this.#bus, Converter.encodeArea2End(value))
	}

	async getArea3RFAccess() {
		const ab = await CommonSystem.getArea3RFAccess(this.#bus)
		return Converter.decodeArea3RFAccess(ab)
	}

	async setArea3RFAccess(value) {
		return CommonSystem.setArea3RFAccess(this.#bus, Converter.encodeArea3RFAccess(value))
	}

	async getArea3End() {
		const ab = await CommonSystem.getArea3End(this.#bus)
		return Converter.decodeArea3End(ab)
	}

	async setArea3End(value) {
		return CommonSystem.setArea3End(this.#bus, Converter.encodeArea3End(value))
	}

	async getArea4RFAccess() {
		const ab = await CommonSystem.getArea4RFAccess(this.#bus)
		return Converter.decodeArea4RFAccess(ab)
	}

	async setArea4RFAccess(value) {
		return CommonSystem.setArea4RFAccess(this.#bus, Converter.encodeArea4RFAccess(value))
	}

	async getI2CAccess() {
		const ab = await CommonSystem.getI2CAccess(this.#bus)
		return Converter.decodeI2CAccess(ab)
	}

	async setI2CAccess(value) {
		return CommonSystem.setI2CAccess(this.#bus, Converter.encodeI2CAccess(value))
	}

	async getLockCCFile() {
		const ab = await CommonSystem.getLockCCFile(this.#bus)
		return Converter.decodeLockCCFile(ab)
	}

	async setLockCCFile(value) {
		return CommonSystem.setLockCCFile(this.#bus, Converter.encodeLockCCFile(value))
	}

	async getMailboxMode() {
		const ab = await CommonSystem.getMailboxMode(this.#bus)
		return Converter.decodeMailboxMode(ab)
	}

	async setMailboxMode(value) {
		return CommonSystem.setMailboxMode(this.#bus, Converter.encodeMailboxMode(value))
	}

	async getMailboxWatchdog() {
		const ab = await CommonSystem.getMailboxWatchdog(this.#bus)
		return Converter.decodeMailboxWatchdog(ab)
	}

	async setMailboxWatchdog(value) {
		return CommonSystem.setMailboxWatchdog(this.#bus, Converter.encodeMailboxWatchdog(value))
	}

	async getLockConfiguration() {
		const ab = await CommonSystem.getLockConfiguration(this.#bus)
		return Converter.decodeLockConfiguration(ab)
	}

	async setLockConfiguration(value) {
		return CommonSystem.setLockConfiguration(this.#bus, Converter.encodeLockConfiguration(value))
	}

	async getLockDSFID() {
		const ab = await CommonSystem.getLockDSFID(this.#bus)
		return Converter.decodeLockDSFID(ab)
	}

	async getLockAFI() {
		const ab = await CommonSystem.getLockAFI(this.#bus)
		return Converter.decodeLockAFI(ab)
	}

	async getInfo() {
		const ab = await CommonSystem.getInfo(this.#bus)
		return Converter.decodeInfo(ab)
	}

	async getDSFID() {
		const ab = await CommonSystem.getDSFID(this.#bus)
		return Converter.decodeDSFID(ab)
	}

	async getAFI() {
		const ab = await CommonSystem.getAFI(this.#bus)
		return Converter.decodeAFI(ab)
	}

	async getMemorySize() {
		const ab = await CommonSystem.getMemorySize(this.#bus)
		return Converter.decodeMemorySize(ab)
	}

	async getBlockSize() {
		const ab = await CommonSystem.getBlockSize(this.#bus)
		return Converter.decodeBlockSize(ab)
	}

	async getICReference() {
		const ab = await CommonSystem.getICReference(this.#bus)
		return Converter.decodeICReference(ab)
	}

	async getUID() {
		const ab = await CommonSystem.getUID(this.#bus)
		return Converter.decodeUID(ab)
	}

	async getRevision() {
		const ab = await CommonSystem.getRevision(this.#bus)
		return Converter.decodeRevision(ab)
	}

	async getI2CPassword() {
		const ab = await CommonSystem.getI2CPassword(this.#bus)
		return Converter.decodeI2CPassword(ab)
	}

	async setI2CPassword(value, present = false) {
		return CommonSystem.setI2CPassword(this.#bus, Converter.encodeI2CPassword(value, present))
	}
}

export class ST25DV {
	#user
	#system

	constructor(userBus, systemBus) {
		this.#user = new ST25DVUser(userBus)
		this.#system = new ST25DVSystem(systemBus)
	}

	get user() { return this.#user }

	get system() { return this.#system }
}