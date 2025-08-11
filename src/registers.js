
const SINGLE_BYTE_MASK = 0xFF

function split16(reg16) {
	return [
		(reg16 >> 8) & SINGLE_BYTE_MASK,
		reg16 & SINGLE_BYTE_MASK
	]
}

// E2 === 1
export const SYSTEM_CONFIG_REGISTERS = {
	GPO:         split16(0x0000),
	IT_TIME:     split16(0x0001),
	EH_MODE:     split16(0x0002),
	RF_MNGT:     split16(0x0003),
	RFA1SS:      split16(0x0004),
	ENDA1:       split16(0x0005),
	RFA2SS:      split16(0x0006),
	ENDA2:       split16(0x0007),
	RFA3SS:      split16(0x0008),
	ENDA3:       split16(0x0009),
	RFA4SS:      split16(0x000A),
	I2CSS:       split16(0x000B),
	LOCK_CCFILE: split16(0x000C),
	MB_MODE:     split16(0x000D),
	MB_WDG:      split16(0x000E),
	LOCK_CFG:    split16(0x000F),

  // Read Only
	LOCK_DSFID:  split16(0x0010),
	LOCK_AFI:    split16(0x0011),
	DSFID:       split16(0x0012),
	AFI:         split16(0x0013),
	MEM_SIZE:    split16(0x0014), // MSB
	// MEMB_SIZE_LSB: 0x0015
	BLK_SIZE:    split16(0x0016),
	IC_REF:      split16(0x0017),
	UID:         split16(0x0018), // end 0x001F
	IC_REV:      split16(0x0020),
	// RESERVED: 0x0021
	// RESERVED: 0x0022
	// RESERVED: 0x0023

  // Read Write
	I2C_PWD:     0x0900 // end 0x0907
}

export const SYSTEM_CONFIG_REGISTERS_BULK = {
	INFO: {
		ADDRESS: SYSTEM_CONFIG_REGISTERS.DSFID,
		LENGTH: 15
	},
	AREAS: {
		ADDRESS: SYSTEM_CONFIG_REGISTERS.RFA1SS,
		LENGTH: 8
	}
}


// E2 === 0
export const DYNAMIC_REGISTERS = {
  USER_MEM_START:   split16(0x0000),
  USER_MEM_END_04K: split16(0x01FF),
  USER_MEM_END_16K: split16(0x07FF),
  USER_MEM_END_64K: split16(0x1FFF),

	GPO_CTRL: split16(0x2000),
	// RESERVED: split16(0x20001),
	EH_CTRL:  split16(0x2002),
	RF_MGNT:  split16(0x2003),
	I2C_SSO:  split16(0x2004), // Readonly
	IT_STS:   split16(0x2005), // Readonly
	MB_CTRL:  split16(0x2006),
	MB_LEN:   split16(0x2007), // Readonly

	// mailbox
	MB_START: split16(0x2008),
	MB_END:   split16(0x2107)
}