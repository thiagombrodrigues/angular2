# -*- coding: utf-8 -*-
from rest_framework import serializers
from almoxarifado.models import SolicitacaoAlmoxarifado, ItemSolicitacaoAlmoxarifado, EspecieAlmoxarifado


class SerializadorEspecieAlmoxarifado(serializers.ModelSerializer):
    """
    Serializador para o model ItemSolicitacaoAlmoxarifado
    """
    class Meta:
        model = EspecieAlmoxarifado
        exclude = []


class SerializadorItemSolicitacaoAlmoxarifado(serializers.ModelSerializer):
    """
    Serializador para o model ItemSolicitacaoAlmoxarifado
    """
    class Meta:
        model = ItemSolicitacaoAlmoxarifado
        exclude = ['solicitacao']


class SerializadorSolicitacaoAlmoxarifado(serializers.ModelSerializer):
    """
    Serializador para o model SolicitacaoAlmoxarifado
    """
    itens_solicitacoes = SerializadorItemSolicitacaoAlmoxarifado(many=True, required=False)
    finalizado = serializers.ReadOnlyField()
    servidor = serializers.ReadOnlyField()
    status_display = serializers.SerializerMethodField()

    class Meta:
        model = SolicitacaoAlmoxarifado
        exclude = []

    def create(self, validated_data):
        itens_solicitacoes = validated_data.pop('itens_solicitacoes')
        solicitacao = SolicitacaoAlmoxarifado.objects.create(**validated_data)
        for item in itens_solicitacoes:
            ItemSolicitacaoAlmoxarifado.objects.create(solicitacao=solicitacao, **item)
        return solicitacao

    def update(self, instance, validated_data):
        instance.justificativa = validated_data.get('justificativa', instance.justificativa)
        itens_solicitacoes = validated_data.pop('itens_solicitacoes')
        instance.itens_solicitacoes.all().delete()
        for item in itens_solicitacoes:
            ItemSolicitacaoAlmoxarifado.objects.create(solicitacao=instance, **item)

        instance.save()
        return instance

    def get_status_display(self, instance):
        return instance.get_status_display()
