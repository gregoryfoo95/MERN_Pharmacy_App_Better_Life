import { useCallback } from 'react';
import { useUncontrolled } from 'uncontrollable';

const CheckBox = props => {
  const { onChange, checked, text, id, ...controlledProps } = useUncontrolled(
    props,
    {
      checked: 'onChange',
    }
  );

  const handleOnChange = useCallback(
    () => onChange?.(!checked),
    [checked, onChange]
  );

  return (
    <div className="form-check form-switch">
      <input
        checked={checked}
        onChange={handleOnChange}
        id={id}
        className="form-check-input"
        type="checkbox"
        {...controlledProps}
      />
      <label className="form-check-label" htmlFor={id}>
        {text}
      </label>
    </div>
  );
};

export default CheckBox;
