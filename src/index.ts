import { Command, flags } from '@oclif/command'
import { parseBokaSePdf, parsePdf } from './parseBokaSePdf'

class ImportCli extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    dumpPdf: flags.boolean({char:'d', description: 'dump PDF output as text'}),
    parseBokaSePdf: flags.boolean({char:'p', description: 'process file as boka.se PDF output'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(ImportCli)

    if (flags.dumpPdf) {
      const data = await parsePdf(args.file);
      this.log(JSON.stringify(data, null, 2));
    } else if (flags.parseBokaSePdf) {
      const data = await parseBokaSePdf(args.file);
      this.log(JSON.stringify(data, null, 2));
    }
  }
}

export = ImportCli
