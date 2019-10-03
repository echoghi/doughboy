import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import OptionsIcon from '../Icons/OptionsIcons';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import { MenuItem } from '../Notes/styles';
import { MealMenuWrapper } from './styles';
import { copyMeal, successNotification } from '../actions';
import { Meal, RootState } from '../types';

const mapDispatchToProps = {
    copyMeal: (meal: Meal) => copyMeal(meal),
    successMessage: (message?: string) => successNotification(message)
};

const mapStateToProps = (state: RootState) => ({
    userData: state.adminState.userData
});

interface MealMenu extends RouteComponentProps {
    copyMeal: (meal: Meal) => void;
    data: Meal;
    remove: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    edit: () => void;
    successMessage: (message?: string) => void;
}

function MealMenu({ remove, history, data, copyMeal, edit, successMessage }: MealMenu) {
    const [open, handleMenu] = useState(false);
    const toggleMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation();
        handleMenu(!open);
    };

    const copy = () => {
        copyMeal(data);
        closeMenu();
        window.scrollTo(0, 200);
        // prettier-ignore
        successMessage('Meal copied to today\'s form!');

        if (history.location.search) {
            history.push({ pathname: '/nutrition', search: '' });
        }
    };

    const editMeal = () => {
        edit();
        copyMeal(data);
        closeMenu();
        window.scrollTo(0, 200);
    };

    const closeMenu = () => {
        if (open) {
            handleMenu(false);
        }
    };

    return (
        <ClickAwayListener onClickAway={closeMenu}>
            <div>
                <IconButton onClick={toggleMenu}>
                    <OptionsIcon />
                </IconButton>
                {open && (
                    <MealMenuWrapper>
                        <MenuItem onClick={editMeal}>
                            Edit <i className="icon-edit" />
                        </MenuItem>
                        {history.location.search && (
                            <MenuItem onClick={copy}>
                                Copy <i className="icon-file-plus" />
                            </MenuItem>
                        )}
                        <MenuItem onClick={remove}>
                            Delete <i className="icon-trash-2" />
                        </MenuItem>
                    </MealMenuWrapper>
                )}
            </div>
        </ClickAwayListener>
    );
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MealMenu)
);
