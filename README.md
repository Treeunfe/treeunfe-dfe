# Treeunfe DFe 🪄

## Atenção: Ao abrir uma issue certifique-se de adicionar as informações abaixo:

Ao abrir issue ou PR, inclua:

```markdown
## Parametrização

- UF: PR
- Certificado: A1
- Método: NFE_ConsultaStatusServico
- Status: ✅ Funcionando / ❌ Com erro
```

## Logs Relevantes

Inclua também os logs gerados no diretório configurado em `pathLogs`.
Lembre-se de adicionar os logs **app.jsonl**, **error.jsonl** e **http.jsonl**.

```jsonl
{"context":"NFE_ConsultaProtocolo","error":{"message":"Rejeição: Consumo Indevido",...}
```

## Sobre a Biblioteca

Treeunfe DFe é uma biblioteca Node.js projetada para simplificar a interação com os webservices da SEFAZ, proporcionando uma solução robusta para automação de processos relacionados à Nota Fiscal Eletrônica (NF-e). A biblioteca oferece métodos abrangentes para diversas operações fiscais, incluindo:

- **Autorização (Emissão de NFe e NFCe)**: Submissão de Notas Fiscais Eletrônicas e Notas Fiscais de Consumidor Eletrônica
  para autorização.
- **Distribuição DFe**: Consulta e Download de DF-e (Documentos fiscais eletrônicos), facilitando o acesso a documentos fiscais eletrônicos.
- **Consulta de Protocolo**: Verificação da situação atual da NF-e na Base de Dados do Portal da Secretaria de Fazenda Estadual.
- **Inutilização de NFe**: Processo de inutilização de números de NF-e que não serão utilizados, assegurando a conformidade fiscal.
- **Consulta de Status do Serviço**: Monitoramento do status dos serviços da SEFAZ, garantindo a disponibilidade dos webservices.
- **Recepção de Eventos**: Tratamento de diversos eventos relacionados à NFe e NFCe, incluindo:
  - Cancelamento de NFe e NFCe
  - Carta de Correção
  - Ciência da Operação
  - Confirmação da Operação
  - Desconhecimento da Operação
  - EPEC (Evento Prévio de Emissão em Contingência)
  - Operação Não Realizada
- **Geração de DANFE**: Criação do Documento Auxiliar da Nota Fiscal Eletrônica (DANFE), um resumo impresso da NFe.

## 🚧 ATENÇÃO 🚧

### Requisitos para instalação

Para utilizar esta biblioteca, é necessário ter o JDK instalado no ambiente.

Caso esteja rodando em um ambiente sem suporte ao JDK (como a Vercel) ou que não permita a adição de layers (diferente do AWS Lambda), é possível configurar a biblioteca como uma external lib e utilizar a seguinte opção ao inicializá-la:

```typescript
useForSchemaValidation: "validateSchemaJsBased";
```

### Exemplo de configuração no Serverless Framework

Se estiver usando o Serverless Framework, você pode marcar a biblioteca como external no arquivo de configuração (.yml), garantindo que ela não seja empacotada junto ao código da aplicação:

```yml
build:
  esbuild:
    bundle: true
    minify: true
    sourcemap: true
    target: "node20"
    format: "cjs"
    external:
      - better-sqlite3
      - mysql
      - mysql2
      - oracledb
      - tedious
      - sqlite3
      - pg-query-stream
      - treeunfe-dfe
```

Dessa forma, a treeunfe-dfe será tratada como uma dependência externa, permitindo sua execução sem a necessidade do JDK no ambiente.

### Exemplo de importação CJS

Para ambientes CJS (CommonJS) a importação utilizada deverá ser feita da seguinte maneira:

```typescript
const NFeTreeunfe = require("treeunfe-dfe").default;
```

## Exemplo de Utilização

```typescript
import NFeTreeunfe from "treeunfe-dfe";
// Instanciar
const nfeTreeunfe = new NFeTreeunfe();

// Inicializar
await nfeTreeunfe.NFE_LoadEnvironment({
  config: {
    dfe: {
      baixarXMLDistribuicao: true,
      pathXMLDistribuicao: "tmp/DistribuicaoDFe",
      armazenarXMLAutorizacao: true,
      pathXMLAutorizacao: "tmp/Autorizacao",
      armazenarXMLRetorno: true,
      pathXMLRetorno: "tmp/RequestLogs",
      armazenarXMLConsulta: true,
      pathXMLConsulta: "tmp/RequestLogs",
      armazenarXMLConsultaComTagSoap: false,
      armazenarRetornoEmJSON: false,
      pathRetornoEmJSON: "tmp/DistribuicaoDFe",

      pathCertificado: "certificado.pfx",
      senhaCertificado: "1234",
      UF: "SP",
      CPFCNPJ: "99999999999999",
    },
    nfe: {
      ambiente: 2,
      versaoDF: "4.00",
      idCSC: 1,
      tokenCSC: "99999999-9999-9999-9999-999999999999",
    },
    email: {
      host: "mail.provider.com.br",
      port: 465,
      secure: true,
      auth: {
        user: "nfe.example@email.com.br",
        pass: "123456",
      },
      emailParams: {
        from: "Company <noreply.company@email.com>",
        to: "customer.name@email.com.br",
      },
    },
    lib: {
      connection: {
        timeout: 30000,
      },
      log: {
        exibirLogNoConsole: true,
        armazenarLogs: true,
        pathLogs: "tmp/Logs",
      },
      useOpenSSL: false,
      useForSchemaValidation: "validateSchemaJsBased",
    },
  },
});

// Exemplo de Utilização
const chaveNFe: DFePorChaveNFe = {
  cUFAutor: 35,
  CNPJ: "99999999999999",
  consChNFe: {
    chNFe: "00000000000000000000000000000000000000000000",
  },
};

await nfeTreeunfe.NFE_DistribuicaoDFePorChave(chaveNFe);
```

## Última Release (0.3.1)

- Efetuados diversos ajustes na emissão de NFC-e.
- Alterada estrutura de pastas da lib (com mais alterações estruturais por vir)

## Observações

- `Certificado`: Implementado apenas em certificados A1.
- `NodeJs`: Testado com versões 16 ou superiores.
- `UF`: Testado apenas para São Paulo. Por favor, abra uma issue caso encontre problemas com outros estados.

**Para uma boa experiência de Debug no VS Code permitindo fazer o "step into" nos métodos do NfeWizzard, usar o launch.json com sourceMpas true e outFiles conforme segue:**:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug NFe Treeunfe",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/testes.ts",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/tsx",
      "runtimeArgs": [],
      "console": "integratedTerminal",
      "env": {
        "NODE_ENV": "development"
      },
      "sourceMaps": true,
      "restart": true,
      "protocol": "inspector",
      "outFiles": ["${workspaceFolder}/**/*.js"]
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug com ts-node",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/testes.ts",
      "runtimeArgs": ["--loader", "ts-node/esm"],
      "console": "integratedTerminal",
      "env": {
        "NODE_ENV": "development",
        "NODE_OPTIONS": "--loader ts-node/esm"
      },
      "sourceMaps": true
    }
  ]
}
```

**Exemplo do tsconfig.json do projeto que importa o Treeunfe DFe:**:

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "nodenext",
    "outDir": "dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "inlineSources": true,
    "inlineSourceMap": false,
    "declaration": true,
    "declarationMap": true,
    "moduleResolution": "nodenext"
  }
}
```
