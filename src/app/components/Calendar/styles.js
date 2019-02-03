import styled from 'styled-components';

const Icon = styled.i`
    position: absolute;
    height: 22px;
    width: 22px;
    box-sizing: border-box;
    padding: 1px 4px;
    top: 15px;
    right: 10px;
    font-size: 14px;
    text-align: center;
    border-radius: 50%;

    &.icon-feather {
        background: #ece7fe;
        color: #6031e1;
    }

    &.icon-star-full {
        color: #ffba00;
        background: #ffefe7;
    }

    &.legend {
        position: relative;
        min-width: 0;
        top: 0;
        right: 0;
        margin: 0;
        border: none;
        margin-left: -2px;
    }

    &:before {
        vertical-align: middle;
    }
`;

const DayOverview = styled.div`
    margin: -20px auto;
    text-align: center;
    height: 100px;
    overflow: hidden;

    @media (max-width: 768px) {
        margin: auto;
        height: 30px;
    }
`;

const ToggleMonth = styled.div`
    text-align: center;
    margin-right: 270px;

    @media (max-width: 1024px) {
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
    }

    i {
        display: inline-block;
        cursor: pointer;
        vertical-align: sub;
        font-size: 25px;
        opacity: 0.8;

        @media (max-width: 1024px) {
            font-size: 35px;
        }
    }

    h2 {
        display: inline-block;
        vertical-align: middle;
        padding: 10px;
        margin: 0;

        @media (max-width: 1024px) {
            display: flex;
            align-items: center;
        }
    }
`;

const Summary = styled.div`
    padding: 15px 15px 150px 15px;
    background: #ffffff;

    h2 {
        color: rgb(0, 132, 137);
    }
`;

const Wrapper = styled.div`
    padding: 200px 50px 30px 50px;

    @media (min-width: 1024px) and (max-width: 1199px) {
        padding: 200px 30px 30px 30px;
    }

    @media (max-width: 768px) {
        background: #ffffff;
        padding: 65px 0 0 0;
    }
`;

const CalendarWrapper = styled.div`
    display: flex;

    @media (max-width: 768px) {
        display: block;
    }
`;

const CalendarContainer = styled.div`
    display: inline-block;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    background: #ffffff;

    @media (max-width: 768px) {
        width: 100%;
        box-shadow: none;
    }
`;

const Meals = styled.div``;

const YearHeader = styled.h4`
    text-align: center;
    margin: 0 270px 20px 0;

    @media (max-width: 1024px) {
        margin: 5px auto;
    }
`;

const MealHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const CalendarHeader = styled.div`
    display: flex;
    border: 1px solid #e6eaee;
    border-bottom: none;
    background: #ffffff;

    span {
        opacity: 0.8;
        width: 14.3%;
        text-align: center;
        font-weight: bold;
        padding: 15px 0;
    }
`;

const Meal = styled.div`
    padding: 15px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e6edef;

    span:first-child {
        flex-grow: 2;
    }
`;

const DayNumber = styled.div`
    padding: 15px;
    opacity: 0.8;
    font-weight: bold;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 0;
        text-align: center;
    }
`;

const Day = styled.div`
    position: relative;
    border: 1px solid #e6edef;
    display: inline-block;
    box-sizing: border-box;
    width: 14.2857%;
    height: 150px;
    background: ${props => (props.inactive ? '#f6fafd' : '#ffffff')};
    opacity: ${props => (props.inactive ? 0.5 : 1)};
    color: ${props => (props.today ? '#ed5454' : 'inherit')};

    @media (max-width: 768px) {
        height: 60px;
    }

    .icon-info {
        opacity: 0.8;
        cursor: pointer;
        position: absolute;
        color: $limed-spruce;
        font-size: 20px;
        bottom: 10px;
        right: 10px;

        @include less-than-ipad {
            display: none;
        }

        @media (max-width: 768px) {
            display: none;
        }

        &.hidden {
            display: none;
        }

        &:hover {
            color: $burnt-sienna;
        }
    }
`;

export {
    Icon,
    Day,
    DayOverview,
    ToggleMonth,
    Summary,
    Meals,
    Meal,
    MealHeader,
    Wrapper,
    YearHeader,
    DayNumber,
    CalendarWrapper,
    CalendarHeader,
    CalendarContainer
};
