import { NFETreeunfeServiceImpl, TreeunfeDFeImpl } from "@Interfaces";
import NFETreeunfeService from "@Modules/dfe/nfe/services/NFeTreeunfe/NFeTreeunfeService";
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
  EventoNFe,
  InutilizacaoData,
  NFEGerarDanfeProps,
  NFe,
  OperacaoNaoRealizada,
  TreeunfeNFe,
} from "src/core/types";

export default class TreeunfeDFe implements TreeunfeDFeImpl {
  private nfeTreeunfeService: NFETreeunfeServiceImpl;

  constructor() {
    this.nfeTreeunfeService = new NFETreeunfeService();
  }

  async DFE_LoadEnvironment({ config }: { config: TreeunfeNFe }) {
    await this.nfeTreeunfeService.DFE_LoadEnvironment({ config });
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
   * Autorização NF-e
   */
  async NFE_Autorizacao(data: NFe) {
    return await this.nfeTreeunfeService.NFE_Autorizacao(data);
  }

  /**
   * Autorização NFC-e
   */
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
}
