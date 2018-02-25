import React from 'react';
import { connect } from 'react-redux';
import { activatePage, resetNutritionData } from './actions';
import moment from 'moment';
// Components
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ReactTooltip from 'react-tooltip';
import ProgressBar from './ProgressBar.js';

const mapStateToProps = state => ({
    nutrition: state.navigationState.nutrition,
    data: state.adminState.data,
    activeDay: state.adminState.activeDay,
    loading: state.adminState.loading
});

const mapDispatchToProps = dispatch => ({
    activatePage: page => dispatch(activatePage(page)),
    resetNutritionData: () => dispatch(resetNutritionData())
});

// Reusable validation constuctor for each input
let inputObj = () => {
    this.valid = false;
    this.dirty = false;
};

class Nutrition extends React.Component {
    state = {
        now: moment(),
        day: {},
        loading: true,
        types: ['Supplement', 'Mexican/Fast Food', 'Breakfast/Starbucks', 'Breakfast', 'Starbucks', 'Custom Meal'],
        validation: {
            name: new inputObj(),
            type: new inputObj(),
            calories: new inputObj(),
            protein: new inputObj(),
            carbs: new inputObj(),
            fat: new inputObj()
        }
    };

    componentWillMount() {
        const { nutrition, activatePage } = this.props;
        window.scrollTo(0, 0);

        if (!nutrition) {
            activatePage('nutrition');
        }
    }

    componentDidUpdate() {
        if (_.isEmpty(this.state.day) && !_.isEmpty(this.props.data)) {
            this.mapDayToState();
        }
    }

    componentWillUnmount() {
        this.props.resetNutritionData();
    }

    mapDayToState = () => {
        let { data, activeDay } = this.props;
        let { now, day, loading } = this.state;

        if (!_.isEmpty(activeDay)) {
            day = activeDay;
        } else {
            for (let i = 0; i < data.calendar.length; i++) {
                if (
                    data.calendar[i].day.date() === now.date() &&
                    data.calendar[i].day.month() === now.month() &&
                    data.calendar[i].day.year() === now.year()
                ) {
                    day = data.calendar[i];
                }
            }
        }

        loading = false;

        this.setState({ day, loading });
    };

    renderMealsTable() {
        let { day } = this.state;

        return (
            <ReactTable
                data={day.nutrition.meals || []}
                noDataText="No Meals Found"
                columns={[
                    {
                        Header: 'Meals',
                        columns: [
                            {
                                Header: 'Name',
                                id: 'name',
                                accessor: d => d.name
                            },
                            {
                                Header: 'Type',
                                id: 'type',
                                accessor: d => d.type
                            }
                        ]
                    },
                    {
                        Header: 'Nutritional Information (g)',
                        columns: [
                            {
                                Header: 'Calories',
                                id: 'calories',
                                accessor: d => d.calories
                            },
                            {
                                Header: 'Protein',
                                id: 'protein',
                                accessor: d => d.protein
                            },
                            {
                                Header: 'Carbohydrates',
                                id: 'carbs',
                                accessor: d => d.carbs
                            },
                            {
                                Header: 'Fat',
                                id: 'fat',
                                accessor: d => d.fat
                            }
                        ]
                    }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
        );
    }

    /**
     * Validate Inputs
     *
     * @return valid - validation status
     */
    validateInputs() {
        let valid = true;
        // Check for incompleted fields
        for (let key in this.state.validation) {
            if (!this.state.validation[key]['valid']) {
                return false;
            }
        }

        return valid;
    }

    onChange = event => {
        // create a shallow copy of the state to mutate
        let obj = Object.assign({}, this.state);
        // Set value in obj to eventually send to the state
        obj[event.target.name] = event.target.value;
        // Mark input as dirty (interacted with)
        obj['validation'][event.target.name]['dirty'] = true;

        // Remove non-numbers from macro inputs
        if (event.target.name !== 'name') {
            event.target.value = event.target.value.replace(/[^0-9]/g, '');
            obj[event.target.name] = event.target.value;
        }

        // If there is any value, mark it valid
        if (event.target.value !== '') {
            obj['validation'][event.target.name]['valid'] = true;
        } else {
            obj['validation'][event.target.name]['valid'] = false;
        }

        this.setState(obj);
    };

    typeOnChange = type => {
        // create a shallow copy of the state to mutate
        let obj = Object.assign({}, this.state);
        // Set value in obj to eventually send to the state
        obj['type'] = type;
        // Mark input as dirty (interacted with)
        obj['validation']['type']['dirty'] = true;
        obj['validation']['type']['valid'] = true;

        this.setState(obj);
    };

    onSubmit = () => {
        if (this.validateInputs()) {
            console.log('submit!');
        } else {
            console.log('form error!');
            // create a shallow copy of the state to mutate
            let obj = Object.assign({}, this.state);
            // If there is an invalid input, mark all as dirty on submit to alert the user
            for (let attr in this.state.validation) {
                if (obj['validation'][attr]) {
                    obj['validation'][attr]['dirty'] = true;
                }
            }
            this.setState(obj);
        }
    };

    renderMealBox() {
        let { day, validation } = this.state;

        return (
            <div className="nutrition__overview--meals">
                <h3>{`Logged Meals (${day.nutrition.meals ? day.nutrition.meals.length : 0})`}</h3>
                <div className="add__meal">
                    <div className="add__meal--input">
                        <TextField
                            name="name"
                            errorText={!validation.name.valid && validation.name.dirty ? 'This field is required' : ''}
                            onChange={this.onChange}
                            floatingLabelText="Name"
                            style={{
                                width: '45%'
                            }}
                        />
                        <AutoComplete
                            floatingLabelText="Type"
                            errorText={!validation.type.valid && validation.type.dirty ? 'This field is required' : ''}
                            dataSource={this.state.types}
                            filter={AutoComplete.caseInsensitiveFilter}
                            onUpdateInput={this.typeOnChange}
                            fullWidth={true}
                            style={{
                                width: '45%'
                            }}
                        />
                    </div>
                    <div className="add__meal--input">
                        <TextField
                            name="calories"
                            errorText={
                                !validation.calories.valid && validation.calories.dirty ? 'This field is required' : ''
                            }
                            onChange={this.onChange}
                            floatingLabelText="Calories"
                            style={{
                                width: '45%'
                            }}
                        />
                        <TextField
                            name="protein"
                            errorText={
                                !validation.protein.valid && validation.protein.dirty ? 'This field is required' : ''
                            }
                            onChange={this.onChange}
                            floatingLabelText="Protein"
                            style={{
                                width: '45%'
                            }}
                        />
                    </div>
                    <div className="add__meal--input">
                        <TextField
                            name="carbs"
                            errorText={
                                !validation.carbs.valid && validation.carbs.dirty ? 'This field is required' : ''
                            }
                            onChange={this.onChange}
                            floatingLabelText="Carbohydrates"
                            style={{
                                width: '45%'
                            }}
                        />
                        <TextField
                            name="fat"
                            errorText={!validation.fat.valid && validation.fat.dirty ? 'This field is required' : ''}
                            onChange={this.onChange}
                            floatingLabelText="Fat"
                            style={{
                                width: '45%'
                            }}
                        />
                    </div>
                    <RaisedButton
                        label="Add Meal"
                        className="add__meal--save"
                        onClick={this.onSubmit}
                        backgroundColor="#ed5454"
                        labelColor="#fff"
                    />
                </div>
            </div>
        );
    }

    renderProgressBar(type) {
        let { day } = this.state;
        let { data } = this.props;
        let color;
        let progress;
        let text;

        if (type === 'protein') {
            color = '#F5729C';
            progress = day.nutrition.protein / data.user.goals.nutrition.protein;
            text = day.nutrition.protein / data.user.goals.nutrition.protein;
        } else if (type === 'carbs') {
            color = '#7BD4F8';
            progress = day.nutrition.carbs / data.user.goals.nutrition.carbs;
            text = day.nutrition.carbs / data.user.goals.nutrition.carbs;
        } else {
            color = '#55F3B3';
            progress = day.nutrition.fat / data.user.goals.nutrition.fat;
            text = day.nutrition.fat / data.user.goals.nutrition.fat;
        }

        text = `${Math.round(text * 100)}% of daily goal`;

        let options = {
            height: 12.5,
            color: color,
            trailColor: '#f4f4f4',
            containerStyle: {
                width: '80%',
                margin: '30px auto'
            },
            className: '',
            text: {
                value: text,
                style: {
                    fontSize: '1rem',
                    color: '#a2a7d9',
                    margin: '15px 0 0 0'
                }
            }
        };
        console.log(progress);
        return <ProgressBar progress={progress} options={options} />;
    }

    renderCalorieBox() {
        let { day } = this.state;
        let { data } = this.props;
        let calorieGoal = day.fitness.calories || data.user.goals.nutrition.calories;
        //let progress = day.nutrition.calories / calorieGoal;
        let text = day.nutrition.calories / calorieGoal;
        /*let options = {
            strokeWidth: 4,
            color: '#8E81E3',
            trailColor: '#f4f4f4',
            text: {
                value: `${day.nutrition.calories} cal`,
                style: {
                    color: '#a2a7d9',
                    margin: '-175px 0 0 0',
                    fontSize: '40px'
                }
            }
        };
        let containerStyle = {
            width: '300px',
            height: '30px',
            margin: '30px auto 10px auto'
        };

        // Prevent progress bar bug by converting 100%+ to 100%
        progress = progress > 1 ? (progress = 1) : progress;
        text = `${Math.round(text * 100)}% of daily goal`; */

        return (
            <div className="nutrition__overview--calories">
                <h3>Total Calories</h3>
                <i className="icon-help-circle" data-for="calorie-tooltip" data-tip="tooltip" />
                <ReactTooltip class="calorie__tooltip" type="info" id="calorie-tooltip">
                    <span>
                        The progress bar represents your calories consumed vs your calories burned. If you have not yet
                        entered in your activity data for this day, the progress bar will default to your calorie goal.
                    </span>
                </ReactTooltip>

                <span className="subhead">{text}</span>
            </div>
        );
    }

    render() {
        const { day } = this.state;
        const { loading } = this.props;
        const { protein, carbs, fat } = day.nutrition || 0;

        return (
            <div>
                {!loading && !this.state.loading && !_.isEmpty(day) ? (
                    <div className="nutrition">
                        <h1>Nutrition</h1>
                        <h3>{day.day.format('dddd, MMMM Do YYYY')}</h3>
                        <div className="nutrition__overview">
                            <div className="nutrition__overview--box">
                                <div className="nutrition__overview--head">
                                    <h1>{protein}</h1>
                                    <span>g</span>
                                    <h3>Protein</h3>
                                </div>
                                {this.renderProgressBar('protein')}
                            </div>
                            <div className="nutrition__overview--box">
                                <div className="nutrition__overview--head">
                                    <h1>{carbs}</h1>
                                    <span>g</span>
                                    <h3>Carbohydrates</h3>
                                </div>
                                {this.renderProgressBar('carbs')}
                            </div>
                            <div className="nutrition__overview--box">
                                <div className="nutrition__overview--head">
                                    <h1>{fat}</h1>
                                    <span>g</span>
                                    <h3>Fat</h3>
                                </div>
                                {this.renderProgressBar('fat')}
                            </div>
                        </div>
                        <div className="nutrition__overview">
                            {this.renderCalorieBox()}
                            {this.renderMealBox()}
                        </div>
                        {this.renderMealsTable()}
                    </div>
                ) : (
                    'Loading...'
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nutrition);
