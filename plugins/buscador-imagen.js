
import { googleImage } from '@bochilteam/scraper';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '🍬 Por favor, ingresa un término de búsqueda.', m, rcanal);
    
    await m.react(rwait);
    conn.reply(m.chat, '🍭 Descargando su imagen, espere un momento...', m, {
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                showAdAttribution: true,
                title: packname,
                body: dev,
                previewType: 0,
                thumbnail: icons,
                sourceUrl: channel
            }
        }
    });

    try {
        const res = await googleImage(text);
        const images = await Promise.all([res.getRandom(), res.getRandom(), res.getRandom(), res.getRandom()]);
        
        const messages = images.map((image, index) => [`Imagen ${index + 1}`, dev, image, [[]], [[]], [[]], [[]]]);
        
        await conn.sendCarousel(m.chat, `🍬 Resultado de ${text}`, '⪛✰ Imagen - Búsqueda ✰⪜', null, messages, m);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '⚠️ Ocurrió un error al buscar la imagen. Intenta de nuevo más tarde.', m);
    }
};

handler.help = ['imagen'];
handler.tags = ['buscador', 'tools', 'descargas'];
handler.command = ['image', 'imagen'];
handler.register = true;

export default handler;