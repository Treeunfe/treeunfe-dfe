# 🚀 Processo de Release - TreeunfeDFe

Este documento explica como realizar releases da biblioteca TreeunfeDFe usando o sistema automatizado configurado.

## 📋 Pré-requisitos

- Node.js 22+ instalado
- Acesso de escrita ao repositório
- Token do GitHub configurado
- Dependências instaladas (`npm ci`)

## 🎯 **FLUXO SIMPLES: 1 COMMIT = RELEASE AUTOMÁTICO**

### **Como Funciona (Resumo):**

1. **Faça um commit** seguindo o padrão convencional
2. **Push para main**
3. **GitHub Actions executa automaticamente** todo o processo
4. **Release é criado** com versão correta

### **Exemplo Prático:**

```bash
# 1. Fazer alteração no código
# 2. Commit seguindo padrão
git add .
git commit -m "feat: adiciona nova funcionalidade"

# 3. Push para main
git push origin main

# 4. PRONTO! O sistema executa automaticamente:
# - ✅ Analisa o commit
# - ✅ Determina a versão (minor para feat)
# - ✅ Gera changelog
# - ✅ Cria tag
# - ✅ Publica no GitHub Packages
# - ✅ Cria release no GitHub
```

## 🔄 **Sistema de Release Configurado**

O projeto possui **4 workflows diferentes** para diferentes cenários de release:

### 1. **🔄 Semantic Release (Automático)**

- **Arquivo**: `.github/workflows/semantic-release.yml`
- **Trigger**: Push para `main` + Manual
- **Uso**: Releases automáticos baseados em commits convencionais

### 2. **🏷️ Auto Release (Por Tag)**

- **Arquivo**: `.github/workflows/auto-release.yml`
- **Trigger**: Criação de tag `v*`
- **Uso**: Release automático quando uma tag é criada

### 3. **🛠️ Manual Release (Interface)**

- **Arquivo**: `.github/workflows/manual-release.yml`
- **Trigger**: Manual via GitHub Actions
- **Uso**: Release manual com interface para escolher versão

### 4. **📦 Release Package (Por Release)**

- **Arquivo**: `.github/workflows/release-package.yml`
- **Trigger**: Criação de release no GitHub
- **Uso**: Publicação de pacote quando release é criado

## 🚀 **Como Realizar uma Release**

### **Opção 1: Semantic Release Automático (Recomendado)**

```bash
# 1. Fazer commits seguindo o padrão convencional
git commit -m "feat: nova funcionalidade"
git commit -m "fix: correção de bug"

# 2. Push para main
git push origin main

# 3. O workflow semantic-release executa automaticamente:
# - ✅ Build do projeto
# - ✅ Execução dos testes
# - ✅ Análise dos commits
# - ✅ Geração do changelog
# - ✅ Criação da tag
# - ✅ Publicação no GitHub Packages
# - ✅ Criação do release no GitHub
```

### **Opção 2: Release Manual via GitHub Actions**

1. **Ir para**: `Actions` → `Manual Release`
2. **Clicar em**: `Run workflow`
3. **Configurar**:
   - **Version**: Versão específica (ex: `1.0.0`) ou deixar vazio para auto-increment
   - **Release Type**: `patch`, `minor`, ou `major`
   - **Dry Run**: `true` para teste, `false` para release real
4. **Executar** o workflow

### **Opção 3: Release por Tag**

```bash
# 1. Criar tag local
git tag v1.0.0

# 2. Push da tag
git push origin v1.0.0

# 3. O workflow auto-release executa automaticamente
```

### **Opção 4: Release via Interface do GitHub**

1. **Ir para**: `Releases` → `Create a new release`
2. **Criar tag**: `v1.0.0`
3. **Título**: `Release v1.0.0`
4. **Descrição**: Detalhes da release
5. **Publicar** release
6. O workflow `release-package` executa automaticamente

## 📊 **Tipos de Commits para Semantic Release**

- **`feat:`** → Release Minor (0.X.0)
- **`fix:`** → Release Patch (0.0.X)
- **`feat!:`** → Release Major (X.0.0)
- **`docs:`, `style:`, `refactor:`, `perf:`, `test:`, `build:`, `ci:`, `chore:`** → Release Patch

## 🔧 **Configuração Atual**

### **Arquivos de Configuração**

- **`.releaserc.json`** - Configuração principal do semantic-release
- **`.github/workflows/semantic-release.yml`** - Workflow automatizado principal
- **`.github/workflows/auto-release.yml`** - Release por tag
- **`.github/workflows/manual-release.yml`** - Release manual
- **`.github/workflows/release-package.yml`** - Publicação de pacote

### **Plugins Semantic-Release Configurados**

- `@semantic-release/commit-analyzer` - Analisa commits
- `@semantic-release/release-notes-generator` - Gera notas de release
- `@semantic-release/changelog` - Atualiza CHANGELOG.md
- `@semantic-release/npm` - Publica no GitHub Packages
- `@semantic-release/git` - Commit das mudanças
- `@semantic-release/github` - Cria release no GitHub

## 🧪 **Testando o Sistema**

### **Teste Local (Dry Run)**

```bash
# Verificar se semantic-release está funcionando
npx semantic-release --dry-run

# Verificar configuração
npx semantic-release --help
```

### **Teste Real (GitHub Actions)**

1. **Fazer commit de teste**:

   ```bash
   git commit -m "test: teste do sistema de release" --allow-empty
   git push origin main
   ```

2. **Verificar Actions**: Ir para `Actions` → `Semantic Release`
3. **Verificar logs** para debug
4. **Verificar resultado**: Nova versão, tag, release

## 🚨 **Troubleshooting**

### **Release Falhou**

1. **Verificar logs** do workflow específico em `Actions`
2. **Executar localmente**: `npx semantic-release --debug`
3. **Verificar permissões** do token
4. **Confirmar** que os commits seguem o padrão convencional

### **Workflow Não Executou**

1. **Verificar trigger** do workflow
2. **Confirmar branch** (main para semantic-release)
3. **Verificar permissões** do repositório
4. **Consultar logs** de execução

### **Versão Não Atualizada**

1. **Verificar** se há commits desde o último release
2. **Confirmar** que os commits têm tipos válidos
3. **Verificar** configuração das regras de release
4. **Consultar** logs do semantic-release

## 📝 **Exemplos de Uso**

### **Release de Feature (Automático)**

```bash
# Desenvolver feature
git commit -m "feat: implementa nova funcionalidade"
git push origin main
# Release automático será executado
```

### **Release de Hotfix (Manual)**

```bash
# Fazer correção
git commit -m "fix: corrige bug crítico"
git push origin main

# Ou usar release manual via GitHub Actions
# Actions → Manual Release → Run workflow
```

### **Release Específico (Por Tag)**

```bash
# Criar tag para versão específica
git tag v1.2.3
git push origin v1.2.3
# Workflow auto-release executa
```

## 🔗 **Links Úteis**

- [Semantic Release Documentation](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [GitHub Packages](https://docs.github.com/en/packages)

## 📞 **Suporte**

Para dúvidas sobre o processo de release:

1. **Verificar logs** dos workflows em `Actions`
2. **Consultar** documentação do semantic-release
3. **Abrir issue** no repositório
4. **Contatar** a equipe de desenvolvimento

---

## 🎯 **Resumo dos Workflows**

| Workflow             | Trigger        | Uso                          | Automático |
| -------------------- | -------------- | ---------------------------- | ---------- |
| **semantic-release** | Push main      | Releases baseados em commits | ✅         |
| **auto-release**     | Tag v\*        | Release por tag específica   | ✅         |
| **manual-release**   | Manual         | Release manual com interface | ❌         |
| **release-package**  | Release GitHub | Publicação de pacote         | ✅         |

---

## 🚀 **TESTE RÁPIDO - AGORA MESMO!**

Para testar se o sistema está funcionando:

```bash
# 1. Fazer um commit de teste
git commit -m "test: teste do sistema de release automático" --allow-empty

# 2. Push para main
git push origin main

# 3. Verificar Actions
# Ir para: https://github.com/treeunfe/treeunfe-dfe/actions

# 4. Aguardar execução do workflow "Semantic Release"
# 5. Verificar se nova versão foi criada
```

**Resultado esperado**: Nova versão, tag, changelog atualizado e release no GitHub! 🎉
