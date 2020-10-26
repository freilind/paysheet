import React from 'react';
import cuid from 'cuid';
import { Table } from 'semantic-ui-react';
import {getMonthName, months, monthsTitle} from '../../app/common/constants';

const PaysheetBs = ({students, history, match}) => {
    const styleMoroso = {'backgroundColor' : '#F8D8DF'};
    const styleSolvente = {'backgroundColor' : '#D3F8D7'};
    const regexMiles = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
    const todayMonth = getMonthName();
    const getTodayMonth = (m) => m.month === todayMonth;
    const size = months.findIndex(getTodayMonth) + 1;
    let totMonths = [];
    months.map(m => totMonths.push({'month': m.month, 'sum': 0}));

    const reducer = (accumulator, currentValue) => Number(accumulator + currentValue);
    const extractor = (obj) => obj.transactions.map(month => Number(month.mount) * Number(month.rate)).reduce(reducer,0);
    const extractorDollar = (obj) => obj.transactions.map(month => Number(month.mount)).reduce(reducer,0);
    const extractorCuote = (obj => Number(obj.cuote));
    
    const extraxtSum = (student, month) => {
        const m = student.payments.filter(obj => obj.month === month).map(extractor);
        const sum = totMonths.filter(obj => obj.month === month).map(obj => obj.sum);
        const updateMonth =[{'month': month, 'sum': Number(sum) + Number(m)}];
        totMonths = totMonths.map(obj => updateMonth.find(o => o.month === obj.month) || obj);
    }

    students.map(student => months.map(m =>extraxtSum(student, m.month)));
    const acc = months.slice(0, size).map(extractorCuote).reduce(reducer,0);

    return(
        <>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        {monthsTitle.map(title =>
                            <Table.HeaderCell key={title} singleLine>
                                {title}
                            </Table.HeaderCell>
                        )}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {students.map(student => {
                        const accStudent = student.payments.map(extractorDollar).reduce(reducer,0);
                        return (
                            <Table.Row key={student.cedula}>
                                <Table.Cell singleLine>
                                    {student.cedula.toString().replace(regexMiles, '.')}
                                </Table.Cell>
                                <Table.Cell style={{textTransform: 'capitalize'}} singleLine>{student.lastName +', '+ student.firstName}</Table.Cell>
                                <Table.Cell  style={accStudent < acc ? styleMoroso : styleSolvente}>
                                    {accStudent < acc ? 'Moroso' : 'Solvente'}
                                </Table.Cell>
                                {months.map(m => {
                                    const sum = Number(student.payments.filter(obj => obj.month === m.month).map(extractorDollar));
                                    return (
                                        <Table.Cell key={m.month} style={sum < m.cuote ? styleMoroso : styleSolvente}>
                                            {new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'BSF' })
                                                .format(student.payments.filter(obj => obj.month === m.month).map(extractor)).replace('BSF', '')}
                                        </Table.Cell>
                                    )
                                })}
                                <Table.Cell>
                                    {new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'BSF' })
                                        .format(parseFloat(student.payments.map(extractor).reduce(reducer,0)).toFixed(2)).replace('BSF', '')}
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>

                <Table.Footer>
                    <Table.Row >
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>TOTALES</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        {months.map(m => 
                            <Table.HeaderCell key={cuid()}>
                                {new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'BSF' })
                                    .format(totMonths.filter(obj => obj.month === m.month).map(obj => obj.sum)).replace('BSF', '')}
                            </Table.HeaderCell>
                        )}
                        <Table.HeaderCell>
                            {new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'BSF' })
                                .format(parseFloat(totMonths.map(obj => obj.sum).reduce(reducer,0)).toFixed(2)).replace('BSF', '')}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </>
    );
}

export default PaysheetBs;
