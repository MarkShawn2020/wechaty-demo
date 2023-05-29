import { Message, Room, WechatyBuilder } from 'wechaty'
import q from 'qrcode-terminal'
import { PuppetWechat4u } from 'wechaty-puppet-wechat4u'
import { ENV_LOCAL_PATH, PUPPET_USE_PADLOCAL, PUPPET_USE_WECHAT4U } from './settings'
import { PuppetPadlocal } from 'wechaty-puppet-padlocal'

import * as dotenv from 'dotenv'


dotenv.config({
	path: ENV_LOCAL_PATH, // 读取进入 process.env
})

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
		if (/^\s*#/.test(text)) { // tag存档消息（未来的笔记系统）
			await message.say('收到！')
		}
	}
}

let puppet: PuppetWechat4u | PuppetPadlocal | undefined = undefined

if (PUPPET_USE_WECHAT4U) { // 使用 wechat4u（pc）
	puppet = new PuppetWechat4u()
} else if (PUPPET_USE_PADLOCAL) { // 使用 padlocal（pad）
	puppet = new PuppetPadlocal({
		token: process.env.WECHATY_PUPPET_PADLOCAL_TOKEN,
	})
} else { // 使用默认的 web
}

const initBot = async () => {
	const wechaty = WechatyBuilder.build({ puppet })
	
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


