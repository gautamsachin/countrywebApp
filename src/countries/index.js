import React, { Component } from "react";
import { GridView, GridViewColumn } from "../common/GridView";
import Box, {
  BoxBody,
  BoxHeader,
  BoxFooter,
  BoxTools,
  BoxTitle
} from "../common/ExtendedBox";
import { Button, Pager, Col, Checkbox } from "react-bootstrap";
import { fetchCountriesRequest,deleteCountryRequest } from "./actions";
import { connect } from "react-redux";
import {FormControl, Badge} from "react-bootstrap";

class CountriesList extends Component {
  state = {
    pageIndex: 1,
    fields:[
      {
        name:'name',
        label:"Name",
        visible:true
      },
      {
        name:'region',
        label:"Region",
        visible:true
      },
      {
        name:'capital',
        label:"Capital",
        visible:false
      },
      {
        name:'area',
        label:"Area",
        visible:false
      },
      {
        name:'topLevelDomain',
        label:"TopLevelDomain",
        visible:false
      },
      {
        name:'callingCodes',
        label:"CallingCodes",
        visible:false
      },
      {
        name:'languages',
        label:"Languages",
        visible:false
      },
      {
        name:'alpha2Code',
        label:"Alpha2Code",
        visible:false
      },
      {
        name:'alpha3Code',
        label:"Alpha3Code",
        visible:false
      },
      {
        name:'altSpellings',
        label:"alpha3Code",
        visible:false
      },

    ]   
  };


  limit = 20

  componentWillMount() {
    this.fetchCountries();
  }

  fetchCountries = () => {
    this.props.fetchCountriesRequest(
      
      '',
      this.limit * (this.state.pageIndex - 1),
      this.limit
    );
  }

  deleteCountryById = (id,skip,limit)=>{
    debugger;
    this.props.deleteCountryById(id,5,limit);
  }
  // onRowClick= (rowData)=>{

  // }
  nextClick = ()=>{
    this.setState({
      pageIndex:this.state.pageIndex + 1
    },()=>{
      this.fetchCountries();
    })
  }

  prevClick = ()=>{
    this.setState({
      pageIndex:this.state.pageIndex - 1
    },()=>{
      this.fetchCountries()
    })
  }

  deleteCountry(id){
    this.setState({
      pageIndex:this.state.pageIndex - 1
    },()=>{
      console.log('inisde tjheoe',this.limit)
      this.deleteCountryById(id,this.limit * (this.state.pageIndex - 1),
      this.limit)
    })
  }

  RowComponent = ({ columns, rowData,  onRowClick = ()=>{
        
  } }) => {
    const getContent = (rowData, column) => {
     
      let content = rowData[column.key];
      // if(column.key == 'altSpellings'){
      //   return  <h1>hello</h1>
      // }
      if(column.key === 'deleteBtn'){
            return <Button onClick={()=>this.deleteCountry(rowData._id)} bsStyle="warning"> Delete </Button>
      }
      
      if(column.key === 'editBtn'){
        return <Button onClick={()=>this.props.router.push('edit-country/'+rowData._id)} bsStyle="success"> Edit </Button>
      }

   if(Array.isArray(content)){
   return content.map((data,i)=><p key={i}>{data}</p>
  )
  }
  console.log(content);
      return content;
    };
    return (
      <tr key={rowData.id} onClick={() => onRowClick(rowData)}>
        {columns.map(column => (
          <td
            style={column.textAlign ? { textAlign: column.textAlign } : {}}
            key={column.key}
          >
            {getContent(rowData, column)}
          </td>
        ))}
      </tr>
    );
  };

  onFieldChange = (name,e)=>{
    const fields = this.state.fields.slice();
    const index = fields.findIndex(field=>field.name === name);
    if(index > -1){
      fields[index] = {...fields[index], visible: !fields[index].visible};
    }
    this.setState({
      fields
    })
  }

  render = () => (
    <Box noTopBorder>
      <BoxHeader>
        <BoxTitle>Countries</BoxTitle>
        <BoxTools>
          <Button 
          onClick={() => {
            console.log(this.props);
            this.props.router.push("add-country")
          }}
          >
            Add Country
          </Button>
        </BoxTools>
      </BoxHeader>

      <BoxBody>
        <Col sm={3}>
          {this.state.fields.map((field,i)=>(
               <Col key={i} sm={12}>
                <Checkbox checked={field.visible} onChange={this.onFieldChange.bind(this, field.name)}>{field.label}</Checkbox>
               </Col>
          ))}
        
        </Col>
        <Col sm={9}>
        <GridView items={this.props.countries} RowComponent={this.RowComponent}>
          
          {this.state.fields.map((field,i)=>{
            return field.visible ? (
            <GridViewColumn propKey={field.name} label={field.label} />
          ) : null
        })}
        <GridViewColumn propKey='deleteBtn' label= "" />
        <GridViewColumn propKey='editBtn' label= "" />


          {/* <GridViewColumn propKey="capital" label="capital" />
          <GridViewColumn propKey="region" label="Region" />
          <GridViewColumn propKey="alpha2Code" label="Alpha2Code" />
          <GridViewColumn propKey="alpha3Code" label="Alpha3Code" />
          <GridViewColumn propKey="callingCodes" label="CallingCodes" />
          <GridViewColumn propKey="altSpellings" label="AltSpellings" />
          <GridViewColumn propKey="subregion" label="Subregion" />
          <GridViewColumn propKey="population" label="population" />
          <GridViewColumn propKey="borders" label="borders" />
          <GridViewColumn propKey="nativeName" label="nativeName" />
          <GridViewColumn propKey="numericCode" label="numericCode" />
          <GridViewColumn propKey="currencies" label="currencies" />
          <GridViewColumn propKey="languages" label="languages" />
          <GridViewColumn propKey="demonym" label="demonym" />
          <GridViewColumn propKey="topLevelDomain" label="TopLevelDomain" /> */}
          

          
        </GridView>
       </Col> 
      </BoxBody>
      <BoxFooter>
        <Pager bsClass="pagination">
          <Pager.Item disabled={this.state.pageIndex === 1}  onClick={this.prevClick} href="#">
            Previous
          </Pager.Item>
          <Pager.Item onClick={this.nextClick} href="#">
            Next
          </Pager.Item>
        </Pager>
      </BoxFooter>
    </Box>
  );
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
)(CountriesList);
