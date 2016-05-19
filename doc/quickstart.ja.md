QuickStart in Japanese
===

## 1. Userインスタンスの作成

```javascript
const Game = require("node-quest");

const u1 = new Game.User(
  "id1",
  "name1",
  new Game.HitPoint(
    1000, // Current Hit Point
    1000  // Max Hit Point
  ),
  new Game.MagicPoint(
    100, // Current Magic Point
    100  // Max Magic Point
  ),
  new Game.Equipment(
    new Game.Weapon(
      100, // Attack Point
      10,  // Variability
      new Game.HitRate(100) // <- will 100% hit
    )
  ),
  new Game.Parameter(
    100, // Mind Power
    10,  // Mind Instability
  )
)
```

---

## 2. Userへの攻撃

Userの攻撃力は武器(Weapon)に依存します。  
`new Game.Weapon(100, 10)`の場合、与えるダメージは平均100, 標準偏差10の正規分布に従います。  
武器には命中率(HitRate)を指定する必要があり、User::attack時に命中しなかった場合、与えたダメージが0となり、`attack.hit`がfalseとして返ります。

```javascript
const Game = require("node-quest");

const u1 = new Game.User(
  "id1",
  "name1",
  new Game.HitPoint(
    1000, // Current Hit Point
    1000  // Max Hit Point
  ),
  new Game.MagicPoint(
    100, // Current Magic Point
    100  // Max Magic Point
  ),
  new Game.Equipment(
    new Game.Weapon(
      100, // Attack Point
      10,  // Variability
      new Game.HitRate(100) // <- will 100% hit
    )
  ),
  new Game.Parameter(
    100, // Mind Power
    10,  // Mind Instability
  )
)

const u2 = new Game.User(
  "id2",
  "name2",
  new Game.HitPoint(1000, 1000),
  new Game.MagicPoint(100, 100),
  new Game.Equipment(new Game.Weapon(100, 10, new Game.HitRate(100))),
  new Game.Parameter(100, 10)
)

const result = u1.attack(u2)
console.log(result)
/*
{ actor:
   User ..., // u1
  target:
   User ..., // u2
  attack: { value: 106, hit: true },
  effects: null }
*/
```

## 3. 魔法の使用

### 魔法の種類

- 攻撃魔法

User::attack同様Userにダメージを与えます。  
Spellの攻撃力はUserの`Parameter`に依存します。  
UserのParameterが`new Game.Parameter(100, 10)`でかつSpellの基礎攻撃力が5の時、与えるダメージは平均105, 標準偏差10の正規分布に従います。  

```javascript
const Game = require("node-quest");

const attackSpell = new Game.Spell(
  "FIRE", // Name of spell
  0, // Required magic point
  new Game.Effect.AttackEffect(5) // -> has 5 standard attack point.
);

const u1 = new Game.User(
  "id1",
  "name1",
  new Game.HitPoint(1000, 1000),
  new Game.MagicPoint(100, 100),
  new Game.Equipment(new Game.Weapon(100, 10, new Game.HitRate(100))),
  new Game.Parameter(100, 10),
  [attackSpell]
)

const u2 = new Game.User(
  "id2",
  "name2",
  new Game.HitPoint(1000, 1000),
  new Game.MagicPoint(100, 100),
  new Game.Equipment(new Game.Weapon(100, 10, new Game.HitRate(100))),
  new Game.Parameter(100, 10)
)

const result = u1.cast("FIRE", u2)
console.log(result)

/*
{ actor:
   User ...,
  target:
   User ...,
  attack: null,
  effects: { attack: 102, cure: null, status: [], effects: [ [Object] ] } }
*/

```


- 回復魔法

Spellの回復力はUserの`Parameter`に依存します。  
UserのParameterが`new Game.Parameter(100, 10)`でかつSpellの基礎回復量が5の時、回復量は平均105, 標準偏差10の正規分布に従います。  


```javascript
const Game = require("node-quest");

const cureSpell = new Game.Spell(
  "CURE", // Name of spell
  0, // Required magic point
  new Game.Effect.CureEffect(5) // -> has 5 standard cure point.
);

const u1 = new Game.User(
  "id1",
  "name1",
  new Game.HitPoint(1000, 1000),
  new Game.MagicPoint(100, 100),
  new Game.Equipment(new Game.Weapon(100, 10, new Game.HitRate(100))),
  new Game.Parameter(100, 10),
  [cureSpell]
)

const u2 = new Game.User(
  "id2",
  "name2",
  new Game.HitPoint(1000, 1000),
  new Game.MagicPoint(100, 100),
  new Game.Equipment(new Game.Weapon(100, 10, new Game.HitRate(100))),
  new Game.Parameter(100, 10)
)

const result = u1.cast("CURE", u2)
console.log(result)

/*
{ actor:
   User ...,
  target:
   User ...,
  attack: null,
  effects: { attack: null, cure: 122, status: [], effects: [ [Object] ] } }
*/
```


- 状態回復魔法

状態回復魔法は死亡状態等を回復します。  
死亡した状態から回復した場合HitPointが同時に1回復します。  
コメントに記載した様に複数の効果をSpellには持たせることが出来ます。  
この際StatusEffectが最も先に適用されます。  
したがって`[new Game.Effect.StatusEffect(Game.StatusValues.DEAD), new Game.Effect.CureEffect(5)]` のようなEffectをSpellに持たせた場合、配列の順序によらず、死亡状態が回復後、回復魔法の効果が得られます。

```javascript
const Game = require("node-quest");

const raiseSpell = new Game.Spell(
  "RAISE", // Name of spell
  0, // Required magic point
  new Game.Effect.StatusEffect(Game.StatusValues.DEAD) // -> has 5 standard cure point.
  // [new Game.Effect.StatusEffect(Game.StatusValues.DEAD), new Game.Effect.CureEffect(5)]
);

const u1 = new Game.User(
  "id1",
  "name1",
  new Game.HitPoint(1000, 1000),
  new Game.MagicPoint(100, 100),
  new Game.Equipment(new Game.Weapon(100, 10, new Game.HitRate(100))),
  new Game.Parameter(100, 10),
  [raiseSpell]
)

const u2 = new Game.User(
  "id2",
  "name2",
  new Game.HitPoint(0, 1000),
  new Game.MagicPoint(100, 100),
  new Game.Equipment(new Game.Weapon(100, 10, new Game.HitRate(100))),
  new Game.Parameter(100, 10)
)

const result = u1.cast("RAISE", u2)
console.log(result)
console.log(result.effects)
/*
{ actor:
   User ...,
  target:
   User ...,
  attack: null,
  effects:
   { attack: null,
     cure: null,
     status: [ [Object] ],
     effects: [ [Object] ] } }

{ attack: null,
  cure: null,
  status: [ { kind: 'StatusDead', effective: true } ],
  effects: [ StatusEffect { targetStatus: 'StatusDead' } ] }
*/
```
