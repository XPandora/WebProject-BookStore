import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "../src/css/bootstrap.min.css";
import '../src/css/buttons.css';
import './Table.css';

var headers = ["Book", "Author", "Language", "Published", "Sales"];

var data = [
  [
    " The Lord of the Rings ", " J.R.R.Tolkien ", " English ", " 1954 - 1955 ", " 150 million "
  ],
  [
    " Le Petit Prince(The Little Prince)", " Antoine de Saint - Exupéry ", " French ", " 1943 ", " 140 million "
  ],
  [
    " Harry Potter and the Philosopher 's Stone", "J. K. Rowling", "English", "1997", "107 million"
  ],
  [
    "And Then There Were None", "Agatha Christie", "English", "1939", "100 million"
  ],
  [
    "Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100 million"
  ],
  [
    "The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"
  ],
  [
    "She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"
  ]
];

class Excel extends Component {
  constructor(props) {
    super(props);
    this.displayName = 'Excel';
    this.state = {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null, // [row index, cell index]
      search: false
    };
    this._sort = this._sort.bind(this);
    this._showEditor = this._showEditor.bind(this);
    this._save = this._save.bind(this);
    this._toggleSearch = this._toggleSearch.bind(this);
    this._search = this._search.bind(this);
    this._download = this._download.bind(this);
    this._renderTable = this._renderTable.bind(this);
    this._renderToolbar = this._renderToolbar.bind(this);
    this._renderSearch = this._renderSearch.bind(this);
  }

  _sort(e) {
    var column = e.target.cellIndex;
    var data = this.state.data.slice();
    var descending = this.state.sortby === column && !this.state.descending;
    data.sort(function (a, b) {
      return descending
        ? (
          a[column] < b[column]
            ? 1
            : -1)
        : (
          a[column] > b[column]
            ? 1
            : -1);
    });
    this.setState({ data: data, sortby: column, descending: descending });
  }

  _showEditor(e) {
    this.setState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex
      }
    });
  }

  _save(e) {
    e.preventDefault();
    var input = e.target.firstChild;
    var data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.setState({ edit: null, data: data });
  }

  _preSearchData = null;

  _toggleSearch() {
    if (this.state.search) {
      this.setState({ data: this._preSearchData, search: false });
      this._preSearchData = null;
    } else {
      this._preSearchData = this.state.data;
      this.setState({ search: true });
    }
  }

  _search(e) {
    var needle = e.target.value.toLowerCase();
    if (!needle) {
      this.setState({ data: this._preSearchData });
      return;
    }
    var idx = e.target.dataset.idx;
    var searchdata = this._preSearchData.filter(function (row) {
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
    });
    this.setState({ data: searchdata });
  }

  _download(format, ev) {
    var contents = format === 'json'
      ? JSON.stringify(this.state.data)
      : this.state.data.reduce(function (result, row) {
        return result + row.reduce(function (rowresult, cell, idx) {
          return rowresult + '"' + cell.replace(/"/g, '""') + '"' + (
            idx < row.length - 1
              ? ','
              : '');
        }, '') + "\n";
      }, '');
    var URL = window.URL || window.webkitURL;
    var blob = new Blob([contents], {
      type: 'text/' + format
    });
    ev.target.href = URL.createObjectURL(blob);
    ev.target.download = 'data.' + format;
  }

  render() {
    return (
      <div>
        {this._renderToolbar()}
        {this._renderTable()}
      </div>);
  }

  _renderToolbar() {
    return (<div className="toolbar">

      <button onClick={this._toggleSearch} class='button button-glow button-raised button-primary button-pill'>Search</button>
      <b class = "a-right">
        <a class="button button-border button-rounded button-primary" onClick={this._download.bind(this, 'json')} href="data.json">
          Export JSON
      </a>
        <a class="button button-border button-rounded button-primary" onClick={this._download.bind(this, 'csv')} href="data.csv">
          Export CSV</a>
      </b>
    </div>);
  }

  _renderSearch() {
    if (!this.state.search) {
      return null;
    }
    return (<tr onChange={this._search}>
      {
        this.props.headers.map(function (_ignore, idx) {
          return <td key={idx}>
            <input type="text" data-idx={idx} />
          </td>;
        })
      }
    </tr>);
  }

  _renderTable() {
    return (<table class="table table-hover">
      <thead onClick={this._sort} >
        <tr>{
          this.props.headers.map(function (title, idx) {
            if (this.state.sortby === idx) {
              title += this.state.descending
                ? ' \u2191'
                : ' \u2193';
            }
            return <th key={idx} >{title}</th>;
          }, this)
        }</tr>
      </thead>

      <tbody onDoubleClick={this._showEditor}>
        {this._renderSearch()}
        {
          this.state.data.map(function (row, rowidx) {
            return (<tr key={rowidx}>{
              row.map(function (cell, idx) {
                var content = cell;
                var edit = this.state.edit;
                if (edit && edit.row === rowidx && edit.cell === idx) {
                  content = (<form onSubmit={this._save}>
                    <input type="text" defaultValue={cell} />
                  </form>);
                }
                return <td key={idx} data-row={rowidx}>{content}</td>;
              }, this)
            }
            </tr>);
          }, this)
        }
      </tbody>
    </table>);
  }
}

Excel.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  initialData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};


class Table extends Component {
  render() {
    return (
      <div class="container content">
        <Excel initialData={data} headers={headers} />
      </div>
    );
  }
}

export default Table;
