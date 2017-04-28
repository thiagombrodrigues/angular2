from django.contrib import admin
from almoxarifado.models import SolicitacaoAlmoxarifado, ItemSolicitacaoAlmoxarifado, EspecieAlmoxarifado

admin.site.register(SolicitacaoAlmoxarifado)
admin.site.register(ItemSolicitacaoAlmoxarifado)
admin.site.register(EspecieAlmoxarifado)
