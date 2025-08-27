/*
 * This file is part of TreeunfeDFe.
 *
 * TreeunfeDFe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * TreeunfeDFe is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with TreeunfeDFe. If not, see <https://www.gnu.org/licenses/>.
 */
import XmlBuilder from "@Adapters/XmlBuilder";
import { logger } from "@Core/exceptions/logger";
import {
  GerarConsultaImpl,
  NFEconsultaProtocoloServiceImpl,
  SaveFilesImpl,
} from "@Interfaces";
import BaseNFE from "@Modules/dfe/base/BaseNFe.js";
import Environment from "@Modules/environment/Environment.js";
import Utility from "@Utils/Utility.js";
import { AxiosInstance } from "axios";

class NFEconsultaProtocoloService
  extends BaseNFE
  implements NFEconsultaProtocoloServiceImpl
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
      "NFEConsultaProtocolo",
      axios,
      saveFiles,
      gerarConsulta
    );
  }

  protected gerarXml(chave: string): string {
    logger.info("Montando estrutuda do XML em JSON", {
      context: "NFEconsultaProtocoloService",
    });
    const {
      nfe: { ambiente, versaoDF },
    } = this.environment.getConfig();

    const xmlObject = {
      $: {
        versao: versaoDF,
        xmlns: "http://www.portalfiscal.inf.br/nfe",
      },
      tpAmb: ambiente,
      xServ: "CONSULTAR",
      chNFe: chave,
    };

    return this.xmlBuilder.gerarXml(xmlObject, "consSitNFe", this.metodo);
  }
}

export default NFEconsultaProtocoloService;
