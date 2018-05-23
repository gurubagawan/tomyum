import React, { Component } from 'react';
import './App.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

class EditContact extends Component {
  render () {
    var thisContact = this.props.contact; 
    const actions = [
  <FlatButton secondary={true} label="Cancel" onClick={() => this.props.handleEditContact()}/>,
  <FlatButton label="Save"  primary={true} onClick={()=> this.props.saveEdit()}/>,
];
    return (
      <div>
      <Dialog title="Modify Contact" actions={actions} modal={true} open={this.props.editingContact} >
          <TextField hintText='Your friend must have a name' defaultValue={thisContact ?  thisContact.firstName : ''} id='editFirst' underlineShow={false} />
          <Divider />
          <TextField hintText="Add a last name" defaultValue={thisContact ?  thisContact.lastName : '' } id='editLast' underlineShow={false} />
          <Divider />
          <TextField hintText='Add a phone number' defaultValue={thisContact ?  thisContact.number : '' } id='editPhone' underlineShow={false} />
          <Divider />
          <TextField hintText='Add an email address' defaultValue={thisContact ?  thisContact.email : ''} id='editEmail' underlineShow={false} />
          <Divider />
      </Dialog>
      </div>
    )
  }
}

export default EditContact;
