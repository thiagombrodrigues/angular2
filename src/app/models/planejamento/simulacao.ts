export class Simulacao
{
    public id: number;
    public cenario: number;
    public mes_data_limite: number;
    public ano_data_limite: number;
    public percentual_reajuste: number;
    public cenarios: Array<number>;
    public servidores_impactados: Array<number>;

    constructor()
    {
        this.mes_data_limite = 1;
    }
}
