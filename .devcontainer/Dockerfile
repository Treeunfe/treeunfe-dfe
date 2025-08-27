FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bullseye

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
  openjdk-17-jdk \
  openjdk-17-jre \
  git \
  curl \
  wget \
  unzip \
  && rm -rf /var/lib/apt/lists/*

# Configurar Java
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH

# Verificar instalações
RUN java -version && \
  javac -version && \
  node --version && \
  npm --version && \
  echo "JAVA_HOME: $JAVA_HOME"

# Configurar usuário node
USER node

# Criar diretório de trabalho
WORKDIR /workspaces/treeunfe-dfe

# Expor porta para desenvolvimento
EXPOSE 3000

# Comando padrão
CMD ["sleep", "infinity"]
