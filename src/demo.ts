import { Message, Room, WechatyBuilder } from 'wechaty'
import q from 'qrcode-terminal'
import { PuppetWechat4u } from 'wechaty-puppet-wechat4u'

const handleMessage = async (message: Message) => {
	console.log(`Message: ${message}`)
	
	const text = message.text().toLowerCase() // 纯小写文本，方便后续的匹配
	
	if (/ding/.test(text)) {
		await message.say('dong!') // 1. 如果是群消息，则回复群； 2. 如果是个人消息，则回复该人
	}
	
	const room: undefined | Room = message.room() // 1. 如果是群消息，返回该群 2. 否则返回空
	if (room) {
		// 处理群消息
		
	} else {
		// 处理私人消息
		await message.say('收到！')
	}
}


const initBot = async () => {
	const wechaty = WechatyBuilder.build({
		puppet: new PuppetWechat4u(),
	}) // get a Wechaty instance
	
	wechaty
		.on('scan', (qrcode, status) => {
			if (status === 2) {
				console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`)
				q.generate(qrcode, { small: true })
			} else if (status === 3) {
				console.log('scanned, logging in...')
			}
		})
		.on('login', user => {
			console.log(`User ${user} logged in`)
		})
		.on('message', handleMessage)
	await wechaty.start()
}

initBot()


