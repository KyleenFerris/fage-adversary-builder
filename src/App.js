import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from 'react-select'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      selectedThreatLevel: 0,
      randomized: false,
      threatLevelLabel: 'Minor',
      advancements: 20,
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
      fightingFocuses: []
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleThreatLevelChange = this.handleThreatLevelChange.bind(this);
    this.handleRandomizeChange = this.handleRandomizeChange.bind(this);
    this.increment = this.increment.bind(this);
    this.updateAccuracyWeapons = this.updateAccuracyWeapons.bind(this);
    this.updateFightingWeapons = this.updateFightingWeapons.bind(this);
    this.updateWeaponFocuses = this.updateWeaponFocuses.bind(this);
  }

  //threatLevels = ['Minor', 'Moderate', 'Major', 'Dire', 'Legendary'];
  //values are the number of ability advancements it gets, as a range
  threatLevels = [{ label: 'Minor', value: [10, 20] }, { label: 'Moderate', value: [12, 30] }, { label: 'Major', value: [15, 35] }, { label: 'Dire', value: [15, 40] }, { label: 'Legendary', value: [20, 40] }]

  //arcane blast needs to be use willpower mod instead of perception
  //spiked buckler needs to give +1 defense
  accuracyWeapons = [
    { label: 'Arcane Blast (Arcane Blast)', value: 'Arcane Blast', weaponGroup: "Arcane Blast", damage: "1d6", range: "24 Yards", reloadTime: "", mod: 0 },
    { label: 'Arquebus (Black Powder)', value: 'Arquebus', weaponGroup: "Black Powder", damage: "2d6", range: "12-24 Yards", reloadTime: "Major Action", mod: 3 },
    { label: 'Blunderbuss (Black Powder)', value: 'Blunderbuss', weaponGroup: "Black Powder", damage: "1d6", range: "6 Yards", reloadTime: "Major Action", mod: 2 },
    { label: 'Musket (Black Powder)', value: 'Musket', weaponGroup: "Black Powder", damage: "3d6", range: "24-48 Yards", reloadTime: "Major Action", mod: 1 },
    { label: 'Pistol (Black Powder)', value: 'Pistol', weaponGroup: "Black Powder", damage: "1d6", range: "8-16 Yards", reloadTime: "Major Action", mod: 3 },
    { label: 'Crossbow (Bows)', value: 'Crossbow', weaponGroup: "Bows", damage: "2d6", range: "30-60 Yards", reloadTime: "Major Action", mod: 1 },
    { label: 'Short Bow (Bows)', value: 'Short Bow', weaponGroup: "Bows", damage: "1d6", range: "16-32 Yards", reloadTime: "Minor Action", mod: 1 },
    { label: 'Long Bow (Bows)', value: 'Long Bow', weaponGroup: "Bows", damage: "1d6", range: "26-52 Yards", reloadTime: "Minor Action", mod: 3 },
    { label: 'Fist (Brawling)', value: 'Fist', weaponGroup: "Brawling", damage: "1d3", range: "Melee", reloadTime: "", mod: 0 },
    { label: 'Guantlet (Brawling)', value: 'Guantlet', weaponGroup: "Brawling", damage: "1d3", range: "Melee", reloadTime: 1, mod: "" },
    { label: 'Improvised Weapon (Brawling)', value: 'Improvised Weapon', weaponGroup: "Brawling", damage: "1d6-1", range: "Melee", reloadTime: "", mod: -1 },
    { label: 'Main Gauche (Dueling)', value: 'Main Gauche', weaponGroup: "Dueling", damage: "1d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Rapier (Dueling)', value: 'Rapier', weaponGroup: "Dueling", damage: "1d6", range: "Melee", reloadTime: "", mod: 3 },
    { label: 'Spiked Buckler (Dueling)', value: 'Spiked Buckler', weaponGroup: "Dueling", damage: "1d6", range: "Melee", reloadTime: "", mod: -1 },
    { label: 'Dagger (Light Blades)', value: 'Dagger', weaponGroup: "Light Blades", damage: "1d6+1", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Short Sword (Light Blades)', value: 'Short Sword', weaponGroup: "Light Blades", damage: "1d6", range: "Melee", reloadTime: 2, mod: "" },
    { label: 'Throwing Knife (Light Blades)', value: 'Throwing Knife', weaponGroup: "Light Blades", damage: "1d6", range: "6-12 Yards", reloadTime: "Minor Action", mod: 0 },
    { label: 'Fustibale (Slings)', value: 'Fustibale', weaponGroup: "Slings", damage: "1d6", range: "14-28 Yards", reloadTime: "Minor Action", mod: 1 },
    { label: 'Hunting Sling (Slings)', value: 'Hunting Sling', weaponGroup: "Slings", damage: "1d6", range: "12-24 Yards", reloadTime: "Minor Action", mod: 0 },
    { label: 'Slingshot (Slings)', value: 'Slingshot', weaponGroup: "Slings", damage: "1d3", range: "10-20 Yards", reloadTime: "Minor Action", mod: 1 },
    { label: 'Club (Staves)', value: 'Club', weaponGroup: "Staves", damage: "1d6", range: "Melee", reloadTime: "", mod: 0 },
    { label: 'Morningstar (Staves)', value: 'Morningstar', weaponGroup: "Staves", damage: "1d6", range: "Melee", reloadTime: "", mod: 3 },
    { label: 'Quarterstaff (Staves)', value: 'Quarterstaff', weaponGroup: "Staves", damage: "1d6", range: "Melee", reloadTime: "", mod: 1 }
  ]

  fightingWeapons = [
    { label: 'Battleaxe (Axes)', value: 'Battleaxe', weaponGroup: "Axes", damage: "2d6", range: "Melee", reloadTime: "", mod: 0 },
    { label: 'Throwing Axe (Axes)', value: 'Throwing Axe', weaponGroup: "Axes", damage: "1d6", range: "4-8 Yards", reloadTime: "Minor Action", mod: 2 },
    { label: 'Two-handed Axe (Axes)', value: 'Two-handed Axe', weaponGroup: "Axes", damage: "3d6", range: "Melee", reloadTime: "", mod: 0 },
    { label: 'Mace (Bludgeons)', value: 'Mace', weaponGroup: "Bludgeons", damage: "2d6", range: "Melee", reloadTime: "", mod: 0 },
    { label: 'Maul (Bludgeons)', value: 'Maul', weaponGroup: "Bludgeons", damage: "1d6", range: "Melee", reloadTime: "", mod: 2 },
    { label: 'Two-handed Maul (Bludgeons)', value: 'Two-handed Maul', weaponGroup: "Bludgeons", damage: "2d6", range: "Melee", reloadTime: "", mod: 2 },
    { label: 'Bastard Sword (Heavy Blades)', value: 'Bastard Sword', weaponGroup: "Heavy Blades", damage: "2d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Long Sword (Heavy Blades)', value: 'Long Sword', weaponGroup: "Heavy Blades", damage: "2d6", range: "Melee", reloadTime: "", mod: 0 },
    { label: 'Two-handed Sword (Heavy Blades)', value: 'Two-handed Sword', weaponGroup: "Heavy Blades", damage: "3d6", range: "Melee", reloadTime: "", mod: 0 },
    { label: 'Heavy Lance (Lances)', value: 'Heavy Lance', weaponGroup: "Lances", damage: "3d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Jousting Lance (Lances)', value: 'Jousting Lance', weaponGroup: "Lances", damage: "2d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Light Lance (Lances)', value: 'Light Lance', weaponGroup: "Lances", damage: "1d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Glaive (Polearms)', value: 'Glaive', weaponGroup: "Polearms", damage: "2d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Halberd (Polearms)', value: 'Halberd', weaponGroup: "Polearms", damage: "2d6", range: "Melee", reloadTime: "", mod: 4 },
    { label: 'Military Fork (Polearms)', value: 'Military Fork', weaponGroup: "Polearms", damage: "2d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Spear (Spears)', value: 'Spear', weaponGroup: "Spears", damage: "2d6", range: "Melee", reloadTime: "", mod: 0 },
    { label: 'Throwing Spear (Spears)', value: 'Throwing Spear', weaponGroup: "Spears", damage: "1d6", range: "8-16 Yards", reloadTime: "Minor Action", mod: 3 },
    { label: 'Two-handed Spear (Spears)', value: 'Two-handed Spear', weaponGroup: "Spears", damage: "2d6", range: "Melee", reloadTime: "", mod: 3 },
    { label: 'Bite (Natural Weapons)', value: 'Bite', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Claw (Natural Weapons)', value: 'Claw', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Tentacle (Natural Weapons)', value: 'Tentacle', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Gore (Natural Weapons)', value: 'Gore', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Kick (Natural Weapons)', value: 'Kick', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Tail Bash (Natural Weapons)', value: 'Tail Bash', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Slam (Natural Weapons)', value: 'Slam', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Lash (Natural Weapons)', value: 'Lash', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Talons (Natural Weapons)', value: 'Talons', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", mod: 1 },
    { label: 'Sting (Natural Weapons)', value: 'Sting', weaponGroup: "Natural Weapons", damage: "1d6", range: "Melee", reloadTime: "", mod: 1 }
  ]


  weaponFocuses = [
    { label: "Arcane Blast", value: 'Arcane Blast', group: 'Accuracy' },
    { label: "Axes", value: 'Axes', group: 'Fighting' },
    { label: "Black Powder", value: 'Black Powder', group: 'Accuracy' },
    { label: "Bludgeons", value: 'Bludgeons', group: 'Fighting' },
    { label: "Bows", value: 'Bows', group: 'Accuracy' },
    { label: "Dueling", value: 'Dueling', group: 'Accuracy' },
    { label: "Heavy Blades", value: 'Heavy Blades', group: 'Fighting' },
    { label: "Lances", value: 'Lances', group: 'Fighting' },
    { label: "Light Blades", value: 'Light Blades', group: 'Accuracy' },
    { label: "Polearms", value: 'Polearms', group: 'Fighting' },
    { label: "Slings", value: 'Slings', group: 'Accuracy' },
    { label: "Spears", value: 'Spears', group: 'Fighting' },
    { label: "Staves", value: 'Staves', group: 'Accuracy' },
    { label: "Natural Weapons", value: 'Natural Weapons', group: 'Fighting' }
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
    this.setState({ selectedThreatLevel: event.target.value })
    this.setState({ threatLevelLabel: this.threatLevels[event.target.value].label });
    //determine how many points of advancement we get by using a random number gen between value array min and max
    let rand = this.threatLevels[event.target.value].value[1];
    if (this.state.randomized) rand = Math.round(this.threatLevels[event.target.value].value[0] + Math.random() * (this.threatLevels[event.target.value].value[1] - this.threatLevels[event.target.value].value[0]));
    this.setState({ advancements: rand });
    this.setState({ totalAdvancements: rand })
  }

  async handleRandomizeChange(event) {
    await this.setState({ randomized: event.target.checked })
    console.log(this.state.randomized)
    this.handleThreatLevelChange({ target: { value: this.state.selectedThreatLevel } })
  }

  async updateAccuracyWeapons(event) {
    let temp = await event.map((weapon) => {
      if (weapon.weaponGroup === "Arcane Blast") {
        return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, mod: weapon.mod + this.state.willpower })
      }
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, mod: weapon.mod + this.state.perception })
    }
    )
    this.setState({ accuracyWeapons: temp })
  }

  async updateFightingWeapons(event) {
    let temp = await event.map((weapon) => {
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, mod: weapon.mod + this.state.strength })
    }
    )
    this.setState({ fightingWeapons: temp })
  }

  async updateAccuracyWeaponDamageMod(oldValue, newValue, isWillPower) {
    let temp = this.state.accuracyWeapons
    temp = await temp.map((weapon) => {
      if (weapon.weaponGroup === "Arcane Blast" && isWillPower) {
        return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, mod: (weapon.mod - oldValue) + newValue })
      }
      if (isWillPower || weapon.weaponGroup === "Arcane Blast") {
        return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, mod: weapon.mod })
      }
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, mod: (weapon.mod - oldValue) + newValue })
    }
    )
    await this.setState({ accuracyWeapons: temp })
  }

  async updateFightingWeaponDamageMod(oldValue, newValue) {
    let temp = this.state.fightingWeapons
    temp = await temp.map((weapon) => {
      return (weapon = { label: weapon.label, value: weapon.value, weaponGroup: weapon.weaponGroup, damage: weapon.damage, range: weapon.range, reloadTime: weapon.reloadTime, mod: (weapon.mod - oldValue) + newValue })
    }
    )
    await this.setState({ fightingWeapons: temp })
  }

  async updateWeaponFocuses(event) {
    let fighting = await event.map((focus) => {
      if (focus.group == "Fighting")
        return (focus)
    });
    let accuracy = await event.map((focus) => {
      if (focus.group == "Accuracy")
        return (focus)
    })
    console.log(accuracy);
    await this.setState({ accuracyFocuses: accuracy })
    this.setState({ fightingFocuses: fighting })
    await this.setState({ weaponFocuses: event })
    console.log(this.state.accuracyFocuses)
  }

  increment(e, type, adding) {
    e.preventDefault()

    if (type === "accuracy") {
      //if we're subtracting to a negative number, DON'T remove an advancement.
      if (!(adding === -1 && this.state.accuracy <= 0)) {
        this.setState({ advancements: this.state.advancements - adding })
      }
      if (this.state.advancements <= 0 && adding === 1 && this.state.accuracy >= 0) return;
      this.setState({ accuracy: this.state.accuracy + adding })
    }
    else if (type === "communication") {
      //if we're subtracting to a negative number, DON'T remove an advancement.
      if (!(adding === -1 && this.state.communication <= 0)) {
        this.setState({ advancements: this.state.advancements - adding })
      }
      if (this.state.advancements <= 0 && adding === 1 && this.state.communication >= 0) return;
      this.setState({ communication: this.state.communication + adding })
    }
    else if (type === "constitution") {
      //if we're subtracting to a negative number, DON'T remove an advancement.
      if (!(adding === -1 && this.state.constitution <= 0)) {
        this.setState({ advancements: this.state.advancements - adding })
      }
      if (this.state.advancements <= 0 && adding === 1 && this.state.constitution >= 0) return;
      this.setState({ constitution: this.state.constitution + adding })
    }
    else if (type === "dexterity") {
      //if we're subtracting to a negative number, DON'T remove an advancement.
      if (!(adding === -1 && this.state.dexterity <= 0)) {
        this.setState({ advancements: this.state.advancements - adding })
      }
      if (this.state.advancements <= 0 && adding === 1 && this.state.dexterity >= 0) return;
      this.setState({ dexterity: this.state.dexterity + adding })
    }
    else if (type === "fighting") {
      //if we're subtracting to a negative number, DON'T remove an advancement.
      if (!(adding === -1 && this.state.fighting <= 0)) {
        this.setState({ advancements: this.state.advancements - adding })
      }
      if (this.state.advancements <= 0 && adding === 1 && this.state.fighting >= 0) return;
      this.setState({ fighting: this.state.fighting + adding })
    }
    else if (type === "intelligence") {
      //if we're subtracting to a negative number, DON'T remove an advancement.
      if (!(adding === -1 && this.state.intelligence <= 0)) {
        this.setState({ advancements: this.state.advancements - adding })
      }
      if (this.state.advancements <= 0 && adding === 1 && this.state.intelligence >= 0) return;
      this.setState({ intelligence: this.state.intelligence + adding })
    }
    else if (type === "perception") {
      //if we're subtracting to a negative number, DON'T remove an advancement.
      if (!(adding === -1 && this.state.perception <= 0)) {
        this.setState({ advancements: this.state.advancements - adding })
      }
      if (this.state.advancements <= 0 && adding === 1 && this.state.perception >= 0) return;
      this.updateAccuracyWeaponDamageMod(this.state.perception, this.state.perception + adding, false)
      this.setState({ perception: this.state.perception + adding })
    }
    else if (type === "strength") {
      //if we're subtracting to a negative number, DON'T remove an advancement.
      if (!(adding === -1 && this.state.strength <= 0)) {
        this.setState({ advancements: this.state.advancements - adding })
      }
      if (this.state.advancements <= 0 && adding === 1 && this.state.strength >= 0) return;
      this.updateFightingWeaponDamageMod(this.state.strength, this.state.strength + adding, true)
      this.setState({ strength: this.state.strength + adding })
    }
    else if (type === "willpower") {
      //if we're subtracting to a negative number, DON'T remove an advancement.
      if (!(adding === -1 && this.state.willpower <= 0)) {
        this.setState({ advancements: this.state.advancements - adding })
      }
      if (this.state.advancements <= 0 && adding === 1 && this.state.willpower >= 0) return;
      this.updateAccuracyWeaponDamageMod(this.state.willpower, this.state.willpower + adding, true)
      this.setState({ willpower: this.state.willpower + adding })
    }
  }

  render() {
    return (
      <div>
        <Table>
          <TableRow>
            <TableCell style={{ width: '40%' }}>
              <form onSubmit={this.handleSubmit}>        <label>
                Name:
                <input type="text" value={this.state.name} onChange={this.handleNameChange} /></label>
                <br></br>
                <label>
                  Threat Level:
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
                <br></br><br></br>
                <label>
                  <text>Weapons</text>
                  <Table>
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
                  </Table>
                  <label>
                    Weapon Focuses
                    <br></br>
                    <Select
                      defaultValue={[]}
                      isMulti
                      placeholder="Focuses"
                      closeMenuOnSelect={false}
                      name="Focuses"
                      options={this.weaponFocuses}
                      className="focuses-multi-select"
                      classNamePrefix="focus-select"
                      onChange={this.updateWeaponFocuses}
                    />
                  </label>
                </label>

                <label>

                  <br></br><br></br>
                  <text>
                    This adversary can have between {this.threatLevels[this.state.selectedThreatLevel].value[0]} and {this.threatLevels[this.state.selectedThreatLevel].value[1]} stat advancements.
                  </text>
                  <br></br>
                  <text>TOTAL ADVANCEMENTS: {Math.max(0, this.state.accuracy) + Math.max(0, this.state.communication) + Math.max(0, this.state.constitution) + Math.max(0, this.state.dexterity) + Math.max(0, this.state.fighting) + Math.max(0, this.state.intelligence) + Math.max(0, this.state.perception) + Math.max(0, this.state.strength) + Math.max(0, this.state.willpower)} / {this.state.totalAdvancements}</text>

                </label>



                <br></br>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ width: '10%' }}>
                        <button onClick={(e) => { this.increment(e, "accuracy", -1) }}>
                          -
                        </button>
                      </TableCell>
                      <TableCell style={{ width: '10%' }}>
                        <center>Accuracy</center>
                      </TableCell>
                      <TableCell style={{ width: '10%' }}>
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
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "communication", -1) }}>
                          -
                        </button>
                      </TableCell>
                      <TableCell>
                        <center>Communication</center>
                      </TableCell>
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "communication", 1) }}>
                          +
                        </button>
                      </TableCell>
                      <TableCell>{this.state.communication}</TableCell>
                      <TableCell>
                        <text style={{ fontSize: 10 }}>Can they talk?</text>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "constitution", -1) }}>
                          -
                        </button>
                      </TableCell>
                      <TableCell>
                        <center>Constitution</center>
                      </TableCell>
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "constitution", 1) }}>
                          +
                        </button>
                      </TableCell>
                      <TableCell>{this.state.constitution}</TableCell>
                      <TableCell>
                        <text style={{ fontSize: 10 }}>The more constitution the more health, so it should be high for higher threats.</text>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "dexterity", -1) }}>
                          -
                        </button>
                      </TableCell>
                      <TableCell>
                        <center>Dexterity</center>
                      </TableCell>
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "dexterity", 1) }}>
                          +
                        </button>
                      </TableCell>
                      <TableCell>{this.state.dexterity}</TableCell>
                      <TableCell>
                        <text style={{ fontSize: 10 }}>4 Dexterity is very good, 6 is extraordinary. Anything higher is annoying.</text>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "fighting", -1) }}>
                          -
                        </button>
                      </TableCell>
                      <TableCell>
                        <center>Fighting</center>
                      </TableCell>
                      <TableCell>
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
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "intelligence", -1) }}>
                          -
                        </button>
                      </TableCell>
                      <TableCell>
                        <center>Intelligence</center>
                      </TableCell>
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "intelligence", 1) }}>
                          +
                        </button>
                      </TableCell>
                      <TableCell>{this.state.intelligence}</TableCell>
                      <TableCell>
                        <text style={{ fontSize: 10 }}>Can they think?</text>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "perception", -1) }}>
                          -
                        </button>
                      </TableCell>
                      <TableCell>
                        <center>Perception</center>
                      </TableCell>
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "perception", 1) }}>
                          +
                        </button>
                      </TableCell>
                      <TableCell>{this.state.perception}</TableCell>
                      <TableCell>
                        <text style={{ fontSize: 10 }}>If they use accuracy weapons this should be high.</text>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "strength", -1) }}>
                          -
                        </button>
                      </TableCell>
                      <TableCell>
                        <center>Strength</center>
                      </TableCell>
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "strength", 1) }}>
                          +
                        </button>
                      </TableCell>
                      <TableCell>{this.state.strength}</TableCell>
                      <TableCell>
                        <text style={{ fontSize: 10 }}>If they use fighting weapons this should be high.</text>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "willpower", -1) }}>
                          -
                        </button>
                      </TableCell>
                      <TableCell>
                        <center>Willpower</center>
                      </TableCell>
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "willpower", 1) }}>
                          +
                        </button>
                      </TableCell>
                      <TableCell>{this.state.willpower}</TableCell>
                      <TableCell>
                        <text style={{ fontSize: 10 }}>The higher this is the less likely they are to run from a fight.</text>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

              </form>
            </TableCell>
            <TableCell style={{ height: "100%", verticalAlign: "Top" }}>
              <text>{this.state.name}</text>
              {this.state.accuracyWeapons.map((weapon) => (<li>{weapon.value} ({weapon.weaponGroup}), {weapon.damage} + {weapon.mod}</li>))};
              {this.state.fightingWeapons.map((weapon) => (<li>{weapon.value} ({weapon.weaponGroup}), {weapon.damage} + {weapon.mod}</li>))};
            </TableCell>
          </TableRow>
        </Table>
        <br></br>
      </div>

    );
  }
}

export default App;
