/*
 * This file is part of NFeTreeunfe-io.
 *
 * NFeTreeunfe-io is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * NFeTreeunfe-io is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with NFeTreeunfe-io. If not, see <https://www.gnu.org/licenses/>.
 */
import XmlBuilder from "@Adapters/XmlBuilder.js";
import { logger } from "@Core/exceptions/logger";
import {
  GerarConsultaImpl,
  NFEStatusServicoServiceImpl,
  SaveFilesImpl,
} from "@Interfaces";
import BaseNFE from "@Modules/dfe/base/BaseNFe.js";
import Environment from "@Modules/environment/Environment.js";
import Utility from "@Utils/Utility.js";
import { getCodIBGE } from "@Utils/getCodIBGE.js";
import { AxiosInstance } from "axios";

const METHOD_NAME = "NFEStatusServico";

class NFEStatusServicoService
  extends BaseNFE
  implements NFEStatusServicoServiceImpl
{
  constructor(
    environment: Environment,
    utility: Utility,
    xmlBuilder: XmlBuilder,
    axios: AxiosInstance,
    saveFiles: SaveFilesImpl,
    gerarConsulta: GerarConsultaImpl
  ) {
    super(
      environment,
      utility,
      xmlBuilder,
      METHOD_NAME,
      axios,
      saveFiles,
      gerarConsulta
    );
  }

  protected gerarXml(): string {
    logger.info("Montando estrutuda do XML em JSON", {
      context: "NFEStatusServicoService",
    });
    const {
      nfe: { ambiente, versaoDF },
      dfe: { UF },
    } = this.environment.getConfig();

    const xmlObject = {
      $: {
        versao: versaoDF,
        xmlns: "http://www.portalfiscal.inf.br/nfe",
      },
      tpAmb: ambiente,
      cUF: getCodIBGE(UF),
      xServ: "STATUS",
    };

    return this.xmlBuilder.gerarXml(xmlObject, "consStatServ", this.metodo);
  }
}

export default NFEStatusServicoService;
