import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let img = imagen1
  let chat = global.db.data.chats[m.chat]

  if (chat.welcome && m.messageStubType == 27) {
    let welcome = ` 「🍭」SatouBot - MD \n「 Bienvenido :3 」\n「 @${m.messageStubParameters[0].split`@`[0]} 」\n「 Bienvenido/a 」\n「 ${groupMetadata.subject} 」\n\n> ✐ Puedes usar *.menu* para ver la lista de comandos.
> 🜸 https://github.com/Legna-chan`
await conn.sendLuffy(m.chat, packname, textbot, welcome, img, img, redes, fkontak)
  }

  if (chat.welcome && m.messageStubType == 28) {
    let bye = ` 「🍭」SatouBot - MD \n「 Adios 」\n「 @${m.messageStubParameters[0].split`@`[0]} 」\n「 Se fue 」\n「 Vuelve pronto :3 」\n\n> ✐ Me podrias dar una estrellita en el repositorio oficial de la bot?
> 🜸 https://github.com/Legna-chan`
await conn.sendLuffy(m.chat, packname, textbot, bye, img, img, redes, fkontak)
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kick = `「🍭」SatouBot - MD \n「 Adios 」\n「 @${m.messageStubParameters[0].split`@`[0]} 」\n「 Se fue 」\n「 Vuelve pronto :3」\n\n> ✐ Me podrias dar una estrellita en el repositorio oficial de la bot?
> 🜸 https://github.com/Legna-chan`  
await conn.sendLuffy(m.chat, packname, textbot, kick, img, img, redes, fkontak)
}}
