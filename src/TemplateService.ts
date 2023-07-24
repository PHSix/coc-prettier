import { Uri, workspace } from "coc.nvim";
import { LoggingService } from "./LoggingService";
import { PrettierModule, PrettierOptions } from "./types";
import path from "path";
import fs from "fs";
import { promisify } from "util";

export class TemplateService {
  constructor(
    private loggingService: LoggingService,
    private prettierModule: PrettierModule,
  ) {}
  public async writeConfigFile(folderPath: Uri) {
    const settings = { tabWidth: 2, useTabs: false };

    const outputPath = path.join(folderPath.fsPath, ".prettierrc");

    const formatterOptions: PrettierOptions = {
      /* cspell: disable-next-line */
      filepath: folderPath.scheme === "file" ? outputPath : undefined,
      tabWidth: settings.tabWidth,
      useTabs: settings.useTabs,
    };

    const templateSource = this.prettierModule.format(
      JSON.stringify(settings, null, 2),
      formatterOptions,
    );

    this.loggingService.logInfo(`Writing .prettierrc to '${outputPath}'`);

    await promisify(fs.writeFile)(outputPath, templateSource, {
      encoding: "utf8",
    });
    await workspace.jumpTo(Uri.file(outputPath).toString());
    // await workspace.fs.writeFile(
    //   outputPath,
    //   new TextEncoder().encode(templateSource)
    // );
  }
}
