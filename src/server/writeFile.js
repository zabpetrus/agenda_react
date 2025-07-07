'use server';
import { promises as fs } from 'fs';
//import '../../src/assets/';
//import '../../public/'


export async function writeWithFileHandle() {
  var fileHandle;

  try {
    // Open a file for writing (creates if doesn't exist)
    fileHandle = await fs.open('output.txt', 'w');

    // Write content to the file
    await fileHandle.write('First line\n');
    await fileHandle.write('Second line\n');
    await fileHandle.write('Third line\n');

    console.log('Content written successfully');
  } catch (err) {
    console.error('Error writing to file:', err);
  } finally {
    // Always close the file handle
    if (fileHandle) {
      await fileHandle.close();
    }
  }
}

writeWithFileHandle();