import React from 'react';

export default class Form extends React.Component {
    state = {
        name: "",
        designation: "",
        skills: [{ skills: "" }],
        contact: [{ type: "", contact: "" }],
        DOB: ""
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


    addEmp = (e) => {
        this.EmployeeState.push(this.state)
        console.log(this.EmployeeState);
        e.preventDefault();
        this.setState({
            name: "",
            designation: "",
            skills: [{ skills: "" }],
            contact: [{ type: "", contact: "" }],
            DOB: "",
        });
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

    contact() {
        return this.state.contact.map((el, i) => (
            <div key={"contact" + i}>
                <div >

                    <input type="text" placeholder="Type" name="type" value={el.type || ''} onChange={this.handleChangeContact.bind(this, i)} />
                    <input type="number" placeholder="Contact" name="contact" value={el.contact || ''} onChange={this.handleChangeContact.bind(this, i)} />

                </div>

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

            </div>
        ))
    }

    showEmpDet() {
        var dom = document.getElementById("employeeDetailsDiv");
        var dom2 = document.getElementById("employeeDetailsToggle");

        if (dom.style.visibility === "hidden") {
            dom.style.visibility = "visible";
            dom.style.display = "block";
            dom2.innerHTML = "Hide Emp Data";
        }
        else {
            dom.style.visibility = "hidden";
            dom.style.display = "none";
            dom2.innerHTML = "View Emp Data";
        }

    }
    DownloadJSON() {
        console.log("test")
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.EmployeeState));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "empdata.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    viewEmpDet() {
        return (
            <div>
                {this.EmployeeState.map((empData, i) => (
                    <div>
                        <p>Employee #{i + 1}</p>
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{empData.name}</td>
                                </tr>
                                <tr>
                                    <td>Designation</td>
                                    <td>{empData.designation}</td>
                                </tr>
                                <tr>
                                    <td>Contact</td>
                                    <td>
                                        {empData.contact.map((cont) => (
                                            <div>
                                                {cont.type} - {cont.contact}
                                                <br />
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Skills</td>
                                    <td>
                                        {empData.skills.map((skill) => (
                                            <div>
                                                {skill.skills}
                                                <br />
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Date of Birth</td>
                                    <td>{empData.DOB}</td>
                                </tr>
                                
                            </tbody>
                        </table>
                        <hr />
                    </div>
                ))}
                <div style={{textAlign:"center"}}>
                <button style={{padding:"1%"}} onClick={e => this.DownloadJSON(e)}>Download Data</button>
                </div>
            </div>

        )
    }



    render() {
        return (
            <div>
                <h3 style={{ textAlign: "center" }}>Employee Data</h3>
                <form>
                    <div style={{ marginTop: "3%", marginLeft: "2%", padding: "2%", width: "50%", border: "1px solid #000", margin: "0 auto", backgroundColor: "#e6e6e675" }}>
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>
                                        <input
                                            name="name"
                                            placeholder="Name" value={this.state.name}
                                            onChange={e => this.change(e)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Designation</td>
                                    <td>
                                        <input
                                            name="designation"
                                            placeholder="Designation" value={this.state.designation}
                                            onChange={e => this.change(e)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Conact Details</td>
                                    <td>
                                        {this.contact()}
                                    </td>
                                    <td>
                                        <input type='button' value='add more' onClick={this.addContact.bind(this)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Skills</td>
                                    <td>
                                        {this.skills()}
                                    </td>
                                    <td>
                                        <input type='button' value='add' onClick={this.addskills.bind(this)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Date of Birth</td>
                                    <td>
                                        {/* <input type="date" id="start" name="trip-start"
       value="2018-07-22"
       min="1901-01-01" max="2020-12-31"/> */}
                                        <input name="DOB" value={this.state.DOB} type="date" onChange={e => this.change(e)} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ padding: "1%", textAlign: "center" }}>
                        <button onClick={e => this.addEmp(e)}>Add Employee</button>
                    </div>
                </form>

                <div style={{ padding: "1%", textAlign: "center" }}>
                    <button onClick={e => this.showEmpDet(e)} id="employeeDetailsToggle">View Emp Data</button>
                </div>

                <div>
                    <div style={{ marginTop: "3%", marginLeft: "2%", padding: "2%", width: "50%", border: "1px solid #000", margin: "0 auto", backgroundColor: "#e6e6e675", display: "none", visibility: "hidden" }} id="employeeDetailsDiv" >
                        {this.viewEmpDet()}
                    </div>
                </div>
            </div>
        )
    }
}