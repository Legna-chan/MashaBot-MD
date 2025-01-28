
global.math = global.math || {};

const handler = async (m, {conn, args, usedPrefix, command}) => {
  const mat = `🍬 Por favor, ingresa la dificultad con la que desea jugar.

*Dificultades Disponibles: ${Object.keys(modes).join(' | ')}*
*Ejemplo de uso: ${usedPrefix}mates medium*
`.trim();

  if (args.length < 1) return await conn.reply(m.chat, mat, m);

  const mode = args[0].toLowerCase();
  if (!(mode in modes)) return await conn.reply(m.chat, mat, m);

  const id = m.chat;
  if (id in global.math) return conn.reply(m.chat, '🍭 Todavía hay un juego en proceso en este chat.', global.math[id][0]);

  const math = genMath(mode);
  global.math[id] = [
    await conn.reply(m.chat, `🍭 Cuánto es el resultado de ${math.str}?\n\n🕒 Tiempo: ${(math.time / 1000).toFixed(2)} segundos\n*🍬 Premio: ${math.bonus} XP*`, m),
    math, 
    4,
    setTimeout(() => {
      if (global.math[id]) {
        conn.reply(m.chat, `🍭 Se ha finalizado el tiempo para responder.\n\n🍬 La respuesta es ${math.result}`, m);
        delete global.math[id];
      }
    }, math.time),
  ];
};

// Nuevo manejador para recibir respuestas
const answerHandler = async (m, {conn}) => {
  const id = m.chat;
  if (!(id in global.math)) return; // No hay juego en curso

  const mathData = global.math[id];
  const correctAnswer = mathData[1].result; // Obtener la respuesta correcta

  // Verificar si la respuesta del usuario es correcta
  if (parseInt(m.text) === correctAnswer) {
    conn.reply(m.chat, `🎉 ¡Correcto! Has ganado ${mathData[1].bonus} XP!`, m);
    delete global.math[id]; // Terminar el juego
  } else {
    conn.reply(m.chat, `❌ Incorrecto. La respuesta era ${correctAnswer}.`, m);
  }
};

handler.help = ['math <mode>'];
handler.tags = ['game'];
handler.command = ['matemáticas', 'mates', 'math'];

// Agregar el nuevo manejador para respuestas
export default { handler, answerHandler };

// Asegúrate de que las siguientes funciones y variables estén definidas
// modes, operators, genMath, randomInt, pickRandom