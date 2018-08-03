import { ControlLabel, FormControl, FormGroup, Col, Form } from 'react-bootstrap';
import React, { Component } from "react";
import Box, {
  BoxBody,
  BoxHeader,
  BoxFooter,
  BoxTools,
  BoxTitle
} from "../common/ExtendedBox";
import { fetchCountriesRequest,deleteCountryRequest, saveCountryData } from "../countries/actions";
import { connect } from "react-redux";
import { browserHistory } from 'react-router'

class AddCountry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            schema: [
                'name',
                'capital',
                'area',
                'demonym',
                'alpha2Code',
            ],
            model: {
                'name': '',
                'capital': '',
                'area':'',
                'demonym':'',
                "alpha2Code": '',
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
        this.saveCountryData(this.state.model);

    }
    handleCancel(e){
        e.preventDefault();
        browserHistory.push('/countries')
    }

    componentWillReceiveProps(nextProps) {
        let model = {...nextProps.countries[0]}
        this.setState({model});
        //
    }
    componentDidMount(){
        const id = this.props.routeParams.id;
       if(id) this.fetchCountries(id);
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
                <button className="btn btn-primary" onClick={this.handleCancel.bind(this)}>Back</button>
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
    saveCountryData:(model)=>{
      dispatch(saveCountryData(model))
    },
    
  });


export default connect(
    mapStateToProps,
    mapDispatchProps
  )(AddCountry);