import { Regex } from '@companion-module/base'

const REGEX_IP_OR_HOST =
	'/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})$|^((([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]))$/'

export const ConfigFields = [
	{
		type: 'static-text',
		id: 'info',
		label: 'Information',
		width: 12,
		value: `IMPORTANT MESSAGE\r\n
\r\n
Please read and understand the following before using this module\r\n
\r\n
The companion project is designed to make the everyday life of a technician easier.\r\n
We pefer to have ready made actions, presets and feedbacks for as many products as possible.\r\n
This generic TCP/UDP module is intended for testing or small-scale products.\r\n
\r\n
- You shoudn't need to find, program and send raw TCP commands\r\n
- If you have or use a product we don't support, please file a module request for it\r\n
- Do you think your product/device is too insignificant to make a module for? It's probably not.\r\n
- Properitary/inhouse products can also have their own modules.\r\n
- With generic modules you won't get nice things like presets and feedback\r\n
\r\n`,
	},
	{
		type: 'textinput',
		id: 'host',
		label: 'Target Host name or IP',
		width: 8,
		regex: REGEX_IP_OR_HOST,
	},
	{
		type: 'textinput',
		id: 'port',
		label: 'Target Port',
		width: 4,
		default: 7000,
		regex: Regex.PORT,
	},
	{
		type: 'dropdown',
		id: 'prot',
		label: 'Connect with TCP / UDP',
		default: 'tcp',
		width: 6,
		choices: [
			{ id: 'tcp', label: 'TCP' },
			{ id: 'udp', label: 'UDP' },
		],
	},
	{
		type: 'checkbox',
		id: 'saveresponse',
		label: 'Save TCP Response',
		default: false,
		width: 6,
		isVisible: (configValues) => configValues.prot === 'tcp',
	},
	{
		type: 'checkbox',
		id: 'savemessage',
		label: 'Listen for UDP messages',
		default: false,
		width: 6,
		isVisible: (configValues) => configValues.prot === 'udp',
	},
	{
		type: 'textinput',
		id: 'udpListenPort',
		label: 'UDP listen port',
		width: 4,
		default: 7001,
		regex: Regex.PORT,
		width: 4,
		isVisible: (configValues) => (configValues.prot === 'udp' && configValues.savemessage),
	},
	{
		type: 'dropdown',
		id: 'convertresponse',
		label: 'Convert TCP Response Format',
		default: 'none',
		choices: [
			{ id: 'none', label: 'No conversion' },
			{ id: 'hex', label: 'To Hex' },
			{ id: 'string', label: 'To String' },
		],
		isVisible: (configValues) => configValues.prot === 'tcp' && !!configValues.saveresponse,
	},
]
