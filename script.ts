class ItemMenu {
    opcao: string;
    textoDaOpcao: string;

    constructor(opcao: string, textoDaOpcao: string) {
        this.opcao = opcao;
        this.textoDaOpcao = textoDaOpcao;
    }
}

class Menu {
    itens: ItemMenu[];
    constructor() {
        this.itens = [];
    }

    addItem(opcao: string, textoDaOpcao: string): void { 
        const item = new ItemMenu(opcao, textoDaOpcao);
        this.itens.push(item);
    }

    imprimirMenu(){
        console.log("Opções do menu:");
        for (const item of this.itens) {
            console.log(`${item.opcao} - ${item.textoDaOpcao}`);
        }

        const opcaoSelecionada = prompt("Insira seu valor desejado");
        return opcaoSelecionada;
    }
}

const menu = new Menu(); 
menu.addItem("1", "Atacar");
menu.addItem("2", "Ataque especial");
menu.addItem("3", "Tomar poção de Cura de HP");
menu.addItem("4", "Tomar poção que restaura MP");
menu.addItem("5", "Defender");

const opcaoEntrada = menu.imprimirMenu();
console.log("Opção selecionada:", opcaoEntrada);

class Monstro{
    hp: number;
    maxhp: number; // apenas para armazenar o HP inicial do monstro.
    forcaA: number;
    forcaD: number;

    constructor(vida: number, forcaAta: number, forcaDef: number){
        this.hp = vida;
        this.maxhp = vida;
        this.forcaA = forcaAta;
        this.forcaD = forcaDef;
    }

    receberDano(danoSofrido: number): number {
        const danoReduzido = danoSofrido - this.forcaD;
        if (danoReduzido > 0) {
            this.hp -= danoReduzido;
            if (this.hp <= 0) {
                console.log("Monstro derrotado");
            }
        }
        return this.hp;
    }

    ataqueMostro(){
        return this.forcaA;
    }
}

class Coliseu{
    monstroBoss: Monstro;

    constructor(boos: Monstro){
        this.monstroBoss = boos;
    }
}

const oBoss = new Monstro (2500, 100, 50);
const coliseu = new Coliseu(oBoss);

console.log("O ataque do mostro é:", oBoss.ataqueMostro())

class Equipamento{
    nome: string;
    aumentoAtaque: number;
    aumentoDefesa: number;

    constructor(n: string, ataque: number, defesa: number){
        this.nome = n;
        this.aumentoAtaque = ataque;
        this.aumentoDefesa = defesa;
    }
}

class Mago{
    hp: number;
    mp: number;
    ataqueM: number;
    defesaM: number;
    equipamentos: Equipamento[] = [];
    maxhp: number; // apenas para armazenar o HP inicial do mago.
    maxmp: number; // apenas para armazenar o MP inicial do mago.

    constructor(vida: number, mana: number, ataque: number, defesa: number, equipando: Equipamento[]){
        this.hp = vida;
        this.maxhp = vida;
        this.mp = mana;
        this.maxmp = mana;
        this.ataqueM = ataque;
        this.defesaM = defesa;
        this.equipamentos = equipando;
    }

    equiparEquipamento(equripador: Equipamento){
        if (this.equipamentos.length < 3) { 
            this.equipamentos.push(equripador);
        } else if (this.equipamentos.length < 3) {
            this.equipamentos.push(equripador);
        } else if (this.equipamentos.length < 3) {
            this.equipamentos.push(equripador);
        } else {
            console.log("Não é possível equipar mais equipamentos.");
        }

    }

    exibirMago(){
        console.log(`Informacões do Mago:\n
        HP: ${this.hp}\n
        MP: ${this.mp}\n
        Ataque: ${this.ataqueM}\n
        Defesa: ${this.defesaM}\n
        Equipamentos:`)
        this.equipamentos.forEach((equipamento, index) => {
            console.log(`- Slot ${index + 1}: ${equipamento.nome}`);
        });
    }
    ataque(){
        let ataqueTotal = this.ataqueM;
        this.equipamentos.forEach(equipamento =>{
            ataqueTotal += equipamento.aumentoAtaque;
        });
        console.log("Ataque do Mago:", ataqueTotal);
        return ataqueTotal;
    }
    defesa(){
        let defesaTotal = this.ataqueM;
        this.equipamentos.forEach(equipamento =>{
            defesaTotal += equipamento.aumentoDefesa;
        });
        console.log("Ataque do Mago:", defesaTotal);
        return defesaTotal;
    }

    ataqueEspecial(){
        if (this.mp >= (this.maxmp*0.2)) {
            console.log("Ataque Especial do Lutador:", this.ataqueM * 1.5);
            this.mp -= (this.mp*0.2);
            return this.ataqueM * 1.5;
        } else {
            console.log('O MP é Insuficiente para utilizar "Ataque Especial".');
            return 0;
        }
    }

    receberDano(danoSofrido: number){
        let defesaTotal = this.defesaM;
        this.equipamentos.forEach(equipamento =>{
            defesaTotal += equipamento.aumentoDefesa;
        });
        const reduzurDano = danoSofrido - defesaTotal;
        if(reduzurDano > 0){
            this.hp -= reduzurDano;
        }
        return this.hp;
    }

    tomarPocaoHP(){
        const aumentoHP = this.maxhp * 0.25;
        this.hp += aumentoHP;
        console.log("HP foi recuperado em mais:", aumentoHP);
    }

    tomarPocaoMP(){
        const aumentoMP = this.maxmp * 0.25;
        this.mp += aumentoMP;
        console.log("MP foi recuperado em mais:", aumentoMP);
    }
}

class jogo{
    menu: Menu;
    mago: Mago;
    coliseu: Coliseu;

    jogar(){
        while(true){
            const opcaoEntrada = menu.imprimirMenu();

            if (opcaoEntrada === "1") {
                const dano = this.mago.ataque();
                this.coliseu.monstroBoss.receberDano(dano);
                if (this.coliseu.monstroBoss.hp <= 0) {
                    console.log("Parabéns! Você venceu a luta do Coliseu.");
                    break;
                }
                const danoMonstro = this.coliseu.monstroBoss.ataqueMostro();
                this.mago.receberDano(danoMonstro);
                if (this.mago.hp <= 0) {
                    console.log("Você foi destroçado pelo monstro.");
                    break;
                }
            } else if (opcaoEntrada === "2") {
                const danoEspecial = this.mago.ataqueEspecial();
                if (danoEspecial !== 0) {
                    this.coliseu.monstroBoss.receberDano(danoEspecial); 
                    if (this.coliseu.monstroBoss.hp <= 0) {
                        console.log("Parabéns! Você venceu a luta do Coliseu."); 
                        break;
                    }
                    const danoMonstro = this.coliseu.monstroBoss.ataqueMostro();
                    this.mago.receberDano(danoMonstro);
                    if (this.mago.hp <= 0) {
                        console.log("Você foi destroçado pelo monstro.");
                        break;
                    }
                    else{
                        console.log("Você levou dano do monstro")
                    }
                }
            } else {
                console.log("Opção inválida. Por favor, selecione novamente.");
            }
    
            console.log("Informações do Monstro:");
            console.log("HP:", this.coliseu.monstroBoss.hp);
            console.log("Ataque:", this.coliseu.monstroBoss.ataqueMostro());
    
            console.log("Informações do Lutador:");
            this.mago.exibirMago();
    
            if (this.coliseu.monstroBoss.hp <= 0 || this.mago.hp <= 0) {
                break;
            }

        }
    }
}

let cabeça = new Equipamento("Elmo Negro", 50, 70)
let corpo = new Equipamento("Armadura Lunar", 50, 100)
let mao = new Equipamento("Grimorio Arcano", 100, 30)

let mago = new Mago(400, 900, 500, 200, [cabeça, corpo, mao])