import path from "path";
import { fileURLToPath } from "url";

const baseDir = path.dirname(fileURLToPath(import.meta.url));
const dir =
  process.env.NODE_ENV === "production"
    ? "../resources/schemas"
    : "../resources/schemas/";

/**
 * Efetua a leitura do Schema
 */

interface SchemaProps {
  [key: string]: string;
}

export const getSchema = (metodo: string) => {
  const pathSchemas = path.resolve(baseDir, dir);

  const schema: SchemaProps = {
    NFEStatusServico: `${pathSchemas}/consStatServ_v4.00.xsd`,
    NFEConsultaProtocolo: `${pathSchemas}/consSitNFe_v4.00.xsd`,
    RecepcaoEvento: `${pathSchemas}/envEvento_v1.00.xsd`,
    NFeDistribuicaoDFe: `${pathSchemas}/distDFeInt_v1.01.xsd`,
    NFEAutorizacao: `${pathSchemas}/enviNFe_v4.00.xsd`,
    NFEInutilizacao: `${pathSchemas}/inutNFe_v4.00.xsd`,
    NFERetAutorizacao: `${pathSchemas}/consReciNFe_v4.00.xsd`,
  };

  try {
    return {
      basePath: pathSchemas,
      schemaPath: schema[metodo],
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
