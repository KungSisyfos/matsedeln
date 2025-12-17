import * as types from '../../database.types';
import mockRecipies from '../data/mockRecipes';

const generateMenu = (availableRecipies: types.Database[], days: number) => {
    const week = [];
    const shuffled = shuffle([...availableRecipies]);
    for (let i = 0; i < availableRecipies.length; i++) {
        week.push(shuffled[i]);
    }
};
