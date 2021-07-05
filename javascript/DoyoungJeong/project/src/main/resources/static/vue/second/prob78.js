var prob77 = new Vue ({

    el: '#prob77',

    data: {
        userExp: 0,
        userMoney: 0,
        levUp: 100,
        ranNum: Math.floor(Math.random() * 10) + 1,
        showShopList: false,
        attNum: 0,
        userStat: {
             lev: 1, str: 10, vit: 50, dex: 30, mana: 40
        },
        summonedCreatures: [

        ],
        creatures: [
            { id: 1, name: 'crow', hp: 50, ex: 5, mon: 15},
            { id: 2, name: 'skeleton', hp: 70, ex: 7, mon: 15},
            { id: 3, name: 'zombie', hp: 80, ex: 10, mon: 15},
            { id: 4, name: 'balog', hp: 180, ex: 30, mon: 70},
            { id: 5, name: 'demon', hp: 160, ex: 30, mon: 55},
            { id: 6, name: 'imp', hp: 250, ex: 50, mon: 60},
            { id: 7, name: 'chimera', hp: 400, ex: 100, mon: 150},
            { id: 8, name: 'mephisto', hp: 1800, ex: 500, mon: 300},
            { id: 9, name: 'diablo', hp: 3000, ex: 700, mon: 400},
            { id: 10, name: 'baal', hp: 2600, ex: 800, mon: 500}
        ],
        attachedItems: [

        ],
        inventory: [

        ],
        shopListValue: [

        ],
        shopList: [

        ],
        itemsList: [
            { name: 'short sword', price: 150, effect: { desc: 'attack', atk: 80 } },
            { name: 'long sword', price: 300, effect: { desc: 'attack', atk: 120 } },
            { name: 'leather shield', price: 140, effect: { desc: 'defense', def: 30 } },
            { name: 'iron shield', price: 180, effect: { desc: 'defense', def: 50 } },
            { name: 'armor of valor', price: 600, effect: { desc: 'defense', def: 200 } },
            { name: 'hat of eagle', price: 450, effect: { desc: 'dodge', amount: 40 } },
            { name: 'ring of wizard', price: 500, effect: { desc: 'mana', amount: 100 } },
            { name: 'horadric staff', price: 300, effect: { desc: 'mana', amount: 200 } }
        ]
    },
    methods: {

        attach(index) {
            this.attachedItems.push({
                name: this.inventory[index].name,
                price: this.inventory[index].price,
                effect: this.inventory[index].effect
            })
            this.inventory.splice(index, 1)
        },
        detach(index) {
        this.inventory.push({
                 name: this.attachedItems[index].name,
                 price: this.attachedItems[index].price,
                 effect: this.attachedItems[index].effect
            })
        if(this.attachedItems[index].effect.desc === 'attack') {
            this.userStat.str -= this.attachedItems[index].effect.atk
            } else if (this.attachedItems[index].effect.desc === 'defense') {
                this.userStat.vit -= this.attachedItems[index].effect.def
            } else if (this.attachedItems[index].effect.desc === 'dodge') {
                this.userStat.dex -= this.attachedItems[index].effect.amount
            } else if (this.attachedItems[index].effect.desc === 'mana') {
                this.userStat.mana -= this.attachedItems[index].effect.amount
            }
            this.attachedItems.splice(index, 1)
        },
        shuffleShopList() {
            for(var i=0; i<8; i++) {
                var ranIdx = Math.floor(Math.random() * this.itemsList.length)
                this.shopList[i] = this.itemsList[ranIdx]
            }
        },
        chooseItem(index) {
            this.shopListValue[0] = this.shopList[index]
        },
        buyItem() {
            for(var i=0; i<this.itemsList.length; i++) {
                if(this.shopListValue[0].name === this.itemsList[i].name) {
                    if(this.userMoney >= this.itemsList[i].price) {
                        this.inventory.push({
                            name: this.itemsList[i].name,
                            price: this.itemsList[i].price,
                            effect: this.itemsList[i].effect,
                        })
                        this.userMoney -= this.itemsList[i].price
                    } else {
                        alert("돈이 부족합니다!")
                    }
                }
            }
            this.shopListValue = []
        },
        showCreature() {
            this.ranNum = Math.floor(Math.random() * 10) + 1;
            //1~10까지 나옴. 그러나 creatures 배열은 0~9 칸으로 구성됐기 때문에, -1을 해주어야함.

            var max = this.summonedCreatures.reduce( function(a, b) {
                return a > b.id ? a : b.id
            }, 0)

            this.summonedCreatures.push({
                id: max + 1,
                name: this.creatures[this.ranNum-1].name,
                hp: this.creatures[this.ranNum-1].hp,
                ex: this.creatures[this.ranNum-1].ex,
                mon: this.creatures[this.ranNum-1].mon
            })
        },
        show5Creature() {
            for(var i=0; i<5; i++) {
                this.ranNum = Math.floor(Math.random() * 10) + 1;

                var max = this.summonedCreatures.reduce( function(a, b) {
                     return a > b.id ? a : b.id
                }, 0)

                this.summonedCreatures.push({
                     id: max + 1,
                     name: this.creatures[this.ranNum-1].name,
                     hp: this.creatures[this.ranNum-1].hp,
                     ex: this.creatures[this.ranNum-1].ex,
                     mon: this.creatures[this.ranNum-1].mon
                })
            }
        },
        normalAttack(index) {
            this.summonedCreatures[index].hp -= this.userStat.str
        },
        ultimateAttack(index) {
            this.summonedCreatures[index].hp -= 500
        },
        meteorStrike() {
            for(var i=0; i<this.summonedCreatures.length; i++) {
                this.summonedCreatures[i].hp -= 10000
            }
        }
    },
    beforeUpdate() {
        for(var i=0; i<this.summonedCreatures.length; i++) {
            if(this.summonedCreatures[i].hp <= 0) {
                this.userMoney += this.summonedCreatures[i].mon
                this.userExp += this.summonedCreatures[i].ex
                this.summonedCreatures.splice(i, 1)

            }
        }
//        for(; this.userExp >= this.levUp; ) {
//      이렇게 for문으로 쓸 수도 있다.
        if(this.userExp >= this.levUp) {

            for(var i=0; this.userExp > this.levUp; i++) {
                this.userExp = this.userExp - this.levUp
                this.userStat.lev ++

                this.userStat.str += 1
                this.userStat.vit += parseInt(this.userStat.vit * 0.05)
                this.userStat.dex += 2
                this.userStat.mana += 3

                if(this.userStat.lev < 10) {
                    this.levUp += parseInt(this.levUp * 0.05)
                } else if(this.userStat.lev < 20) {
                    this.levUp += parseInt(this.levUp * 0.07)
                } else if(this.userStat.lev < 30) {
                    this.levUp += parseInt(this.levUp * 0.09)
                } else if(this.userStat.lev < 40) {
                    this.levUp += parseInt(this.levUp * 0.1)
                }
            }
        }
        for(var i=0; i<this.attachedItems.length; i++) {
            if(this.attachedItems[i].effect.desc === 'attack') {
                this.userStat.str += this.attachedItems[i].effect.atk
            } else if(this.attachedItems[i].effect.desc === 'defense') {
                this.userStat.vit += this.attachedItems[i].effect.def
            } else if(this.attachedItems[i].effect.desc === 'dodge') {
                this.userStat.dex += this.attachedItems[i].effect.amount
            } else if(this.attachedItems[i].effect.desc === 'mana') {
                this.userStat.mana += this.attachedItems[i].effect.amount
            }
        }

    }
})