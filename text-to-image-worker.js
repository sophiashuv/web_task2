import textToImage from 'text-to-image';
import { writeFile, readFile } from 'fs/promises';

/** https://www.npmjs.com/package/text-to-image */

const input = '../input/paragraph';
const output = `../output/${Date.now()}.png`;

(async() => {
  console.time('job');
  const fileText = await readFile(input);

  const imageBuffer = await textToBase64Image(fileText.toString());
  await saveFile(output, imageBuffer);
  console.timeEnd('job');
})()


async function textToBase64Image(text){
  const dataUri = await textToImage.generate(text);
  const base64 = dataUri.split(',')[1];

  return Buffer.from(base64, 'base64');
}

async function saveFile(path, content){
  await writeFile(path, content);
}
