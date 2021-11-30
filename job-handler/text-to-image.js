import textToImage from 'text-to-image';
import { writeFile } from 'fs/promises';


/** https://www.npmjs.com/package/text-to-image */

export async function generateImage(text){
  const fileName = `${Date.now()}.png`;
  const output = `../output/${fileName}`;
  const imageBuffer = await textToBase64Image(text);
  await saveFile(output, imageBuffer);
  return fileName;
}


async function textToBase64Image(text){
  const dataUri = await textToImage.generate(text);
  const base64 = dataUri.split(',')[1];

  return Buffer.from(base64, 'base64');
}

async function saveFile(path, content){
  await writeFile(path, content);
}
