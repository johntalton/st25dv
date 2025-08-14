import { NDEFMessage } from './message.js'

export const RECORD_TYPE_EMPTY = 'empty'
export const RECORD_TYPE_URL = 'url'
export const RECORD_TYPE_TEXT = 'text'
export const RECORD_TYPE_SMART_POSTER = 'smart-poster'
export const RECORD_TYPE_MIME = 'mime'
export const RECORD_TYPE_ABSOLUTE_URL = 'absolute-url'
export const RECORD_TYPE_UNKNOWN = 'unknown'




export const WELL_KNOWN_TYPE_TEXT = 'T'
export const WELL_KNOWN_TYPE_URL = 'U'
export const WELL_KNOWN_TYPE_SMART_POSTER = 'Sp'
export const WELL_KNOWN = {
	[WELL_KNOWN_TYPE_TEXT]: RECORD_TYPE_TEXT,
	[WELL_KNOWN_TYPE_URL]: RECORD_TYPE_URL,
	[WELL_KNOWN_TYPE_SMART_POSTER]: RECORD_TYPE_SMART_POSTER
	// act
	// s
	// t
	// Sig
	// Hc (handover carrier)
	// Hr (handover request)
	// Hs (handover selected)
}



export const TNF_EMPTY = 0x00
export const TNF_WELL_KNOWN = 0x01
export const TNF_MIME = 0x02
export const TNF_ABSOLUTE_URL = 0x03
export const TNF_EXTERNAL = 0x04
export const TNF_UNKNOWN = 0x05
export const TNF_UNCHANGED = 0x06
export const TYPE_NAME_FORMAT = {
	[TNF_EMPTY]: 'empty',
	[TNF_WELL_KNOWN]: 'well-known',
	[TNF_MIME]: 'media-type', // RFC 2046
	[TNF_ABSOLUTE_URL]: 'absolute-uri', // RFC 3986
	[TNF_EXTERNAL]: 'external',
	[TNF_UNKNOWN]: 'unknown',
	[TNF_UNCHANGED]: 'unchanged',
	7: 'reserved'
}

export const URI_PREFIX_ID_NONE = 0x00
const URI_PREFIX = {
	// 0x00: '',
	0x01: 'http://www.',
	0x02: 'https://www.',
	0x03: 'http://',
	0x04: 'https://',
	0x05: 'tel:',
	0x06: 'mailto:',
	0x07: 'ftp://anonymous:anonymous@',
	0x08: 'ftp://ftp.',
	0x09: 'ftps://',
	0x0A: 'sftp://',
	0x0B: 'smb://',
	0x0C: 'nfs://',
	0x0D: 'ftp://',
	0x0E: 'dav://',
	0x0F: 'news:',
	0x10: 'telnet://',
	0x11: 'imap:',
	0x12: 'rtsp://',
	0x13: 'urn:',
	0x14: 'pop:',
	0x15: 'sip:',
	0x16: 'sips:',
	0x17: 'tftp:',
	0x18: 'btspp://',
	0x19: 'btl2cap://',
	0x1A: 'btgoep://',
	0x1B: 'tcpobex://',
	0x1C: 'irdaobex://',
	0x1D: 'file://',
	0x1E: 'urn:epc:id:',
	0x1F: 'urn:epc:tag:',
	0x20: 'urn:epc:pat:',
	0x21: 'urn:epc:raw:',
	0x22: 'urn:epc:',
	0x23: 'urn:nfc:',
}

function lookupPrefix(url) {
	for(const [ prefixId, prefix ] of Object.entries(URI_PREFIX)) {
		if(url.startsWith(prefix)) {
			return [ prefixId, url.replace(prefix, '')]
		}
	}

	return [ URI_PREFIX_ID_NONE, url ]
}


export class NDEFRecord {
	#record

	constructor(options) {
		this.#record = options
	}

	get recordType() { return this.#record.recordType }
	get data() { return this.#record.data }
	get encoding() { return this.#record.encoding }
	get id() { return this.#record.id }
	get lang() { return this.#record.lang }
	get mediaType() { return this.#record.mediaType }

	toRecords() {
		// if(this.data instanceof ArrayBuffer) {}
		const records = NDEFRecord.parse(this.data)
		return [ ...records ]
	}

	static _encode(headers, typeBuffer, idBuffer, payloadBuffer) {
		const { start, end, TNF } = headers
		const typeLength = (typeBuffer === undefined) ? 0 : typeBuffer.byteLength
		const payloadLength = (payloadBuffer === undefined) ? 0 : payloadBuffer.byteLength
		const hasId = idBuffer !== undefined
		const idLength = hasId ? idBuffer.byteLength : 0

		const short = true
		const chunked = false

		const payloadLengthBuffer = short ? Uint8Array.from([ payloadLength ]) : Uint32Array.from([ payloadLength ])

		const totalLength = 1 + 1 + typeLength + (short ? 1 : 4) + payloadLength + (hasId ? (1 + idLength) : 0)

		const header = 0 |
			(start ? 0b1000_0000 : 0) |
			(end ? 0b0100_0000 : 0) |
			(chunked ? 0b0010_0000 : 0) |
			(short ? 0b0001_0000 : 0) |
			(hasId ? 0b0000_1000 : 0) |
			(TNF & 0b111)

		const idParts = hasId ? idBuffer : []

		const parts = [
			header,
			typeLength,
			 ...payloadLengthBuffer,
			 hasId ? idLength : undefined,
			 ...typeBuffer,
			 ...idParts,
			 ...payloadBuffer
			]
			.filter(value => value !== undefined)

		return Uint8Array.from(parts)
	}

	static encode(record, options) {
		const { start, end } = options
		const { id, recordType, data } = record

		const encoder = new TextEncoder()

		if(recordType === RECORD_TYPE_EMPTY) {
			return NDEFRecord._encode({
				TNF: TNF_EMPTY,
				start, end
			}, undefined, undefined, undefined)
		}
		else if(recordType === RECORD_TYPE_URL) {
			const TNF = TNF_WELL_KNOWN
			const typeBuffer = encoder.encode(WELL_KNOWN_TYPE_URL)
			const hasId = id !== undefined
			const idBuffer = hasId ? encoder.encode(id) : undefined
			const [ prefixId, url ] = lookupPrefix(data)
			const dataBuffer = encoder.encode(url)

			const payloadBuffer = Uint8Array.from([ prefixId, ...dataBuffer ])

			return NDEFRecord._encode({
				TNF,
				start, end
			}, typeBuffer, idBuffer, payloadBuffer)

		}
		else if(recordType === RECORD_TYPE_ABSOLUTE_URL) {
			const TNF = TNF_ABSOLUTE_URL
			const typeBuffer = encoder.encode(data)
			const hasId = id !== undefined
			const idBuffer = hasId ? encoder.encode(id) : undefined

			return NDEFRecord._encode({
				TNF,
				start, end
			}, typeBuffer, idBuffer, undefined)
		}
		else if(recordType === RECORD_TYPE_TEXT) {
			const TNF = TNF_WELL_KNOWN
			const typeBuffer = encoder.encode(WELL_KNOWN_TYPE_TEXT)
			const hasId = id !== undefined
			const idBuffer = hasId ? encoder.encode(id) : undefined

			const langBuffer = encoder.encode(record.lang ?? 'US-en')
			const langLength = langBuffer.byteLength
			const isUTF16 = false

			const header = 0 | (langLength & 0b0001_1111) | (isUTF16 ? 0b1000_0000 : 0)

			const textBuffer = encoder.encode(data)

			const payloadBuffer = Uint8Array.from([ header, ...langBuffer, ...textBuffer ])

			return NDEFRecord._encode({
				TNF,
				start, end
			}, typeBuffer, idBuffer, payloadBuffer)
		}
		else if(recordType === RECORD_TYPE_MIME) {
			const TNF = TNF_MIME
			const typeBuffer = encoder.encode(record.mediaType)
			const hasId = id !== undefined
			const idBuffer = hasId ? encoder.encode(id) : undefined

			return NDEFRecord._encode({
				TNF,
				start, end
			}, typeBuffer, idBuffer, data)
		}
		else if(recordType === RECORD_TYPE_SMART_POSTER) {
			const TNF = TNF_WELL_KNOWN
			const typeBuffer = encoder.encode(WELL_KNOWN_TYPE_SMART_POSTER)
			const hasId = id !== undefined
			const idBuffer = hasId ? encoder.encode(id) : undefined

			const dataBuffer = NDEFMessage.encode(data)

			return NDEFRecord._encode({
				TNF,
				start, end
			}, typeBuffer, idBuffer, dataBuffer)
		}
		else {
			console.warn('unknown recordType', recordType)
			throw new Error('unknown recordType')

			// RECORD_TYPE_UNKNOWN
		}
	}

	static *parse(buffer) {
		// console.log('parse', buffer)

		const dv = ArrayBuffer.isView(buffer) ?
			new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength) :
			new DataView(buffer, 0, buffer.byteLength)

		const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength) :
			new Uint8Array(buffer, 0, buffer.byteLength)

		let cursor = 0
		// let started = false

		const decoder = new TextDecoder()

		while(cursor < u8.byteLength) {
			const header = dv.getUint8(cursor)
			cursor += 1

			const MB = (header & 0b1000_0000) >> 7
			const ME = (header & 0b0100_0000) >> 6
			const CF = (header & 0b0010_0000) >> 5
			const SR = (header & 0b0001_0000) >> 4
			const IL = (header & 0b0000_1000) >> 3
			const TNF = (header & 0b0000_0111)

			const short = SR === 1
			const idLengthPresent = IL === 1
			const messageBegin = MB === 1
			const messageEnd = ME === 1
			const chunked = CF === 1

			// if(started === true && messageBegin) { throw new Error('re-start') }
			// if(messageBegin) { started = true }

			// if(started === false && messageEnd) { throw new Error('end before start') }

			const typeLength = dv.getUint8(cursor)
			cursor += 1

			const payloadLength = short ? dv.getUint8(cursor) : dv.getUint32(cursor)
			cursor += (short ? 1 : 4)

			const idLength = idLengthPresent ? dv.getUint8(cursor) : 0
			cursor += idLengthPresent ? 1 : 0

			const typeBuffer = u8.subarray(cursor, cursor + typeLength)
			cursor += typeLength

			const idBuffer = u8.subarray(cursor, cursor + idLength)
			cursor += idLength

			const payload = u8.subarray(cursor, cursor + payloadLength)

			const id = decoder.decode(idBuffer)

			// console.log('parse', TNF, typeLength, idLength, payloadLength)
			// console.log(typeBuffer)
			// console.log(id)
			// console.log(payload)

			if(TNF === TNF_EMPTY) {
				if(typeLength !== 0) { throw new Error('empty with non-zero type length') }
				if(payloadLength !== 0) { throw new Error('empty with non-zero payload length')}

				yield new NDEFRecord({
					recordType: RECORD_TYPE_EMPTY,
					id
				})
			}
			else if(TNF === TNF_WELL_KNOWN) {
				// console.log('parse Well-Known')
				// well know format
				const wellKnownType = decoder.decode(typeBuffer)

				if(wellKnownType === WELL_KNOWN_TYPE_URL) {
					// console.log('parse well-known URL')
					// URL
					const urlPrefixId = payload[0]
					const urlPrefix = URI_PREFIX[urlPrefixId] ?? ''
					const _url = decoder.decode(payload.subarray(1, payloadLength))
					const url = urlPrefix + _url

					// console.log(urlPrefixId, url)

					cursor += payloadLength

					yield new NDEFRecord({
						id,
						recordType: RECORD_TYPE_URL,
						data: url
					})
				}
				else if(wellKnownType === WELL_KNOWN_TYPE_TEXT) {
					const status = payload[0]
					const langLength = (status & 0b0001_1111)
					const isUTF16 = ((status & 0b1000_0000) >> 7) === 1
					const lang = decoder.decode(payload.subarray(1, 1 + langLength))
					const encoding = isUTF16 ? 'utf-16' : 'utf-8'

					const textDecoder = new TextDecoder(encoding)
					const textOffset = 1 + langLength
					const text = textDecoder.decode(payload.subarray(textOffset, payload.byteLength))

					cursor += payloadLength

					yield new NDEFRecord({
						recordType: RECORD_TYPE_TEXT,
						id,
						lang,
						encoding,
						data: text
					})
				}
				else {
					console.warn('unknown well-known type:', wellKnownType)
					console.log(payload)
					// throw new Error('unknown Well-Known type')
				}
			}
			else if(TNF === TNF_MIME) {
				const mediaType = decoder.decode(typeBuffer)

				cursor += payloadLength

				yield new NDEFRecord({
					recordType: RECORD_TYPE_MIME,
					id,
					mediaType,
					data: payload
				})
			}
			else if(TNF === TNF_ABSOLUTE_URL) {
				const url = decoder.decode(payload)

				cursor += payloadLength

				yield new NDEFRecord({
					recordType: RECORD_TYPE_ABSOLUTE_URL,
					id,
					data: url
				})
			}
			else if(TNF === TNF_EXTERNAL) {
				const externalType = decoder.decode(typeBuffer)

				cursor += payloadLength

				yield new NDEFRecord({
					recordType: externalType,
					id,
					data: payload
				})
			}
			else if(TNF === TNF_UNKNOWN) {
				yield new NDEFRecord({
					recordType: RECORD_TYPE_UNKNOWN,
					id,
					mediaType: 'application/octet-stream'
				})
			}
			else if(TNF === TNF_UNCHANGED) {
				throw new Error('chunked payload not supported')
			}
			else {
				// ...
				throw new Error('unknown TNF type')
			}
		}










		// console.log({
		// 	messageBegin: MB === 1,
		// 	messageEnd: ME === 1,
		// 	chunked: CF === 1,
		// 	short,
		// 	idLengthPresent,
		// 	typeNameFormat: TYPE_NAME_FORMAT[TNF]
		// })



		// console.log({
		// 	typeLength,
		// 	typeBuffer,
		// 	idLength,
		// 	idBuffer,
		// 	payloadLength,
		// 	payload
		// })


	}
}
