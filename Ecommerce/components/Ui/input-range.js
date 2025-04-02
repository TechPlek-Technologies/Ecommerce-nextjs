import { getTrackBackground, Range } from 'react-range';

const InputRange = ({ STEP, MIN, MAX, values, handleChanges }) => {
  return (
    <>
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(vals) => handleChanges(vals)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            key="track"
            style={{
              ...props.style,
              height: '3px',
              width: '100%',
              background: getTrackBackground({
                values: values,
                colors: ['#96AE00', '#96AE00', '#96AE00'],
                min: MIN,
                max: MAX
              })
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            {...props}
            key={`thumb-${index}`}
            style={{
              ...props.style,
              height: '17px',
              width: '5px',
              backgroundColor: '#96AE00'
            }}
          />
        )}
      />
    </>
  );
};

export default InputRange;
