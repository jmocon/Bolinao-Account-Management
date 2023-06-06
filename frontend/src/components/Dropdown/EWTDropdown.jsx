import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import { getEWTs } from 'api/ewt';
import selectStyle from './constant/selectStyle';

const EWTDropdown = ({ label, value, onChange }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchEWTs = async () => {
      let ewtList;
      try {
        ewtList = await getEWTs();
      } catch (error) {
        console.error(error);
      }

      const optionList = ewtList.map((ewt) => ({
        label: ewt.atc,
        value: ewt.ewtId
      }));

      setOptions(optionList);
    };
    fetchEWTs();
  }, []);

  useEffect(() => {
    setSelected(options.find((option) => option.value === value))
  },[options, value])


  return (
    <Select
      styles={selectStyle}
      isSearchable
      label={label}
      options={options}
      value={selected}
      onChange={({ value }) => onChange(value)}
    />
  );
};

export default EWTDropdown;
