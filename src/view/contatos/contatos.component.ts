import { Component, OnInit } from "@angular/core";
import { Contato } from "src/core/entity/contato";
import { MockListarContatos } from "src/core/mock/mock-listar-contatos";
import { DadosContatoAtivo } from "src/core/service/dadosContatoAtivo.observable";
import { FiltroContatosMenu } from "src/core/service/filtro-contatos-menu.observable";
import { ListarContatoService } from "src/core/service/listar-contato.service";
import { RecargaContato } from "src/core/service/recarga-contato.observable";
import { MessageService } from "primeng/api";

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'contatos',
    templateUrl: 'contatos.component.html',
    styleUrls: ['contatos.component.css'],
})
export class ContatosComponent implements OnInit {
    buscarContato: any = '';
    listaContatosTabela: Contato[] = [<Contato>{}];
    listaContatosTodos: Contato[] = [<Contato>{}];
    filtroAtual: string = 'Contatos';
    contatoSelecionado: Contato = <Contato>{};

    constructor(
        public serviceFiltroContatosMenu: FiltroContatosMenu,
        public serviceDadosContatoAtivo: DadosContatoAtivo,
        public serviceListarContato: ListarContatoService,
        public recargaContato: RecargaContato,
        private messageService: MessageService,
    ){}

    ngOnInit(): void {
        this.obterContatos();
        this.atualizarListaContato();
    }

    atualizarListaContato(): void {
        this.recargaContato.recargaLista$.subscribe(()=>{
            this.obterContatos();
            this.contatoSelecionado = <Contato>{};
        })
    }

    obterContatos():void {
        this.serviceListarContato.listarContato().subscribe((resultado) => {
            if(resultado.length) {
                this.listaContatosTodos = resultado;
                this.filtrarContatosAtivos();
                this.filtrarContatosMenu();
            }
        })
    }

    filtrarContatosMenu(): void {
        this.serviceFiltroContatosMenu.filtroContatos$.subscribe((filtro) => {
            this.filtroAtual = filtro
            this.modificacaoListaPorFiltro(filtro);
            this.reiniciarContatoSelecionado();
        })
    }

    modificacaoListaPorFiltro(filtro: string): void {
        if (filtro == 'Favoritos') {
            this.filtrarContatosFavoritos();
        } else if (filtro == 'Inativos') {
            this.filtrarContatosInativos();
        } else {
            this.filtrarContatosAtivos();
        }
    }

    reiniciarContatoSelecionado(): void {
        let contato = this.listaContatosTabela.filter((contato) => contato.nome == this.contatoSelecionado.nome);
        if(!contato.length) {
            this.contatoSelecionado = <Contato>{};
        }
    }

    filtrarContatosInativos(): void {
        this.listaContatosTabela = this.listaContatosTodos.filter((contato) => contato.ativo == 'N');
    }

    filtrarContatosFavoritos(): void {
        this.listaContatosTabela = this.listaContatosTodos.filter((contato) => contato.favorito == 'S');
    }

    filtrarContatosAtivos(): void {
        this.listaContatosTabela = this.listaContatosTodos.filter((contato) => contato.ativo == 'S');
    }

    obterContatoSelecionado(contato: Contato): void {
        this.contatoSelecionado = contato;
        this.serviceDadosContatoAtivo.dadosContato.next(contato);
    }

    gerarMensagem(tipoMensagem: string, titulo: string, mensagem: string): void {
        this.messageService.clear();
        this.messageService.add({
            severity:tipoMensagem, summary:titulo, detail: mensagem
        })
    }

    filtrarContatos(event: AutoCompleteCompleteEvent) {
        let contatos: Contato[] = [];
        let query = event.query;

        for (let i = 0; i < (this.listaContatosTabela as Contato[]).length; i++) {
            let contato = (this.listaContatosTabela as Contato[])[i];
            if (contato.nome.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                contatos.push(contato);
            }
        }
        if(contatos.length) {
            this.listaContatosTabela = contatos;
            return;
        }

        this.modificacaoListaPorFiltro(this.filtroAtual);
    }
}