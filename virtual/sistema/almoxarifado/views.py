# from django.shortcuts import render
from rest_framework import generics
from almoxarifado.models import SolicitacaoAlmoxarifado
from django.http import JsonResponse
from almoxarifado.serializers import *
from almoxarifado.const import *


class SolicitacaoAlmoxarifadoListREST(generics.ListCreateAPIView):
    """
    Lista todas as instancias de SolicitacaoAlmoxarifado cadastradas ou cria uma nova.
    """
    serializer_class = SerializadorSolicitacaoAlmoxarifado

    def get_queryset(self):
        return SolicitacaoAlmoxarifado.objects.filter().order_by('-id')

    def perform_create(self, serializer):
        serializer.save(servidor='USUÁRIO TESTE')


class SolicitacaoAlmoxarifadoDetailREST(generics.RetrieveUpdateDestroyAPIView):
    """
    View para Recuperar, Atualizar ou Deletar uma instancia de SolicitacaoAlmoxarifado (por meio da API REST).
    """
    serializer_class = SerializadorSolicitacaoAlmoxarifado

    def get_queryset(self):
        return SolicitacaoAlmoxarifado.objects.filter().order_by('-id')


class EspecieAlmoxarifadoListREST(generics.ListCreateAPIView):
    """
    Lista todas as instancias de EspecieAlmoxarifado cadastradas ou cria uma nova.
    """
    serializer_class = SerializadorEspecieAlmoxarifado

    def get_queryset(self):
        return EspecieAlmoxarifado.objects.filter().order_by('titulo')


class SolicitacaoAlmoxarifadoChoicesREST(generics.views.APIView):

    def get(self, request):
        return JsonResponse(
            {
                'STATUS_SOLICITACAO_ALMOXARIFADO': STATUS_SOLICITACAO_ALMOXARIFADO,
                'UNIDADE_MEDIDA_CHOICES': UNIDADE_MEDIDA_CHOICES
            }
        )
