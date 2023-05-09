import React, { useState, useEffect, useRef } from 'react';
// import axios from '../../Axios';
import Select from 'react-select';
import { Row, Col, Button } from 'reactstrap';

const Dropdown = ({
	list,
	setFirst,
	onChange,
	className = '',
	label,
	value,
	withAdd = false,
	AddComponent,
	addTitle = 'Add New'
}) => {
	const [item, setItem] = useState({ value: 0, label: '' });

	// Add Modal
	const [ddAdd, setDDAdd] = useState(true);
	const [modal, setModal] = useState(false);
	const toggleModal = () => {
		setModal(!modal);
		if (modal) {
			setDDAdd(!ddAdd);
		}
	};

	useEffect(() => {
		if (list && list.length > 0) {
			let i = list.find((e) => e.value === parseInt(value));
			if (i) {
				setItem(i);
			} else if (setFirst) {
				setItem(list[0]);
				onChange(list[0].value);
			}
		}
	}, [list, onChange, setFirst, value]);

	const handleChange = (e) => {
		setItem(e);
		onChange(e.value);
	};

	if (withAdd) {
		return (
			<Row>
				<Col className='pr-xs-0 pr-sm-1'>
					<Select
						className={className}
						classNamePrefix='sel_fc'
						isSearchable
						label={label}
						options={list}
						value={item}
						onChange={(e) => handleChange(e)}
					/>
				</Col>
				<Col className='pl-sm-0' sm='auto'>
					<Button
						color='info'
						title={addTitle}
						className='btn-icon w-100 m-sm-0'
						onClick={() => toggleModal()}>
						<i className='tim-icons icon-simple-add'></i>
					</Button>
					<AddComponent toggle={toggleModal} isOpen={modal} />
				</Col>
			</Row>
		);
	}

	return (
		<Select
			className={className}
			classNamePrefix='sel_fc'
			isSearchable
			label={label}
			options={list}
			value={item}
			onChange={(e) => handleChange(e)}
		/>
	);
};

export default React.memo(Dropdown);
