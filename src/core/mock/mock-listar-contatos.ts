import { Contato } from "../entity/contato";

export class MockListarContatos {
    static contatos: Contato[] = [
        {
            id: 1,
            nome: 'Kaio Silva',
            email: '',
            telefone: '',
            celular: '8398326186',
            favorito: 'N',
            ativo: 'S',
            data_criacao: '03-01-2023',
        },
        {
            id: 2,
            nome: 'Lynd Kaiane',
            email: '',
            telefone: '',
            celular: '8198435231',
            favorito: 'S',
            ativo: 'S',
            data_criacao: '03-01-2023',
        },
        {
            id: 3,
            nome: 'Luan Oliveira',
            email: '',
            telefone: '',
            celular: '81923729401',
            favorito: 'N',
            ativo: 'N',
            data_criacao: '03-01-2023',
        }
    ]
}