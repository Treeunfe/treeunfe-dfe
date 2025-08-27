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
import { GerarConsultaImpl, SaveFilesImpl } from "@Interfaces";
import Environment from "@Modules/environment/Environment.js";
import Utility from "@Utils/Utility.js";
import { AxiosInstance } from "axios";
import NFERecepcaoEventoService from "./NFERecepcaoEventoService";

class NFEConfirmacaoDaOperacaoService extends NFERecepcaoEventoService {
  constructor(
    environment: Environment,
    utility: Utility,
    xmlBuilder: XmlBuilder,
    axios: AxiosInstance,
    saveFiles: SaveFilesImpl,
    gerarConsulta: GerarConsultaImpl
  ) {
    super(environment, utility, xmlBuilder, axios, saveFiles, gerarConsulta);
  }
}

export default NFEConfirmacaoDaOperacaoService;
