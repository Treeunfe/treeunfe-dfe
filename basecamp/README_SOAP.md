# TreeunfeDFe: Guia Completo de Comunicação SOAP, Autenticação e Assinatura Digital

## 📚 Introdução

Este guia foi criado para explicar de forma didática como o projeto **Treeunfe DFe** implementa a comunicação com os webservices da SEFAZ, incluindo autenticação com certificado digital e assinatura de documentos XML. Vamos entender passo a passo como tudo funciona!

## 🔐 O que é SOAP e por que usamos?

**SOAP** (Simple Object Access Protocol) é um protocolo de comunicação que permite que aplicações troquem informações através de XML. No contexto da SEFAZ, usamos SOAP porque:

- É o padrão oficial exigido pela SEFAZ para comunicação
- Permite transmissão segura de dados fiscais
- Suporta autenticação e criptografia
- É compatível com sistemas legados

## 🏗️ Arquitetura da Comunicação SOAP no Treeunfe DFe

### 1. Estrutura de Arquivos

```
src/
├── modules/dfe/base/          # Classes base para comunicação
│   ├── BaseNFe.ts             # Classe abstrata com lógica comum
│   └── GerarConsulta.ts       # Geração de envelopes SOAP
├── adapters/
│   └── XmlBuilder.ts          # Construção e assinatura de XMLs
├── modules/environment/
│   ├── Environment.ts         # Configuração do ambiente
│   └── LoadCertificate.ts     # Carregamento de certificados
└── core/utils/
    └── Utility.ts             # Utilitários para SOAP
```

### 2. Fluxo de Comunicação

```
[Seu Código] → [TreeunfeDFe] → [BaseNFe] → [GerarConsulta] → [XmlBuilder] → [SEFAZ]
```

## 🔑 Autenticação com Certificado Digital A1

### Como funciona?

O certificado digital é como uma "identidade digital" que prova que você é quem diz ser. No Treeunfe DFe, ele é usado para:

1. **Autenticar** sua identidade perante a SEFAZ
2. **Assinar** digitalmente os documentos XML
3. **Criptografar** a comunicação

### Implementação no Código

#### 1. Carregamento do Certificado (`LoadCertificate.ts`)

```typescript
// O certificado é carregado de um arquivo .pfx (PKCS#12)
const pfxFile = fs.readFileSync(pfxPath);
const pfxPassword = this.config.dfe.senhaCertificado;

// Duas formas de carregar:
// 1. Usando biblioteca PEM (requer OpenSSL)
pem.readPkcs12(pfxFile, { p12Password: pfxPassword }, callback);

// 2. Usando Node-Forge (puro JavaScript)
const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, pfxPassword);
```

#### 2. Configuração do Agente HTTPS (`LoadCertificate.ts`)

```typescript
// Cria um agente HTTPS com o certificado
const agent = new https.Agent({
  key: keyPem, // Chave privada
  cert: certPem, // Certificado público
  ca: caCerts, // Certificados das Autoridades Certificadoras
  rejectUnauthorized: false,
  checkServerIdentity: () => undefined,
});
```

#### 3. Validação do Certificado

```typescript
// Verifica se o certificado não expirou
const now = new Date();
if (now < certForge.validity.notBefore || now > certForge.validity.notAfter) {
  throw new Error("Certificado expirado ou ainda não válido");
}
```

## 📝 Assinatura Digital de Documentos

### O que é Assinatura Digital?

É como um "carimbo digital" que garante que:

- O documento não foi alterado
- Você realmente enviou o documento
- O documento é autêntico

### Implementação no XmlBuilder

#### 1. Configuração da Assinatura (`XmlBuilder.ts`)

```typescript
assinarXML(xml: string, tagAssinar: string) {
    // Configura as transformações XML
    const transforms = [
        'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
        'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'
    ];

    // Cria objeto de assinatura
    const signedXmlObj = new SignedXml({
        publicCert: this.environment.getCert(),      // Certificado público
        privateKey: this.environment.getCertKey(),   // Chave privada
        canonicalizationAlgorithm: "http://www.w3.org/TR/2001/REC-xml-c14n-20010315",
        implicitTransforms: ['http://www.w3.org/TR/2001/REC-xml-c14n-20010315']
    });

    // Adiciona referência para assinar
    signedXmlObj.addReference({
        xpath: `//*[local-name(.)='${tagAssinar}']`,
        digestAlgorithm: 'http://www.w3.org/2000/09/xmldsig#sha1',
        transforms
    });

    // Define algoritmo de assinatura
    signedXmlObj.signatureAlgorithm = 'http://www.w3.org/2000/09/xmldsig#rsa-sha1';

    // Assina o XML
    signedXmlObj.computeSignature(xml);

    return signedXmlObj.getSignedXml();
}
```

## 🌐 Construção do Envelope SOAP

### O que é um Envelope SOAP?

É como um "envelope de correio" que contém:

- **Header**: Informações sobre a mensagem
- **Body**: O documento XML que você quer enviar
- **Namespaces**: Definições dos tipos de dados

### Implementação no XmlBuilder

#### 1. Estrutura do Envelope (`XmlBuilder.ts`)

```typescript
buildSoapEnvelope(xml: string, soapMethod: string, soapVersion: string = "soap12") {
    // Define namespaces SOAP
    const soapNamespaces = {
        'soap12': 'http://www.w3.org/2003/05/soap-envelope', // SOAP 1.2
        'soap': 'http://schemas.xmlsoap.org/soap/envelope/'   // SOAP 1.1
    };

    // Estrutura básica do envelope
    let soapEnvelopeObj = {
        '$': {
            [`xmlns:${soapVersion}`]: soapNamespace,
            'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
        },
        [`${soapVersion}:Body`]: {
            'nfeDadosMsg': {
                '$': { 'xmlns': soapMethod },
                _: '[XML]'  // Placeholder para o XML
            }
        }
    };

    // Serializa para XML e substitui o placeholder
    let soapEnvXml = this.serializeXml(soapEnvelopeObj, `${soapVersion}:Envelope`);
    return soapEnvXml.replace('[XML]', xml);
}
```

#### 2. Exemplo de Envelope SOAP Gerado

```xml
<soap12:Envelope
    xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema">

    <soap12:Body>
        <nfeDadosMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4">
            <!-- Aqui vai o seu XML da NFe -->
            <NFe xmlns="http://www.portalfiscal.inf.br/nfe">
                <!-- Conteúdo da NFe -->
            </NFe>
        </nfeDadosMsg>
    </soap12:Body>
</soap12:Envelope>
```

## 🔄 Processo Completo de Comunicação

### 1. Preparação da Requisição (`BaseNFe.ts`)

```typescript
async Exec(data?: any): Promise<any> {
    // 1. Gera XML específico da operação
    xmlConsulta = this.gerarXml(data);

    // 2. Prepara consulta SOAP
    const { xmlFormated, agent, webServiceUrl, action } =
        await this.gerarConsulta.gerarConsulta(xmlConsulta, this.metodo);

    // 3. Envia para o webservice
    const xmlRetorno = await this.callWebService(
        xmlFormated, webServiceUrl, ContentType, action, agent
    );

    // 4. Converte resposta para JSON
    const json = new XmlParser();
    responseInJson = json.convertXmlToJson(xmlRetorno.data, this.metodo);

    return responseInJson;
}
```

### 2. Configuração do Content-Type

```typescript
protected setContentType() {
    const UF = this.environment.config.dfe.UF;
    const ufsAppSoad = ["MG", "GO", "MT", "MS", "AM"];

    // Algumas UFs usam application/soap+xml
    if (ufsAppSoad.includes(UF)) {
        return "application/soap+xml";
    }
    // Outras usam text/xml; charset=utf-8
    return "text/xml; charset=utf-8";
}
```

### 3. Envio da Requisição

```typescript
protected async callWebService(
    xmlConsulta: string,
    webServiceUrl: string,
    ContentType: string,
    action: string,
    agent: Agent
): Promise<AxiosResponse<any, any>> {

    const headers = {
        "Content-Type": ContentType,
    };

    // Envia usando Axios com o agente HTTPS configurado
    const response = await this.axios.post(webServiceUrl, xmlConsulta, {
        headers,
        httpsAgent: agent,  // Usa o certificado aqui!
    });

    return response;
}
```

## 📋 Configuração dos Serviços SOAP

### 1. URLs dos Webservices (`DFeServicosUrl.json`)

O projeto mantém um arquivo de configuração com todas as URLs dos webservices da SEFAZ para cada UF:

```json
{
  "SOAP_V4": {
    "NFEAutorizacao": "https://nfe.sefaz.go.gov.br/nfe/services/NFeAutorizacao4",
    "NFEStatusServico": "https://nfe.sefaz.go.gov.br/nfe/services/NFeStatusServico4"
  },
  "SOAP_V4_SP": {
    "NFEAutorizacao": "https://nfe.fazenda.sp.gov.br/ws/nfeautorizacao4.asmx",
    "NFEStatusServico": "https://nfe.fazenda.sp.gov.br/ws/nfestatusservico4.asmx"
  }
}
```

### 2. Métodos SOAP (`soapMethod.json`)

```json
{
  "NFEAutorizacao": {
    "method": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4",
    "action": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4/nfeAutorizacaoLote"
  }
}
```

## 🛡️ Validação de Schema XML

### Por que validar?

Antes de enviar para a SEFAZ, o XML deve ser validado contra um schema XSD para garantir que está correto.

### Implementação

```typescript
// Validação baseada em Java (padrão)
await this.utility.validateSchemaJavaBased(xmlConsulta, metodo);

// Validação baseada em JavaScript (alternativa)
await this.utility.validateSchemaJsBased(xmlConsulta, metodo);
```

## 🔍 Exemplo Prático: Enviando uma NFe

### 1. Configuração Inicial

```typescript
import TreeunfeDFe from "treeunfe-dfe";

const nfeTreeunfe = new NFETreeunfe();

// Carrega ambiente com certificado
await nfeTreeunfe.DFE_LoadEnvironment({
  config: {
    dfe: {
      pathCertificado: "./certificado.pfx",
      senhaCertificado: "123456",
      UF: "SP",
      CPFCNPJ: "12345678000199",
    },
  },
});
```

### 2. Envio da NFe

```typescript
// Dados da NFe
const nfeData = {
  // ... dados da nota fiscal em formato JSON
};

// Envia para autorização
const resultado = await nfeTreeunfe.NFE_Autorizacao(nfeData);
```

### 3. O que acontece internamente?

1. **Geração do XML**: Cria o XML da NFe
2. **Validação**: Valida contra o schema XSD
3. **Assinatura**: Assina digitalmente o XML
4. **Envelope SOAP**: Cria o envelope SOAP
5. **Envio**: Envia para a SEFAZ usando HTTPS com certificado
6. **Resposta**: Processa a resposta e retorna o resultado

## 🚨 Tratamento de Erros

### Tipos de Erros Comuns

1. **Erro de Certificado**: Certificado expirado ou inválido
2. **Erro de Schema**: XML não está de acordo com o padrão
3. **Erro de Comunicação**: Problema na conexão com a SEFAZ
4. **Erro de Negócio**: Rejeição pela SEFAZ (dados incorretos)

### Exemplo de Tratamento

```typescript
try {
  const resultado = await nfeTreeunfe.NFE_Autorizacao(nfeData);
  console.log("NFe autorizada com sucesso!");
} catch (error) {
  if (error.message.includes("Rejeição")) {
    console.error("NFe rejeitada pela SEFAZ:", error.message);
  } else if (error.message.includes("Certificado")) {
    console.error("Problema com certificado:", error.message);
  } else {
    console.error("Erro inesperado:", error.message);
  }
}
```

## 📚 Recursos Adicionais

### 1. Logs Detalhados

O projeto usa Winston para logging detalhado:

```typescript
logger.http("Iniciando comunicação com o webservice", {
  context: `BaseNFE`,
  method: this.metodo,
  url: webServiceUrl,
  action,
  headers,
});
```

### 2. Salvamento de Arquivos

Todas as requisições e respostas são salvas para auditoria:

```typescript
this.saveFiles.salvaArquivos(
  xmlConsulta, // XML enviado
  responseInJson, // Resposta em JSON
  xmlRetorno, // XML de retorno
  this.metodo, // Método usado
  xmlConsultaSoap // XML com envelope SOAP
);
```

### 3. Suporte a Múltiplas UFs

O projeto detecta automaticamente a UF e usa as configurações corretas:

```typescript
switch (uf) {
  case "SP":
    chaveSoap = "SOAP_V4_SP";
    break;
  case "BA":
    chaveSoap = "SOAP_V4_BA";
    break;
  default:
    chaveSoap = "SOAP_V4";
    break;
}
```

## 🔗 Próximos Passos

Agora que você entende como funciona a comunicação SOAP no Treeunfe DFe, você pode:

1. **Explorar o código**: Analisar outras partes da implementação
2. **Testar**: Criar testes para diferentes cenários
3. **Contribuir**: Sugerir melhorias ou reportar bugs
4. **Aprender mais**: Estudar sobre SOAP, XML e criptografia

## 📖 Referências

- [Documentação SOAP](https://www.w3.org/TR/soap/)
- [XML Digital Signatures](https://www.w3.org/TR/xmldsig-core/)
- [SEFAZ - Documentação Técnica](https://www.gov.br/nfe)
- [Node.js HTTPS](https://nodejs.org/api/https.html)

---

**Dica para Desenvolvedores Iniciantes na tributação**: Não se preocupe se não entender tudo de uma vez! SOAP e criptografia são temas complexos. Comece testando com exemplos simples e vá aprofundando gradualmente. O código está bem comentado e estruturado para facilitar o aprendizado! 🚀
