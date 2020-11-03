export const months = [
    {'month': 'september', 'cuote': 15}, {'month': 'october', 'cuote': 15}, {'month': 'november', 'cuote': 15}, {'month': 'december', 'cuote': 15}, 
    {'month': 'january', 'cuote': 15}, {'month': 'february', 'cuote': 15}, {'month': 'march', 'cuote': 15}, {'month': 'april', 'cuote': 15}, 
    {'month': 'may', 'cuote': 15}, {'month': 'june', 'cuote': 15}, {'month': 'july', 'cuote': 15}, {'month': 'august', 'cuote': 15}
];

export const monthsTitle = ['Cedula', 'Apellidos y Nombres', 'Estatus', 'Sep-20', 'Oct-20', 'Nov-20', 'Dic-20', 'Ene-21', 'Feb-21', 'Mar-21', 'Abr-21', 'May-21', 'Jun-21', 'Jul-21', 'Ago-21', 'TOTAL'];

export const monthNames = [ "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december" ];

export const getMonthName = () => {
    return monthNames[new Date().getMonth()];
}