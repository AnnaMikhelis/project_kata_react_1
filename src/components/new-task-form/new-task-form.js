import React, { Component } from "react";
import '../new-task-form/new-task-form.css';

export default class NewTaskForm extends Component  {

      constructor (){
            super();
            this.state = {
                  label: ''
            }
      };

      onLableChange = (e) => {
           this.setState({
            label: e.target.value
           });
      };

      
      onSubmit = (e) => {
            e.preventDefault();
            this.props.onAdd(this.state.label)
            this.setState({
                  label: ''
            })
      }
      render () {
            
          return (
            
            <form 
            onSubmit={this.onSubmit}>
          <input className="new-todo" 
          placeholder="What needs to be done?" 
          autoFocus 
          onChange = {this.onLableChange}
          value = {this.state.label}/>
          </form>
        
    );
      }
  };

