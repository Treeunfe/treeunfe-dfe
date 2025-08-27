# Sistema de Releases

Este projeto implementa um sistema automatizado de releases usando GitHub Actions e semantic-release.

## Como Funciona

### 1. Conventional Commits

Para que o sistema funcione corretamente, todos os commits devem seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Tipos de Commit Suportados:

- **feat**: Nova funcionalidade (gera release minor)
- **fix**: Correção de bug (gera release patch)
- **docs**: Documentação (gera release patch)
- **style**: Formatação de código (gera release patch)
- **refactor**: Refatoração de código (gera release patch)
- **perf**: Melhorias de performance (gera release patch)
- **test**: Adição ou correção de testes (gera release patch)
- **build**: Alterações no sistema de build (gera release patch)
- **ci**: Alterações na CI/CD (gera release patch)
- **chore**: Tarefas de manutenção (gera release patch)
- **revert**: Reverter commits anteriores (gera release patch)

#### Exemplos:

```bash
git commit -m "feat: adiciona suporte a NFC-e"
git commit -m "fix(nfe): corrige validação de XML"
git commit -m "docs: atualiza README com exemplos"
git commit -m "feat!: quebra compatibilidade com versão anterior"
```

### 2. Workflows Disponíveis

#### Workflow Principal (release-package.yml)
- **Trigger**: Criação manual de release no GitHub
- **Funcionalidades**:
  - Atualiza versão no package.json
  - Gera changelog automaticamente
  - Executa testes
  - Publica pacote no GitHub Packages
  - Cria tag git
  - Atualiza release notes

#### Workflow Semantic Release (semantic-release.yml)
- **Trigger**: Push para branch main
- **Funcionalidades**:
  - Análise automática de commits
  - Determinação automática da versão
  - Geração automática de changelog
  - Criação automática de release
  - Publicação automática do pacote

### 3. Como Fazer um Release

#### Opção 1: Release Manual (Recomendado para releases importantes)

1. Crie um release no GitHub:
   - Vá para "Releases" no repositório
   - Clique em "Create a new release"
   - Digite a tag (ex: v1.0.0)
   - Adicione título e descrição
   - Clique em "Publish release"

2. O workflow será executado automaticamente

#### Opção 2: Release Automático via Semantic Release

1. Faça commits seguindo conventional commits
2. Push para branch main
3. O semantic-release analisará os commits e criará release automaticamente

#### Opção 3: Release via Workflow Dispatch

1. Vá para "Actions" > "Release Package"
2. Clique em "Run workflow"
3. Digite a versão desejada
4. Selecione o tipo de release
5. Clique em "Run workflow"

### 4. Scripts NPM Disponíveis

```bash
# Versionamento
npm run version:patch    # Incrementa versão patch (0.0.x)
npm run version:minor    # Incrementa versão minor (0.x.0)
npm run version:major    # Incrementa versão major (x.0.0)

# Changelog
npm run changelog        # Gera changelog
npm run changelog:first  # Gera changelog completo

# Release
npm run release:prepare  # Build e testes
npm run release:patch    # Release patch completo
npm run release:minor    # Release minor completo
npm run release:major    # Release major completo
```

### 5. Configurações

#### .releaserc.json
Configuração do semantic-release com:
- Preset Angular para conventional commits
- Plugins para changelog, npm, git e GitHub
- Regras de release baseadas no tipo de commit

#### .conventional-changelog.json
Configuração do conventional-changelog com:
- Preset Angular
- Formatação de URLs para GitHub
- Tipos de commit personalizados

### 6. Estrutura do Changelog

O CHANGELOG.md é gerado automaticamente com:

```markdown
# Changelog

## [1.0.0] - 2025-01-XX

### Features
- Nova funcionalidade A
- Nova funcionalidade B

### Bug Fixes
- Correção do bug X
- Correção do bug Y

### Documentation
- Atualização da documentação
```

### 7. Permissões Necessárias

O workflow requer as seguintes permissões:
- `contents: write` - Para criar tags e commits
- `packages: write` - Para publicar no GitHub Packages
- `issues: write` - Para comentar em issues
- `pull-requests: write` - Para comentar em PRs

### 8. Troubleshooting

#### Erro de Permissão
- Verifique se o GITHUB_TOKEN tem as permissões necessárias
- Confirme se o workflow está configurado corretamente

#### Changelog Não Atualizado
- Verifique se os commits seguem conventional commits
- Confirme se o arquivo .releaserc.json está configurado

#### Build Falha
- Execute `npm run build` localmente para identificar problemas
- Verifique se todas as dependências estão instaladas

### 9. Boas Práticas

1. **Sempre use conventional commits**
2. **Teste localmente antes do push**
3. **Revise o changelog gerado**
4. **Use releases manuais para versões importantes**
5. **Mantenha a branch main sempre estável**

### 10. Exemplo de Fluxo Completo

```bash
# 1. Desenvolver funcionalidade
git add .
git commit -m "feat: adiciona validação de CPF"
git push origin feature/validacao-cpf

# 2. Criar PR e fazer merge para main

# 3. O semantic-release detectará automaticamente e criará release

# 4. Ou criar release manual no GitHub
```

## Suporte

Para dúvidas sobre o sistema de releases, abra uma issue no repositório ou consulte a documentação do [semantic-release](https://semantic-release.gitbook.io/).
