import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import EditContact from "./edit-contact";
import ContactInput from "./contact-input";
import RaisedButton from "material-ui/RaisedButton";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from "material-ui/Table";

const muiTheme = getMuiTheme({
	Table: {
		color: "#9b1222"
	}
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			contacts: [
				{
					email: "test@email.com",
					firstName: "Ajandan",
					lastName: "Bagawan",
					number: "90192192"
				},
				{
					email: "sam@email.com",
					firstName: "sam",
					lastName: "Smith",
					number: "90192192"
				}
			],
			open: false,
			editingContact: false,
			currentContact: 1,
			user: null
		};
		this.addContact = this.addContact.bind(this);
		this.deleteContact = this.deleteContact.bind(this);
		this.changeOpen = this.changeOpen.bind(this);
		this.sortContacts = this.sortContacts.bind(this);
		this.printList = this.printList.bind(this);
		this.editContact = this.editContact.bind(this);
		this.handleEditContact = this.handleEditContact.bind(this);
		this.saveEdit = this.saveEdit.bind(this);
	}

	//Functions related to Adding a New contact
	addContact(object) {
		let contactArray = this.state.contacts;
		let singleContact = {
			firstName: document.getElementById("firstname").value,
			lastName: document.getElementById("lastname").value,
			email: document.getElementById("email").value,
			number: document.getElementById("phone").value
		};
		contactArray.push(singleContact);
		this.setState({
			contacts: contactArray
		});
		this.changeOpen();
	}

	//Opens/closes box to add new contact. Useful to keep as seperate function, so it can be called on it's own when necessary
	changeOpen() {
		this.setState({
			open: !this.state.open
		});
	}

	//Functions Related to Editing a Contact
	handleEditContact() {
		this.setState({
			editingContact: !this.state.editingContact
		});
	}

	editContact(num) {
		this.setState({
			currentContact: num
		});
		this.handleEditContact();
	}

	saveEdit() {
		let location = this.state.currentContact;
		let oldList = this.state.contacts;
		let object = {
			firstName: document.getElementById("editFirst").value,
			lastName: document.getElementById("editLast").value,
			email: document.getElementById("editEmail").value,
			number: document.getElementById("editPhone").value
		};
		oldList.splice(location, 1, object);
		this.setState({
			contacts: oldList
		});
		this.handleEditContact();
	}

	//Functions Related to Deleting Contact
	deleteContact(num) {
		let shortList = this.state.contacts;
		shortList.splice(num, 1);
		this.setState({
			contacts: shortList
		});
	}

	searchContacts = (event, value) => {
		this.setState({
			query: value
		});
		let oldList = this.state.contacts;
		let searchedList = oldList.filter((contact, i) => {
			for (const prop in contact) {
				let str = String(contact[prop]);
				let query = String(this.state.query);
				let lowerStr = str.toLowerCase();
				let lowerQuery = query.toLowerCase();
				let n = lowerStr.localeCompare(lowerQuery);
				if (lowerStr.includes(lowerQuery)) {
					return contact;
				}
			}
		});
		searchedList.length !== 0
			? this.setState({ sortedList: searchedList })
			: "";
	};

	//Misceallaneous functions that stand on their own
	sortContacts(property) {
		let origList = this.state.contacts;
		function compare(a, b) {
			if (a[property] < b[property]) return -1;
			if (a[property] > b[property]) return 1;
			return 0;
		}
		let sortedList = origList.sort(compare);
		this.setState({
			contacts: sortedList
		});
	}

	//Good quick function useful in troubleshooting
	printList() {
		console.log(this.state.contacts);
	}
	render() {
		if (typeof this.state.sortedList != "undefined") {
			var mycontacts = this.state.sortedList;
		} else {
			var mycontacts = this.state.contacts;
		}
		//console.log(mycontacts)
		const contactList = mycontacts.map((contact, i) => {
			return (
				<TableRow key={i}>
					<TableRowColumn>{contact.firstName}</TableRowColumn>
					<TableRowColumn>{contact.lastName}</TableRowColumn>
					<TableRowColumn>{contact.number}</TableRowColumn>
					<TableRowColumn>{contact.email}</TableRowColumn>
					<TableRowColumn>
						{" "}
						<FlatButton
							label="Edit"
							primary={true}
							onClick={() => this.editContact(i)}
						/>
						<br />
						<FlatButton
							label="Delete"
							secondary={true}
							onClick={() => this.deleteContact(i)}
						/>
					</TableRowColumn>
				</TableRow>
			);
		});
		return (
			<div className="App">
				<MuiThemeProvider muiTheme={muiTheme}>
					<header>
						<AppBar title="My Contacts" />
					</header>
					<Table>
						<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
							<TableRow selectable={false}>
								<TableHeaderColumn>
									<FlatButton
										label="First Name"
										onClick={() => this.sortContacts("firstName")}
									/>{" "}
								</TableHeaderColumn>
								<TableHeaderColumn>
									<FlatButton
										label="Last Name"
										onClick={() => this.sortContacts("lastName")}
									/>{" "}
								</TableHeaderColumn>
								<TableHeaderColumn>
									<FlatButton
										label="Phone Number"
										onClick={() => this.sortContacts("number")}
									/>{" "}
								</TableHeaderColumn>
								<TableHeaderColumn>
									<FlatButton
										label="Email Address"
										onClick={() => this.sortContacts("email")}
									/>{" "}
								</TableHeaderColumn>
								<TableHeaderColumn>
									{" "}
									<RaisedButton
										label="Add New"
										labelColor="white"
										onClick={this.changeOpen}
									/>{" "}
								</TableHeaderColumn>
								<TableHeaderColumn>
									<TextField
										hintText="Seach"
										labelColor="white"
										onChange={this.searchContacts}
									/>{" "}
								</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={false}>{contactList}</TableBody>
					</Table>
					<ContactInput
						onDrop={this.onDrop}
						changeOpen={this.changeOpen}
						addContact={this.addContact}
						open={this.state.open}
						contacts={this.state.contacts}
					/>
					<EditContact
						editingContact={this.state.editingContact}
						saveEdit={this.saveEdit}
						handleEditContact={this.handleEditContact}
						contact={this.state.contacts[this.state.currentContact]}
					/>
					<br />{" "}
				</MuiThemeProvider>
			</div>
		);
	}
}

export default App;
