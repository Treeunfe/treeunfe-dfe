#!/bin/bash

# Script para desenvolvimento com Docker
# Uso: ./scripts/dev.sh [comando]

set -e

COMPOSE_FILE="docker-compose.dev.yml"
SERVICE_NAME="dev"

# Função para mostrar ajuda
show_help() {
    echo "Uso: $0 [comando]"
    echo ""
    echo "Comandos disponíveis:"
    echo "  start     - Iniciar ambiente de desenvolvimento"
    echo "  stop      - Parar ambiente de desenvolvimento"
    echo "  restart   - Reiniciar ambiente de desenvolvimento"
    echo "  shell     - Abrir shell no container"
    echo "  build     - Executar build da lib"
    echo "  test      - Executar testes"
    echo "  install   - Instalar dependências"
    echo "  clean     - Limpar containers e imagens"
    echo "  logs      - Mostrar logs do container"
    echo ""
    echo "Exemplos:"
    echo "  $0 start"
    echo "  $0 shell"
    echo "  $0 build"
}

# Função para iniciar ambiente
start_dev() {
    echo "🚀 Iniciando ambiente de desenvolvimento..."
    docker-compose -f $COMPOSE_FILE up -d
    echo "✅ Ambiente iniciado! Use '$0 shell' para acessar o container"
}

# Função para parar ambiente
stop_dev() {
    echo "🛑 Parando ambiente de desenvolvimento..."
    docker-compose -f $COMPOSE_FILE down
    echo "✅ Ambiente parado!"
}

# Função para reiniciar ambiente
restart_dev() {
    echo "🔄 Reiniciando ambiente de desenvolvimento..."
    docker-compose -f $COMPOSE_FILE restart
    echo "✅ Ambiente reiniciado!"
}

# Função para abrir shell
open_shell() {
    echo "🐚 Abrindo shell no container..."
    docker-compose -f $COMPOSE_FILE exec $SERVICE_NAME bash
}

# Função para executar build
run_build() {
    echo "🔨 Executando build da lib..."
    docker-compose -f $COMPOSE_FILE exec $SERVICE_NAME npm run build
}

# Função para executar testes
run_tests() {
    echo "🧪 Executando testes..."
    docker-compose -f $COMPOSE_FILE exec $SERVICE_NAME npm test
}

# Função para instalar dependências
install_deps() {
    echo "📦 Instalando dependências..."
    docker-compose -f $COMPOSE_FILE exec $SERVICE_NAME npm install
}

# Função para limpar
clean_up() {
    echo "🧹 Limpando containers e imagens..."
    docker-compose -f $COMPOSE_FILE down --rmi all --volumes
    echo "✅ Limpeza concluída!"
}

# Função para mostrar logs
show_logs() {
    echo "📋 Mostrando logs do container..."
    docker-compose -f $COMPOSE_FILE logs -f $SERVICE_NAME
}

# Verificar se Docker está rodando
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Docker não está rodando. Inicie o Docker primeiro."
        exit 1
    fi
}

# Verificar se docker-compose está disponível
check_compose() {
    if ! command -v docker-compose > /dev/null 2>&1; then
        echo "❌ docker-compose não está disponível. Instale o Docker Compose primeiro."
        exit 1
    fi
}

# Main
main() {
    check_docker
    check_compose
    
    case "${1:-help}" in
        start)
            start_dev
            ;;
        stop)
            stop_dev
            ;;
        restart)
            restart_dev
            ;;
        shell)
            open_shell
            ;;
        build)
            run_build
            ;;
        test)
            run_tests
            ;;
        install)
            install_deps
            ;;
        clean)
            clean_up
            ;;
        logs)
            show_logs
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            echo "❌ Comando desconhecido: $1"
            show_help
            exit 1
            ;;
    esac
}

main "$@"

