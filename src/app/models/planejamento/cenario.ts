export class Cenario
{
    public id: number;
    public descricao: string;
    public cenario_inicial: number;
    public mes_limite: number;
    public ano_limite: number;
    public inclui_progressao: boolean;
    public inclui_adicional: boolean;
    public percentual_reajuste: number;
    public data: Date;

    constructor() { }
}
