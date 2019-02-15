import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Brand = styled(NavLink)`
    position: relative;
    font-size: 50px;
    background: #fff;
    color: rgb(0, 132, 137);
    box-sizing: border-box;
    text-align: center;
    display: inline-block;
    padding: 15px 30px;
    cursor: pointer;

    @media (max-width: 768px) {
        font-size: 40px;
        padding: 0 20px;
        display: flex;
        align-items: center;
    }
`;

export const Name = styled.div`
    font-family: Oregano;
    cursor: pointer;
    font-size: 35px;
    color: rgb(0, 132, 137);
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    font-style: italic;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const Nav = styled.div`
    font-family: 'Source Sans Pro', serif;
    position: fixed;
    display: flex;
    justify-content: space-between;
    top: 0;
    width: 100%;
    height: 80px;
    background: #ffffff;
    color: #1b2431;
    border-bottom: 1px solid rgb(219, 219, 219);
    z-index: 999;

    @media (max-width: 768px) {
        height: 65px;
    }
`;

export const Menu = styled.ul`
    position: absolute;
    width: 200px;
    font-family: 'Varela Round';
    margin-top: 40px;
    background: #fff;
    list-style: none;
    padding: 15px;
    right: 0;
    border: 1px solid #dbdbdb;
    border-radius: 0 0 4px 4px;

    @media (max-width: 768px) {
        margin-top: 32px;
    }
`;

export const MenuItem = styled.li`
    padding: 10px;
    border-top: 1px solid rgb(242, 242, 242);

    &:first-child {
        border-top: 0;
    }

    &:hover {
        opacity: 0.8;
    }
`;

export const UserName = styled.div`
    font-size: 12px;
    font-weight: bold;
    padding: 0 15px;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const Icon = styled.i`
    display: inline-block;
    vertical-align: top;
    padding: 20px 5px;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const Greeting = styled.div`
    float: right;
    padding: 0 20px;
    display: inline-flex;
    height: 100%;
    align-items: center;
    cursor: pointer;
`;

export const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const Image = styled.img`
    height: 50px;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px;

    @media (max-width: 768px) {
        height: 40px;
    }
`;

export const Backup = styled.div`
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px;

    @media (max-width: 768px) {
        height: 40px;
    }
`;
