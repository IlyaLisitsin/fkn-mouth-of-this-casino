import React, { useState } from 'react';
import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css';
import './styles.css';

function BetRange({ changeBetValue }) {
    const [rangeValue, setRangeValue] = useState(0);

    const handleRangeChange = value => {
        setRangeValue(value);
        changeBetValue(value);
    };

    return (
        <InputRange
            maxValue={10}
            minValue={0}
            step={0.01}
            value={rangeValue}
            onChange={value => handleRangeChange(value)}
            onChangeComplete={value => setRangeValue(value)} />
    );
}



export default BetRange;
