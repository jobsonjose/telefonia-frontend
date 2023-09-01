import { Component, Input, OnInit } from "@angular/core";
import { Contato } from "src/core/entity/contato";
import {FormGroup , FormBuilder ,Validators} from "@angular/forms";
import { DadosContatoAtivo } from "src/core/service/dadosContatoAtivo.observable";
import { MessageService } from "primeng/api";
import { SalvarContatoService } from "src/core/service/salvar-contato.service";
import { Router } from "@angular/router";
import { DeletarContatoService } from "src/core/service/deletar-contato.service";
import { RecargaContato } from "src/core/service/recarga-contato.observable";
import { EditarContatoService } from "src/core/service/editar-contato.service";

export interface IAcoesContato {
    icon: string;
    command: Function;
}
@Component({
    selector: 'cp-dados-contato',
    templateUrl: 'dados-contato.component.html',
    styleUrls: ['dados-contato.component.css'],
})
export class DadosContatoComponent implements OnInit {
    
    contatoSelecionado: Contato = <Contato>{};
    formContato: FormGroup;
    listaAcoesContato: IAcoesContato[] = [];
    @Input() situacaoCadastro: boolean = true;

    constructor(
        public formBuild: FormBuilder, 
        public serviceDadosContatoAtivo: DadosContatoAtivo,
        public serviceSalvarContato: SalvarContatoService,
        public serviceDeletarContato: DeletarContatoService,
        public serviceEditarContato: EditarContatoService,
        public recargaContato: RecargaContato,
        public router: Router,
        private messageService: MessageService
    ){
        this.formContato = formBuild.group({
            nome: [null, Validators.required],
            email: null,
            telefone: null,
            celular: [null, Validators.required],
            favorito: 'N',
            ativo: 'S'
        })
    }

    ngOnInit(): void {
        if(this.situacaoCadastro) {
            this.dadosContatoPreSelecionados();
        }
        this.atribuirAcoesContato(); 
    }

    atribuirAcoesContato(): void {
        let situacaoFavorito = this.formContato.get('favorito')?.value;
        let situacaoAtivo = this.formContato.get('ativo')?.value;
        
        this.listaAcoesContato = [
            {
                icon: situacaoFavorito == 'S' ? 'pi pi-star' : 'pi pi-star-fill',
                command: () => {
                    this.preencherContatoFavorito();
                    this.editarContato(this.criarRequisicaoForm());
                }
            },
            {
                icon: situacaoAtivo == 'S' ? 'pi pi-user-minus' : 'pi pi-user',
                command: () => {
                    this.preencherContatoInativo();
                    this.editarContato(this.criarRequisicaoForm());
                }
            },
            {
                icon: 'pi pi-trash',
                command: () => {
                    this.deletarContato();
                }
            }
        ]
    }

    dadosContatoPreSelecionados(): void {
        this.serviceDadosContatoAtivo.dadosContato.subscribe((dados) => {
            this.contatoSelecionado = dados;
            if(this.contatoSelecionado) {
                this.formContato.get('nome')?.setValue(this.contatoSelecionado.nome);
                this.formContato.get('email')?.setValue(this.contatoSelecionado.email);
                this.formContato.get('telefone')?.setValue(this.contatoSelecionado.telefone);
                this.formContato.get('celular')?.setValue(this.contatoSelecionado.celular);
                this.formContato.get('favorito')?.setValue(this.contatoSelecionado.favorito);
                this.formContato.get('ativo')?.setValue(this.contatoSelecionado.ativo);
                this.atribuirAcoesContato();
            }
        })
    }

    preencherContatoFavorito(): void {
        let valorForm = this.formContato.get('favorito')?.value
        if(valorForm) {
            if(valorForm == 'S') {
                this.formContato.get('favorito')?.setValue('N');
                this.listaAcoesContato[0].icon = 'pi pi-star-fill'
            } else {
                this.formContato.get('favorito')?.setValue('S');
                this.listaAcoesContato[0].icon = 'pi pi-star'
            }
        }
    }

    preencherContatoInativo(): void {
        let valorForm = this.formContato.get('ativo')?.value
        if(valorForm) {
            if(valorForm == 'S') {
                this.formContato.get('ativo')?.setValue('N');
                this.listaAcoesContato[1].icon = 'pi pi-user'
            } else {
                this.formContato.get('ativo')?.setValue('S');
                this.listaAcoesContato[1].icon = 'pi pi-user-minus'
            }
        }
        
    }

    deletarContato(): void {
        this.serviceDeletarContato.deletarContato(this.contatoSelecionado.id).subscribe((resultado) => {
            this.gerarMensagem('success', 'Sucesso', 'Contato Excluido');
            this.recargaContato.recargaLista.next();
        });
    }

    submeter(): void {
        
        if(this.validarFormulario()) {
            this.processarArmazenamentoContato(this.criarRequisicaoForm());
        }
    }

    criarRequisicaoForm(): Contato {
        let contatoReq = this.contatoSelecionado;
        contatoReq.nome = this.formContato.get('nome')?.value;
        contatoReq.email = this.formContato.get('email')?.value ? this.formContato.get('email')?.value : "";
        contatoReq.telefone = this.formContato.get('telefone')?.value ? this.formContato.get('telefone')?.value : "";
        contatoReq.celular = this.formContato.get('celular')?.value;
        contatoReq.favorito = this.formContato.get('favorito')?.value;
        contatoReq.ativo = this.formContato.get('ativo')?.value;

        return contatoReq;
    }

    processarArmazenamentoContato(contatoReq: Contato): void {
        if(this.situacaoCadastro) {
            this.editarContato(contatoReq);
        } else {
            this.salvarContato(contatoReq);
        }
    }

    salvarContato(contatoReq: Contato): void {
        this.serviceSalvarContato.salvarContato(contatoReq).subscribe({
            next: (resultado) => {
            console.log(resultado);
            this.gerarMensagem('success', 'Salvo', 'Contato salvo com sucesso!');
            this.recargaContato.recargaLista.next();
            this.reiniciarDadosFormulario();
        }, error: (err) => {
            if(err.error.status == 500) {
                this.gerarMensagem('error', 'Problema', 'Celular já cadastrado');    
            }
        }});
    }

    editarContato(contatoReq: Contato): void {
        this.serviceEditarContato.editarContato(contatoReq.id, contatoReq).subscribe((resultado) => {
            if(resultado) {
                this.gerarMensagem('success', 'Editado', 'Contato editado com sucesso!');
                this.recargaContato.recargaLista.next();
            }
        })
    }

    reiniciarDadosFormulario(): void {
        this.formContato.get('nome')?.setValue(null);
        this.formContato.get('email')?.setValue(null);
        this.formContato.get('telefone')?.setValue(null);
        this.formContato.get('celular')?.setValue(null);
    }

    validarFormulario(): boolean {
        if(this.formContato.invalid) {
            return false;
        }

        return true;
    }

    gerarMensagem(tipoMensagem: string, titulo: string, mensagem: string): void {
        this.messageService.clear();
        this.messageService.add({
            severity:tipoMensagem, summary:titulo, detail: mensagem
        })
    }
}