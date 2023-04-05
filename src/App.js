import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from 'react-select';

const styles = StyleSheet.create({

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  whiteTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      selectedThreatLevel: 0,
      randomized: false,
      threatLevelLabel: 'Minor',
      health: 5,
      defense: 10,
      speed: 10,
      advancements: 0,
      totalAdvancements: 20,
      accuracy: 0,
      communication: 0,
      constitution: 0,
      dexterity: 0,
      fighting: 0,
      intelligence: 0,
      perception: 0,
      strength: 0,
      willpower: 0,
      accuracyWeapons: [],
      fightingWeapons: [],
      weaponFocuses: [],
      accuracyFocuses: [],
      communicationFocuses: [],
      constitutionFocuses: [],
      dexterityFocuses: [],
      fightingFocuses: [],
      intelligenceFocuses: [],
      perceptionFocuses: [],
      strengthFocuses: [],
      willpowerFocuses: [],
      hasSpikedBucklerMod: 0,
      armor: 2,
      selectedArmor: "min",
      canFly: false,
      canSwim: false,
      canBurrow: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleThreatLevelChange = this.handleThreatLevelChange.bind(this);
    this.handleRandomizeChange = this.handleRandomizeChange.bind(this);
    this.increment = this.increment.bind(this);
    this.updateAccuracyWeapons = this.updateAccuracyWeapons.bind(this);
    this.updateFightingWeapons = this.updateFightingWeapons.bind(this);
    this.updateWeaponFocuses = this.updateWeaponFocuses.bind(this);
    this.updateCommunicationFocuses = this.updateCommunicationFocuses.bind(this);
    this.updateConstitutionFocuses = this.updateConstitutionFocuses.bind(this);
    this.updateDexterityFocuses = this.updateDexterityFocuses.bind(this);
    this.updateIntelligenceFocuses = this.updateIntelligenceFocuses.bind(this);
    this.updatePerceptionFocuses = this.updatePerceptionFocuses.bind(this);
    this.updateStrengthFocuses = this.updateStrengthFocuses.bind(this);
    this.updateWillpowerFocuses = this.updateWillpowerFocuses.bind(this);
    this.handleArmorChange = this.handleArmorChange.bind(this);
    this.handleMoveTypeChange = this.handleMoveTypeChange.bind(this);
  }



  //threatLevels = ['Minor', 'Moderate', 'Major', 'Dire', 'Legendary'];
  //values are the number of ability advancements it gets, as a range
  threatLevels = [
    { label: 'Minor', value: [10, 20], armor: [2, 3] },
    { label: 'Moderate', value: [12, 30], armor: [3, 5] },
    { label: 'Major', value: [15, 35], armor: [4, 6] },
    { label: 'Dire', value: [15, 40], armor: [6, 9] },
    { label: 'Legendary', value: [20, 40], armor: [7, 10] }
  ]

  //arcane blast needs to be use willpower mod instead of perception
  //spiked buckler needs to give +1 defense
  accuracyWeapons = [
    { label: 'Arcane Blast (Arcane Blast)', value: 'Arcane Blast', weaponGroup: "Arcane Blast", damage: "1d6", range: "24 Yards", reloadTime: "", focusMod: 0, statMod: 0, mod: 0 },
    { label: 'Arquebus (Black Powder)', value: 'Arquebus', weaponGroup: "Black Powder", damage: "2d6", range: "12-24 Yards", reloadTime: "Major Action", focusMod: 0, statMod: 0, mod: 3 },
    { label: 'Blunderbuss (Black Powder)', value: 'Blunderbuss', weaponGroup: "Black Powder", damage: "1d6", range: "6 Yards", reloadTime: "Major Action", focusMod: 0, statMod: 0, mod: 2 },
    { label: 'Musket (Black Powder)', value: 'Musket', weaponGroup: "Black Powder", damage: "3d6", range: "24-48 Yards", reloadTime: "Major Action", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Pistol (Black Powder)', value: 'Pistol', weaponGroup: "Black Powder", damage: "1d6", range: "8-16 Yards", reloadTime: "Major Action", focusMod: 0, statMod: 0, mod: 3 },
    { label: 'Crossbow (Bows)', value: 'Crossbow', weaponGroup: "Bows", damage: "2d6", range: "30-60 Yards", reloadTime: "Major Action", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Short Bow (Bows)', value: 'Short Bow', weaponGroup: "Bows", damage: "1d6", range: "16-32 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Long Bow (Bows)', value: 'Long Bow', weaponGroup: "Bows", damage: "1d6", range: "26-52 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 3 },
    { label: 'Fist (Brawling)', value: 'Fist', weaponGroup: "Brawling", damage: "1d3", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0 },
    { label: 'Guantlet (Brawling)', value: 'Guantlet', weaponGroup: "Brawling", damage: "1d3", range: "Melee", reloadTime: 1, focusMod: 0, statMod: 0, mod: "" },
    { label: 'Improvised Weapon (Brawling)', value: 'Improvised Weapon', weaponGroup: "Brawling", damage: "1d6-1", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: -1 },
    { label: 'Main Gauche (Dueling)', value: 'Main Gauche', weaponGroup: "Dueling", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Rapier (Dueling)', value: 'Rapier', weaponGroup: "Dueling", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 3 },
    { label: 'Spiked Buckler (Dueling)', value: 'Spiked Buckler', weaponGroup: "Dueling", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: -1 },
    { label: 'Dagger (Light Blades)', value: 'Dagger', weaponGroup: "Light Blades", damage: "1d6+1", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Short Sword (Light Blades)', value: 'Short Sword', weaponGroup: "Light Blades", damage: "1d6", range: "Melee", reloadTime: 2, focusMod: 0, statMod: 0, mod: "" },
    { label: 'Throwing Knife (Light Blades)', value: 'Throwing Knife', weaponGroup: "Light Blades", damage: "1d6", range: "6-12 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 0 },
    { label: 'Fustibale (Slings)', value: 'Fustibale', weaponGroup: "Slings", damage: "1d6", range: "14-28 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Hunting Sling (Slings)', value: 'Hunting Sling', weaponGroup: "Slings", damage: "1d6", range: "12-24 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 0 },
    { label: 'Slingshot (Slings)', value: 'Slingshot', weaponGroup: "Slings", damage: "1d3", range: "10-20 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Club (Staves)', value: 'Club', weaponGroup: "Staves", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0 },
    { label: 'Morningstar (Staves)', value: 'Morningstar', weaponGroup: "Staves", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 3 },
    { label: 'Quarterstaff (Staves)', value: 'Quarterstaff', weaponGroup: "Staves", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 }
  ]

  fightingWeapons = [
    { label: 'Battleaxe (Axes)', value: 'Battleaxe', weaponGroup: "Axes", damage: "2d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0 },
    { label: 'Throwing Axe (Axes)', value: 'Throwing Axe', weaponGroup: "Axes", damage: "1d6", range: "4-8 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 2 },
    { label: 'Two-handed Axe (Axes)', value: 'Two-handed Axe', weaponGroup: "Axes", damage: "3d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0 },
    { label: 'Mace (Bludgeons)', value: 'Mace', weaponGroup: "Bludgeons", damage: "2d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0 },
    { label: 'Maul (Bludgeons)', value: 'Maul', weaponGroup: "Bludgeons", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 2 },
    { label: 'Two-handed Maul (Bludgeons)', value: 'Two-handed Maul', weaponGroup: "Bludgeons", damage: "2d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 2 },
    { label: 'Bastard Sword (Heavy Blades)', value: 'Bastard Sword', weaponGroup: "Heavy Blades", damage: "2d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Long Sword (Heavy Blades)', value: 'Long Sword', weaponGroup: "Heavy Blades", damage: "2d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0 },
    { label: 'Two-handed Sword (Heavy Blades)', value: 'Two-handed Sword', weaponGroup: "Heavy Blades", damage: "3d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0 },
    { label: 'Heavy Lance (Lances)', value: 'Heavy Lance', weaponGroup: "Lances", damage: "3d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Jousting Lance (Lances)', value: 'Jousting Lance', weaponGroup: "Lances", damage: "2d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Light Lance (Lances)', value: 'Light Lance', weaponGroup: "Lances", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Glaive (Polearms)', value: 'Glaive', weaponGroup: "Polearms", damage: "2d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Halberd (Polearms)', value: 'Halberd', weaponGroup: "Polearms", damage: "2d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 4 },
    { label: 'Military Fork (Polearms)', value: 'Military Fork', weaponGroup: "Polearms", damage: "2d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Spear (Spears)', value: 'Spear', weaponGroup: "Spears", damage: "2d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0 },
    { label: 'Throwing Spear (Spears)', value: 'Throwing Spear', weaponGroup: "Spears", damage: "1d6", range: "8-16 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 3 },
    { label: 'Two-handed Spear (Spears)', value: 'Two-handed Spear', weaponGroup: "Spears", damage: "2d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 3 },
    { label: 'Bite (Natural Weapons)', value: 'Bite', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Claw (Natural Weapons)', value: 'Claw', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Tentacle (Natural Weapons)', value: 'Tentacle', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Gore (Natural Weapons)', value: 'Gore', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Kick (Natural Weapons)', value: 'Kick', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Tail Bash (Natural Weapons)', value: 'Tail Bash', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Slam (Natural Weapons)', value: 'Slam', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Lash (Natural Weapons)', value: 'Lash', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Talons (Natural Weapons)', value: 'Talons', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 },
    { label: 'Sting (Natural Weapons)', value: 'Sting', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1 }
  ]


  weaponFocuses = [
    { label: "Arcane Blast", value: 'Arcane Blast', group: 'Accuracy' },
    { label: "Axes", value: 'Axes', group: 'Fighting' },
    { label: "Black Powder", value: 'Black Powder', group: 'Accuracy' },
    { label: "Bludgeons", value: 'Bludgeons', group: 'Fighting' },
    { label: "Bows", value: 'Bows', group: 'Accuracy' },
    { label: "Dueling", value: 'Dueling', group: 'Accuracy' },
    { label: "Grenades", value: 'Grenades', group: 'Accuracy' },
    { label: "Heavy Blades", value: 'Heavy Blades', group: 'Fighting' },
    { label: "Lances", value: 'Lances', group: 'Fighting' },
    { label: "Light Blades", value: 'Light Blades', group: 'Accuracy' },
    { label: "Polearms", value: 'Polearms', group: 'Fighting' },
    { label: "Slings", value: 'Slings', group: 'Accuracy' },
    { label: "Spears", value: 'Spears', group: 'Fighting' },
    { label: "Staves", value: 'Staves', group: 'Accuracy' },
    { label: "Natural Weapons", value: 'Natural Weapons', group: 'Fighting' }
  ]

  communicationFocuses = [
    { label: "Animal Handling", value: "Animal Handling" },
    { label: "Bargaining", value: "Bargaining" },
    { label: "Deception", value: "Deception" },
    { label: "Disguise", value: "Disguise" },
    { label: "Etiquette", value: "Etiquette" },
    { label: "Gambling", value: "Gambling" },
    { label: "Investigation", value: "Investigation" },
    { label: "Leadership", value: "Leadership" },
    { label: "Performance", value: "Performance" },
    { label: "Persuasion", value: "Persuasion" },
    { label: "Seduction", value: "Seduction" }
  ]

  constitutionFocuses = [
    { label: "Rowing", value: "Rowing" },
    { label: "Running", value: "Running" },
    { label: "Stamina", value: "Stamina" },
    { label: "Swimming", value: "Swimming" },
    { label: "Tolerance", value: "Tolerance" }
  ]

  dexterityFocuses = [
    { label: "Acrobatics", value: "Acrobatic" },
    { label: "Calligraphy", value: "Calligraphy" },
    { label: "Crafting", value: "Crafting" },
    { label: "Initiative", value: "Initiative" },
    { label: "Legerdemain", value: "Legerdemain" },
    { label: "Lock Picking", value: "Lock Picking" },
    { label: "Riding", value: "Riding" },
    { label: "Sailing", value: "Sailing" },
    { label: "Stealth", value: "Stealth" },
    { label: "Traps", value: "Traps" }
  ]

  intelligenceFocuses = [
    { label: "Arcane Lore", value: "Arcane Lore" },
    { label: "Brewing", value: "Brewing" },
    { label: "Cartography", value: "Cartography" },
    { label: "Cryptography", value: "Cryptography" },
    { label: "Cultural Lore", value: "Cultural Lore" },
    { label: "Engineering", value: "Engineering" },
    { label: "Evaluation", value: "Evaluation" },
    { label: "Healing", value: "Healing" },
    { label: "Heraldry", value: "Heraldry" },
    { label: "Historical Lore", value: "Historical Lore" },
    { label: "Military Lore", value: "Military Lore" },
    { label: "Musical Lore", value: "Musical Lore" },
    { label: "Natural Lore", value: "Natural Lore" },
    { label: "Navigation", value: "Navigation" },
    { label: "Religious Lore", value: "Religious Lore" },
    { label: "Research", value: "Research" },
    { label: "Thieves' Lore", value: "Thieves' Lore" },
    { label: "Writing", value: "Writing" }
  ]

  perceptionFocuses = [
    { label: "Empathy", value: "Empathy" },
    { label: "Hearing", value: "Hearing" },
    { label: "Searching", value: "Searching" },
    { label: "Seeing", value: "Seeing" },
    { label: "Smelling", value: "Smelling" },
    { label: "Tasting", value: "Tasting" },
    { label: "Touching", value: "Touching" },
    { label: "Tracking", value: "Tracking" }
  ]

  strengthFocuses = [
    { label: "Climbing", value: "Climbing" },
    { label: "Driving", value: "Driving" },
    { label: "Intimidation", value: "Intimidation" },
    { label: "Jumping", value: "Jumping" },
    { label: "Might", value: "Might" },
    { label: "Smithing", value: "Smithing" }
  ]

  willpowerFocuses = [
    { label: "Courage", value: "Courage" },
    { label: "Faith", value: "Faith" },
    { label: "Morale", value: "Morale" },
    { label: "Self-Discipline", value: "Self-Discipline" }
  ]

  async componentDidMount() {

  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleThreatLevelChange(event) {
    this.setState({ accuracy: 0 })
    this.setState({ communication: 0 })
    this.setState({ constitution: 0 })
    this.setState({ dexterity: 0 })
    this.setState({ intelligence: 0 })
    this.setState({ fighting: 0 })
    this.setState({ strength: 0 })
    this.setState({ willpower: 0 })
    this.setState({ perception: 0 })
    this.setState({ advancements: 0 })
    this.setState({ selectedThreatLevel: event.target.value })
    this.setState({ threatLevelLabel: this.threatLevels[event.target.value].label });

    this.resetWeaponStateDamage()
    this.updateHealth(event.target.value)
    this.updateArmor(this.threatLevels[event.target.value].armor)
    this.updateDefense()

    //determine how many points of advancement we get by using a random number gen between value array min and max
    let rand = this.threatLevels[event.target.value].value[1];
    if (this.state.randomized) rand = Math.round(this.threatLevels[event.target.value].value[0] + Math.random() * (this.threatLevels[event.target.value].value[1] - this.threatLevels[event.target.value].value[0]));
    this.setState({ totalAdvancements: rand })
  }

  updateHealth(level) {
    let health = (this.state.constitution + (parseInt(level) + 1)) * 5;
    if (health <= 0) health = 5
    this.setState({ health: health });
  }

  updateDefense() {
    let val = this.state.dexterity + 10
    this.setState({ defense: val })
    this.setState({ speed: val })
  }

  async handleArmorChange(event) {
    await this.setState({ selectedArmor: event.target.value })
    this.updateArmor(this.threatLevels[this.state.selectedThreatLevel].armor)
  }

  async handleMoveTypeChange(event) {
    console.log(event);
    if (event.target.value === "fly") {
      await this.setState({ canFly: !this.state.canFly })
    }
    if (event.target.value === "swim") {
      await this.setState({ canSwim: !this.state.canSwim })
    }
    if (event.target.value === "burrow") {
      await this.setState({ canBurrow: !this.state.canBurrow })
    }

    console.log(this.state.canBurrow)
  }

  updateArmor(range) {
    let armor = 0
    if (this.state.selectedArmor === "min") armor = range[0]
    else if (this.state.selectedArmor === "max") armor = range[1]
    else armor = Math.round(range[0] + Math.random() * (range[1] - range[0]));
    this.setState({ armor: armor })
  }

  resetWeaponStateDamage() {
    let accuracy = this.state.accuracyWeapons.map((weapon) => {
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: 0, mod: weapon.mod })
    })
    let fighting = this.state.fightingWeapons.map((weapon) => {
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: 0, mod: weapon.mod })
    })
    this.setState({ accuracyWeapons: accuracy })
    this.setState({ fightingWeapons: fighting })
  }

  async handleRandomizeChange(event) {
    await this.setState({ randomized: event.target.checked })
    this.handleThreatLevelChange({ target: { value: this.state.selectedThreatLevel } })
  }

  async updateAccuracyWeapons(event) {
    let buckler = 0;
    let temp = await event.map((weapon) => {
      if (weapon.weaponGroup === "Arcane Blast") {
        return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: weapon.statMod + this.state.willpower, mod: weapon.mod })
      }
      if (weapon.value === "Spiked Buckler") {
        buckler = 1;
      }
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: weapon.statMod + this.state.perception, mod: weapon.mod })
    }
    )
    this.setState({ accuracyWeapons: temp })
    this.setState({ hasSpikedBucklerMod: buckler })
  }

  async updateFightingWeapons(event) {
    let temp = await event.map((weapon) => {
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: weapon.statMod + this.state.strength, mod: weapon.mod })
    }
    )
    this.setState({ fightingWeapons: temp })
  }

  async updateAccuracyWeaponDamageMod(oldValue, newValue, isWillPower) {
    let temp = this.state.accuracyWeapons
    temp = await temp.map((weapon) => {
      if (weapon.weaponGroup === "Arcane Blast" && isWillPower) {
        return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: (weapon.statMod - oldValue) + newValue, mod: weapon.mod })
      }
      if (isWillPower || weapon.weaponGroup === "Arcane Blast") {
        return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: weapon.statMod, mod: weapon.mod })
      }
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: (weapon.statMod - oldValue) + newValue, mod: weapon.mod })
    }
    )
    await this.setState({ accuracyWeapons: temp })
  }

  async updateFightingWeaponDamageMod(oldValue, newValue) {
    let temp = this.state.fightingWeapons
    temp = await temp.map((weapon) => {
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: (weapon.statMod - oldValue) + newValue, mod: weapon.mod })
    }
    )
    await this.setState({ fightingWeapons: temp })
  }

  async updateWeaponFocuses(event) {
    let fighting = []
    let accuracy = []
    event.map((focus) => {
      if (focus.group == "Fighting")
        fighting.push(focus)
      else
        accuracy.push(focus)
    });

    await this.setState({ accuracyFocuses: accuracy })
    await this.setState({ fightingFocuses: fighting })
    await this.setState({ weaponFocuses: event })
    this.setWeaponFocusBonuses()
  }

  updateCommunicationFocuses(event) {
    this.setState({ communicationFocuses: event })
  }
  updateConstitutionFocuses(event) {
    this.setState({ constitutionFocuses: event })
  }
  updateDexterityFocuses(event) {
    this.setState({ dexterityFocuses: event })
  }
  updateIntelligenceFocuses(event) {
    this.setState({ intelligenceFocuses: event })
  }
  updatePerceptionFocuses(event) {
    this.setState({ perceptionFocuses: event })
  }
  updateStrengthFocuses(event) {
    this.setState({ strengthFocuses: event })
  }
  updateWillpowerFocuses(event) {
    this.setState({ willpowerFocuses: event })
  }

  setWeaponFocusBonuses() {


    let accuracy = this.state.accuracyWeapons
    accuracy = accuracy.map((weapon) => {
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: 0, statMod: weapon.statMod, mod: weapon.mod })
    })
    let fighting = this.state.fightingWeapons
    fighting = fighting.map((weapon) => {
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: 0, statMod: weapon.statMod, mod: weapon.mod })
    })

    this.state.accuracyFocuses.map((focus) => {
      accuracy = accuracy.map((weapon) => {
        if (weapon.weaponGroup === focus.value) {
          return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: 2, statMod: weapon.statMod, mod: weapon.mod })
        }
        else
          return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: weapon.statMod, mod: weapon.mod })

      })
    })
    this.state.fightingFocuses.map((focus) => {
      fighting = fighting.map((weapon) => {
        if (weapon.weaponGroup === focus.value) {
          return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: 2, statMod: weapon.statMod, mod: weapon.mod })
        }
        else
          return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: weapon.statMod, mod: weapon.mod })
      })
    })

    this.setState({ accuracyWeapons: accuracy })
    this.setState({ fightingWeapons: fighting })

  }

  async increment(e, type, adding) {
    e.preventDefault()

    if (type === "accuracy") {
      if (this.state.totalAdvancements > this.state.advancements || adding === -1 || this.state.accuracy < 0)
        await this.setState({ accuracy: this.state.accuracy + adding })
      else return;
      if (this.state.accuracy >= 0)
        await this.setState({ advancements: this.state.advancements + adding })

    }
    else if (type === "communication") {
      if (this.state.totalAdvancements > this.state.advancements || adding === -1 || this.state.communication < 0)
        await this.setState({ communication: this.state.communication + adding })
      else return;
      if (this.state.communication >= 0)
        await this.setState({ advancements: this.state.advancements + adding })
    }
    else if (type === "constitution") {
      if (this.state.totalAdvancements > this.state.advancements || adding === -1 || this.state.constitution < 0) {
        await this.setState({ constitution: this.state.constitution + adding })
        this.updateHealth(this.state.selectedThreatLevel)
      }
      else return;
      if (this.state.constitution >= 0)
        await this.setState({ advancements: this.state.advancements + adding })
    }
    else if (type === "dexterity") {
      if (this.state.totalAdvancements > this.state.advancements || adding === -1 || this.state.dexterity < 0) {
        await this.setState({ dexterity: this.state.dexterity + adding })
        await this.updateDefense()
      }
      else return;
      if (this.state.dexterity >= 0)
        await this.setState({ advancements: this.state.advancements + adding })
    }
    else if (type === "fighting") {
      if (this.state.totalAdvancements > this.state.advancements || adding === -1 || this.state.fighting < 0)
        await this.setState({ fighting: this.state.fighting + adding })
      else return;
      if (this.state.fighting >= 0)
        await this.setState({ advancements: this.state.advancements + adding })
    }
    else if (type === "intelligence") {
      if (this.state.totalAdvancements > this.state.advancements || adding === -1 || this.state.intelligence < 0)
        await this.setState({ intelligence: this.state.intelligence + adding })
      else return;
      if (this.state.intelligence >= 0)
        await this.setState({ advancements: this.state.advancements + adding })
    }
    else if (type === "perception") {
      if (this.state.totalAdvancements > this.state.advancements || adding === -1 || this.state.perception < 0)
        await this.setState({ perception: this.state.perception + adding })
      else return;
      if (this.state.perception >= 0)
        await this.setState({ advancements: this.state.advancements + adding })
    }
    else if (type === "strength") {
      if (this.state.totalAdvancements > this.state.advancements || adding === -1 || this.state.strength < 0)
        await this.setState({ strength: this.state.strength + adding })
      else return;
      if (this.state.strength >= 0)
        await this.setState({ advancements: this.state.advancements + adding })
    }
    else if (type === "willpower") {
      if (this.state.totalAdvancements > this.state.advancements || adding === -1 || this.state.willpower < 0)
        await this.setState({ willpower: this.state.willpower + adding })
      else return;
      if (this.state.willpower >= 0)
        await this.setState({ advancements: this.state.advancements + adding })
    }
  }

  render() {
    return (
      <div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{ width: '40%' }}>
                <form>        <label>
                  <Text style={styles.titleText}>Name: </Text>
                  <input type="text" value={this.state.name} onChange={this.handleNameChange} /></label>
                  <br></br>
                  <label>
                    <b>Threat Level: </b>
                    <select value={this.state.selectedThreatLevel} onChange={this.handleThreatLevelChange}>

                      {this.threatLevels.map((option, index) => (

                        <option value={index}>{option.label}</option>

                      ))}

                    </select>
                  </label>
                  <label>
                    {"\n"}Randomize advancement amount?:
                    <input type="checkbox" checked={this.state.randomized} onChange={this.handleRandomizeChange} />
                  </label>
                  <br></br>
                  <label>
                    <b>Armor Rating: </b>

                    <input type="radio" name="ar" value="min" id="min" checked={this.state.selectedArmor === "min"} onChange={this.handleArmorChange} />
                    <label htmlFor="min">Minimum</label>

                    <input type="radio" name="ar" value="max" id="max" checked={this.state.selectedArmor === "max"} onChange={this.handleArmorChange} />
                    <label htmlFor="max">Maximum</label>

                    <input type="radio" name="ar" value="rand" id="rand" checked={this.state.selectedArmor === "rand"} onChange={this.handleArmorChange} />
                    <label htmlFor="rand">Random</label>
                  </label>
                  <label>
                    <br></br>
                    <label>
                      <b>Additional Movement Types: </b>

                      <input type="radio" name="movementTypes" value="fly" id="fly" checked={this.state.canFly} onClick={this.handleMoveTypeChange} />
                      <label htmlFor="fly">Flying</label>

                      <input type="radio" name="movementTypes" value="swim" id="swim" checked={this.state.canSwim} onClick={this.handleMoveTypeChange} />
                      <label htmlFor="swim">Swimming</label>

                      <input type="radio" name="movementTypes" value="burrow" id="burrow" checked={this.state.canBurrow} onClick={this.handleMoveTypeChange} />
                      <label htmlFor="burrow">Burrowing</label>
                    </label>
                    <br></br><br></br>
                    <label></label>
                    <text>Weapons</text>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell style={{ width: '50%' }}>
                            <label>
                              <Select
                                defaultValue={[]}
                                isMulti
                                placeholder="Accuracy"
                                closeMenuOnSelect={false}
                                name="Accuracy Weapons"
                                options={this.accuracyWeapons}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={this.updateAccuracyWeapons}
                              />
                            </label>
                          </TableCell>
                          <TableCell style={{ width: '50%' }}>
                            <label>
                              <Select
                                defaultValue={[]}
                                isMulti
                                placeholder="Fighting"
                                closeMenuOnSelect={false}
                                name="Fighting Weapons"
                                options={this.fightingWeapons}
                                className="fighting-multi-select"
                                classNamePrefix="fighting-select"
                                onChange={this.updateFightingWeapons}
                              />
                            </label>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <label>
                      Weapon Focuses
                      <br></br>
                      <Select
                        defaultValue={[]}
                        isMulti
                        placeholder="Focuses"
                        name="Focuses"
                        options={this.weaponFocuses}
                        className="focuses-multi-select"
                        classNamePrefix="focus-select"
                        onChange={this.updateWeaponFocuses}
                      />
                    </label>
                  </label>
                  <br></br>

                  <text>
                    This adversary can have between {this.threatLevels[this.state.selectedThreatLevel].value[0]} and {this.threatLevels[this.state.selectedThreatLevel].value[1]} stat advancements.
                  </text>
                  <br></br>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <View style={{ justifyContent: 'space-between' }}>
                            <Text>TOTAL ADVANCEMENTS:</Text><Text> {Math.max(0, this.state.accuracy) + Math.max(0, this.state.communication) + Math.max(0, this.state.constitution) + Math.max(0, this.state.dexterity) + Math.max(0, this.state.fighting) + Math.max(0, this.state.intelligence) + Math.max(0, this.state.perception) + Math.max(0, this.state.strength) + Math.max(0, this.state.willpower)} / {this.state.totalAdvancements}</Text>
                          </View>
                        </TableCell>
                        <TableCell>
                          <View style={{ justifyContent: 'space-between' }}>
                            <Text>TOTAL FOCUSES (Recommended: 4-8):</Text><Text> {(this.state.accuracyFocuses.length + this.state.communicationFocuses.length + this.state.constitutionFocuses.length + this.state.dexterityFocuses.length + this.state.fightingFocuses.length + this.state.intelligenceFocuses.length + this.state.perceptionFocuses.length + this.state.strengthFocuses.length + this.state.willpowerFocuses.length)}</Text>
                          </View>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <br></br>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "accuracy", -1) }}>
                            -
                          </button>
                        </TableCell>
                        <TableCell style={{ width: '10%' }}>
                          <center>Accuracy</center>
                        </TableCell>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "accuracy", 1) }}>
                            +
                          </button>
                        </TableCell >
                        <TableCell style={{ width: '10%' }}>{this.state.accuracy}</TableCell>
                        <TableCell style={{ width: '30%' }}>
                          <text style={{ fontSize: 10 }}>Should be between +3 and +6 if the adversary attacks with this stat.</text>
                        </TableCell>
                        <TableCell style={{ width: '30%' }}>
                          <label>
                            <Select
                              value={this.state.accuracyFocuses}
                              isMulti
                              placeholder="Focuses"
                              name="AccuracyFocuses"
                              className="focuses-multi-select"
                              classNamePrefix="focus-select"
                              isDisabled={true}
                              isClearable={false}
                            />
                          </label>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "communication", -1) }}>
                            -
                          </button>
                        </TableCell>
                        <TableCell>
                          <center>Communication</center>
                        </TableCell>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "communication", 1) }}>
                            +
                          </button>
                        </TableCell>
                        <TableCell>{this.state.communication}</TableCell>
                        <TableCell>
                          <text style={{ fontSize: 10 }}>Can they talk?</text>
                        </TableCell>
                        <TableCell>
                          <label>
                            <Select
                              options={this.communicationFocuses}
                              isMulti
                              placeholder="Focuses"
                              name="CommunicationFocuses"
                              className="focuses-multi-select"
                              classNamePrefix="focus-select"
                              isClearable={false}
                              onChange={this.updateCommunicationFocuses}
                            />
                          </label>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "constitution", -1) }}>
                            -
                          </button>
                        </TableCell>
                        <TableCell>
                          <center>Constitution</center>
                        </TableCell>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "constitution", 1) }}>
                            +
                          </button>
                        </TableCell>
                        <TableCell>{this.state.constitution}</TableCell>
                        <TableCell>
                          <text style={{ fontSize: 10 }}>The more constitution the more health, so it should be high for higher threats.</text>
                        </TableCell>
                        <TableCell>
                          <label>
                            <Select
                              options={this.constitutionFocuses}
                              isMulti
                              placeholder="Focuses"
                              name="ConstitutionFocuses"
                              className="focuses-multi-select"
                              classNamePrefix="focus-select"
                              isClearable={false}
                              onChange={this.updateConstitutionFocuses}
                            />
                          </label>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "dexterity", -1) }}>
                            -
                          </button>
                        </TableCell>
                        <TableCell>
                          <center>Dexterity</center>
                        </TableCell>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "dexterity", 1) }}>
                            +
                          </button>
                        </TableCell>
                        <TableCell>{this.state.dexterity}</TableCell>
                        <TableCell>
                          <text style={{ fontSize: 10 }}>4 Dexterity is very good, 6 is extraordinary. Anything higher is annoying.</text>
                        </TableCell>
                        <TableCell>
                          <label>
                            <Select
                              options={this.dexterityFocuses}
                              isMulti
                              placeholder="Focuses"
                              name="DexterityFocuses"
                              className="focuses-multi-select"
                              classNamePrefix="focus-select"
                              isClearable={false}
                              onChange={this.updateDexterityFocuses}
                            />
                          </label>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "fighting", -1) }}>
                            -
                          </button>
                        </TableCell>
                        <TableCell>
                          <center>Fighting</center>
                        </TableCell>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "fighting", 1) }}>
                            +
                          </button>
                        </TableCell>
                        <TableCell>{this.state.fighting}</TableCell>
                        <TableCell>
                          <text style={{ fontSize: 10 }}>Should be between +3 and +6 if the adversary attacks with this stat.</text>
                        </TableCell>
                        <TableCell>
                          <label>
                            <Select
                              value={this.state.fightingFocuses}
                              isMulti
                              placeholder="Focuses"
                              name="FightingFocuses"
                              className="focuses-multi-select"
                              classNamePrefix="focus-select"
                              isDisabled={true}
                              isClearable={false}
                            />
                          </label>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "intelligence", -1) }}>
                            -
                          </button>
                        </TableCell>
                        <TableCell>
                          <center>Intelligence</center>
                        </TableCell>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "intelligence", 1) }}>
                            +
                          </button>
                        </TableCell>
                        <TableCell>{this.state.intelligence}</TableCell>
                        <TableCell>
                          <text style={{ fontSize: 10 }}>Can they think?</text>
                        </TableCell>
                        <TableCell>
                          <label>
                            <Select
                              options={this.intelligenceFocuses}
                              isMulti
                              placeholder="Focuses"
                              name="IntelligenceFocuses"
                              className="focuses-multi-select"
                              classNamePrefix="focus-select"
                              isClearable={false}
                              onChange={this.updateIntelligenceFocuses}
                            />
                          </label>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "perception", -1) }}>
                            -
                          </button>
                        </TableCell>
                        <TableCell>
                          <center>Perception</center>
                        </TableCell>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "perception", 1) }}>
                            +
                          </button>
                        </TableCell>
                        <TableCell>{this.state.perception}</TableCell>
                        <TableCell>
                          <text style={{ fontSize: 10 }}>If they use accuracy weapons this should be high.</text>
                        </TableCell>
                        <TableCell>
                          <label>
                            <Select
                              options={this.perceptionFocuses}
                              isMulti
                              placeholder="Focuses"
                              name="PerceptionFocuses"
                              className="focuses-multi-select"
                              classNamePrefix="focus-select"
                              isClearable={false}
                              onChange={this.updatePerceptionFocuses}
                            />
                          </label>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "strength", -1) }}>
                            -
                          </button>
                        </TableCell>
                        <TableCell>
                          <center>Strength</center>
                        </TableCell>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "strength", 1) }}>
                            +
                          </button>
                        </TableCell>
                        <TableCell>{this.state.strength}</TableCell>
                        <TableCell>
                          <text style={{ fontSize: 10 }}>If they use fighting weapons this should be high.</text>
                        </TableCell>
                        <TableCell>
                          <label>
                            <Select
                              options={this.strengthFocuses}
                              isMulti
                              placeholder="Focuses"
                              name="StrengthFocuses"
                              className="focuses-multi-select"
                              classNamePrefix="focus-select"
                              isClearable={false}
                              onChange={this.updateStrengthFocuses}
                            />
                          </label>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "willpower", -1) }}>
                            -
                          </button>
                        </TableCell>
                        <TableCell>
                          <center>Willpower</center>
                        </TableCell>
                        <TableCell style={{ width: '10%', textAlign: "center" }}>
                          <button onClick={(e) => { this.increment(e, "willpower", 1) }}>
                            +
                          </button>
                        </TableCell>
                        <TableCell>{this.state.willpower}</TableCell>
                        <TableCell>
                          <text style={{ fontSize: 10 }}>The higher this is the less likely they are to run from a fight.</text>
                        </TableCell>
                        <TableCell>
                          <label>
                            <Select
                              options={this.willpowerFocuses}
                              isMulti
                              placeholder="Focuses"
                              name="WillpowerFocuses"
                              className="focuses-multi-select"
                              classNamePrefix="focus-select"
                              isClearable={false}
                              onChange={this.updateWillpowerFocuses}
                            />
                          </label>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                </form>
              </TableCell>
              <TableCell style={{ height: "100%", verticalAlign: "Top", maxWidth: "70%" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ backgroundColor: "#03a879", height: 30, borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingLeft: 40, paddingRight: 40 }}>
                        <Text style={styles.whiteTitleText}>
                          {this.state.name}
                        </Text>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ textAlign: 'center', backgroundColor: "#1a1b1f" }}>
                        <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
                          Abilities (Focuses)
                        </Text>
                      </TableCell>
                    </TableRow>
                    <TableRow style={{backgroundColor:"#ffcfec"}}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell style={{width:"10%"}}>
                              <Text style={{fontSize:20, paddingLeft:'50%'}}>{this.state.accuracy}</Text>
                            </TableCell>
                            <TableCell style={{width:"40%", textAlign:'center'}}>
                              <Text style={{fontSize:20}}>Accuracy</Text>
                            </TableCell>
                            <TableCell>
                              <Text>
                              {this.state.accuracyFocuses.map((focus, i) => [i > 0 && ", ",<tag>{focus.label}</tag>])}
                              </Text>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableRow>
                    <TableRow style={{backgroundColor:"#e3fcf2"}}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell style={{width:"10%"}}>
                              <Text style={{fontSize:20, paddingLeft:'50%'}}>{this.state.communication}</Text>
                            </TableCell>
                            <TableCell style={{width:"40%", textAlign:'center'}}>
                              <Text style={{fontSize:20}}>Communication</Text>
                            </TableCell>
                            <TableCell>
                              <Text>
                              {this.state.communicationFocuses.map((focus, i) => [i > 0 && ", ",<tag>{focus.label}</tag>])}
                              </Text>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableRow>
                    <TableRow style={{backgroundColor:"#ffcfec"}}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell style={{width:"10%"}}>
                              <Text style={{fontSize:20, paddingLeft:'50%'}}>{this.state.constitution}</Text>
                            </TableCell>
                            <TableCell style={{width:"40%", textAlign:'center'}}>
                              <Text style={{fontSize:20}}>Constitution</Text>
                            </TableCell>
                            <TableCell>
                              <Text>
                              {this.state.constitutionFocuses.map((focus, i) => [i > 0 && ", ",<tag>{focus.label}</tag>])}
                              </Text>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableRow>
                    <TableRow style={{backgroundColor:"#e3fcf2"}}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell style={{width:"10%"}}>
                              <Text style={{fontSize:20, paddingLeft:'50%'}}>{this.state.dexterity}</Text>
                            </TableCell>
                            <TableCell style={{width:"40%", textAlign:'center'}}>
                              <Text style={{fontSize:20}}>Dexterity</Text>
                            </TableCell>
                            <TableCell>
                              <Text>
                              {this.state.dexterityFocuses.map((focus, i) => [i > 0 && ", ",<tag>{focus.label}</tag>])}
                              </Text>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableRow>
                    <TableRow style={{backgroundColor:"#ffcfec"}}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell style={{width:"10%"}}>
                              <Text style={{fontSize:20, paddingLeft:'50%'}}>{this.state.fighting}</Text>
                            </TableCell>
                            <TableCell style={{width:"40%", textAlign:'center'}}>
                              <Text style={{fontSize:20}}>Fighting</Text>
                            </TableCell>
                            <TableCell>
                              <Text>
                              {this.state.fightingFocuses.map((focus, i) => [i > 0 && ", ",<tag>{focus.label}</tag>])}
                              </Text>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableRow>
                    <TableRow style={{backgroundColor:"#e3fcf2"}}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell style={{width:"10%"}}>
                              <Text style={{fontSize:20, paddingLeft:'50%'}}>{this.state.intelligence}</Text>
                            </TableCell>
                            <TableCell style={{width:"40%", textAlign:'center'}}>
                              <Text style={{fontSize:20}}>Intelligence</Text>
                            </TableCell>
                            <TableCell>
                              <Text>
                              {this.state.intelligenceFocuses.map((focus, i) => [i > 0 && ", ",<tag>{focus.label}</tag>])}
                              </Text>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableRow>
                    <TableRow style={{backgroundColor:"#ffcfec"}}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell style={{width:"10%"}}>
                              <Text style={{fontSize:20, paddingLeft:'50%'}}>{this.state.perception}</Text>
                            </TableCell>
                            <TableCell style={{width:"40%", textAlign:'center'}}>
                              <Text style={{fontSize:20}}>Perception</Text>
                            </TableCell>
                            <TableCell>
                              <Text>
                              {this.state.perceptionFocuses.map((focus, i) => [i > 0 && ", ",<tag>{focus.label}</tag>])}
                              </Text>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableRow>
                    <TableRow style={{backgroundColor:"#e3fcf2"}}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell style={{width:"10%"}}>
                              <Text style={{fontSize:20, paddingLeft:'50%'}}>{this.state.strength}</Text>
                            </TableCell>
                            <TableCell style={{width:"40%", textAlign:'center'}}>
                              <Text style={{fontSize:20}}>Strength</Text>
                            </TableCell>
                            <TableCell>
                              <Text>
                              {this.state.strengthFocuses.map((focus, i) => [i > 0 && ", ",<tag>{focus.label}</tag>])}
                              </Text>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableRow>
                    <TableRow style={{backgroundColor:"#ffcfec"}}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell style={{width:"10%"}}>
                              <Text style={{fontSize:20, paddingLeft:'50%'}}>{this.state.willpower}</Text>
                            </TableCell>
                            <TableCell style={{width:"40%", textAlign:'center'}}>
                              <Text style={{fontSize:20}}>Willpower</Text>
                            </TableCell>
                            <TableCell>
                              <Text>
                              {this.state.willpowerFocuses.map((focus, i) => [i > 0 && ", ",<tag>{focus.label}</tag>])}
                              </Text>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ textAlign: 'center', backgroundColor: "#1a1b1f" }}>
                        <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
                          
                        </Text>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br></br>
      </div>

    );
  }
}

export default App;
