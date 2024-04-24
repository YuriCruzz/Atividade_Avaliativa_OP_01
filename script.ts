class Menu{
    private itemMenu: ItemMenu[] = [];

    imprimirMenu(resposta: string){
        resposta = prompt(`Digite um dos números a baixo para executar a ação:\n
        1 - Atacar;\n
        2 - Ataque especial;\n
        3 - Tomar poção de Cura de HP;\n
        4 - tomar poção que restaura MP;\n
        5 - Defender;`);
    }
}

class ItemMenu{
    private opcao: string;
    private textoDaOpcao: string;

}

class Coliseu{
    monstroBoss: Monstro;
}

class Monstro{
    private hp: number;
    private maxhp: number;
    private forcaA: number;
    private forcaD: number;

    sofrerDano(ds: number){
        if (this.hp <= this.maxhp/4 && this.hp > 0){
            ds /= 2;
            this.forcaA *= 1.1;
            this.forcaD *= 1.3;
            this.hp -= (ds - this.forcaD);
        } else if (this.hp <= 0) {
            console.log(`O monstro $ foi derrotado!`)
        } else if(this.forcaD >= ds){
            this.hp = this.hp
        } else{
            this.hp -= (ds - this.forcaD);
        }
    }
}