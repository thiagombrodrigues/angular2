from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from almoxarifado import views

urlpatterns = [
    url(
        r'^solicitacao-almoxarifado/choices/$',
        views.SolicitacaoAlmoxarifadoChoicesREST.as_view(),
        name='choices-solicitacao-almoxarifado'
    ),
    url(
        r'^solicitacao-almoxarifado/$',
        views.SolicitacaoAlmoxarifadoListREST.as_view(),
        name='list-solicitacao-almoxarifado'
    ),
    url(
        r'^solicitacao-almoxarifado/(?P<pk>[0-9]+)/$',
        views.SolicitacaoAlmoxarifadoDetailREST.as_view(),
        name='detail-solicitacao-almoxarifado'
    ),
    url(
        r'^especie-almoxarifado/$',
        views.EspecieAlmoxarifadoListREST.as_view(),
        name='list-especie-almoxarifado'
    ),
]

urlpatterns = format_suffix_patterns(urlpatterns)
