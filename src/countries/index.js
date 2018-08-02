import React, { Component } from "react";
import { GridView, GridViewColumn } from "../common/GridView";
import Box, {
  BoxBody,
  BoxHeader,
  BoxFooter,
  BoxTools,
  BoxTitle
} from "../common/ExtendedBox";
import { Button, Pager } from "react-bootstrap";
import { fetchCountriesRequest } from "./actions";
import { connect } from "react-redux";
import {FormControl, Badge} from "react-bootstrap";

class CountriesList extends Component {
  state = {
    pageIndex: 1    

  };
  limit = 20

  componentWillMount() {
    this.fetchCountries();
  }

  fetchCountries = () => {
    this.props.fetchCountriesRequest(
      this.limit * (this.state.pageIndex - 1),
      this.limit
    );
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

  RowComponent = ({ columns, rowData,  onRowClick = ()=>{
        
  } }) => {
    const getContent = (rowData, column) => {
     
      let content = rowData[column.key];
      // if(column.key == 'altSpellings'){
      //   return  <h1>hello</h1>
      // }

   if(Array.isArray(content)){
   return content.map((data)=><p>{data}</p>
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

  render = () => (
    <Box noTopBorder>
      <BoxHeader>
        <BoxTitle>Countries</BoxTitle>
        {/* <BoxTools>
          <Button 
          // onClick={() => this.props.location.push("countries/add")}
          >
            Add Country
          </Button>
        </BoxTools> */}
      </BoxHeader>

      <BoxBody>
        <GridView items={this.props.countries} RowComponent={this.RowComponent}>
          <GridViewColumn propKey="name" label="CountryName" />
          <GridViewColumn propKey="capital" label="capital" />
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
          <GridViewColumn propKey="topLevelDomain" label="TopLevelDomain" />

          
        </GridView>
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
  fetchCountriesRequest: (skip, limit) =>{
    dispatch(fetchCountriesRequest(skip, limit))

  }
});

export default connect(
  mapStateToProps,
  mapDispatchProps
)(CountriesList);
