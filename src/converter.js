import { BitSmush } from '@johntalton/bitsmush'

import {
	LENGTH_I2C_PASSWORD,
	LENGTH_MEM_SIZE,
	LENGTH_SINGLE_BYTE,
	LENGTH_UID,
	PASSWORD_PRESENT_VALIDATION_CODE,
	PASSWORD_SET_VALIDATION_CODE,
	UID_MAGIC,
	UID_MANUFACTURE_CODE_ST
} from './defs.js'
import { DYNAMIC_REGISTERS_BULK, SYSTEM_CONFIG_REGISTERS_BULK } from './registers.js'

const BIT_SET = 1

/**
 * @import { SmushMap } from '@johntalton/bitsmush'
 */

/** @import {
 * GPO,
 * InterruptionTime,
 * AreaRFAccess,
 * EHMode,
 * RFManagement,
 * AreaEnd,
 * AreaI2CAccess,
 * CCFile,
 * MailboxMode,
 * WatchDogTime,
 * ConfigurationLock,
 * DSFIDLock,
 * AFILock,
 * ICReference,
 * UID,
 * BulkAreas,
 * BulkInfo,
 * EnergyHarvestingControl,
 * I2CSecurityStatus,
 * InterruptStatus,
 * MailboxControl,
 * Status
 * } from "./defs.js"
 */


/** @type {SmushMap} */
export const SMUSH_MAP_GPO = [
	[ 0, 1 ],
	[ 1, 1 ],
	[ 2, 1 ],
	[ 3, 1 ],
	[ 4, 1 ],
	[ 5, 1 ],
	[ 6, 1 ],
	[ 7, 1 ]
]

/** @type {SmushMap} */
export const SMUSH_MAP_IT_TIME = [ [ 2, 3 ] ]

/** @type {SmushMap} */
export const SMUSH_MAP_ENERGY_HARVEST = [ [ 0, 1 ] ]

/** @type {SmushMap} */
export const SMUSH_MAP_RF_MANAGEMENT = [ [ 0, 1 ], [ 1, 1 ] ]

/** @type {SmushMap} */
export const SMUSH_MAP_AREA_N_ACCESS = [ [ 1, 2 ], [ 3, 2 ]]
export const SMUSH_MAP_AREA_1_ACCESS = SMUSH_MAP_AREA_N_ACCESS
export const SMUSH_MAP_AREA_2_ACCESS = SMUSH_MAP_AREA_N_ACCESS
export const SMUSH_MAP_AREA_3_ACCESS = SMUSH_MAP_AREA_N_ACCESS
export const SMUSH_MAP_AREA_4_ACCESS = SMUSH_MAP_AREA_N_ACCESS

/** @type {SmushMap} */
export const SMUSH_MAP_AREA_N_END = [ [ 7, 8 ] ]

/** @type {SmushMap} */
export const SMUSH_MAP_I2C_ACCESS = [
	[ 1, 2 ],
	[ 3, 2 ],
	[ 5, 2 ],
	[ 7, 2 ]
]

/** @type {SmushMap} */
export const SMUSH_MAP_LOCK_CC_FILE = [
	[ 0, 1 ],
	[ 1, 1 ]
]

/** @type {SmushMap} */
export const SMUSH_MAP_MAILBOX_MODE = [ [ 0, 1 ] ]

/** @type {SmushMap} */
export const SMUSH_MAP_MAILBOX_WATCH_DOG = [ [ 2, 3 ] ]

/** @type {SmushMap} */
export const SMUSH_MAP_LOCK_CONFIGURATION = [ [ 0, 1 ] ]

/** @type {SmushMap} */
export const SMUSH_MAP_DSFID_LOCK = [ [ 0, 1 ] ]

/** @type {SmushMap} */
export const SMUSH_MAP_AFI_LOCK = [ [ 0, 1 ] ]

/** @type {SmushMap} */
export const SMUSH_MAP_ENERGY_HARVEST_CONTROL = [
	[ 0, 1 ],
	[ 1, 1 ],
	[ 2, 1 ],
	[ 3, 1 ]
]

/** @type {SmushMap} */
export const SMUSH_MAP_I2C_SECURITY_STATUS = [ [ 0, 1 ] ]

/** @type {SmushMap} */
export const SMUSH_MAP_INTERRUPTION_STATUS = [
	[ 0, 1 ],
	[ 1, 1 ],
	[ 2, 1 ],
	[ 3, 1 ],
	[ 4, 1 ],
	[ 5, 1 ],
	[ 6, 1 ],
	[ 7, 1 ]
]

/** @type {SmushMap} */
export const SMUSH_MAP_MAILBOX_CONTROL = [
	[ 0, 1 ],
	[ 1, 1 ],
	[ 2, 1 ],
	// Reserved
	[ 4, 1 ],
	[ 5, 1 ],
	[ 6, 1 ],
	[ 7, 1 ]
]

function decode(buffer, smushMap) {
	const u8 = ArrayBuffer.isView(buffer) ?
		new Uint8Array(buffer.buffer, buffer.byteOffset, LENGTH_SINGLE_BYTE) :
		new Uint8Array(buffer, 0, LENGTH_SINGLE_BYTE)

	const [ data ] = u8
	return BitSmush.unSmushBits(smushMap, data)
}

/**
 * @param {ArrayBuffer|ArrayBufferView} buffer
 * @return {AreaEnd}
 */
function decodeAreaNEnd(buffer) {
	const [ endA ] = decode(buffer, SMUSH_MAP_AREA_N_END)
	return {
		RFBlocks: 8 * endA + 7,
		I2CBytes: 32 * endA + 31
	}
}

export class Converter {
	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {GPO}
	 */
	static decodeGPO(buffer) {
		const [
			RF_USER_EN,
			RF_ACTIVITY_EN,
			RF_INTERRUPT_EN,
			FIELD_CHANGE_EN,
			RF_PUT_MSG_EN,
			RF_GET_MSG_EN,
			RF_WRITE_EN,
			GPO_EN
		] = decode(buffer, SMUSH_MAP_GPO)

		return {
			rfUserEnabled: RF_USER_EN === BIT_SET,
			rfActivityEnabled: RF_ACTIVITY_EN === BIT_SET,
			rfInterruptEnabled: RF_INTERRUPT_EN === BIT_SET,
			fieldChangedEnabled: FIELD_CHANGE_EN === BIT_SET,
			rfPutEnabled: RF_PUT_MSG_EN === BIT_SET,
			rfGetEnabled: RF_GET_MSG_EN === BIT_SET,
			rfWriteEnabled: RF_WRITE_EN === BIT_SET,
			gpoEnabled: GPO_EN === BIT_SET
		}
	}

	/**
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeGPO(value) {
		const {
			RF_USER_EN,
			RF_ACTIVITY_EN,
			RF_INTERRUPT_EN,
			FIELD_CHANGE_EN,
			RF_PUT_MSG_EN,
			RF_GET_MSG_EN,
			RF_WRITE_EN,
			GPO_EN
		} = value

		const data = BitSmush.smushBits(SMUSH_MAP_GPO, [
			RF_USER_EN,
			RF_ACTIVITY_EN,
			RF_INTERRUPT_EN,
			FIELD_CHANGE_EN,
			RF_PUT_MSG_EN,
			RF_GET_MSG_EN,
			RF_WRITE_EN,
			GPO_EN
		])

		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {InterruptionTime}
	 */
	static decodeInterruptionTime(buffer) {
		const [ IT_TIME ] = decode(buffer, SMUSH_MAP_IT_TIME)

		const interruptionTimeUs = 301 - IT_TIME * 37.65

		return {
			IT_TIME,
			interruptionTimeUs
		}
	}

	/**
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeInterruptionTime(value) {
		// todo accept timeUs
		const data = BitSmush.smushBits(SMUSH_MAP_IT_TIME, [ value ])
		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {EHMode}
	 */
	static decodeEnergyHarvestingMode(buffer) {
		const [ EH_MODE ] = decode(buffer, SMUSH_MAP_ENERGY_HARVEST)
		return EH_MODE
	}

	/**
	 * @param {EHMode} mode
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeEnergyHarvestingMode(mode) {
		const data = BitSmush.smushBits(SMUSH_MAP_ENERGY_HARVEST, [ mode ])
		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @returns {EnergyHarvestingControl}
	 */
	static decodeEnergyHarvestingControl(buffer) {
		const [
			EH_EN,
			EH_ON,
			FIELD_ON,
			VCC_ON
		] = decode(buffer, SMUSH_MAP_ENERGY_HARVEST_CONTROL)

		return {
			enableHarvesting: EH_EN === BIT_SET,
			harvestingOn: EH_ON === BIT_SET,
			fieldOn: FIELD_ON === BIT_SET,
			vccOn: VCC_ON === BIT_SET
		}
	}

	/**
	 * @param {EnergyHarvestingControl} control
	 * @returns ArrayBuffer|ArrayBufferView
	 */
	static encodeEnergyHarvestingControl(control) {
		throw new Error('no implementation')
	}


	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {RFManagement}
	 */
	static decodeRFManagement(buffer) {
		const [ RF_DISABLE, RF_SLEEP ] = decode(buffer, SMUSH_MAP_RF_MANAGEMENT)

		return {
			rfDisabled: RF_DISABLE === BIT_SET,
			rfSleep: RF_SLEEP === BIT_SET
		}
	}

	/**
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeRFManagement(value) {
		throw new Error('no implementation')
		const data = 0
		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @returns {BulkAreas}
	 */
	static decodeAreas(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, SYSTEM_CONFIG_REGISTERS_BULK.AREAS.LENGTH) :
			new Uint8Array(buffer, 0, SYSTEM_CONFIG_REGISTERS_BULK.AREAS.LENGTH)


		const area1Access = u8.subarray(0, 1)
		const area1end = u8.subarray(1, 2)
		const area2Access = u8.subarray(2, 3)
		const area2end = u8.subarray(3, 4)
		const area3Access = u8.subarray(4, 5)
		const area3end = u8.subarray(5, 6)
		const area4Access = u8.subarray(6, 7)
		const i2caAccess = u8.subarray(7, 8)

		const {
			protection1,
			protection2,
			protection3,
			protection4
		} = Converter.decodeI2CAccess(i2caAccess)

		return {
			area1: {
				rfAccess: Converter.decodeArea1RFAccess(area1Access),
				end: Converter.decodeArea1End(area1end),
				i2cProtection: protection1
			},
			area2: {
				rfAccess: Converter.decodeArea2RFAccess(area2Access),
				end: Converter.decodeArea2End(area2end),
				i2cProtection: protection2
			},
			area3: {
				rfAccess: Converter.decodeArea3RFAccess(area3Access),
				end: Converter.decodeArea3End(area3end),
				i2cProtection: protection3
			},
			area4: {
				rfAccess: Converter.decodeArea4RFAccess(area4Access),
				end: undefined,
				i2cProtection: protection4
			}
		}

	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @returns {AreaRFAccess}
	 */
	static decodeArea1RFAccess(buffer) {
		const [ password, protection ] = decode(buffer, SMUSH_MAP_AREA_1_ACCESS)
		return {
			password,
			protection
		}
	}

	/**
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeArea1RFAccess(value) {
		throw new Error('no implementation')
		const data = 0
		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {AreaEnd}
	 */
	static decodeArea1End(buffer) {
		return decodeAreaNEnd(buffer)
	}

	/**
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeArea1End(value) {
		throw new Error('no implementation')
		const data = 0
		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {AreaRFAccess}
	 */
	static decodeArea2RFAccess(buffer) {
		const [ password, protection ] = decode(buffer, SMUSH_MAP_AREA_2_ACCESS)
		return {
			password,
			protection
		}
	}

	/**
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeArea2RFAccess(value) {
		throw new Error('no implementation')
		const data = 0
		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {AreaEnd}
	 */
	static decodeArea2End(buffer) {
		return decodeAreaNEnd(buffer)
	}

	/**
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeArea2End(value) {
		throw new Error('no implementation')
		const data = 0
		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {AreaRFAccess}
	 */
	static decodeArea3RFAccess(buffer) {
		const [ password, protection ] = decode(buffer, SMUSH_MAP_AREA_3_ACCESS)
		return {
			password,
			protection
		}
	}

	/**
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeArea3RFAccess(value) {
		throw new Error('no implementation')
		const data = 0
		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {AreaEnd}
	 */
	static decodeArea3End(buffer) {
		return decodeAreaNEnd(buffer)
	}

	/**
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeArea3End(value) {
		throw new Error('no implementation')
		const data = 0
		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {AreaRFAccess}
	 */
	static decodeArea4RFAccess(buffer) {
		const [ password, protection ] = decode(buffer, SMUSH_MAP_AREA_4_ACCESS)
		return {
			password,
			protection
		}
	}

	/**
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeArea4RFAccess(value) {
		throw new Error('no implementation')
		const data = 0
		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {AreaI2CAccess}
	 */
	static decodeI2CAccess(buffer) {
		const [
			protection1,
			protection2,
			protection3,
			protection4
		] = decode(buffer, SMUSH_MAP_I2C_ACCESS)

		return {
			protection1,
			protection2,
			protection3,
			protection4
		}
	}

	/**
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeI2CAccess(value) {
		throw new Error('no implementation')
		const data = 0
		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {CCFile}
	 */
	static decodeLockCCFile(buffer) {
		const [ block0Locked, block1Locked ] = decode(buffer, SMUSH_MAP_LOCK_CC_FILE)
		return {
			block0Locked,
			block1Locked
		}
	}

	/**
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeLockCCFile(value) {
		throw new Error('no implementation')
		const data = 0
		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {MailboxMode}
	 */
	static decodeMailboxMode(buffer) {
		const [ mode ] = decode(buffer, SMUSH_MAP_MAILBOX_MODE)
		return mode
	}

	/**
	 * @param {MailboxMode} value
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeMailboxMode(value) {
		throw new Error('no implementation')
		const data = 0
		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {WatchDogTime}
	 */
	static decodeMailboxWatchdog(buffer) {
		const [ MB_WDG ] = decode(buffer, SMUSH_MAP_MAILBOX_WATCH_DOG)
		return {
			MB_WDG,
			watchDogMs: Math.pow(2, MB_WDG - 1) + 30
		}
	}

	/**
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeMailboxWatchdog(value) {
		throw new Error('no implementation')
		const data = 0
		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {ConfigurationLock}
	 */
	static decodeLockConfiguration(buffer) {
		const [ LCK_CFG ] = decode(buffer, SMUSH_MAP_LOCK_CONFIGURATION)
		return LCK_CFG
	}

	/**
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeLockConfiguration(value) {
		throw new Error('no implementation')
		const data = 0
		return Uint8Array.from([ data ])
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {DSFIDLock}
	 */
	static decodeLockDSFID(buffer) {
		const [ lock ] = decode(buffer, SMUSH_MAP_DSFID_LOCK)
		return lock
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {AFILock}
	 */
	static decodeLockAFI(buffer) {
		const [ lock ] = decode(buffer, SMUSH_MAP_AFI_LOCK)
		return lock
	}


	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @returns {BulkInfo}
	 */
	static decodeInfo(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, SYSTEM_CONFIG_REGISTERS_BULK.INFO.LENGTH) :
			new Uint8Array(buffer, 0, SYSTEM_CONFIG_REGISTERS_BULK.INFO.LENGTH)


		const dsfid = u8.subarray(0, 1)
		const afi = u8.subarray(1, 2)
		const memorySize = u8.subarray(2, 4)
		const blockSize = u8.subarray(4, 5)
		const icRef = u8.subarray(5, 6)
		const uid = u8.subarray(6, 14)
		const icRev = u8.subarray(15, 16)

		return {
			dsfId: Converter.decodeDSFID(dsfid),
			afi: Converter.decodeAFI(afi),
			memorySize: Converter.decodeMemorySize(memorySize),
			blockSize: Converter.decodeBlockSize(blockSize),
			icReference: Converter.decodeICReference(icRef),
			uid: Converter.decodeUID(uid),
			icRevision: Converter.decodeRevision(icRev)
		}
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {number}
	 */
	static decodeDSFID(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, LENGTH_SINGLE_BYTE) :
			new Uint8Array(buffer, 0, LENGTH_SINGLE_BYTE)

		const [ data ] = u8
		return data
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {number}
	 */
	static decodeAFI(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, LENGTH_SINGLE_BYTE) :
			new Uint8Array(buffer, 0, LENGTH_SINGLE_BYTE)

		const [ data ] = u8
		return data
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {number}
	 */
	static decodeMemorySize(buffer) {
		const dv = ArrayBuffer.isView(buffer) ?
			new DataView(buffer.buffer, buffer.byteOffset, LENGTH_MEM_SIZE) :
			new DataView(buffer, 0, LENGTH_MEM_SIZE)

		const size = dv.getUint16(0, true)

		return size
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {number}
	 */
	static decodeBlockSize(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, LENGTH_SINGLE_BYTE) :
			new Uint8Array(buffer, 0, LENGTH_SINGLE_BYTE)

		const [ size ] = u8
		return size
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {ICReference}
	 */
	static decodeICReference(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, LENGTH_SINGLE_BYTE) :
			new Uint8Array(buffer, 0, LENGTH_SINGLE_BYTE)

		const [ ref ] = u8
		return ref
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {UID}
	 */
	static decodeUID(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, LENGTH_UID) :
			new Uint8Array(buffer, 0, LENGTH_UID)

		const uid = [ ...u8 ].reverse()
		const [ magic, manufacture, product ] = uid

		if(magic !== UID_MAGIC) { throw new Error('invalid uid magic') }
		if(manufacture !== UID_MANUFACTURE_CODE_ST) { throw new Error('invalid uid manufacture ST') }

		return {
			uid,
			magic,
			manufacture,
			product
		}
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {number}
	 */
	static decodeRevision(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, LENGTH_SINGLE_BYTE) :
			new Uint8Array(buffer, 0, LENGTH_SINGLE_BYTE)

		const [ rev ] = u8
		return rev
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {Array<number>}
	 */
	static decodeI2CPassword(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, LENGTH_I2C_PASSWORD) :
			new Uint8Array(buffer, 0, LENGTH_I2C_PASSWORD)

		return [ ...u8 ]
	}

	/**
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeI2CPassword(value, present) {
		if(!Array.isArray(value)) { throw new Error('password must be an array') }
		if(value.length !== LENGTH_I2C_PASSWORD) { throw new Error('invalid password length') }

		const validationCode = present ? PASSWORD_PRESENT_VALIDATION_CODE : PASSWORD_SET_VALIDATION_CODE

		return Uint8ClampedArray.of(...value, validationCode, ...value)
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {Status}
	 */
	static decodeStatus(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, DYNAMIC_REGISTERS_BULK.STATUS.LENGTH) :
			new Uint8Array(buffer, 0, DYNAMIC_REGISTERS_BULK.STATUS.LENGTH)


		const i2cSecurity = u8.subarray(0, 1)
		const itStatus = u8.subarray(1, 2)
		const mbControl = u8.subarray(1, 2)
		const mbLength = u8.subarray(1, 2)

		return {
			i2cSecurityStatus: Converter.decodeI2CSecurityStatus(i2cSecurity),
			interruptionStatus: Converter.decodeInterruptStatus(itStatus),
			mailboxControl: Converter.decodeMailboxControl(mbControl),
			mailboxLength: Converter.decodeMailboxLength(mbLength)
		}
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {I2CSecurityStatus}
	 */
	static decodeI2CSecurityStatus(buffer) {
		const [
			status
		] = decode(buffer, SMUSH_MAP_I2C_SECURITY_STATUS)

		return status
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {InterruptStatus}
	 */
	static decodeInterruptStatus(buffer) {
		const [
			RF_USER,
			RF_ACTIVITY,
			RF_INTERRUPT,
			FIELD_FALLING,
			FIELD_RISING,
			RF_PUT_MSG,
			RF_GET_MSG,
			RF_WRITE
		] = decode(buffer, SMUSH_MAP_INTERRUPTION_STATUS)

		return {
			rfUser: RF_USER === BIT_SET,
			rfActivity: RF_ACTIVITY === BIT_SET,
			rfInterrupt: RF_INTERRUPT === BIT_SET,
			fieldFalling: FIELD_FALLING === BIT_SET,
			fieldRising: FIELD_RISING === BIT_SET,
			rfPutMessage: RF_PUT_MSG === BIT_SET,
			rfGetMessage: RF_GET_MSG === BIT_SET,
			rfWrite: RF_WRITE === BIT_SET
		}
	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {MailboxControl}
	 */
	static decodeMailboxControl(buffer) {
		const [
			MB_EN,
			HOST_PUT_MSG,
			RF_PUT_MSG,
			HOST_MISS_MSG,
			RF_MISS_MSG,
			HOST_CURRENT_MSG,
			RF_CURRENT_MSG
		] = decode(buffer, SMUSH_MAP_MAILBOX_CONTROL)

		return {
			mailboxEnabled: MB_EN === BIT_SET,
			hostPutMessage: HOST_PUT_MSG === BIT_SET,
			rfPutMessage: RF_PUT_MSG === BIT_SET,
			hostMissedMessage: HOST_MISS_MSG === BIT_SET,
			rfMissedMessage: RF_MISS_MSG === BIT_SET,
			currentFromRF: HOST_CURRENT_MSG === BIT_SET,
			currentFromHost: RF_CURRENT_MSG === BIT_SET
		}
	}

	/**
	 * @param {MailboxControl} control
	 * @returns {ArrayBuffer|ArrayBufferView}
	 */
	static encodeMailboxControl(control) {
		throw new Error('no implementation')

	}

	/**
	 * @param {ArrayBuffer|ArrayBufferView} buffer
	 * @return {number}
	 */
	static decodeMailboxLength(buffer) {
		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, LENGTH_SINGLE_BYTE) :
			new Uint8Array(buffer, 0, LENGTH_SINGLE_BYTE)

		const [ data ] = u8

		return data + 1
	}
}