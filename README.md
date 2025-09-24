# ST25DV

Dynamic NFC/RFID tag javascript driver over abstracted [`I2CBus`](https://github.com/johntalton/and-other-delights) implementation.

[![npm Version](http://img.shields.io/npm/v/@johntalton/st25dv.svg)](https://www.npmjs.com/package/@johntalton/st25dv)
![GitHub package.json version](https://img.shields.io/github/package-json/v/johntalton/st25dv)
[![CI](https://github.com/johntalton/st25dv/actions/workflows/CI.yml/badge.svg)](https://github.com/johntalton/st25dv/actions/workflows/CI.yml)


Obligatory [Adafruit](https://www.adafruit.com/product/4701)

## Multiple Address

The ST25DV presents on the bus as two (2) unique addresses (typically `0x53` and `0x57`).  This split corresponds to the devices "user" and "system" interaction spaces.

That is, to access the main persistent configuration settings the System area need to be accessed, while most operational command are in the user area.

This library provides both `ST25DVUser` and `ST25DVSystem` classes for abstracting those interactions (as well as a convenance `ST25DV` wrapper class).

The choice to allow setting and interacting with different classes with separate `I2CAddressedBus` abstraction is provided to allow for a range of configurations and interaction when the underlining `I2CBus` implementations may very.

## Example

### Direct system device access

The following example shows access to the System configuration area.

```javascript
const bus = /* I2CBus concrete from your choice of sources */
const abus = I2CAddressedBus.from(bus, DEFAULT_ST25DV_SYSTEM_ADDRESS)
const device = ST25DVSystem.from(abus)

const uid = await device.getUID()
```

### Wrapper class

Using the same example as above while utilizing teh wrapper `ST25DV` class

```javascript
const bus = /* again, some I2CBus, such as the MCP2221  */
const abusUser = I2CAddressedBus.from(bus, DEFAULT_ST25DV_USER_ADDRESS)
const abusSystem = I2CAddressedBus.from(bus, DEFAULT_ST25DV_SYSTEM_ADDRESS)
const device = ST25DV.from(abusUser, abusSystem)

const uid = await device.system.getUID()

```

## Password protected configuration

In order to write to the majority of the configuration, a I²C "password" must first be sent to the device to "open a secure session".  This can be configured for a range of configuration and user areas.