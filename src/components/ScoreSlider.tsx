import React, {useState} from 'react';
// @ts-ignore
import Slider from '@material-ui/lab/Slider';

type P = {
    defaultScore: any,
    onChange: ((value: any) => {}) | null
}

function ScoreSlider(props: P) {
    const {defaultScore, onChange}: P = props;
    const [score, setScore] = useState((defaultScore || 0.8) * 100);
    return (
        <Slider
            value={score}
            aria-labelledby="label"
            onChange={(e: any, value: number) => {
                setScore(value);
                onChange && onChange(value / 100.0)
            }}
        />
    );
}

export default ScoreSlider;
