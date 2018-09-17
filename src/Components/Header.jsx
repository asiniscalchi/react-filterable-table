import React from 'react';
import DatePicker from 'react-datepicker'
import ExactFilters from './ExactFilters'; 
import 'react-datepicker/dist/react-datepicker.css'

class Header extends React.Component {
	constructor(props) {
		super(props)
		this.filterChanged = this.filterChanged.bind(this);
	}

	static get defaultProps() {
		// Set defaults if values weren't passed in
		return {
			recordCountName: "record",
			recordCountNamePlural: "records"
		}
	}


	filterChanged(event) {
		let newValue = event ? event.target.value : '';
		if (newValue.length === 0) {
			// When clearing filter, set focus in the text box
			this.refs.filter.focus();
		}
		this.props.updateFilter(newValue);
	}

	render() {
		if (this.props.visible === false) {
			return <div></div>;
		}
		const { loading, recordCount, filter, updateFilter, updatePageSize, pageSizes, onStartDateChange, onStopDateChange, startDate, stopDate, filteredEntries, workbook } = this.props;

		// Record count message -- the text at the top that says something like "4 records"
		// text can be overridden using the recordCountName and recordCountNamePlural props.
		const recordCountMessage = (
			<span>
				{recordCount} {recordCount === 1 ? this.props.recordCountName : this.props.recordCountNamePlural}
			</span>
		);

		let perPageSelect = this.props.pagersVisible !== false && this.props.pageSizes && this.props.pageSizes.length > 0
			?  <select className="form-control pull-sm-right pull-md-right pull-lg-right" onChange={updatePageSize} value={this.props.pageSize}>
					{this.props.pageSizes.map((p, i) =>
						<option value={p} key={i}>{p} per page</option>
					)}
				</select>
			: null;

		return (
			<div>
				{this.props.children}
				{this.props.upperHeaderChildren}
				<div className="row header-row">
					<div className="col-sm-3 filter-container">
						<DatePicker
							className="form-control filter-input"
							selected={startDate}
							placeholderText="select a start date"
							onChange={date => onStartDateChange && onStartDateChange(date)}
							isClearable={true}
							dateFormat="DD-MM-YYYY"
						/>
					</div>
					<div className="col-sm-3 filter-container">
						<DatePicker
							className="form-control filter-input"
							selected={stopDate}
							placeholderText="select a end date"
							onChange={date => onStopDateChange && onStopDateChange(date)}
							isClearable={true}
							dateFormat="DD-MM-YYYY"
						/>
					</div>
					<div className="col-sm-3 filter-container">
						<span className="filter-container">
							<input type="text" className="form-control filter-input" value={filter} onChange={this.filterChanged} ref="filter" placeholder="Filter" autoFocus={this.props.autofocusFilter} />
							<span className="close clear-filter" onClick={() => this.filterChanged('')}>
								&times;
							</span>
						</span>
					</div>
					{console.log(workbook)}
					{workbook && workbook(filteredEntries)}
				</div>
				{this.props.lowerHeaderChildren}
				<div className="row header-row">
					<div className="col-sm-2 text-center text-muted record-count">
						{loading || recordCountMessage}
					</div>
					<div className="col-sm-6">
						<ExactFilters
							exactFilters={this.props.exactFilters}
							removeExactFilter={this.props.removeExactFilter}
						/>
					</div>
					<div className="col-sm-4 hidden-xs">
						{this.props.pager}
					</div>
				</div>
			</div>
		);
	}
}

module.exports = Header;
