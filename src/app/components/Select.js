import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './MaterialTheme';

function Select(props) {
    const { classes, required, label, name, id, style, options, error, onChange, value, defaultValue } = props;

    return (
        <FormControl>
            <InputLabel
                disableAnimation
                shrink
                error={error}
                classes={{ formControl: classes.selectLabel }}
                htmlFor={id}
            >
                {label}
            </InputLabel>
            <NativeSelect
                label={label}
                id={id}
                value={value}
                defaultValue={defaultValue}
                required={required}
                onChange={onChange}
                classes={{
                    root: classes.bootstrapRoot,
                    select: classes.select
                }}
                inputProps={{
                    name,
                    id
                }}
                style={style}
                disableUnderline
                IconComponent={props => (
                    <i
                        {...props}
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: 'calc(50% - 7px)',
                            pointerEvents: 'none'
                        }}
                        className="icon-chevron-down"
                    />
                )}
            >
                <option key="0" value="">
                    Select a Gender
                </option>
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    );
}

export default withStyles(styles)(Select);
