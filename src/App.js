import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
      willpower: 0
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleThreatLevelChange = this.handleThreatLevelChange.bind(this);
    this.handleRandomizeChange = this.handleRandomizeChange.bind(this);
    this.increment = this.increment.bind(this);
  }

  //threatLevels = ['Minor', 'Moderate', 'Major', 'Dire', 'Legendary'];
  //values are the number of ability advancements it gets, as a range
  threatLevels = [{ label: 'Minor', value: [10, 20] }, { label: 'Moderate', value: [12, 30] }, { label: 'Major', value: [15, 35] }, { label: 'Dire', value: [15, 40] }, { label: 'Legendary', value: [20, 40] }]

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
      this.setState({ perception: this.state.perception + adding })
    }
    else if (type === "strength") {
      //if we're subtracting to a negative number, DON'T remove an advancement.
      if (!(adding === -1 && this.state.strength <= 0)) {
        this.setState({ advancements: this.state.advancements - adding })
      }
      if (this.state.advancements <= 0 && adding === 1 && this.state.strength >= 0) return;
      this.setState({ strength: this.state.strength + adding })
    }
    else if (type === "willpower") {
      //if we're subtracting to a negative number, DON'T remove an advancement.
      if (!(adding === -1 && this.state.willpower <= 0)) {
        this.setState({ advancements: this.state.advancements - adding })
      }
      if (this.state.advancements <= 0 && adding === 1 && this.state.willpower >= 0) return;
      this.setState({ willpower: this.state.willpower + adding })
    }
  }

  render() {
    return (
      <div>
        <Table>
          <TableRow>
            <TableCell>
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


                  <br></br><br></br>
                  <text>
                    This adversary can have between {this.threatLevels[this.state.selectedThreatLevel].value[0]} and {this.threatLevels[this.state.selectedThreatLevel].value[1]} stat advancements.
                  </text>
                  <br></br>
                  <text>TOTAL ADVANCEMENTS: {Math.max(0, this.state.accuracy) + Math.max(0, this.state.communication) + Math.max(0, this.state.constitution) + Math.max(0, this.state.dexterity) + Math.max(0, this.state.fighting) + Math.max(0, this.state.intelligence) + Math.max(0, this.state.perception) + Math.max(0, this.state.strength) + Math.max(0, this.state.willpower)} / {this.state.totalAdvancements}</text>

                </label>

                <br></br>
                <Table sx={{ maxWidth: 550 }}>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "accuracy", -1) }}>
                          -
                        </button>
                      </TableCell>
                      <TableCell>
                        <center>Accuracy</center>
                      </TableCell>
                      <TableCell>
                        <button onClick={(e) => { this.increment(e, "accuracy", 1) }}>
                          +
                        </button>
                      </TableCell>
                      <TableCell>{this.state.accuracy}</TableCell>
                      <TableCell>
                        <text style={{ fontSize: 10} }>Should be between +3 and +6 if the adversary attacks with this stat.</text>
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
                        <text style={{ fontSize: 10}}>Can they talk?</text>
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
                        <text style={{ fontSize: 10}}>The more constitution the more health, so it should be high for higher threats.</text>
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
                        <text style={{ fontSize: 10}}>4 Dexterity is very good, 6 is extraordinary. Anything higher is annoying.</text>
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
                        <text style={{ fontSize: 10}}>Should be between +3 and +6 if the adversary attacks with this stat.</text>
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
                        <text style={{ fontSize: 10}}>Can they think?</text>
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
                        <text style={{ fontSize: 10}}>If they use accuracy weapons this should be high.</text>
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
                        <text style={{ fontSize: 10}}>If they use fighting weapons this should be high.</text>
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
                        <text style={{ fontSize: 10}}>The higher this is the less likely they are to run from a fight.</text>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

              </form>
            </TableCell>
            <TableCell>
              <text>{this.state.name}</text>
            </TableCell>
          </TableRow>
        </Table>
        <br></br>
      </div>

    );
  }
}

export default App;
