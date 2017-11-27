import React from 'react';
import { connect } from 'react-redux';
import { activatePage, resetNutritionData } from './actions';
import moment from 'moment';
// Components
import NavBar from './NavBar';
import ProgressBar from 'react-progressbar.js';
let { Circle, Line } = ProgressBar;

const mapStateToProps = state => ({
    nutrition: state.navigationState.nutrition,
    data: state.adminState.data,
    activeDay: state.adminState.activeDay
});

const mapDispatchToProps = dispatch => ({
    activatePage: page => dispatch(activatePage(page)),
    resetNutritionData: () => dispatch(resetNutritionData())
});

class Nutrition extends React.Component {
	state = {
		now: moment(),
		day: {}
	};

	componentWillMount() {
		let { nutrition, activatePage } = this.props;
		window.scrollTo(0, 0);

		this.mapDayToState();

		if(!nutrition) {
			activatePage('nutrition');
		}
	}

	componentWillUnmount() {
		this.props.resetNutritionData();
	}

	mapDayToState = () => {
		let { data, activeDay } = this.props;
		let { now, day } = this.state;

		if(!_.isEmpty(activeDay)) {
			day = activeDay;
		} else {
			for(let i = 0; i < data.calendar.length; i++) {
				if(data.calendar[i].day.date() === now.date() && data.calendar[i].day.month() === now.month() && data.calendar[i].day.year() === now.year()) {
					day = data.calendar[i];
				}
			}
		}

		this.setState({ day });
	}

	renderMealBox() {
		let { day } = this.state;
		//let { data } = this.props;

		return (
        	<div className="nutrition__overview--meals">
        		<h3>{`Logged Meals (${day.nutrition.meals.length})`}</h3>
        		<div className="nutrition__overview--table">
        			<div className="nutrition__overview--table-head">
						<div className="thead__name">Name</div>
						<div className="thead__calories">Calories</div>
						<div className="thead__protein">Protein</div>
						<div className="thead__carbs">Carbs</div>
						<div className="thead__fat">Fat</div>
					</div>
	        		{_.map(day.nutrition.meals, (meal, index) => (
						<div className="nutrition__overview--meal" key={index}>
							<div className="name">{meal.name}</div>
							<div className="calories">{`${meal.calories}g`}</div>
							<div className="protein">{`${meal.protein}g`}</div>
							<div className="carbs">{`${meal.carbs}g`}</div>
							<div className="fat">{`${meal.fat}g`}</div>
						</div>
					))}
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

		if(type === 'protein') {
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
			text = day.nutrition.carbs / data.user.goals.nutrition.fat;
		}

		// Prevent progress bar bug by converting 100%+ to 100%
		progress = progress > 1 ? progress = 1 : progress;
		text = `${Math.round((text * 100))}% of daily goal`;

		let options = {
            strokeWidth: 3,
            color: color,
            trailColor: '#f4f4f4',
            text: {
            	value: text,
            	style: {
		            color: '#a2a7d9',
		            margin: '15px 0 0 0'
		        }
            }
        };

        let containerStyle = {
            width: '80%',
            margin: '30px auto'
        };

        return (
            <Line
                progress={progress}
                options={options}
                initialAnimate={true}
                containerStyle={containerStyle}
                containerClassName={'.progressbar'} />
        );
	}

	renderCalorieBox() {
		let { day } = this.state;
		let { data } = this.props;
		let calorieGoal = day.fitness.calories ? day.fitness.calories : data.user.goals.nutrition.calories;
		let progress = day.nutrition.calories / calorieGoal;
		let text = day.nutrition.calories / calorieGoal;
		let options = {
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
		progress = progress > 1 ? progress = 1 : progress;
		text = `${Math.round(text * 100)}% of daily goal`;

        return (
        	<div className="nutrition__overview--calories">
        		<h3>Total Calories</h3>
	            <Circle
	                progress={progress}
	                options={options}
	                initialAnimate={true}
	                containerStyle={containerStyle}
	                containerClassName={'.calorie__progress-bar'} />
                <span>{text}</span>
	        </div>
        );
	}

	render() {
		let { day } = this.state;
		let { protein, carbs, fat } = day.nutrition;

		return (
			<div>
				<NavBar />
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
				</div>
			</div>
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Nutrition);