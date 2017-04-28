from django.db import models
from almoxarifado.const import *


class EspecieAlmoxarifado(models.Model):
    codigo = models.SmallIntegerField()
    titulo = models.CharField(max_length=200)
    estoque_minimo = models.IntegerField(default=0)
    estoque_total_cache = models.SmallIntegerField(default=0)

    class Meta:
        ordering = ('codigo', 'titulo')

    def __str__(self):
        return '{}: {}'.format(self.codigo, self.titulo)


class SolicitacaoAlmoxarifado(models.Model):

    servidor = models.CharField(max_length=100)
    atendente = models.CharField(max_length=100, blank=True, null=True)
    data_solicitacao = models.DateTimeField(auto_now_add=True)
    data_resposta = models.DateTimeField(blank=True, null=True)
    justificativa = models.TextField()
    resposta = models.TextField(blank=True)
    status = models.SmallIntegerField(choices=STATUS_SOLICITACAO_ALMOXARIFADO, default=1)
    data_finalizado = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return '{}: {} - {} {}'.format(
            self.pk,
            self.servidor,
            self.atendente,
            self.get_status_display()
        )

    @property
    def finalizado(self):
        return True if self.data_finalizado is not None else False


class ItemSolicitacaoAlmoxarifado(models.Model):
    solicitacao = models.ForeignKey(SolicitacaoAlmoxarifado, related_name='itens_solicitacoes')
    especie = models.ForeignKey(EspecieAlmoxarifado, related_name='itens_solicitacoes_almoxarifado')
    quantidade = models.DecimalField(max_digits=8, decimal_places=2)
    atendido = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    data_atendimento = models.DateTimeField(blank=True, null=True)
    unidade_medida = models.IntegerField(choices=UNIDADE_MEDIDA_CHOICES, default=1)

    def __str__(self):
        return '{}: {} - {} ({})'.format(
            self.especie,
            self.quantidade,
            self.solicitacao.servidor,
            self.solicitacao.pk
        )
