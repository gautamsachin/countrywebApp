import { ControlLabel, FormControl, FormGroup, Col, Form } from 'react-bootstrap';
import React, { Component } from "react";
import Box, {
  BoxBody,
  BoxHeader,
  BoxFooter,
  BoxTools,
  BoxTitle
} from "../common/ExtendedBox";
import { fetchCountriesRequest,deleteCountryRequest, saveCountryRequest } from "../countries/actions";
import { connect } from "react-redux";

class AddCountry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            schema: [
                'name',
                'capital',
                'area'
            ],
            model: {
                'name': '',
                'capital': '',
                'area':''
            },
            cancelFlag: false
        }
    }

    enterInput(val, e) {
        this.setState({
            cancelFlag: false
        })
        var a = this.state.model;
        Object.keys(a).map((elem, ind) => {
            if (elem == val) {
                a[elem] = e.target.value
            }
        });
        this.setState({
            model: a
        })
    }
    saveCountryData = (model) => {
        this.props.saveCountryData(model);
      }
    
    handleSave(e){
        e.preventDefault();
        console.log('insidethe sae',this.state.model);
        this.saveCountryData(this.state.model);

    }
    handleCancel(){
        this.setState({
            cancelFlag: true,
            model:{
                'Id': '',
                'Name': '',
                'Code': ''
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps.countries[0]);
        let model = {...nextProps.countries[0]}
        this.setState({model});
        //
    }
    componentDidMount(){
        const id = this.props.routeParams.id;
        this.fetchCountries(id);
    }

    fetchCountries = (id) => {
        this.props.fetchCountriesRequest(id);
      }

    render() {
        return (
            <Form horizontal>
                {this.state.schema.map((el, il) => {
                    return (
                        <FormGroup key={il}>
                             <Col componentClass={ControlLabel} sm={2}>
                             {el} 
                                </Col>
                                <Col sm={10}>
                            <FormControl
                                onChange={this.enterInput.bind(this, el)}
                                componentClass="input"
                                placeholder={`Enter ${el}`}
                                value={this.state.cancelFlag ? '' : this.state.model[el]}
                            >
                            </FormControl>
                            </Col>
                        </FormGroup>
                    )
                })}
                <button className="btn btn-primary" onClick={this.handleSave.bind(this)}>Save</button>
                <button className="btn btn-primary" onClick={this.handleCancel.bind(this)}>Cancel</button>
            </Form>
        )
    }
}

const mapStateToProps = ({country}) => ({
    countries: country.countries || [],
    requesting: country.requesting
  });
  
  const mapDispatchProps = dispatch => ({
    fetchCountriesRequest: (id,skip, limit) =>{
      dispatch(fetchCountriesRequest(id,skip, limit))
  
    },
    deleteCountryById:(id,skip,limit)=>{
      dispatch(deleteCountryRequest(id,skip,limit))
    }
  });


export default connect(
    mapStateToProps,
    mapDispatchProps
  )(AddCountry);