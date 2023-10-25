"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        switch (exception.code) {
            case 'P2000':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `O valor fornecido para a coluna é muito longo para o tipo da coluna`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2001':
                response.status(common_1.HttpStatus.NOT_FOUND).json({
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: `O registro procurado na condição where não existe: ${exception.meta.model}.${exception.meta.field} = ${exception.meta.value}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.NOT_FOUND);
            case 'P2002':
                response.status(common_1.HttpStatus.CONFLICT).json({
                    statusCode: common_1.HttpStatus.CONFLICT,
                    message: `Falha na restrição de unicidade no ${exception.meta.target}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.CONFLICT);
            case 'P2003':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `Falha na restrição de chave estrangeira na coluna: ${exception.meta.target}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2004':
                response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Uma restrição falhou no banco de dados: ${exception.message}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            case 'P2005':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `O valor ${exception.meta.value} armazenado no banco de dados para o campo ${exception.meta.field} é inválido para o tipo do campo`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2006':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `O valor fornecido ${exception.meta.value} para o campo ${exception.meta.model}.${exception.meta.field} não é válido`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2007':
                response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Erro de validação de dados ${exception.message}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            case 'P2008':
                response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Falha ao analisar a consulta ${exception.meta.query_parsing_error} em ${exception.meta.query_position}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            case 'P2009':
                response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Falha ao validar a consulta: ${exception.meta.query_validation_error} em ${exception.meta.query_position}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            case 'P2010':
                response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Falha na consulta bruta. Código: ${exception.meta.code}. Mensagem: ${exception.meta.message}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            case 'P2011':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `Violação de restrição de nulidade no ${exception.meta.target}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2012':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `Falta um valor obrigatório em ${exception.meta.path}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2013':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `Falta o argumento obrigatório ${exception.meta.argument_name} para o campo ${exception.meta.field_name} em ${exception.meta.object_name}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2014':
                response.status(common_1.HttpStatus.CONFLICT).json({
                    statusCode: common_1.HttpStatus.CONFLICT,
                    message: `A alteração que você está tentando fazer violaria a relação necessária '${exception.meta.relation_name}' entre os modelos ${exception.meta.model_a_name} e ${exception.meta.model_b_name}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.CONFLICT);
            case 'P2015':
                response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Não foi possível encontrar um registro relacionado. ${exception.meta.details}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            case 'P2016':
                response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Erro de interpretação da consulta. ${exception.meta.details}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            case 'P2017':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `Os registros da relação ${exception.meta.relation_name} entre os modelos ${exception.meta.parent_name} e ${exception.meta.child_name} não estão conectados`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2018':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `Os registros conectados necessários não foram encontrados. ${exception.meta.details}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2019':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `Erro de entrada. ${exception.meta.details}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2020':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `Valor fora do alcance para o tipo. ${exception.meta.details}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2021':
                response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `A tabela ${exception.meta.table} não existe no banco de dados atual`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            case 'P2022':
                response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `A coluna ${exception.meta.column} não existe no banco de dados atual`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            case 'P2023':
                response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Dados de coluna inconsistentes: ${exception.message}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            case 'P2024':
                response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Tempo esgotado ao buscar uma nova conexão no pool de conexões. (Mais informações: http://pris.ly/d/connection-pool (Tempo limite atual do pool de conexões: ${exception.meta.timeout}, limite de conexão: ${exception.meta.connection_limit})`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            case 'P2025':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `Uma operação falhou porque depende de um ou mais registros que eram necessários, mas não foram encontrados. ${exception.meta.cause}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2026':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `O provedor de banco de dados atual não suporta um recurso usado na consulta: ${exception.meta.feature}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2027':
                response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Múltiplos erros ocorreram no banco de dados durante a execução da consulta: ${exception.meta.errors}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            case 'P2028':
                response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: `Erro na API de transação: ${exception.meta.error}`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            case 'P2030':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `Não foi possível encontrar um índice de texto completo para usar na pesquisa, tente adicionar um @@fulltext([Campos...]) em seu esquema`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2031':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `O Prisma precisa realizar transações, o que requer que seu servidor MongoDB seja executado como um conjunto de réplicas. Consulte os detalhes: http://pris.ly/d/mongodb-replica-set`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2033':
                response.status(common_1.HttpStatus.BAD_REQUEST).json({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: `Um número usado na consulta não cabe em um inteiro assinado de 64 bits. Considere usar BigInt como tipo de campo se estiver tentando armazenar números inteiros grandes`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.BAD_REQUEST);
            case 'P2034':
                response.status(common_1.HttpStatus.CONFLICT).json({
                    statusCode: common_1.HttpStatus.CONFLICT,
                    message: `A transação falhou devido a um conflito de gravação ou um impasse. Tente novamente a sua transação`,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.CONFLICT);
            default:
                response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Erro interno do servidor',
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data: exception,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(library_1.PrismaClientKnownRequestError)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=index.js.map