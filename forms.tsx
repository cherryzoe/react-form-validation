import React, { useState, useEffect } from 'react';
import { formConfiguration } from './configurations';
import './style.css';

const Form = () => {
  const [formState, setFormState] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const constructFormState = () => {
    let prepareObj = {};
    formConfiguration.forEach((e) => {
      prepareObj[e.stateField] = {
        value: e.stateDefault,
        error: null,
      };
    });
    setFormState(prepareObj);
  };

  const handleText = (event, item) => {
    const updatedFormState = {
      ...formState,
      [item.stateField]: {
        value: event.target.value,
        error: null,
      },
    };
    setFormState(updatedFormState);
  };

  const validateFristName = (firstname) => {
    if (firstname.length < 3) {
      const updatedFormState = {
        ...formState,
        firstName: {
          ...formState['firstName'],
          error: 'Your first name is not valid',
        },
      };
      setFormState(updatedFormState);
      return false;
    }
    return true;
  };

  const validateLastName = (lastname) => {
    if (lastname.length < 3) {
      const updatedFormState = {
        ...formState,
        firstName: {
          ...formState['lastName'],
          error: 'Your last name is not valid',
        },
      };
      setFormState(updatedFormState);
      return false;
    }
    return true;
  };

  const validate = () => {
    let updatedState = { ...formState };
    const { firstName, lastName, emailAddress, password, confirmPassword } =
      updatedState;
    // first name
    if (!validateFristName(firstName.value)) return false;
    // last name
    if (!validateLastName(lastName.value)) return false;
    // email

    // password

    // comfirm password
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    isValid === true ? setIsSuccess(true) : setIsSuccess(false);
  };

  useEffect(() => {
    constructFormState();
  }, []);

  return (
    <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
      {formConfiguration.map((e) => (
        <div className="form-element">
          <label className="label">{e.label}</label>
          <input
            className="input"
            placeholder={e.placeholder}
            value={formState?.[e.stateField]?.value}
            onChange={(event) => handleText(event, e)}
          />
          {formState?.[e?.stateField].error && (
            <small className="error">{formState?.[e?.stateField].error}</small>
          )}
        </div>
      ))}

      <button type="submit" className="button">
        Register
      </button>
      {isSuccess && <p className="success">form has ben submitted</p>}
    </form>
  );
};

export default Form;
