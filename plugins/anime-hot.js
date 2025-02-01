//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;

    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0];
    } else if (m.quoted) {
        who = m.quoted.sender;
    } else {
        who = m.sender;
    }

    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    m.react('🔥');

    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` *se esta excitando por* \`${name || who}\`*.`;
    } else if (m.quoted) {
        str = `\`${name2}\` *se calento por* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *se esta excitando*`.trim();
    }

    if (m.isGroup) {
        let pp = 'https://qu.ax/JafNb.mp4';
        let pp2 = 'https://qu.ax/XoVhz.mp4';
        let pp3 = 'https://qu.ax/uFONS.mp4';

        const videos = [pp, pp2, pp3];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['hot/excitar @tag'];
handler.tags = ['anime'];
handler.command = ['hot','excitar'];
handler.group = true;

export default handler;