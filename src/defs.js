export const DEFAULT_ST25DV_USER_ADDRESS = 0x53
export const DEFAULT_ST25DV_SYSTEM_ADDRESS = 0x57



// E2 === 1
export const SYSTEM_CONFIG_REGISTERS = {
	GPO:         0x0000,
	IT_TIME:     0x0001,
	EH_MODE:     0x0002,
	RF_MNGT:     0x0003,
	RFA1SS:      0x0004,
	ENDA1:       0x0005,
	RFA2SS:      0x0006,
	ENDA2:       0x0007,
	RFA3SS:      0x0008,
	ENDA3:       0x0009,
	RFA4SS:      0x000A,
	I2CSS:       0x000B,
	LOCK_CCFILE: 0x000C,
	MB_MODE:     0x000D,
	MB_WDG:      0x000E,
	LOCL_CFG:    0x000F,

  // Read Only
	LOCK_DSFID:  0x0010,
	LOCK_AFI:    0x0011,
	DSFID:       0x0012,
	AFI:         0x0013,
	MEM_SIZE:    0x0014, // MSB
	// MEMB_SIZE_LSB: 0x0015
	BLK_SIZE:    0x0016,
	IC_REF:      0x0017,
	UID:         0x0018, // end 0x001F
	IC_REV:      0x0020,
	// RESERVED: 0x0021
	// RESERVED: 0x0022
	// RESERVED: 0x0023

  // Read Write
	I2C_PWD:     0x0900 // end 0x0907
}


// E2 === 0
export const DYNAMIC_REGISTERS = {
  USER_MEM_START: 0x0000,
  USER_MEM_END_04K: 0x01FF,
  USER_MEM_END_16K: 0x07FF,
  USER_MEM_END_64K: 0x1FFF,

	GPO_CTRL: 0x2000,
	// RESERVED: 0x20001,
	EH_CTRL:  0x2002,
	RF_MGNT:  0x2003,
	I2C_SSO:  0x2004, // Readonly
	IT_STS:   0x2005, // Readonly
	MB_CTRL:  0x2006,
	MB_LEN:   0x2007, // Readonly

	// mailbox
	MB_START: 0x2008,
	MB_END:   0x2107
}