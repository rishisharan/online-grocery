import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

const isEmpty = value => value.trim() === '';
const isNotTenChars = value => value.trim().length != 10;

const Checkout = props => {

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        phone: true
    });
    const nameInputRef = useRef();
    const phoneInputRef = useRef();

    const confirmHandler = (event) => { 
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredPhoneIsValid = !isEmpty(enteredPhone) && !isNotTenChars(enteredPhone);
        setFormInputsValidity({
            name: enteredNameIsValid,
            phone: enteredPhoneIsValid
        })
        const isFormValid = enteredNameIsValid && enteredPhoneIsValid;

        if (!isFormValid) {
            return; 
        }

        //Submit the data
        props.onConfirm({
            customerName: enteredName,
            phoneNumber: enteredPhone
        });
    };

    const nameControlledClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
    const phoneControlledClasses = `${classes.control} ${formInputsValidity.phone ? '' : classes.invalid}`;

    return (<form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlledClasses}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef} />
            {!formInputsValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={phoneControlledClasses}>
            <label htmlFor='phone'>Phone</label>
            <input type='text' id='phone' ref={phoneInputRef} />
            {!formInputsValidity.phone && <p>Please enter a valid phone!</p>}
        </div>
        <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
        </div>
    </form>);
};
export default Checkout;