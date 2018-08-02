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

class CountriesList extends Component {
  state = {
    pageIndex: 1
  };

  limit = 20;

  componentWillMount() {
    this.fetchCountries();
  }

  fetchCountries = () => {
    this.props.fetchCountriesRequest(
      this.limit * (this.state.limit - 1),
      this.limit
    );
  }

  RowComponent = () => {
    const getContent = (rowData, column) => {
      let content = rowData[column.key];
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
        <BoxTools>
          <Button onClick={() => this.props.location.push("countries/add")}>
            Add Country
          </Button>
        </BoxTools>
      </BoxHeader>

      <BoxBody>
        <GridView data={this.props.countries} RowComponent={this.RowComponent}>
          <GridViewColumn propKey="name" label="Name" />
        </GridView>
      </BoxBody>
      <BoxFooter>
        <Pager>
          <Pager.Item disabled={this.state.pageIndex === 1} href="#">
            Previous
          </Pager.Item>
          <Pager.Item onClick={this.fetchCountries} href="#">
            Next
          </Pager.Item>
        </Pager>;
      </BoxFooter>
    </Box>
  );
}

const mapStateToProps = ({ country }) => ({
  countries: country.countries,
  requesting: country.requesting
});

const mapDispatchProps = dispatch => ({
  fetchCountriesRequest: (skip, limit) =>
    dispatch(fetchCountriesRequest(skip, limit))
});

export default connect(
  mapStateToProps,
  mapDispatchProps
)(CountriesList);
