import {
	LENGTH_I2C_PASSWORD,
	LENGTH_MEM_SIZE,
	LENGTH_SINGLE_BYTE,
	LENGTH_UID,
} from './defs.js'

import { SYSTEM_CONFIG_REGISTERS } from './registers.js'

export class CommonSystem {
	static async getGPO(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.GPO, LENGTH_SINGLE_BYTE)
	}

	static async setGPO(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.GPO, buffer)
	}

	static async getInterruptionTime(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.IT_TIME, LENGTH_SINGLE_BYTE)
	}

	static async setInterruptionTime(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.IT_TIME, buffer)
	}

	static async getEnergyHarvestingMode(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.EH_MODE, LENGTH_SINGLE_BYTE)
	}

	static async setEnergyHarvestingMode(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.EH_MODE, buffer)
	}

	static async getRFManagement(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.RF_MNGT, LENGTH_SINGLE_BYTE)
	}

	static async setRFManagement(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.RF_MNGT, buffer)
	}

	static async getArea1RFAccess(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.RFA1SS, LENGTH_SINGLE_BYTE)
	}

	static async setArea1RFAccess(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.RFA1SS, buffer)
	}

	static async getArea1End(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.ENDA1, LENGTH_SINGLE_BYTE)
	}

	static async setArea1End(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.ENDA1, buffer)
	}

	static async getArea2RFAccess(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.RFA2SS, LENGTH_SINGLE_BYTE)
	}

	static async setArea2RFAccess(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.RFA2SS, buffer)
	}

	static async getArea2End(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.ENDA2, LENGTH_SINGLE_BYTE)
	}

	static async setArea2End(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.ENDA2, buffer)
	}

	static async getArea3RFAccess(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.RFA3SS, LENGTH_SINGLE_BYTE)
	}

	static async setArea3RFAccess(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.RFA3SS, buffer)
	}

	static async getArea3End(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.ENDA3, LENGTH_SINGLE_BYTE)
	}

	static async setArea3End(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.ENDA3, buffer)
	}

	static async getArea4RFAccess(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.RFA4SS, LENGTH_SINGLE_BYTE)
	}

	static async setArea4RFAccess(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.RFA4SS, buffer)
	}

	static async getI2CAccess(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.I2CSS, LENGTH_SINGLE_BYTE)
	}

	static async setI2CAccess(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.I2CSS, buffer)
	}

	static async getLockCCFile(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.LOCK_CCFILE, LENGTH_SINGLE_BYTE)
	}

	static async setLockCCFile(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.LOCK_CCFILE, buffer)
	}

	static async getMailboxMode(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.MB_MODE, LENGTH_SINGLE_BYTE)
	}

	static async setMailboxMode(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.MB_MODE, buffer)
	}

	static async getMailboxWatchdog(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.MB_WDG, LENGTH_SINGLE_BYTE)
	}

	static async setMailboxWatchdog(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.MB_WDG, buffer)
	}

	static async getLockConfiguration(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.LOCK_CFG, LENGTH_SINGLE_BYTE)
	}

	static async setLockConfiguration(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.LOCK_CFG, buffer)
	}

	static async getLockDSFID(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.LOCK_DSFID, LENGTH_SINGLE_BYTE)
	}

	static async getLockAFI(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.LOCK_AFI, LENGTH_SINGLE_BYTE)
	}

static async getDSFID(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.DSFID, LENGTH_SINGLE_BYTE)
	}

	static async getAFI(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.AFI, LENGTH_SINGLE_BYTE)
	}

	static async getMemorySize(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.MEM_SIZE, LENGTH_MEM_SIZE)
	}

	static async getBlockSize(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.BLK_SIZE, LENGTH_SINGLE_BYTE)
	}

	static async getICReference(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.IC_REF, LENGTH_SINGLE_BYTE)
	}

	static async getUID(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.UID, LENGTH_UID)
	}

	static async getRevision(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.IC_REV, LENGTH_SINGLE_BYTE)
	}

	static async getI2CPassword(bus) {
		return bus.readI2cBlock(SYSTEM_CONFIG_REGISTERS.I2C_PWD, LENGTH_I2C_PASSWORD)
	}

	static async setI2CPassword(bus, buffer) {
		return bus.writeI2cBlock(SYSTEM_CONFIG_REGISTERS.I2C_PWD, buffer)
	}
}