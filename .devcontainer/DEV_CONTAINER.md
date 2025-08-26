# 🐳 Desenvolvimento com Dev Container

Este projeto usa **Dev Containers** para um ambiente de desenvolvimento completamente isolado e configurado.

## 🚀 Pré-requisitos

- **VS Code** instalado
- **Dev Containers extension** instalada no VS Code
- **Docker Desktop** instalado e rodando, se estiver no windows use WLS2

## 📦 Instalar Extensão Dev Containers

1. Abra o VS Code
2. Vá para **Extensions** (Ctrl+Shift+X)
3. Procure por **"Dev Containers"**
4. Instale a extensão da Microsoft

## 🎯 Como Usar

### **1. Abrir o Projeto no Dev Container**

#### **Opção A: Via VS Code**

1. Abra o projeto no VS Code
2. Pressione **Ctrl+Shift+P**
3. Digite **"Dev Containers: Reopen in Container"**
4. Selecione a opção
5. Aguarde o container ser criado

#### **Opção B: Via Command Palette**

1. **Ctrl+Shift+P** → **"Dev Containers: Open Folder in Container"**
2. Selecione a pasta do projeto
3. Aguarde o setup

### **2. Primeira Execução**

Na primeira vez, o container vai:

- ✅ Baixar a imagem base
- ✅ Instalar Java 17
- ✅ Configurar Node.js 22
- ✅ Instalar extensões do VS Code
- ✅ Executar `npm ci` automaticamente
- ✅ Configurar ambiente

### **3. Desenvolvimento Normal**

Após o container estar rodando:

```bash
# Todas as dependências já instaladas
npm run dev      # Desenvolvimento
npm run build    # Build da lib
npm test         # Testes
npm run debug    # Debug
```

## 🔧 O que Está Configurado

### **Ambiente:**

- ✅ **Java 17** - JDK e JRE
- ✅ **Node.js 22** - Versão LTS
- ✅ **npm** - Gerenciador de pacotes
- ✅ **Git** - Controle de versão
- ✅ **GitHub CLI** - Integração GitHub

### **VS Code Extensions:**

- ✅ **TypeScript** - Suporte nativo
- ✅ **Prettier** - Formatação de código
- ✅ **ESLint** - Linting
- ✅ **Jest** - Testes
- ✅ **Git** - Integração Git
- ✅ **GitHub** - Integração GitHub

### **Configurações:**

- ✅ **Format on Save** - Formatação automática
- ✅ **Auto Import** - Imports automáticos
- ✅ **ESLint Fix** - Correção automática
- ✅ **Port Forwarding** - Porta 3000

## 🚨 Solução de Problemas

### **Container não inicia**

1. Verifique se Docker está rodando
2. **Ctrl+Shift+P** → **"Dev Containers: Rebuild Container"**
3. Aguarde o rebuild completo

### **Dependências não funcionam**

1. **Ctrl+Shift+P** → **"Dev Containers: Rebuild Container"**
2. Ou execute manualmente: `npm ci`

### **Problemas de performance**

1. **Ctrl+Shift+P** → **"Dev Containers: Rebuild Container"**
2. Use **"Dev Containers: Rebuild Container Without Cache"**

### **Extensões não funcionam**

1. **Ctrl+Shift+P** → **"Dev Containers: Rebuild Container"**
2. As extensões são reinstaladas automaticamente

## 🔄 Comandos Úteis

### **Via Command Palette (Ctrl+Shift+P):**

- `Dev Containers: Reopen in Container` - Reabrir no container
- `Dev Containers: Rebuild Container` - Rebuildar container
- `Dev Containers: Open Folder in Container` - Abrir pasta no container
- `Dev Containers: Show Container Log` - Mostrar logs

### **Via Terminal (dentro do container):**

```bash
# Verificar ambiente
java -version
node --version
npm --version
echo $JAVA_HOME

# Desenvolvimento
npm run dev
npm run build
npm test
npm run debug

# Git
git status
git add .
git commit -m "feat: nova funcionalidade"
```

## 📁 Estrutura dos Arquivos

```
.devcontainer/
├── devcontainer.json    # Configuração principal
├── Dockerfile          # Imagem personalizada
└── setup.sh           # Script de configuração
```

## 🎯 Fluxo de Desenvolvimento

### **1. Iniciar:**

- Abrir projeto no VS Code
- **Ctrl+Shift+P** → **"Dev Containers: Reopen in Container"**
- Aguardar setup automático

### **2. Desenvolver:**

- Código sincronizado automaticamente
- Extensões funcionando perfeitamente
- Terminal integrado
- Debug funcionando

### **3. Finalizar:**

- Salvar arquivos (Ctrl+S)
- Commit via terminal ou Git extension
- Push via terminal ou GitHub extension

## 🔍 Vantagens vs Docker Puro

| Aspecto                | Docker Puro      | Dev Container              |
| ---------------------- | ---------------- | -------------------------- |
| **Integração VS Code** | ❌ Manual        | ✅ Nativa                  |
| **Extensões**          | ❌ Não funcionam | ✅ Funcionam perfeitamente |
| **Terminal**           | ❌ Separado      | ✅ Integrado               |
| **Debug**              | ❌ Complexo      | ✅ Funciona nativamente    |
| **Configuração**       | ❌ Manual        | ✅ Automática              |
| **Performance**        | ⚠️ Boa           | ✅ Excelente               |

## 💡 Dicas

1. **Use o terminal integrado** do VS Code
2. **As extensões são instaladas automaticamente**
3. **O ambiente é persistente** entre sessões
4. **Use "Rebuild Container"** se algo não funcionar
5. **O código é sincronizado em tempo real**

---

**🎉 Agora você tem um ambiente de desenvolvimento profissional e isolado!**
