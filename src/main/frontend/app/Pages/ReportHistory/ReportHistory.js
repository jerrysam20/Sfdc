/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import './ReportHistory.css';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';

// const sample = [
//   { id: 1, title: 'Conan the Barbarian', year: '1982' },
//   { id: 2, title: 'Butterfly', year: '1991' }
// ];
const columns = [
  {
    name: 'Report ID',
    selector: 'reportId',
    sortable: true,
    center: true
  },
  {
    name: 'Total Count',
    selector: 'totalApplicationCount',
    sortable: true,
    center: true
  },
  {
    name: 'Total Red Count',
    selector: 'totalRedCount',
    sortable: true,
    center: true
  },
  {
    name: 'Total Green Count',
    selector: 'totalGreenCount',
    sortable: true,
    center: true
  },
  {
    name: 'Status',
    selector: 'overallStatus',
    sortable: true,
    center: true
  },
  {
    name: '',
    selector: 'overallStatus',
    sortable: true,
    cell: row => (
      <Button
        className="pill"
        variant="dark"
        onClick={() => {
          const { reportId = '' } = row;
          window.location.href = `/reports/${reportId}`;
        }}
      >
        View
      </Button>
    )
  }
];

class ReportHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showTable: true
    };
  }

  componentDidMount() {
    document.title = 'Report History';
    fetch('/getReport', {
      method: 'post',
      body: null
    })
      .then(res => res.json())
      .then(
        result => {
          const statusMapper = {
            RED: <div className="dot red"></div>,
            GREEN: <div className="dot green"></div>
          };
          const mappedData = result.map(item => {
            const status = item.overallStatus;
            return {
              ...item,
              overallStatus: statusMapper[status]
            };
          });
          this.setState({
            data: mappedData,
            showTable: true
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { data, showTable } = this.state;
    const customStyles = {
      headRow: {
        style: {
          border: 'none'
        }
      },
      headCells: {
        style: {
          color: '#202124',
          fontSize: '18px',
          fontWeight: '400'
        }
      },
      rows: {
        highlightOnHoverStyle: {
          backgroundColor: 'rgb(230, 244, 244)',
          borderBottomColor: '#FFFFFF',
          borderRadius: '25px',
          outline: '1px solid #FFFFFF'
        }
      },
      pagination: {
        style: {
          border: 'none'
        }
      }
    };
    let section = showTable ? (
      <div className="reporthistory-container">
        <h1>Report History</h1>
        <DataTable
          columns={columns}
          noHeader
          center
          highlightOnHover
          data={data}
          customStyles={customStyles}
          pagination="true"
          paginationPerPage="8"
        />
      </div>
    ) : (
      <div className="reporthistory-container">
        <h1>Report History</h1>
      </div>
    );
    return <div>{section}</div>;
  }
}

export default ReportHistory;
