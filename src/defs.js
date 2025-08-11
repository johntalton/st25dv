
export const DEFAULT_ST25DV_USER_ADDRESS = 0x53
export const DEFAULT_ST25DV_SYSTEM_ADDRESS = 0x57

export const LENGTH_SINGLE_BYTE = 1
export const LENGTH_UID = 8
export const LENGTH_MEM_SIZE = 2
export const LENGTH_I2C_PASSWORD = 8


/**
 * @typedef {Object} GPO
 * @property {boolean} rfUserEnabled
 * @property {boolean} rfActivityEnabled
 * @property {boolean} rfInterruptEnabled
 * @property {boolean} fieldChangedEnabled
 * @property {boolean} rfPutEnabled
 * @property {boolean} rfGetEnabled
 * @property {boolean} rfWriteEnabled
 * @property {boolean} gpoEnabled
 */

/** @typedef {Object} InterruptionTime
 * @property {number} IT_TIME
 * @property {number} interruptionTimeUs
*/

/** @typedef {number} EHMode */

/** @enum {EHMode} */
export const ENERGY_HARVEST = {
	FORCE_AFTER_BOOT: 0,
	ON_DEMAND: 1
}

/**
 * @typedef {Object} RFManagement
 * @property {boolean} rfDisabled
 * @property {boolean} rfSleep
 */


/** @enum {number} */
export const AREA_RF_PASSWORD_CONTROL = {
	CAN_NOT_BE_OPENED: 0,
	WITH_RF_PASSWORD_1: 1,
	WITH_RF_PASSWORD_2: 2,
	WITH_RF_PASSWORD_3: 3
}

/** @enum {number} */
export const AREA_1_RF_PROTECTION = {
	READ_WRITE: 0,
	READ_WRITE_WITH_RF_PASSWORD: 1,
	READ_WRITE_WITH_RF_PASSWORD_ALT: 2,
	READ_ONLY: 3
}

/** @enum {number} */
export const AREA_N_RF_PROTECTION = {
	READ_WRITE: 0,
	READ_WRITE_WITH_RF_PASSWORD: 1,
	READ_AND_WRITE_WITH_RF_PASSWORD: 2,
	READ_ONLY_WITH_PASSWORD: 3
}

export const AREA_2_RF_PROTECTION = AREA_N_RF_PROTECTION
export const AREA_3_RF_PROTECTION = AREA_N_RF_PROTECTION
export const AREA_4_RF_PROTECTION = AREA_N_RF_PROTECTION

/** @typedef {AREA_RF_PASSWORD_CONTROL} AreaRFPassword */
/** @typedef {AREA_1_RF_PROTECTION|AREA_N_RF_PROTECTION} AreaRFProtection */

/**
 * @typedef {Object} AreaRFAccess
 * @property {AreaRFPassword} password
 * @property {AreaRFProtection} protection
*/

/** @typedef {Object} AreaEnd
 * @property {number} RFBlocks
 * @property {number} I2CBytes
*/

/** @enum {number} */
export const AREA_1_I2C_PROTECTION = {
	READ_WRITE: 0,
	READ_WRITE_WITH_I2C_PASSWORD: 1,
	READ_WRITE_ALT: 2,
	READ_WRITE_WITH_I2C_PASSWORD_ALT: 3
}

/** @enum {number} */
export const AREA_N_I2C_PROTECTION = {
	READ_WRITE: 0,
	READ_WRITE_WITH_I2C_PASSWORD: 1,
	READ_WITH_I2C_PASSWORD_WRITE: 2,
	READ_WITH_I2C_PASSWORD_WRITE_WITH_I2C_PASSWORD: 3
}

export const AREA_2_I2C_PROTECTION = AREA_N_I2C_PROTECTION
export const AREA_3_I2C_PROTECTION = AREA_N_I2C_PROTECTION
export const AREA_4_I2C_PROTECTION = AREA_N_I2C_PROTECTION

/** @typedef {AREA_1_I2C_PROTECTION|AREA_N_I2C_PROTECTION} AreaI2CProtection */

/**
 * @typedef {Object} AreaI2CAccess
 * @property {AreaI2CProtection} protection1
 * @property {AreaI2CProtection} protection2
 * @property {AreaI2CProtection} protection3
 * @property {AreaI2CProtection} protection4
 */

/** @enum {number} */
export const LOCK = {
	UN_LOCKED: 0,
	LOCKED: 1
}

/** @enum {number} */
export const CC_FILE_LOCK = LOCK

/**
 * @typedef {Object} CCFile
 * @property {CC_FILE_LOCK} block0Locked
 * @property {CC_FILE_LOCK} block1Locked
 * */

/** @enum {number} */
export const MAILBOX_MODE = {
	FORBIDDEN: 0,
	AUTHORIZED: 1
}

/** @typedef {MAILBOX_MODE} MailboxMode */

/**
 * @typedef {Object} WatchDogTime
 * @property {number} watchDogMs
 * @property {number} MB_WDG
 */

/** @enum {number} */
export const CONFIGURATION_LOCK = LOCK

/** @typedef {CONFIGURATION_LOCK} ConfigurationLock */

/** @enum {number} */
export const DSFID_LOCK = LOCK

/** @typedef {DSFID_LOCK} DSFIDLock */

/** @enum {number} */
export const AFI_LOCK = LOCK

/** @typedef {AFI_LOCK} AFILock */

/** @enum {number} */
export const IC_REFERENCE = {
	ST25DV04K_IE: 0x24,
	ST25DV16K_IE: 0x26,
	ST25DV64K_IE: 0x26,
	ST25DV04K_JF: 0x24,
	ST25DV16K_JF: 0x26,
	ST25DV64K_JF: 0x26
}

/** @typedef {IC_REFERENCE} ICReference */

export const UID_MANUFACTURE_CODE_ST = 0x02
export const UID_MAGIC = 0xE0

/** @enum {number} */
export const UID_PRODUCT_CODE = {
	ST25DV04K_IE: 0x24,
	ST25DV16K_IE: 0x26,
	ST25DV64K_IE: 0x26,
	ST25DV04K_JF: 0x25,
	ST25DV16K_JF: 0x27,
	ST25DV64K_JF: 0x27
}

/**
 * @typedef {Object} UID
 * @property {Array<number>} uid
 * @property {UID_MAGIC} magic
 * @property {UID_MANUFACTURE_CODE_ST} manufacture
 * @property {UID_PRODUCT_CODE} product
 */

/**
 * @typedef {Object} BulkArea
 * @property {AreaRFAccess} rfAccess
 * @property {AreaEnd|undefined} end
 * @property {AreaI2CProtection} i2cProtection
 */

/**
 * @typedef {Object} BulkAreas
 * @property {BulkArea} area1
 * @property {BulkArea} area2
 * @property {BulkArea} area3
 * @property {BulkArea} area4
 */

/**
 * @typedef {Object} BulkInfo
 * @property {number} dsfId
 * @property {number} afi
 * @property {number} memorySize
 * @property {number} blockSize
 * @property {ICReference} icReference
 * @property {UID} uid
 * @property {number} icRevision
 */