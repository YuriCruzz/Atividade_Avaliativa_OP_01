var ItemMenu = /** @class */ (function () {
    function ItemMenu(opcao, textoDaOpcao) {
        this.opcao = opcao;
        this.textoDaOpcao = textoDaOpcao;
    }
    return ItemMenu;
}());
var Menu = /** @class */ (function () {
    function Menu() {
        this.itens = [];
    }
    Menu.prototype.addItem = function (opcao, textoDaOpcao) {
        var item = new ItemMenu(opcao, textoDaOpcao);
        this.itens.push(item);
    };
    Menu.prototype.imprimirMenu = function () {
        console.log("Opções do menu:");
        for (var _i = 0, _a = this.itens; _i < _a.length; _i++) {
            var item = _a[_i];
            console.log("".concat(item.opcao, " - ").concat(item.textoDaOpcao));
        }
        var opcaoSelecionada = prompt("Insira seu valor desejado");
        return opcaoSelecionada;
    };
    return Menu;
}());
var menu = new Menu();
menu.addItem("1", "Atacar");
menu.addItem("2", "Ataque especial");
menu.addItem("3", "Tomar poção de Cura de HP");
menu.addItem("4", "Tomar poção que restaura MP");
menu.addItem("5", "Defender");
var opcaoEntrada = menu.imprimirMenu();
console.log("Opção selecionada:", opcaoEntrada);
var Monstro = /** @class */ (function () {
    function Monstro(vida, forcaAta, forcaDef) {
        this.hp = vida;
        this.maxhp = vida;
        this.forcaA = forcaAta;
        this.forcaD = forcaDef;
    }
    Monstro.prototype.receberDano = function (danoSofrido) {
        var danoReduzido = danoSofrido - this.forcaD;
        if (danoReduzido > 0) {
            this.hp -= danoReduzido;
            if (this.hp <= 0) {
                console.log("Monstro derrotado");
            }
        }
        return this.hp;
    };
    Monstro.prototype.ataqueMostro = function () {
        return this.forcaA;
    };
    return Monstro;
}());
var Coliseu = /** @class */ (function () {
    function Coliseu(boos) {
        this.monstroBoss = boos;
    }
    return Coliseu;
}());
var oBoss = new Monstro(2500, 100, 50);
var coliseu = new Coliseu(oBoss);
console.log("O ataque do mostro é:", oBoss.ataqueMostro());
var Equipamento = /** @class */ (function () {
    function Equipamento(n, ataque, defesa) {
        this.nome = n;
        this.aumentoAtaque = ataque;
        this.aumentoDefesa = defesa;
    }
    return Equipamento;
}());
var Mago = /** @class */ (function () {
    function Mago(vida, mana, ataque, defesa, equipando) {
        this.equipamentos = [];
        this.hp = vida;
        this.maxhp = vida;
        this.mp = mana;
        this.maxmp = mana;
        this.ataqueM = ataque;
        this.defesaM = defesa;
        this.equipamentos = equipando;
    }
    Mago.prototype.equiparEquipamento = function (equripador) {
        if (this.equipamentos.length < 3) {
            this.equipamentos.push(equripador);
        }
        else if (this.equipamentos.length < 3) {
            this.equipamentos.push(equripador);
        }
        else if (this.equipamentos.length < 3) {
            this.equipamentos.push(equripador);
        }
        else {
            console.log("Não é possível equipar mais equipamentos.");
        }
    };
    Mago.prototype.exibirMago = function () {
        console.log("Informac\u00F5es do Mago:\n\n        HP: ".concat(this.hp, "\n\n        MP: ").concat(this.mp, "\n\n        Ataque: ").concat(this.ataqueM, "\n\n        Defesa: ").concat(this.defesaM, "\n\n        Equipamentos:"));
        this.equipamentos.forEach(function (equipamento, index) {
            console.log("- Slot ".concat(index + 1, ": ").concat(equipamento.nome));
        });
    };
    Mago.prototype.ataque = function () {
        var ataqueTotal = this.ataqueM;
        this.equipamentos.forEach(function (equipamento) {
            ataqueTotal += equipamento.aumentoAtaque;
        });
        console.log("Ataque do Mago:", ataqueTotal);
        return ataqueTotal;
    };
    Mago.prototype.defesa = function () {
        var defesaTotal = this.ataqueM;
        this.equipamentos.forEach(function (equipamento) {
            defesaTotal += equipamento.aumentoDefesa;
        });
        console.log("Ataque do Mago:", defesaTotal);
        return defesaTotal;
    };
    Mago.prototype.ataqueEspecial = function () {
        if (this.mp >= (this.maxmp * 0.2)) {
            console.log("Ataque Especial do Lutador:", this.ataqueM * 1.5);
            this.mp -= (this.mp * 0.2);
            return this.ataqueM * 1.5;
        }
        else {
            console.log('O MP é Insuficiente para utilizar "Ataque Especial".');
            return 0;
        }
    };
    Mago.prototype.receberDano = function (danoSofrido) {
        var defesaTotal = this.defesaM;
        this.equipamentos.forEach(function (equipamento) {
            defesaTotal += equipamento.aumentoDefesa;
        });
        var reduzurDano = danoSofrido - defesaTotal;
        if (reduzurDano > 0) {
            this.hp -= reduzurDano;
        }
        return this.hp;
    };
    Mago.prototype.tomarPocaoHP = function () {
        var aumentoHP = this.maxhp * 0.25;
        this.hp += aumentoHP;
        console.log("HP foi recuperado em mais:", aumentoHP);
    };
    Mago.prototype.tomarPocaoMP = function () {
        var aumentoMP = this.maxmp * 0.25;
        this.mp += aumentoMP;
        console.log("MP foi recuperado em mais:", aumentoMP);
    };
    return Mago;
}());
var jogo = /** @class */ (function () {
    function jogo() {
    }
    jogo.prototype.jogar = function () {
        while (true) {
            var opcaoEntrada_1 = menu.imprimirMenu();
            if (opcaoEntrada_1 === "1") {
                var dano = this.mago.ataque();
                this.coliseu.monstroBoss.receberDano(dano);
                if (this.coliseu.monstroBoss.hp <= 0) {
                    console.log("Parabéns! Você venceu a luta do Coliseu.");
                    break;
                }
                var danoMonstro = this.coliseu.monstroBoss.ataqueMostro();
                this.mago.receberDano(danoMonstro);
                if (this.mago.hp <= 0) {
                    console.log("Você foi destroçado pelo monstro.");
                    break;
                }
            }
            else if (opcaoEntrada_1 === "2") {
                var danoEspecial = this.mago.ataqueEspecial();
                if (danoEspecial !== 0) {
                    this.coliseu.monstroBoss.receberDano(danoEspecial);
                    if (this.coliseu.monstroBoss.hp <= 0) {
                        console.log("Parabéns! Você venceu a luta do Coliseu.");
                        break;
                    }
                    var danoMonstro = this.coliseu.monstroBoss.ataqueMostro();
                    this.mago.receberDano(danoMonstro);
                    if (this.mago.hp <= 0) {
                        console.log("Você foi destroçado pelo monstro.");
                        break;
                    }
                    else {
                        console.log("Você levou dano do monstro");
                    }
                }
            }
            else {
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
    };
    return jogo;
}());
var cabeça = new Equipamento("Elmo Negro", 50, 70);
var corpo = new Equipamento("Armadura Lunar", 50, 100);
var mao = new Equipamento("Grimorio Arcano", 100, 30);
var mago = new Mago(400, 900, 500, 200, [cabeça, corpo, mao]);
