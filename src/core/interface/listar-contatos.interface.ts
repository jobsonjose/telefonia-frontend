import { Contato } from "../entity/contato"

export interface IListarContatos {
    dadosRp: {
        dadosContato: Contato[];
        dadosMensagem: string;
    }
}