// @flow

import Weapon from "./Weapon"

class Equipment {
  weapon: Weapon
  constructor(weapon: Weapon) {
    this.weapon = weapon;
  }
}

module.exports = Equipment;
