import React from 'react';

export default class Form extends React.Component {
    state = {
        name: "",
        designation: "",
        skills: [{skills: ""}],
        contact: [{ type: "", contact: "" }]
    };
    EmployeeState = [];

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleChangeContact(i, e) {
        const { name, value } = e.target;
        let contact = [...this.state.contact];
        contact[i] = { ...contact[i], [name]: value };
        this.setState({ contact });
    }
    handleChangeSkills(i, e) {
        const { name, value } = e.target;
        let skills = [...this.state.skills];
        skills[i] = { ...skills[i], [name]: value };
        this.setState({ skills });
    }

    onSubmit = (e) => {
        this.props.onSubmit(this.state)
        e.preventDefault();


    }

    addEmp = (e) => {
        this.EmployeeState.push(this.state)
        console.log(this.EmployeeState);
        e.preventDefault();
        this.setState ({name: "",
        designation: "",
        skills: [{skills: ""}],
        contact: [{ type: "", contact: "" }]});
    }

    constructor(props) {
        super(props);
    }

    addContact() {
        this.setState(prevState => ({
            contact: [...prevState.contact, { type: "", contact: "" }]
        }))
    }

    addskills() {
        this.setState(prevState => ({
            skills: [...prevState.skills, { skills: "" }]
        }))
    }

    createUI() {
        return this.state.contact.map((el, i) => (
            <div key={"contact" + i}>
                <div >

                    <input type="text" placeholder="Type" name="type" value={el.type || ''} onChange={this.handleChangeContact.bind(this, i)} />
                    <input type="text" placeholder="Contact" name="contact" value={el.contact || ''} onChange={this.handleChangeContact.bind(this, i)} />

                </div>
                <input type='button' value='add more' onClick={this.addContact.bind(this)} />
            </div>
        ))
    }
    skills() {
        return this.state.skills.map((l, j) => (
            <div key={"skills" + j}>
                <div >

                    <input type="text" placeholder="Skills" name="skills" value={l.skills || ''}
                        onChange={this.handleChangeSkills.bind(this, j)}
                    />

                </div>
                <input type='button' value='add' onClick={this.addskills.bind(this)} />
            </div>
        ))
    }



    render() {
        return (
            <div>
                <h3 style={{ textAlign: "center" }}>Employee Data</h3>
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
                    <br />
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
                    <br />
                    <div>
                        <div style={{ width: "200px", float: "left" }}>
                            <label>Conact Details</label>
                        </div>
                        {this.createUI()}
                        
                    </div>
                    <br />
                    <div>
                        <div style={{ width: "200px", float: "left" }}>
                            <label>Skills</label>
                        </div>
                        {this.skills()}
                        
                    </div>
                    <br />
                    <div>
                        <button onClick={e => this.onSubmit(e)}>Show Data</button>
                    </div>
                    <div>
                        <button onClick={e => this.addEmp(e)}>Save Employee</button>
                    </div>
                </form>
            </div>
        )
    }
}