export class ItemSolicitacaoAlmoxarifado
{
    public id: number;
    public especie: number;
    public quantidade: number;
    public atendido: number;
    public data_atendimento: Date;
    public solicitacao: number;
    public unidade_medida: number;
    public selecionado: boolean;

    constructor()
    {
        this.quantidade = 0;
        this.atendido = 0;
        this.unidade_medida = 1;
        this.selecionado = false;
    }
}
