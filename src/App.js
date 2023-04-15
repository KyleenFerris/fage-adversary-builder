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
import { EditTextarea } from 'react-edit-text';
import { TableFooter } from '@mui/material';
import html2canvas from 'html2canvas';

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
      canBurrow: false,
      isElite: false,
      isHeroic: false,
      isEpic: false,
      giantWeapons: false,
      berserker: false,
      qualities: [],
      showTalentsAndSpecializations: false
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
    this.handleBuffChange = this.handleBuffChange.bind(this);
    this.handleDamageChange = this.handleDamageChange.bind(this);
    this.handleDownloadImage = this.handleDownloadImage.bind(this);
    this.handleQualityChange = this.handleQualityChange.bind(this);
    this.handleShowTalentsAndSpecializationsChange = this.handleShowTalentsAndSpecializationsChange.bind(this);
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
    { label: 'Arcane Blast (Arcane Blast)', value: 'Arcane Blast', weaponGroup: "Arcane Blast", damage: 1, range: "24 Yards", reloadTime: "", focusMod: 0, statMod: 0, mod: 0, useD3: false, finalDamageCalc: '' },
    { label: 'Arquebus (Black Powder)', value: 'Arquebus', weaponGroup: "Black Powder", damage: 2, range: "12-24 Yards", reloadTime: "Major Action", focusMod: 0, statMod: 0, mod: 3, useD3: false, finalDamageCalc: '' },
    { label: 'Blunderbuss (Black Powder)', value: 'Blunderbuss', weaponGroup: "Black Powder", damage: 1, range: "6 Yards", reloadTime: "Major Action", focusMod: 0, statMod: 0, mod: 2, useD3: false, finalDamageCalc: '' },
    { label: 'Musket (Black Powder)', value: 'Musket', weaponGroup: "Black Powder", damage: 3, range: "24-48 Yards", reloadTime: "Major Action", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Pistol (Black Powder)', value: 'Pistol', weaponGroup: "Black Powder", damage: 1, range: "8-16 Yards", reloadTime: "Major Action", focusMod: 0, statMod: 0, mod: 3, useD3: false, finalDamageCalc: '' },
    { label: 'Crossbow (Bows)', value: 'Crossbow', weaponGroup: "Bows", damage: 2, range: "30-60 Yards", reloadTime: "Major Action", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Short Bow (Bows)', value: 'Short Bow', weaponGroup: "Bows", damage: 1, range: "16-32 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Long Bow (Bows)', value: 'Long Bow', weaponGroup: "Bows", damage: 1, range: "26-52 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 3, useD3: false, finalDamageCalc: '' },
    { label: 'Fist (Brawling)', value: 'Fist', weaponGroup: "Brawling", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0, useD3: true, finalDamageCalc: '' },
    { label: 'Guantlet (Brawling)', value: 'Guantlet', weaponGroup: "Brawling", damage: 1, range: "Melee", reloadTime: 1, focusMod: 0, statMod: 1, mod: 0, useD3: true, finalDamageCalc: '' },
    { label: 'Improvised Weapon (Brawling)', value: 'Improvised Weapon', weaponGroup: "Brawling", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: -1, useD3: false, finalDamageCalc: '' },
    { label: 'Main Gauche (Dueling)', value: 'Main Gauche', weaponGroup: "Dueling", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Rapier (Dueling)', value: 'Rapier', weaponGroup: "Dueling", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 3, useD3: false, finalDamageCalc: '' },
    { label: 'Spiked Buckler (Dueling)', value: 'Spiked Buckler', weaponGroup: "Dueling", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: -1, useD3: false, finalDamageCalc: '' },
    { label: 'Dagger (Light Blades)', value: 'Dagger', weaponGroup: "Light Blades", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Short Sword (Light Blades)', value: 'Short Sword', weaponGroup: "Light Blades", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 2, mod: 0, useD3: false, finalDamageCalc: '' },
    { label: 'Throwing Knife (Light Blades)', value: 'Throwing Knife', weaponGroup: "Light Blades", damage: 1, range: "6-12 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 0, useD3: false, finalDamageCalc: '' },
    { label: 'Fustibale (Slings)', value: 'Fustibale', weaponGroup: "Slings", damage: 1, range: "14-28 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Hunting Sling (Slings)', value: 'Hunting Sling', weaponGroup: "Slings", damage: 1, range: "12-24 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 0, useD3: false, finalDamageCalc: '' },
    { label: 'Slingshot (Slings)', value: 'Slingshot', weaponGroup: "Slings", damage: 1, range: "10-20 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 1, useD3: true, finalDamageCalc: '' },
    { label: 'Club (Staves)', value: 'Club', weaponGroup: "Staves", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0, useD3: false, finalDamageCalc: '' },
    { label: 'Morningstar (Staves)', value: 'Morningstar', weaponGroup: "Staves", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 3, useD3: false, finalDamageCalc: '' },
    { label: 'Quarterstaff (Staves)', value: 'Quarterstaff', weaponGroup: "Staves", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' }
  ]

  fightingWeapons = [
    { label: 'Battleaxe (Axes)', value: 'Battleaxe', weaponGroup: "Axes", damage: 2, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0, useD3: false, finalDamageCalc: '' },
    { label: 'Throwing Axe (Axes)', value: 'Throwing Axe', weaponGroup: "Axes", damage: 1, range: "4-8 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 2, useD3: false, finalDamageCalc: '' },
    { label: 'Two-handed Axe (Axes)', value: 'Two-handed Axe', weaponGroup: "Axes", damage: 3, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0, useD3: false, finalDamageCalc: '' },
    { label: 'Mace (Bludgeons)', value: 'Mace', weaponGroup: "Bludgeons", damage: 2, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0, useD3: false, finalDamageCalc: '' },
    { label: 'Maul (Bludgeons)', value: 'Maul', weaponGroup: "Bludgeons", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 2, useD3: false, finalDamageCalc: '' },
    { label: 'Two-handed Maul (Bludgeons)', value: 'Two-handed Maul', weaponGroup: "Bludgeons", damage: 2, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 2, useD3: false, finalDamageCalc: '' },
    { label: 'Bastard Sword (Heavy Blades)', value: 'Bastard Sword', weaponGroup: "Heavy Blades", damage: 2, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Long Sword (Heavy Blades)', value: 'Long Sword', weaponGroup: "Heavy Blades", damage: 2, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0, useD3: false, finalDamageCalc: '' },
    { label: 'Two-handed Sword (Heavy Blades)', value: 'Two-handed Sword', weaponGroup: "Heavy Blades", damage: 3, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0, useD3: false, finalDamageCalc: '' },
    { label: 'Heavy Lance (Lances)', value: 'Heavy Lance', weaponGroup: "Lances", damage: 3, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Jousting Lance (Lances)', value: 'Jousting Lance', weaponGroup: "Lances", damage: 2, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Light Lance (Lances)', value: 'Light Lance', weaponGroup: "Lances", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Glaive (Polearms)', value: 'Glaive', weaponGroup: "Polearms", damage: 2, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Halberd (Polearms)', value: 'Halberd', weaponGroup: "Polearms", damage: 2, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 4, useD3: false, finalDamageCalc: '' },
    { label: 'Military Fork (Polearms)', value: 'Military Fork', weaponGroup: "Polearms", damage: 2, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Spear (Spears)', value: 'Spear', weaponGroup: "Spears", damage: 2, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 0, useD3: false, finalDamageCalc: '' },
    { label: 'Throwing Spear (Spears)', value: 'Throwing Spear', weaponGroup: "Spears", damage: 1, range: "8-16 Yards", reloadTime: "Minor Action", focusMod: 0, statMod: 0, mod: 3, useD3: false, finalDamageCalc: '' },
    { label: 'Two-handed Spear (Spears)', value: 'Two-handed Spear', weaponGroup: "Spears", damage: 2, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 3, useD3: false, finalDamageCalc: '' },
    { label: 'Bite (Natural Weapons)', value: 'Bite', weaponGroup: "Natural Weapons", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Claw (Natural Weapons)', value: 'Claw', weaponGroup: "Natural Weapons", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Tentacle (Natural Weapons)', value: 'Tentacle', weaponGroup: "Natural Weapons", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Gore (Natural Weapons)', value: 'Gore', weaponGroup: "Natural Weapons", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Kick (Natural Weapons)', value: 'Kick', weaponGroup: "Natural Weapons", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Tail Bash (Natural Weapons)', value: 'Tail Bash', weaponGroup: "Natural Weapons", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Slam (Natural Weapons)', value: 'Slam', weaponGroup: "Natural Weapons", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Lash (Natural Weapons)', value: 'Lash', weaponGroup: "Natural Weapons", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Talons (Natural Weapons)', value: 'Talons', weaponGroup: "Natural Weapons", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' },
    { label: 'Sting (Natural Weapons)', value: 'Sting', weaponGroup: "Natural Weapons", damage: 1, range: "Melee", reloadTime: "", focusMod: 0, statMod: 0, mod: 1, useD3: false, finalDamageCalc: '' }
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

  qualities = [
    { label: 'Agile', value: 'agile', description: " The monster is exceptionally agile and quick for its type. It has +2 Dexterity and can go prone or stand up as a free action, without using up any movement if they do so while using the Move action or a similar movement-based action. " },
    { label: 'Amphibious', value: 'Amphibious', description: " Sea devils can survive and breathe on both land and underwater. Sea devils must spend at least one hour a day submerged in water or take 2d6 damage." },
    { label: 'Aquatic', value: 'aquatic', description: "The monster gains the ability to breathe underwater and can swim equal to its normal Speed. It also suffers no penalties for moving, attacking, or otherwise operating underwater." },
    { label: 'Big', value: 'big', description: "This creature’s mass makes it difficult to push or knock down. Knock Prone and Skirmish stunts, and any other stunts that might push, pull, knock down, or otherwise move the creature around each require +1 SP over their normal costs to work. In the case of stunts with a variable cost, such as Skirmish, the +1 SP cost increase is on top of the total number of SP it normally costs, so moving the creature 6 yards costs 4 SP instead of the usual 3, for instance." },
    { label: 'Blending', value: 'blending', description: "The monster can camouflage itself in some manner, blending into its surroundings. This gives the monster a +2 bonus to any Dexterity (Stealth) checks based on hiding or avoiding being seen." },
    { label: 'Clockwork', value: 'clockwork', description: "The monster is a clockwork or other mechanical model of an actual monster. The monster no longer needs to breathe, eat, or sleep. Because it is a clockwork construct, any damage to it cannot be healed and must instead be repaired. A repair action works like the Heal action but uses Intelligence (Engineering) instead of Intelligence (Healing). Clockwork monsters often have tough hides representing their artificial structure." },
    { label: 'Dark Sight', value: 'dark sight', description: "The monster can see normally in total darkness." },
    { label: 'Eldritch', value: 'eldritch', description: " The monster is a twisted, madness-inducing mockery of a usual creature of its type. As a major action, it can induce a condition known as the “creeping dread,” causing all creatures who can see it to make an opposed Willpower (Courage) test vs. the monster’s Strength (Intimidation) or Willpower (Self-Discipline), whichever is greater. Success makes a target immune to this power for the rest of the encounter and gives a noncumulative +1 bonus to resist the creeping dread from this type of monster in the future. Failure means the target suffers a –2 penalty to all actions for the rest of the encounter due to overwhelming feelings of fear and disturbing hallucinations. Other eldritch or demonic creatures are immune to creeping dread. Many eldritch creatures have various other special qualities that represent their strange, alien origins. " },
    { label: 'Elemental Resistance', value: 'elemental resistance', description: "The monster is immune to a certain type of damage such as fire, cold, earth, electricity, or water. Magical damage of this type can still harm the monster, but it does half damage." },
    { label: 'Fae', value: 'fae', description: " This monster leaves no tracks in forests or other natural environments (–2 penalty to track it in such locales), does not age, and has a +2 bonus to resist non-magical poisons, drugs, and diseases. Many fae creatures have additional special qualities, such as Vulnerability (Cold Iron) and Magic Resistance. " },
    { label: 'Fast', value: 'fast', description: " This monster adds +2 to its Speed and can now do two of its lowest damage attacks with one major action. Both of these attacks can generate stunt points." },
    { label: 'Holy', value: 'holy', description: " The monster is blessed or descended from a god or other divine creature. The monster’s attacks are now considered to be magical and blessed, working effectively against crea- tures vulnerable to such attacks. Holy monsters often have various other special qualities inherited or bestowed from their divine sires or patrons. " },
    { label: 'Incorporeal Form', value: 'incorporeal form', description: "Creatures with this quality can only be damaged by magical weapons, spells, and qualities, as well as the psychic intention to harm them. Magical methods inflict full damage, while a character using a missile or melee weapon does 1 point of damage or damage equal to their Willpower ability, whichever is higher. If a stunt would increase damage from a mundane attack, it does so by the lowest amount that can be rolled." },
    { label: 'Large and In Charge', value: 'large and in charge', description: "The size and bulk of the creature are truly impressive—bigger than the big quality, which may not be taken with it. It is immune to the stunts that might move it, including Skirmish, and Knock Prone, except when performed by other very large creatures or equivalent forces, such as other creatures with the large and in charge quality. Its long reach also treats enemies up to 4 yards away as being adjacent." },
    { label: 'Magic Resistance', value: 'magic resistance', description: " The monster gains a +2 bonus to resist spells or other magical effects. It possesses an Armor Rating against magical damage equal to its Willpower +2. Such monsters often can’t be healed magically. " },
    { label: 'Many-Headed', value: 'many-headed', description: " The monster gains one or more additional heads. It gains 1 Perception and can make an additional attack each turn. If it possesses a bite-based attack, the monster can use this attack with its other heads and can make one additional attack each turn per head. Attacks with all of the heads can be made as a major action but they are all simple tests and do not generate stunt points. " },
    { label: 'Mighty', value: 'might', description: "The monster is exceptionally strong. It gains the Strength (Might) focus, and +2 Strength-based tests. If it already has the Might focus, it gains an additional +1 to Strength (Might) tests, stacking with other bonuses." },
    { label: 'Pack Advantage', value: 'pack advantage', description: " If using the Set-Up stunt with another member of its pack, the monster grants its ally a +2 damage bonus in addition to the normal +2 ability bonus. The monster may also use the Set-Up stunt for 1 SP less than normal (2 SP). It should be noted that this special quality is only appropriate for creatures that operate in groups or packs." },
    { label: 'Piercing', value: 'piercing', description: " One or more of the monster’s attacks now halves a target’s Armor Rating when it hits. If the monster uses the Pierce Armor stunt, it ignores the Armor Rating altogether. " },
    { label: 'Regenerate', value: 'regenerate', description: " The monster can heal Health = Constitution (Minimum 2) as a 2 SP stunt. This stunt may be used multiple times in the same roll if enough SP are available, increasing the healing effect. Wounds of a certain type cannot be healed with regenerate— this varies depending on the monster but is typically fire or acid-based damage. " },
    { label: 'Shadow', value: 'shadow', description: " The monster is attuned to the mystical realms of darkness and shadow. It takes half damage from all non-magical attacks and can use the regenerate and blending powers in darkness or dim light. In sunlight or other bright light, it takes damage normally, and all light-based magical attacks do an extra 1d6 penetrating damage. " },
    { label: 'Shifting', value: 'shifting', description: " Through some magical enhancement or due to a monster’s ties to some other time, place or dimension, it can use its Move action to travel to any point within its normal movement range instantly, bypassing any barriers or obstacles in the way. In addition, this monster can ignore barriers and obstacles when it uses the Skirmish stunt to move itself during combat. " },
    { label: 'Small', value: 'smell', description: "This monster is exceptionally small. It gains +2 defense due to its size but loses 2 Strength. It also gains a +2 circumstance bonus to situations where its size would be a benefit, such as hiding in small spaces." },
    { label: 'Spectral Attack', value: 'spectral attack', description: " The monster’s attack ignores the target’s shield bonus to Defense and inflicts penetrating damage. This is reduced by half the target’s Willpower (rounded up). " },
    { label: 'Spectral', value: 'spectral', description: " This monster is a ghost of a once-living creature or hails from some realm where beings exist in a spirit-like state. A spectral being is immune to poison, disease, and other mortal ailments. This creature is incorporeal. It ignores the effects of terrain and normally only magical attacks (spells or hits from magic weapons) can harm it; other attacks pass through it without effect. A character attacking this creature can perform a special stunt called Spirit Bane for 3 SP, however. The character then inflicts normal weapon damage but substitutes Willpower for Strength or Perception. Many creatures with this power also have the Spectral Attack special power. " },
    { label: 'Sunblighted', value: 'sunblighted', description: " The creature takes damage from sunlight. Minor exposure causes pain, doing 1d6 damage from reflected, indirect, or narrow beams of sunlight. Full exposure requires the creature to make a TN 15 Constitution (Stamina) test for each turn it is exposed. Failure results in the creature being destroyed; success still means the creatures take 3d6 damage " },
    { label: 'Unholy', value: 'unholy', description: " The monster is cursed or hails from some terrible hell realm. It cannot enter sacred or holy ground without taking 1d6 penetrating damage per turn and all attacks against it with holy relics or blessed objects do an additional 1d6 damage. " },
    { label: 'Vicious Combat', value: 'vicious combatant', description: " Instincts and aggression make the creature extremely deadly in combat. It can make two different specific attacks, such as a Bite followed by a Claw, with just one major action. Roll each attack separately. Either attack, or both, can generate and use stunt points. " },
    { label: 'Vulnerability', value: 'vulnerability', description: " This isn’t a power so much as a special weakness. When attacked with a substance or element to which the monster is vulnerable, the creature takes an additional 1d6 damage and its Armor Rating is halved, or its Armor Rating is completely eliminated if the attacker used the Pierce Armor stunt. " },
    { label: 'Weightless', value: 'weightless', description: " The creature can Fly at its Speed, and can hover at will. Such creatures cannot fall or be rendered Prone. " }
  ]

  async componentDidMount() {

  }

  handleShowTalentsAndSpecializationsChange() {
    this.setState({ showTalentsAndSpecializations: !this.state.showTalentsAndSpecializations })
  }

  async handleDownloadImage() {
    let element = document.getElementById('print');
    let canvas = await html2canvas(element);
    let data = canvas.toDataURL('image/jpg');
    let link = document.createElement('a');

    link.href = data;
    link.download = 'downloaded-image.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(link);

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

    let bonusHealth = 0
    if (this.state.isElite) bonusHealth += 5
    if (this.state.isHeroic) bonusHealth += 15
    if (this.state.isEpic) bonusHealth += 20

    this.updateHealth(event.target.value, bonusHealth)
    this.updateArmor(this.threatLevels[event.target.value].armor)
    this.updateDefense()

    //determine how many points of advancement we get by using a random number gen between value array min and max
    let rand = this.threatLevels[event.target.value].value[1];
    if (this.state.randomized) rand = Math.round(this.threatLevels[event.target.value].value[0] + Math.random() * (this.threatLevels[event.target.value].value[1] - this.threatLevels[event.target.value].value[0]));

    if (this.state.isElite) rand += 3
    if (this.state.isHeroic) rand += 7
    if (this.state.isEpic) rand += 10

    this.setState({ totalAdvancements: rand })

    this.updateWeaponDamageCalcText()
  }

  updateHealth(level, bonusHealth = 0) {
    let health = (this.state.constitution + (parseInt(level) + 1)) * 5 + bonusHealth;
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
    if (event.target.value === "fly") {
      await this.setState({ canFly: !this.state.canFly })
    }
    if (event.target.value === "swim") {
      await this.setState({ canSwim: !this.state.canSwim })
    }
    if (event.target.value === "burrow") {
      await this.setState({ canBurrow: !this.state.canBurrow })
    }
  }

  async handleBuffChange(event) {
    if (event.target.value === "elite") {
      await this.setState({ isElite: !this.state.isElite })
    }
    if (event.target.value === "heroic") {
      await this.setState({ isHeroic: !this.state.isHeroic })
    }
    if (event.target.value === "epic") {
      await this.setState({ isEpic: !this.state.isEpic })
    }

    this.handleThreatLevelChange({ target: { value: this.state.selectedThreatLevel } })
  }

  async handleDamageChange(event) {
    if (event.target.value === "giantWeapons") {
      await this.setState({ giantWeapons: !this.state.giantWeapons })
    }
    if (event.target.value === "berserker") {
      await this.setState({ berserker: !this.state.berserker })
    }
  }

  updateArmor(range) {
    let armor = 0
    if (this.state.selectedArmor === "min") armor = range[0]
    else if (this.state.selectedArmor === "max") armor = range[1]
    else armor = Math.round(range[0] + Math.random() * (range[1] - range[0]));

    if (this.state.isEpic) armor += 3

    this.setState({ armor: armor })
  }

  async resetWeaponStateDamage() {
    let accuracy = this.state.accuracyWeapons.map((weapon) => {
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: 0, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: '' })
    })
    let fighting = this.state.fightingWeapons.map((weapon) => {
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: 0, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: '' })
    })
    await this.setState({ accuracyWeapons: accuracy })
    await this.setState({ fightingWeapons: fighting })

    this.updateWeaponDamageCalcText()
  }

  async handleRandomizeChange(event) {
    await this.setState({ randomized: event.target.checked })
    this.handleThreatLevelChange({ target: { value: this.state.selectedThreatLevel } })
  }

  updateWeaponDamageCalcText() {
    let accuracy = this.state.accuracyWeapons.map((weapon) => {
      let dice = '';
      let add = 0;
      if (this.state.giantWeapons) {
        if (weapon.useD3) dice = "" + weapon.damage + "d3 + 1d6"
        else dice = "" + (parseInt(weapon.damage) + 1) + "d6"
      }
      else {
        if (weapon.useD3) dice = "" + weapon.damage + "d3"
        else dice = "" + (parseInt(weapon.damage)) + "d6"
      }
      if (this.state.berserker) add = weapon.mod + weapon.statMod + 3
      else add = weapon.mod + weapon.statMod

      let final = ''
      if (add < 0) {
        add = add * -1
        final = dice + " - " + add
      }
      else {
        final = dice + " + " + add
      }

      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: 0, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: final })
    })
    let fighting = this.state.fightingWeapons.map((weapon) => {
      let dice = '';
      let add = 0;
      if (this.state.giantWeapons) {
        if (weapon.useD3) dice = "" + weapon.damage + "d3 + 1d6"
        else dice = "" + (parseInt(weapon.damage) + 1) + "d6"
      }
      else {
        if (weapon.useD3) dice = "" + weapon.damage + "d3"
        else dice = "" + (parseInt(weapon.damage)) + "d6"
      }
      if (this.state.berserker) add = weapon.mod + weapon.statMod + 3
      else add = weapon.mod + weapon.statMod

      let final = ''
      if (add < 0) {
        add = add * -1
        final = dice + " - " + add
      }
      else {
        final = dice + " + " + add
      }

      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: 0, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: final })
    })
    this.setState({ accuracyWeapons: accuracy })
    this.setState({ fightingWeapons: fighting })
  }

  async updateAccuracyWeapons(event) {
    let buckler = 0;
    let temp = await event.map((weapon) => {
      if (weapon.weaponGroup === "Arcane Blast") {
        return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: weapon.statMod + this.state.willpower, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: weapon.finalDamageCalc })
      }
      if (weapon.value === "Spiked Buckler") {
        buckler = 1;
      }
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: weapon.statMod + this.state.perception, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: weapon.finalDamageCalc })
    }
    )
    await this.setState({ accuracyWeapons: temp })
    this.setWeaponFocusBonuses()
    this.setState({ hasSpikedBucklerMod: buckler })
  }

  async updateFightingWeapons(event) {
    let temp = await event.map((weapon) => {
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: weapon.statMod + this.state.strength, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: weapon.finalDamageCalc })
    }
    )
    await this.setState({ fightingWeapons: temp })
    this.setWeaponFocusBonuses()
  }

  async updateAccuracyWeaponDamageMod(newMod, isWillPower) {
    let temp = this.state.accuracyWeapons
    temp = await temp.map((weapon) => {
      if (weapon.weaponGroup === "Arcane Blast" && isWillPower) {
        return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: newMod, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: weapon.finalDamageCalc })
      }
      if (isWillPower || weapon.weaponGroup === "Arcane Blast") {
        return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: weapon.statMod, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: weapon.finalDamageCalc })
      }
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: newMod, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: weapon.finalDamageCalc })
    }
    )
    await this.setState({ accuracyWeapons: temp })
    this.updateWeaponDamageCalcText()
  }

  async updateFightingWeaponDamageMod(newMod) {
    let temp = this.state.fightingWeapons
    temp = await temp.map((weapon) => {
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: newMod, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: weapon.finalDamageCalc })
    }
    )
    await this.setState({ fightingWeapons: temp })
    this.updateWeaponDamageCalcText()
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

  handleQualityChange(event) {
    this.setState({ qualities: event })
  }

  async setWeaponFocusBonuses() {
    let accuracy = this.state.accuracyWeapons
    accuracy = accuracy.map((weapon) => {
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: 0, statMod: weapon.statMod, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: weapon.finalDamageCalc })
    })
    let fighting = this.state.fightingWeapons
    fighting = fighting.map((weapon) => {
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: 0, statMod: weapon.statMod, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: weapon.finalDamageCalc })
    })

    this.state.accuracyFocuses.map((focus) => {
      accuracy = accuracy.map((weapon) => {
        if (weapon.weaponGroup === focus.value) {
          return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: 2, statMod: weapon.statMod, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: weapon.finalDamageCalc })
        }
        else
          return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: weapon.statMod, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: weapon.finalDamageCalc })

      })
    })
    this.state.fightingFocuses.map((focus) => {
      fighting = fighting.map((weapon) => {
        if (weapon.weaponGroup === focus.value) {
          return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: 2, statMod: weapon.statMod, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: weapon.finalDamageCalc })
        }
        else
          return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, focusMod: weapon.focusMod, statMod: weapon.statMod, mod: weapon.mod, useD3: weapon.useD3, finalDamageCalc: weapon.finalDamageCalc })
      })
    })

    await this.setState({ accuracyWeapons: accuracy })
    await this.setState({ fightingWeapons: fighting })
    this.updateWeaponDamageCalcText()
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
      if (this.state.totalAdvancements > this.state.advancements || adding === -1 || this.state.perception < 0) {
        await this.setState({ perception: this.state.perception + adding })
        this.updateAccuracyWeaponDamageMod(this.state.perception, false)
      }
      else return;
      if (this.state.perception >= 0)
        await this.setState({ advancements: this.state.advancements + adding })
    }
    else if (type === "strength") {
      if (this.state.totalAdvancements > this.state.advancements || adding === -1 || this.state.strength < 0) {
        await this.setState({ strength: this.state.strength + adding })
        this.updateFightingWeaponDamageMod(this.state.strength)
      }
      else return;
      if (this.state.strength >= 0)
        await this.setState({ advancements: this.state.advancements + adding })
    }
    else if (type === "willpower") {
      if (this.state.totalAdvancements > this.state.advancements || adding === -1 || this.state.willpower < 0) {
        await this.setState({ willpower: this.state.willpower + adding })
        this.updateAccuracyWeaponDamageMod(this.state.willpower, true)
      }
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
              <TableCell style={{ width: '40%', verticalAlign: "Top" }}>
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
                  <br></br>
                  <label>
                    Show Specialization and Talent options:
                    <input type="checkbox" checked={this.state.showTalentsAndSpecializationsChange} onChange={this.handleShowTalentsAndSpecializationsChange} />
                  </label>
                  <label>
                    <br></br><br></br>
                    <label>
                      <b>Buffs: </b>

                      <input type="checkbox" name="buffTypes" value="elite" id="elite" checked={this.state.isElite} onClick={this.handleBuffChange} />
                      <label htmlFor="elite">Elite</label>

                      <input type="checkbox" name="buffTypes" value="heroic" id="heroic" checked={this.state.isHeroic} onClick={this.handleBuffChange} />
                      <label htmlFor="heroic">Heroic</label>

                      <input type="checkbox" name="buffTypes" value="epic" id="epic" checked={this.state.isEpic} onClick={this.handleBuffChange} />
                      <label htmlFor="epic">Epic</label>
                    </label>
                    <br></br>
                    <label>
                      <b>Damage Increasing Qualities:</b>
                      <input type="checkbox" name="damageBuffTypes" value="giantWeapons" id="giantWeapons" checked={this.state.giantWeapons} onClick={this.handleDamageChange} />
                      <label htmlFor="giantWeapons">Giant Weapons</label>

                      <input type="checkbox" name="damageBuffTypes" value="berserker" id="berserker" checked={this.state.berserker} onClick={this.handleDamageChange} />
                      <label htmlFor="berserker">Berserker</label>
                    </label>
                    <br></br><br></br>
                    <label>
                      <b>Additional Movement Types: </b>

                      <input type="checkbox" name="movementTypes" value="fly" id="fly" checked={this.state.canFly} onClick={this.handleMoveTypeChange} />
                      <label htmlFor="fly">Flying</label>

                      <input type="checkbox" name="movementTypes" value="swim" id="swim" checked={this.state.canSwim} onClick={this.handleMoveTypeChange} />
                      <label htmlFor="swim">Swimming</label>

                      <input type="checkbox" name="movementTypes" value="burrow" id="burrow" checked={this.state.canBurrow} onClick={this.handleMoveTypeChange} />
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

                  <br></br>
                  <label>
                    <Select
                      defaultValue={[]}
                      isMulti
                      placeholder="Qualities"
                      closeMenuOnSelect={false}
                      name="Qualities"
                      options={this.qualities}
                      className="quality-multi-select"
                      classNamePrefix="quality-select"
                      onChange={this.handleQualityChange}
                    />
                  </label>

                </form>
              </TableCell>
              <TableCell style={{ height: "100%", verticalAlign: "Top", maxWidth: "70%", minWidth: 1000 }}>
                <div id="print">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ backgroundColor: "#03a879", height: 30, borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingLeft: 40, paddingRight: 40, textAlign: "center" }}>
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
                      <TableRow style={{ backgroundColor: "#ffcfec" }}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell style={{ width: "10%" }}>
                                <Text style={{ fontSize: 20, paddingLeft: '50%' }}>{this.state.accuracy}</Text>
                              </TableCell>
                              <TableCell style={{ width: "40%", textAlign: 'center' }}>
                                <Text style={{ fontSize: 20 }}>Accuracy</Text>
                              </TableCell>
                              <TableCell>
                                <Text>
                                  {this.state.accuracyFocuses.map((focus, i) => [i > 0 && ", ", <tag>{focus.label}</tag>])}
                                </Text>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableRow>
                      <TableRow style={{ backgroundColor: "#e3fcf2" }}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell style={{ width: "10%" }}>
                                <Text style={{ fontSize: 20, paddingLeft: '50%' }}>{this.state.communication}</Text>
                              </TableCell>
                              <TableCell style={{ width: "40%", textAlign: 'center' }}>
                                <Text style={{ fontSize: 20 }}>Communication</Text>
                              </TableCell>
                              <TableCell>
                                <Text>
                                  {this.state.communicationFocuses.map((focus, i) => [i > 0 && ", ", <tag>{focus.label}</tag>])}
                                </Text>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableRow>
                      <TableRow style={{ backgroundColor: "#ffcfec" }}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell style={{ width: "10%" }}>
                                <Text style={{ fontSize: 20, paddingLeft: '50%' }}>{this.state.constitution}</Text>
                              </TableCell>
                              <TableCell style={{ width: "40%", textAlign: 'center' }}>
                                <Text style={{ fontSize: 20 }}>Constitution</Text>
                              </TableCell>
                              <TableCell>
                                <Text>
                                  {this.state.constitutionFocuses.map((focus, i) => [i > 0 && ", ", <tag>{focus.label}</tag>])}
                                </Text>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableRow>
                      <TableRow style={{ backgroundColor: "#e3fcf2" }}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell style={{ width: "10%" }}>
                                <Text style={{ fontSize: 20, paddingLeft: '50%' }}>{this.state.dexterity}</Text>
                              </TableCell>
                              <TableCell style={{ width: "40%", textAlign: 'center' }}>
                                <Text style={{ fontSize: 20 }}>Dexterity</Text>
                              </TableCell>
                              <TableCell>
                                <Text>
                                  {this.state.dexterityFocuses.map((focus, i) => [i > 0 && ", ", <tag>{focus.label}</tag>])}
                                </Text>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableRow>
                      <TableRow style={{ backgroundColor: "#ffcfec" }}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell style={{ width: "10%" }}>
                                <Text style={{ fontSize: 20, paddingLeft: '50%' }}>{this.state.fighting}</Text>
                              </TableCell>
                              <TableCell style={{ width: "40%", textAlign: 'center' }}>
                                <Text style={{ fontSize: 20 }}>Fighting</Text>
                              </TableCell>
                              <TableCell>
                                <Text>
                                  {this.state.fightingFocuses.map((focus, i) => [i > 0 && ", ", <tag>{focus.label}</tag>])}
                                </Text>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableRow>
                      <TableRow style={{ backgroundColor: "#e3fcf2" }}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell style={{ width: "10%" }}>
                                <Text style={{ fontSize: 20, paddingLeft: '50%' }}>{this.state.intelligence}</Text>
                              </TableCell>
                              <TableCell style={{ width: "40%", textAlign: 'center' }}>
                                <Text style={{ fontSize: 20 }}>Intelligence</Text>
                              </TableCell>
                              <TableCell>
                                <Text>
                                  {this.state.intelligenceFocuses.map((focus, i) => [i > 0 && ", ", <tag>{focus.label}</tag>])}
                                </Text>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableRow>
                      <TableRow style={{ backgroundColor: "#ffcfec" }}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell style={{ width: "10%" }}>
                                <Text style={{ fontSize: 20, paddingLeft: '50%' }}>{this.state.perception}</Text>
                              </TableCell>
                              <TableCell style={{ width: "40%", textAlign: 'center' }}>
                                <Text style={{ fontSize: 20 }}>Perception</Text>
                              </TableCell>
                              <TableCell>
                                <Text>
                                  {this.state.perceptionFocuses.map((focus, i) => [i > 0 && ", ", <tag>{focus.label}</tag>])}
                                </Text>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableRow>
                      <TableRow style={{ backgroundColor: "#e3fcf2" }}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell style={{ width: "10%" }}>
                                <Text style={{ fontSize: 20, paddingLeft: '50%' }}>{this.state.strength}</Text>
                              </TableCell>
                              <TableCell style={{ width: "40%", textAlign: 'center' }}>
                                <Text style={{ fontSize: 20 }}>Strength</Text>
                              </TableCell>
                              <TableCell>
                                <Text>
                                  {this.state.strengthFocuses.map((focus, i) => [i > 0 && ", ", <tag>{focus.label}</tag>])}
                                </Text>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableRow>
                      <TableRow style={{ backgroundColor: "#ffcfec" }}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell style={{ width: "10%" }}>
                                <Text style={{ fontSize: 20, paddingLeft: '50%' }}>{this.state.willpower}</Text>
                              </TableCell>
                              <TableCell style={{ width: "40%", textAlign: 'center' }}>
                                <Text style={{ fontSize: 20 }}>Willpower</Text>
                              </TableCell>
                              <TableCell>
                                <Text>
                                  {this.state.willpowerFocuses.map((focus, i) => [i > 0 && ", ", <tag>{focus.label}</tag>])}
                                </Text>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableRow>
                      <TableRow>
                        <Table>
                          <TableBody>
                            <TableRow style={{ backgroundColor: "#1a1b1f" }}>
                              <TableCell style={{ textAlign: 'center' }}>
                                <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
                                  Health
                                </Text>
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
                                  Defense
                                </Text>
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
                                  Armor
                                </Text>
                              </TableCell>
                            </TableRow>
                            <TableRow style={{ backgroundColor: "#e3fcf2" }}>
                              <TableCell style={{ textAlign: 'center' }}>
                                <EditTextarea defaultValue={this.state.health.toString()} style={{ fontSize: 20, padding: 5, maxHeight: 20 }} />
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                <EditTextarea defaultValue={this.state.defense.toString()} style={{ fontSize: 20, padding: 5, maxHeight: 20 }} />
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                <EditTextarea defaultValue={this.state.armor.toString()} style={{ fontSize: 20, padding: 5, maxHeight: 20 }} />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableRow>
                      <TableRow>
                        <Table>
                          <TableBody>
                            <TableRow style={{ backgroundColor: "#1a1b1f" }}>
                              <TableCell style={{ textAlign: 'center' }}>
                                <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
                                  Speed
                                </Text>
                              </TableCell>
                              {this.state.canFly &&
                                <TableCell style={{ textAlign: 'center' }}>
                                  <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
                                    Flying Speed
                                  </Text>
                                </TableCell>
                              }
                              {this.state.canSwim &&
                                <TableCell style={{ textAlign: 'center' }}>
                                  <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
                                    Swimming Speed
                                  </Text>
                                </TableCell>
                              }
                              {this.state.canBurrow &&
                                <TableCell style={{ textAlign: 'center' }}>
                                  <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
                                    Burrowing Speed
                                  </Text>
                                </TableCell>
                              }
                            </TableRow>
                            <TableRow style={{ backgroundColor: "#e3fcf2" }}>
                              <TableCell style={{ textAlign: 'center' }}>
                                <EditTextarea defaultValue={this.state.speed.toString()} style={{ fontSize: 20, padding: 5, maxHeight: 20 }} />
                              </TableCell>
                              {this.state.canFly &&
                                <TableCell style={{ textAlign: 'center' }}>
                                  <EditTextarea defaultValue={this.state.speed.toString()} style={{ fontSize: 20, padding: 5, maxHeight: 20 }} />
                                </TableCell>
                              }
                              {this.state.canSwim &&
                                <TableCell style={{ textAlign: 'center' }}>
                                  <EditTextarea defaultValue={this.state.speed.toString()} style={{ fontSize: 20, padding: 5, maxHeight: 20 }} />
                                </TableCell>
                              }
                              {this.state.canBurrow &&
                                <TableCell style={{ textAlign: 'center' }}>
                                  <EditTextarea defaultValue={this.state.speed.toString()} style={{ fontSize: 20, padding: 5, maxHeight: 20 }} />
                                </TableCell>
                              }
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableRow>
                      <TableRow>
                        <Table>
                          <TableBody>
                            <TableRow style={{ backgroundColor: "#1a1b1f" }}>
                              <TableCell style={{ textAlign: 'center' }}>
                                <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
                                  Weapon
                                </Text>
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
                                  Attack Roll
                                </Text>
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
                                  Damage
                                </Text>
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
                                  Range
                                </Text>
                              </TableCell>
                              <TableCell style={{ textAlign: 'center' }}>
                                <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
                                  Reload Time
                                </Text>
                              </TableCell>
                            </TableRow>
                            {this.state.accuracyWeapons.map((weapon, i) =>
                              <TableRow style={{ backgroundColor: "#ffcfec" }}>
                                <TableCell style={{ borderWidth: 2, borderColor: "#e665a7", textAlign: 'center' }}>
                                  {weapon.value}
                                </TableCell>
                                <TableCell style={{ borderWidth: 2, borderColor: "#e665a7", textAlign: 'center' }}>
                                  {
                                    this.state.berserker ?
                                      <EditTextarea defaultValue={(parseInt(weapon.focusMod) + parseInt(this.state.accuracy) + 2).toString()} style={{ padding: 5, maxHeight: 20 }} />
                                      :
                                      <EditTextarea defaultValue={(parseInt(weapon.focusMod) + parseInt(this.state.accuracy)).toString()} style={{ padding: 5, maxHeight: 20 }} />
                                  }
                                </TableCell>
                                <TableCell style={{ borderWidth: 2, borderColor: "#e665a7", textAlign: 'center' }}>
                                  <EditTextarea defaultValue={weapon.finalDamageCalc} style={{ padding: 5, maxHeight: 20 }} />
                                </TableCell>
                                <TableCell style={{ borderWidth: 2, borderColor: "#e665a7", textAlign: 'center' }}>
                                  <EditTextarea defaultValue={weapon.range} style={{ padding: 5, maxHeight: 20 }} />
                                </TableCell>
                                <TableCell style={{ borderWidth: 2, borderColor: "#e665a7", textAlign: 'center' }}>
                                  <EditTextarea defaultValue={weapon.reloadTime} style={{ padding: 5, maxHeight: 20 }} />
                                </TableCell>
                              </TableRow>
                            )}
                            {this.state.fightingWeapons.map((weapon, i) =>
                              <TableRow style={{ backgroundColor: "#ffcfec" }}>
                                <TableCell style={{ borderWidth: 2, borderColor: "#e665a7", textAlign: 'center' }}>
                                  {weapon.value}
                                </TableCell>
                                <TableCell style={{ borderWidth: 2, borderColor: "#e665a7", textAlign: 'center' }}>
                                  {
                                    this.state.berserker ?
                                      <div><EditTextarea defaultValue={(parseInt(weapon.focusMod) + parseInt(this.state.fighting) + 2).toString()} style={{ padding: 5, maxHeight: 20 }} /></div>
                                      :
                                      <div><EditTextarea defaultValue={(parseInt(weapon.focusMod) + parseInt(this.state.fighting)).toString()} style={{ padding: 5, maxHeight: 20 }} /></div>
                                  }
                                </TableCell>
                                <TableCell style={{ borderWidth: 2, borderColor: "#e665a7", textAlign: 'center' }}>
                                  <EditTextarea defaultValue={weapon.finalDamageCalc} style={{ padding: 5, maxHeight: 20 }} />
                                </TableCell>
                                <TableCell style={{ borderWidth: 2, borderColor: "#e665a7", textAlign: 'center' }}>
                                  <EditTextarea defaultValue={weapon.range} style={{ padding: 5, maxHeight: 20 }} />
                                </TableCell>
                                <TableCell style={{ borderWidth: 2, borderColor: "#e665a7", textAlign: 'center' }}>
                                  <EditTextarea defaultValue={weapon.reloadTime} style={{ padding: 5, maxHeight: 20 }} />
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ textAlign: 'center', backgroundColor: "#1a1b1f" }}>
                          <Text style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
                            Special Qualities
                          </Text>
                        </TableCell>
                      </TableRow>
                      <TableRow style={{ backgroundColor: "#e3fcf2" }}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell style={{ width: "20%", fontWeight: 700 }}>
                                Favored Stunts:
                              </TableCell>
                              <TableCell>
                                <EditTextarea style={{ width: "98%", borderWidth: 1, padding: 10, backgroundColor: "#ffffff90", overflow: "visible" }} placeholder='...'>
                                </EditTextarea>
                              </TableCell>
                            </TableRow>
                            {this.state.showTalentsAndSpecializations &&
                              <TableRow>
                                <TableCell style={{ width: "20%", fontWeight: 700 }}>
                                  Talents:
                                </TableCell>
                                <TableCell>
                                  <EditTextarea style={{ width: "98%", borderWidth: 1, padding: 10, backgroundColor: "#ffffff90", overflow: "visible" }} placeholder='...'>
                                  </EditTextarea>
                                </TableCell>
                              </TableRow>
                            }
                            {this.state.showTalentsAndSpecializations &&
                              <TableRow>
                                <TableCell style={{ width: "20%", fontWeight: 700 }}>
                                  Specializations:
                                </TableCell>
                                <TableCell>
                                  <EditTextarea style={{ width: "98%", borderWidth: 1, padding: 10, backgroundColor: "#ffffff90", overflow: "visible" }} placeholder='...'>

                                  </EditTextarea>
                                </TableCell>
                              </TableRow>
                            }

                            {this.state.berserker &&
                              <TableRow>
                                <TableCell style={{ width: "20%", fontWeight: 700 }}>
                                  <EditTextarea style={{ height: 10 }} defaultValue="Berserker">:
                                  </EditTextarea>
                                </TableCell>
                                <TableCell>
                                  <EditTextarea style={{ minWidth: "100%" }} defaultValue="The monster can enter a berserker rage. It gains a +2 bonus to hit, +3 to damage, and now has a +2 bonus to any rolls to resist effects that would induce calm or fear. However, it must attack adjacent foes only (enemy or ally) until they are down or dead. This state lasts a number of turns equal to 6 – the monster’s Willpower (minimum of 1 turn). After this period, the monster can then leave its berserker rage with a TN 11 Willpower (Self-Disicipline) test">
                                  </EditTextarea>
                                </TableCell>
                              </TableRow>
                            }

                            {this.state.giantWeapons &&
                              <TableRow>
                                <TableCell style={{ width: "20%", fontWeight: 700 }}>
                                  <EditTextarea style={{ height: 10 }} defaultValue="Giant Weapons">:
                                  </EditTextarea>
                                </TableCell>
                                <TableCell>
                                  <EditTextarea style={{ minWidth: "100%" }} defaultValue="Creatures must have the big or large and in charge qualities, or must otherwise be large enough, to have access to giant-sized weapons, which inflict an additional 1d6 damage more than usual. Creatures within the size ranges of typical Player Characters can’t use these.">
                                  </EditTextarea>
                                </TableCell>
                              </TableRow>

                            }

                            {this.state.qualities.map((quality, i) =>
                              <TableRow style={{ height: Math.max(45, (quality.description.length) / 3) }}>
                                <TableCell style={{ width: "20%" }}>
                                  <EditTextarea style={{ fontWeight: 700 }} defaultValue={quality.label}>
                                  </EditTextarea>
                                </TableCell>
                                <TableCell>
                                  <EditTextarea
                                    style={{ minWidth: "100%" }} defaultValue={quality.description}>
                                  </EditTextarea >
                                </TableCell>
                              </TableRow>
                            )}



                          </TableBody>
                        </Table>
                      </TableRow>
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell style={{ backgroundColor: "#03a879", height: 30, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, paddingLeft: 40, paddingRight: 40, textAlign: "center" }}>
                          <Text style={styles.whiteTitleText}>
                            Threat: {this.state.threatLevelLabel}
                          </Text>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
                <br></br>
                <button type="button" onClick={this.handleDownloadImage} style={{ width: "100%" }}>Download as Image</button>
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
