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
  GenericObject,
  InutilizacaoData,
  LayoutNFe,
  NFEGerarDanfeProps,
  NFe,
  OperacaoNaoRealizada,
  ProtNFe,
  TreeunfeNFe,
} from "@Types";

export interface NFeTreeunfeServiceImpl {
  NFE_LoadEnvironment({ config }: { config: TreeunfeNFe }): Promise<void>;
  NFE_ConsultaStatusServico(): Promise<any>;
  NFE_ConsultaProtocolo(chave: string): Promise<any>;
  NFE_RecepcaoEvento(evento: EventoNFe): Promise<GenericObject[]>;
  NFE_EventoPrevioDeEmissaoEmContingencia(
    evento: EPEC
  ): Promise<GenericObject[]>;
  NFE_Cancelamento(evento: Cancelamento): Promise<GenericObject[]>;
  NFE_CienciaDaOperacao(evento: CienciaDaOperacao): Promise<GenericObject[]>;
  NFE_ConfirmacaoDaOperacao(
    evento: ConfirmacaoDaOperacao
  ): Promise<GenericObject[]>;
  NFE_OperacaoNaoRealizada(
    evento: OperacaoNaoRealizada
  ): Promise<GenericObject[]>;
  NFE_CartaDeCorrecao(evento: CartaDeCorrecao): Promise<GenericObject[]>;
  NFE_DesconhecimentoDaOperacao(
    evento: DesconhecimentoDaOperacao
  ): Promise<GenericObject[]>;
  NFE_DistribuicaoDFe(data: ConsultaNFe): Promise<GenericObject>;
  NFE_DistribuicaoDFePorUltNSU(data: DFePorUltimoNSU): Promise<GenericObject>;
  NFE_DistribuicaoDFePorNSU(data: DFePorNSU): Promise<GenericObject>;
  NFE_DistribuicaoDFePorChave(data: DFePorChaveNFe): Promise<GenericObject>;
  NFE_Autorizacao(data: NFe): Promise<
    {
      NFe: LayoutNFe;
      protNFe: ProtNFe;
    }[]
  >;
  NFCE_Autorizacao(data: NFe): Promise<
    {
      NFe: LayoutNFe;
      protNFe: ProtNFe;
    }[]
  >;
  NFE_Inutilizacao(data: InutilizacaoData): Promise<any>;
  NFE_GerarDanfe(data: NFEGerarDanfeProps): Promise<{
    message: string;
    success: boolean;
  }>;
  NFCE_GerarDanfe(data: NFEGerarDanfeProps): Promise<{
    message: string;
    success: boolean;
  }>;
}
