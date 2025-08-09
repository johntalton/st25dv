
const SINGLE_BYTE_MAX = 0xFF

export function splitRegister(reg16) {
	return [
		(reg16 >> 8) & SINGLE_BYTE_MAX,
		reg16 & SINGLE_BYTE_MAX
	]
}