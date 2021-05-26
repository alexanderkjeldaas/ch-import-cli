import * as pdf from 'pdf-parse'
import { promises as fs } from 'fs'

export const parsePdf = async (file: string): Promise<string[]> => {
  const dataBuffer = await fs.readFile(file);
  
  const data = await pdf(dataBuffer);

  return data.text.split('\n');
};

export const parseBokaSePdf = async (file: string) => {
  const lines = await parsePdf(file);
  const peek = () => lines[0];
  const peekSkip = () => {
    let i = 0;
    while (
      lines[i] !== undefined &&
      (
        lines[i].startsWith('TidNamnKontakt') ||
        lines[i] === ""
      )
    ) {
      i++;
    }
    return lines[i];
  }
  const shift = () => {
    while (peek() !== undefined && (peek().startsWith('TidNamnKontakt') || peek() === "")) {
      lines.shift();
    }
    return lines.shift() ?? '';
  }
  shift();
  const calendar = shift().split(' ')[1];

  const parseItem = () => {
    const from = shift().split(' -')[0];
    const to = shift();
    let nameAndMaybePhone = shift();
    let name: string;
    let phone: string;
    // Kasdf(+46)07777777,
    if (nameAndMaybePhone[nameAndMaybePhone.length-1] === ',') {
      let [nameTmp, phoneSuffix] = nameAndMaybePhone.split('(+')
      phone = '(+' + phoneSuffix
      name = nameTmp
    } else {
      // Name is on two lines
      name = [nameAndMaybePhone, shift()].join (' ');
      phone = shift();
    }
    const email = shift();
    let product = '';
    for (;;) {
      if (!peekSkip() || peekSkip().startsWith('2021')) {
        break;
      }
      product = (product + ' ' + shift()).trim();
    }
    return {
      from,
      to,
      name,
      phone,
      email,
      product,
    };
  }

  const bookings = [];
  while (lines.length > 3) {
    const item = parseItem();
    bookings.push(item);
  }
  return {
    calendar,
    file,
    bookings,
  };
};