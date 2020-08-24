import React from 'react';

export default class Form extends React.Component {
    state = {
        name: "",
        designation: "",
        skills: "",
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        this.props.onSubmit(this.state)
        e.preventDefault();

        this.setState({
            name: "",
            designation: "",
            skills: "",
            contact: "",
            type: "",
        });

    }

    constructor(props) {
        super(props);
        this.state = {
            users: [{ firstName: "", lastName: "" }]
        };

    }

    addClick() {
        this.setState(prevState => ({
            users: [...prevState.users, { type: "", contact: "" }]
        }))
    }

    addskills() {
        this.setState(prevState => ({
            users: [...prevState.users, { skills: ""}]
        }))
    }

    createUI() {
        return this.state.users.map((el, i) => (
            <div key={i}>

                <input placeholder="Type" name="type" value={el.firstName || ''} onChange={this.handleChange.bind(this, i)} />
                <input placeholder="Contact" name="contact" value={el.lastName || ''} onChange={this.handleChange.bind(this, i)} />
                <input type='button' value='add more' onClick={this.addClick.bind(this)} />
            </div>
        ))
    }
    skills() {
        return this.state.users.map((l, j) => (
            <div key={j}>

                <input placeholder="Skills" name="skills" value={l.firstName || ''} onChange={this.handleChange.bind(this, j)} />
                <input type='button' value='add' onClick={this.addskills.bind(this)} />
                </div>
        ))
    }

    handleChange(i, e) {
        const { name, value } = e.target;
        let users = [...this.state.users];
        users[i] = { ...users[i], [name]: value };
        this.setState({ users });
    }

    render() {
        return (
            <div>
                <h3 style={{textAlign:"center"}}>Employee Data</h3>
            <form style={{ marginTop: "3%", marginLeft: "2%" }}>
                <div>
                    <div style={{ width: "200px", float: "left" }}>
                        <label>Name</label>
                    </div>
                    <input
                        name="name"
                        placeholder="Name" value={this.state.name}
                        onChange={e => this.change(e)}
                    />
                </div>
                <br/>
                <div>
                    <div style={{ width: "200px", float: "left" }}>
                        <label>Designation</label>
                    </div>
                    <input
                        name="designation"
                        placeholder="Designation" value={this.state.designation}
                        onChange={e => this.change(e)}
                    />
                </div>
                <br/>
                <div>
                    <div style={{ width: "200px", float: "left" }}>
                        <label>Conact Details</label>
                    </div>
                    {this.createUI()}
                    {/* <input type='button' value='add more' onClick={this.addClick.bind(this)} /> */}
                </div>
                <br/>
                <div>
                <div style={{ width: "200px", float: "left" }}>
                        <label>Skills</label>
                    </div>
                    {this.skills()}
                    {/* <input type='button' value='add' onClick={this.addskills.bind(this)} /> */}
                </div>
                <br/>
                <div>
                    <button onClick={e => this.onSubmit(e)}>Show Data</button>
                </div>
            </form>
            </div>
        )
    }
}