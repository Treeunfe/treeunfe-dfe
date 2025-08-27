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
import { NFeTreeunfeImpl, NFeTreeunfeServiceImpl } from "@Interfaces";
import NFeTreeunfeService from "@Modules/dfe/nfe/services/NFeTreeunfe/NFeTreeunfeService";
import {
  Cancelamento,
  CartaDeCorrecao,
  CienciaDaOperacao,
  ConfirmacaoDaOperacao,
  ConsultaNFe,
  DFePorChaveNFe,
  DFePorNSU,
  DFePorUltimoNSU,
  DesconhecimentoDaOperacao,
  EPEC,
  EmailParams,
  EventoNFe,
  InutilizacaoData,
  NFEGerarDanfeProps,
  NFe,
  OperacaoNaoRealizada,
  TreeunfeNFe,
} from "src/core/types";

export default class NFeTreeunfe implements NFeTreeunfeImpl {
  private nfeTreeunfeService: NFeTreeunfeServiceImpl;

  constructor() {
    this.nfeTreeunfeService = new NFeTreeunfeService();
  }

  async NFE_LoadEnvironment({ config }: { config: TreeunfeNFe }) {
    await this.nfeTreeunfeService.NFE_LoadEnvironment({ config });
  }

  /**
   * Status Serviço
   */
  async NFE_ConsultaStatusServico() {
    return await this.nfeTreeunfeService.NFE_ConsultaStatusServico();
  }

  /**
   * Consulta Protocolo
   */
  async NFE_ConsultaProtocolo(chave: string) {
    return this.nfeTreeunfeService.NFE_ConsultaProtocolo(chave);
  }

  /**
   * Recepção de Eventos
   */
  async NFE_RecepcaoEvento(evento: EventoNFe) {
    return await this.nfeTreeunfeService.NFE_RecepcaoEvento(evento);
  }
  async NFE_EventoPrevioDeEmissaoEmContingencia(evento: EPEC) {
    return await this.nfeTreeunfeService.NFE_EventoPrevioDeEmissaoEmContingencia(
      evento
    );
  }
  async NFE_Cancelamento(evento: Cancelamento) {
    return await this.nfeTreeunfeService.NFE_Cancelamento(evento);
  }
  async NFE_CienciaDaOperacao(evento: CienciaDaOperacao) {
    return await this.nfeTreeunfeService.NFE_CienciaDaOperacao(evento);
  }
  async NFE_ConfirmacaoDaOperacao(evento: ConfirmacaoDaOperacao) {
    return await this.nfeTreeunfeService.NFE_ConfirmacaoDaOperacao(evento);
  }
  async NFE_OperacaoNaoRealizada(evento: OperacaoNaoRealizada) {
    return await this.nfeTreeunfeService.NFE_OperacaoNaoRealizada(evento);
  }
  async NFE_CartaDeCorrecao(evento: CartaDeCorrecao) {
    return await this.nfeTreeunfeService.NFE_CartaDeCorrecao(evento);
  }
  async NFE_DesconhecimentoDaOperacao(evento: DesconhecimentoDaOperacao) {
    return await this.nfeTreeunfeService.NFE_DesconhecimentoDaOperacao(evento);
  }

  /**
   * Distribuição DFe
   */
  async NFE_DistribuicaoDFe(data: ConsultaNFe) {
    return await this.nfeTreeunfeService.NFE_DistribuicaoDFe(data);
  }
  async NFE_DistribuicaoDFePorUltNSU(data: DFePorUltimoNSU) {
    return await this.nfeTreeunfeService.NFE_DistribuicaoDFePorUltNSU(data);
  }
  async NFE_DistribuicaoDFePorNSU(data: DFePorNSU) {
    return await this.nfeTreeunfeService.NFE_DistribuicaoDFePorNSU(data);
  }
  async NFE_DistribuicaoDFePorChave(data: DFePorChaveNFe) {
    return await this.nfeTreeunfeService.NFE_DistribuicaoDFePorChave(data);
  }

  /**
   * Autorização
   */
  async NFE_Autorizacao(data: NFe) {
    return await this.nfeTreeunfeService.NFE_Autorizacao(data);
  }
  async NFCE_Autorizacao(data: NFe) {
    return await this.nfeTreeunfeService.NFCE_Autorizacao(data);
  }

  /**
   * Inutilização
   */
  async NFE_Inutilizacao(data: InutilizacaoData) {
    return await this.nfeTreeunfeService.NFE_Inutilizacao(data);
  }

  /**
   * DANFE
   */
  async NFE_GerarDanfe(data: NFEGerarDanfeProps) {
    return await this.nfeTreeunfeService.NFE_GerarDanfe(data);
  }
  async NFCE_GerarDanfe(data: NFEGerarDanfeProps) {
    return await this.nfeTreeunfeService.NFCE_GerarDanfe(data);
  }

  /**
   * Método para envio de e-mail
   * @param {EmailParams} mailParams - Mensagem de texto (aceita html)
   */
  NFE_EnviaEmail(mailParams: EmailParams) {
    return this.nfeTreeunfeService.NFE_EnviaEmail(mailParams);
  }
}
