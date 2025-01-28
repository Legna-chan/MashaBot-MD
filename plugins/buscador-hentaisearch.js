// Importamos las librerías necesarias
import cheerio from 'cheerio'; // Para parsear el HTML
import axios from 'axios'; // Para hacer solicitudes HTTP

// Definimos el manejador principal de la búsqueda
const handler = async (m, {conn, text, __dirname, usedPrefix, command}) => {
  // Verificamos si el contenido NSFW está desactivado en el grupo
  if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply('🍡 El contenido *NSFW* está desactivado en este grupo.\n> Un administrador puede activarlo con el comando » *#nsfw*');
  }

  // Verificamos si se ingresó un texto para buscar
  if (!text) throw '🍡 Por favor, ingresa el nombre de algún hentai para buscar.';
  
  // Realizamos la búsqueda del hentai
  const searchResults = await searchHentai(text);
  
  // Creamos el texto de respuesta con los resultados
  let teks = searchResults.result.map((v, i) => `
${i+1}. *_${v.title}_*
↳ ✿ *_Vistas:_* ${v.views}
↳ ✿ *_Link:_* ${v.url}`).join('\n\n');
  
  let randomThumbnail;
  
  // Seleccionamos una miniatura aleatoria si hay resultados
  if (searchResults.result.length > 0) {
    const randomIndex = Math.floor(Math.random() * searchResults.result.length);
    randomThumbnail = searchResults.result[randomIndex].thumbnail;
  } else {
    // Si no hay resultados, usamos una miniatura por defecto
    randomThumbnail = 'https://pictures.hentai-foundry.com/e/Error-Dot/577798/Error-Dot-577798-Zero_Two.png';
    teks = '🪷 No se encontraron resultados.,.';
  }
  
  // Enviamos el archivo con la miniatura y el texto de resultados
  conn.sendFile(m.chat, randomThumbnail, 'error.jpg', teks, m);
};

// Definimos los comandos que activa este manejador
handler.command = ['searchhentai', 'hentaisearch'];

// Exportamos el manejador para que pueda ser usado en otras partes del código
export default handler;

// Función para buscar hentai en el sitio web
async function searchHentai(search) {
  return new Promise((resolve, reject) => {
    // Realizamos una solicitud GET al sitio web de hentai
    axios.get('https://hentai.tv/?s=' + search).then(async ({data}) => {
      const $ = cheerio.load(data); // Cargamos el HTML obtenido
      const result = {}; // Objeto para almacenar los resultados
      const res = []; // Array para almacenar cada resultado individual
      result.coder = 'rem-comp'; // Información del autor
      result.result = res; // Asignamos el array de resultados
      result.warning = 'It is strictly forbidden to reupload this code, copyright © 2022 by rem-comp'; // Aviso de copyright
      
      // Iteramos sobre los elementos que contienen los resultados
      $('div.flex > div.crsl-slde').each(function(a, b) {
        const _thumbnail = $(b).find('img').attr('src'); // Obtenemos la miniatura
        const _title = $(b).find('a').text().trim(); // Obtenemos el título
        const _views = $(b).find('p').text().trim(); // Obtenemos el número de vistas
        const _url = $(b).find('a').attr('href'); // Obtenemos el enlace
        
        // Creamos un objeto con los detalles del hentai
        const hasil = {thumbnail: _thumbnail, title: _title, views: _views, url: _url};
        res.push(hasil); // Agregamos el objeto al array de resultados
      });
      
      resolve(result); // Resolvemos la promesa con los resultados
    }).catch((err) => {
      console.log(err); // Manejamos cualquier error que ocurra
    });
  });
}